import { useMutation } from "@apollo/client";
import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ButtonLink,
  ButtonLinkProps,
} from "components/button-link/button-link";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Section, SectionProps, SectionTitle } from "components/section";
import { useAuth } from "context/AuthProvider";
import { CREATE_REQUEST } from "graphql/mutation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiCheck } from "react-icons/fi";
// import { Link } from "react-router-dom";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  trialPeriodDays: string;
  billingCycle: string;
  action: ButtonLinkProps & { label?: string };
  isRecommended?: boolean;
  products: Array<{
    id: string;
    name: string;
  }>;
}

export interface PricingProps extends SectionProps {
  description: React.ReactNode;
  plans: Array<PricingPlan>;
}

export const RequestType = {
  SubscriptionRenewal: "SubscriptionRenewal",
  SubscriptionUpgrade: "SubscriptionUpgrade",
  NewSubscription: "NewSubscription",
};

export const Pricing: React.FC<PricingProps> = (props) => {
  const { children, plans, title, description, ...rest } = props;
  const { isAuthenticated, setUserId, userData } = useAuth();
  const router = useRouter();
  console.log("user data", userData);
  const [request, { loading, error }] = useMutation(CREATE_REQUEST, {
    variables: {
      createRequestInput: {
        planId: null,
        renewalType: null,
        requestType: null,
        userId: null,
      },
    },
    onCompleted: (data) => {
      console.log("----data---", data);
      if (userData) {
        console.log("if condition passed", {
          ...userData,
          requests: [
            ...userData.requests,
            { id: data.createRequest.id, plan: data.createRequest.plan },
          ],
        });
        setUserId(userData?.id as string, {
          ...userData,
          requests: [
            ...userData.requests,
            { id: data.createRequest.id, plan: data.createRequest.plan },
          ],
        });
      }
      //   if (data?.createUser?.id) {
      // You might want to redirect the user or update the UI in some way
    },
    onError: (error) => {
      // Handle the error, e.g., show an error message
      //   console.log("errr", data, email, password);
      console.error("signup error:", error.message);
    },
  });
  const purchasedStatus = (id: string) => {
    if (userData?.subscriptions?.find((request) => request.plan.id == id)) {
      return "Purchased";
    }
    if (userData?.requests?.find((request) => request.plan.id == id)) {
      return "Requested";
    } else return "Purchase";
  };
  return (
    <Section id="pricing" pos="relative" {...rest}>
      <BackgroundGradient height="100%" />
      <Box zIndex="2" pos="relative">
        <SectionTitle title={title} description={description}></SectionTitle>
        <SimpleGrid columns={[1, null, 3]} spacing={4}>
          {plans?.map((plan) => (
            <PricingBox
              key={plan.id}
              title={plan.name}
              description={plan.description}
              price={plan.price}
              billingCycle={plan.billingCycle}
              // sx={
              //   plan.isRecommended
              //     ? {
              //         borderColor: "primary.500",
              //         _dark: {
              //           borderColor: "primary.500",
              //           bg: "blackAlpha.300",
              //         },
              //       }
              //     : {}
              // }
            >
              <PricingFeatures>
                {plan.products.map((product, i) =>
                  product ? (
                    <PricingFeature key={i} {...product} />
                  ) : (
                    <br key={i} />
                  )
                )}
              </PricingFeatures>
              {isAuthenticated ? (
                <ButtonLink
                  colorScheme="primary"
                  {...plan.action}
                  onClick={() => {
                    if (purchasedStatus(plan.id) == "Purchase")
                      request({
                        variables: {
                          createRequestInput: {
                            planId: plan.id,
                            renewalType: "Annual",
                            requestType: RequestType.NewSubscription,
                            userId: userData?.id,
                          },
                        },
                      });
                  }}
                >
                  {purchasedStatus(plan.id)}
                </ButtonLink>
              ) : (
                <ButtonLink
                  colorScheme="primary"
                  {...plan.action}
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  {"Sign In"}
                </ButtonLink>
              )}
            </PricingBox>
          ))}
        </SimpleGrid>

        {children}
      </Box>
    </Section>
  );
};

const PricingFeatures: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <VStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="8"
      flex="1"
    >
      {children}
    </VStack>
  );
};

export interface PricingFeatureProps {
  // name: React.ReactNode;
  name: string;
  iconColor?: string;
  id: string;
}

const PricingFeature: React.FC<PricingFeatureProps> = (props) => {
  const { name, iconColor = "primary.500", id } = props;
  return (
    <HStack>
      <Icon as={FiCheck} color={iconColor} />
      <Link href={`/product/${id}`}>
        <Text flex="1" fontSize="sm">
          {name}
        </Text>
      </Link>
    </HStack>
  );
};

export interface PricingBoxProps extends Omit<StackProps, "title"> {
  title: React.ReactNode;
  description: React.ReactNode;
  price: React.ReactNode;
  billingCycle: string;
}

const PricingBox: React.FC<PricingBoxProps> = (props) => {
  const { title, description, price, children, billingCycle, ...rest } = props;
  return (
    <VStack
      zIndex="2"
      bg="whiteAlpha.600"
      borderRadius="md"
      p="8"
      flex="1 0"
      alignItems="stretch"
      border="1px solid"
      borderColor="gray.400"
      _dark={{
        bg: "blackAlpha.300",
        borderColor: "gray.800",
      }}
      {...rest}
    >
      <Heading as="h3" size="md" fontWeight="bold" fontSize="lg" mb="2">
        {title}
      </Heading>
      <Box color="muted">{description}</Box>
      <Stack direction={"row"}>
        <Box fontSize="2xl" fontWeight="bold" py="4">
          RS {price}
        </Box>
        <Box fontSize="lg" fontWeight="bold" py="4">
          {billingCycle?.slice(0, 1).toUpperCase() +
            billingCycle?.slice(1).toLowerCase()}
        </Box>
      </Stack>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  );
};
