import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { PageTransition } from "components/motion/page-transition";
import { Center, WrapItem } from "@chakra-ui/react";
import { Section, SectionTitle, SectionTitleProps } from "components/section";
import { useQuery } from "@apollo/client";
import {
  Box,
  Stack,
  VStack,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  Circle,
  ResponsiveValue,
  useMultiStyleConfig,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";
import { GET_SINGLE_PRODUCT } from "graphql/query";
import React from "react";
import { Card, CardAction, CardBody } from "@saas-ui/react";
import { Pricing } from "components/pricing/pricing";
import pricing from "data/pricing";
import { Layout } from "components/layout";
import { NextPageWithLayout } from "pages/_app";
const Revealer = ({ children }: any) => {
  return children;
};

const Page: NextPageWithLayout = ({}: any) => {
  const router = useRouter();
  const productID: string = router.query.productID as string;
  const styles = useMultiStyleConfig("Feature");
  const { data, loading, error } = useQuery(GET_SINGLE_PRODUCT, {
    variables: {
      productId: productID,
    },
  });
  // console.log("loading....", loading);
  const Wrap = Revealer;
  if (loading) {
    return (
      <Center height="100vh">
        <Text sx={styles.description}>Loading...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text sx={styles.description}>Error</Text>
      </Center>
    );
  }
  return (
    <>
      <Section innerWidth="container.xl">
        <BackgroundGradient zIndex="-1" />
        <PageTransition width="100%">
          <Stack
            direction="column"
            height="full"
            align="flex-start"
            justifyContent="stretch"
          >
            {data?.findProduct && (
              <SectionTitle
                title={data?.findProduct.name}
                description={data?.findProduct.description}
                // descriptionFontSize="sm"
                align={"center"}
                width="100%"
              />
            )}
            <Stack
              direction="column"
              // height="full"
              align="center"
              justifyContent="stretch"
              padding={0}
              h="auto"
            >
              {/* <Section innerWidth="container.xl"> */}
              {/* <SectionTitle title={"Product Features"} /> */}
              <SimpleGrid columns={3} spacing="8">
                <>
                  {data?.findProduct.productFeatures.map(
                    (t: { name: string; id: string }) => (
                      <Card subtitle={t.name} key={t.id} />
                    )
                  )}
                </>
              </SimpleGrid>
              {/* </Section> */}
            </Stack>
          </Stack>
        </PageTransition>
        <Section innerWidth="container.2xl">
          <Pricing
            title="Pricing"
            description={`Composite Plan Including ${data?.findProduct.name} and Various Other Products`}
            plans={data?.findProduct?.plans || []}
          >
            <Text p="8" textAlign="center" color="muted">
              VAT may be applicable depending on your location.
            </Text>
          </Pricing>
        </Section>
      </Section>
    </>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  const { announcement, header, footer } = page.props;
  return (
    <Layout
      announcementProps={announcement}
      headerProps={header}
      footerProps={footer}
    >
      {page}
    </Layout>
  );
};

export default Page;
