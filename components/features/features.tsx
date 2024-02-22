import * as React from "react";
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
  ThemingProps,
  SystemProps,
  UnorderedList,
  ListItem,
  Button,
  Center,
} from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";

import { Section, SectionTitle, SectionTitleProps } from "components/section";
import { useData } from "context/DataContext";
import { useSearchStore } from "data/store";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// import Button from "theme/components/button";

const Revealer = ({ children }: any) => {
  return children;
};

export interface FeaturesProps
  extends Omit<SectionTitleProps, "title" | "variant">,
    ThemingProps<"Features"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  columns?: ResponsiveValue<number>;
  spacing?: string | number;
  aside?: React.ReactChild;
  reveal?: React.FC<any>;
  iconSize?: SystemProps["boxSize"];
  innerWidth?: SystemProps["maxW"];
}

export interface FeatureProps {
  description: string;
  id: string;
  name: string;
  maxUsers: number;
  price: number;
  productFeatures: Array<{
    id: number;
    name: string;
  }>;
  plans?: Array<{
    createdAt: string;
    description: string;
    duration: number;
    name: string;
    price: number;
    trialPeriodDays: number;
  }>;
  iconSize: number;
  ip: string;
  variant: string;
}

export const Feature: React.FC<FeatureProps> = (props) => {
  const {
    description,
    maxUsers,
    productFeatures,
    price,
    name,
    id,
    ip,
    iconSize,
    variant,
  } = props;
  const styles = useMultiStyleConfig("Feature", { variant });

  const pos = ip;
  const direction = pos === "left" ? "row" : "column";

  return (
    <Stack
      sx={styles.container}
      direction={direction}
      alignItems="flex-start"
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
        transition: "all 0.25s",
      }}
    >
      {/* {icon && ( */}
      <Circle sx={styles.icon}>
        <Icon as={FiBox} boxSize={iconSize} />
      </Circle>
      {/* )} */}
      <Link href={`/product/${id}`}>
        <Box>
          <Stack direction="column" spacing={2}>
            <Heading sx={styles.title}>{name}</Heading>
            <Text sx={styles.description}>{description}</Text>
            {productFeatures && (
              <UnorderedList mt={2} fontSize="sm" fontWeight="normal">
                {productFeatures.map((item) => (
                  <ListItem key={item.id}>{item.name}</ListItem>
                ))}
              </UnorderedList>
            )}
          </Stack>
        </Box>
      </Link>
    </Stack>
  );
};

export const Features: React.FC<FeaturesProps> = (props) => {
  const {
    title,
    description,
    // features,
    columns = [1, 2, 3],
    spacing = 8,
    align: alignProp = "center",
    iconSize = 8,
    aside,
    reveal: Wrap = Revealer,
    ...rest
  } = props;
  const {
    productList,
    productListLoading,
    productListError,
    refetchProductList,
  } = useData();
  const styles = useMultiStyleConfig("Feature");
  const { searchedText, isSearched } = useSearchStore();
  const [features, setFeatures] = React.useState<FeatureProps[]>([]);
  // console.log("list of products--", features);
  let itemsPerPage = 6;
  const align = !!aside ? "left" : alignProp;

  const ip = align === "left" ? "left" : "top";
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(features.length / itemsPerPage);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get features for the current page
  const currentFeatures = features.slice(startIndex, endIndex);
  const [loading, setLoading] = React.useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  React.useEffect(() => {
    if (searchedText && !productListLoading && !loading) {
      const section = document.getElementById("features");
      if (section && !loading) {
        window.scrollTo({
          top: section.getBoundingClientRect().top - 50,
          behavior: "smooth",
        });
      }
    }
    if (productList) {
      setFeatures(productList.searchProducts);
    }
  }, [productList, searchedText, productListLoading, loading]);
  const refetchData = async () => {
    try {
      setLoading(true);
      console.log("Searched text", searchedText);
      await refetchProductList({ query: searchedText || "*" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    // console.log("new Data", refetch);
  };
  React.useEffect(() => {
    refetchData();
  }, [searchedText]);
  // console.log("loading------is it", productListLoading, loading);
  if (productListLoading || loading)
    return (
      <Center>
        <Text sx={styles.description}>Loading...</Text>
      </Center>
    );
  if (productListError)
    return (
      <Center>
        <Text sx={styles.description}>Error</Text>
      </Center>
    );

  return (
    <Section {...rest} id="features" pt={10}>
      <Stack direction="row" height="full" align="flex-start">
        <VStack flex="1" spacing={[4, null, 8]} alignItems="stretch">
          {(title || description) && !isSearched && (
            <Wrap>
              <SectionTitle
                title={title}
                description={description}
                align={align}
              />
            </Wrap>
          )}
          {currentFeatures.length ? (
            currentFeatures.map((feature, i) => (
              <Wrap key={i} delay={i * 1}>
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Feature
                    // iconSize={iconSize}
                    {...feature}
                    ip={ip}
                    variant="inline"
                  />
                </motion.div>
              </Wrap>
            ))
          ) : productListLoading || loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text>No result found</Text>
          )}
          {totalPages > 1 && (
            <Stack direction="row" spacing={2} mt={4} justify="center">
              {[...Array(totalPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={i + 1 === currentPage ? "solid" : "outline"}
                  onClick={() => {
                    handlePageChange(i + 1);
                    const section = document.getElementById("features");
                    if (section) {
                      section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </Stack>
          )}
        </VStack>
        {aside && (
          <Box flex="1" p="8">
            {aside}
          </Box>
        )}
      </Stack>
    </Section>
  );
};
