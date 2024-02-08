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
} from "@chakra-ui/react";

import { Section, SectionTitle, SectionTitleProps } from "components/section";

const Revealer = ({ children }: any) => {
  return children;
};

export interface FeaturesProps
  extends Omit<SectionTitleProps, "title" | "variant">,
    ThemingProps<"Features"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  features: Array<FeatureProps>;
  columns?: ResponsiveValue<number>;
  spacing?: string | number;
  aside?: React.ReactChild;
  reveal?: React.FC<any>;
  iconSize?: SystemProps["boxSize"];
  innerWidth?: SystemProps["maxW"];
}

export interface FeatureProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: any;
  iconPosition?: "left" | "top";
  iconSize?: SystemProps["boxSize"];
  ip?: "left" | "top";
  variant?: string;
  delay?: number;
  listItems: string[];
}

export const Feature: React.FC<FeatureProps> = (props) => {
  const {
    title,
    description,
    icon,
    iconPosition,
    iconSize = 8,
    ip,
    variant,
    listItems,
  } = props;
  const styles = useMultiStyleConfig("Feature", { variant });

  const pos = iconPosition || ip;
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
      {icon && (
        <Circle sx={styles.icon}>
          <Icon as={icon} boxSize={iconSize} />
        </Circle>
      )}
      <Box>
        <Stack direction="column" spacing={2}>
          <Heading sx={styles.title}>{title}</Heading>
          <Text sx={styles.description}>{description}</Text>
          {listItems && (
            <UnorderedList mt={2} fontSize="sm" fontWeight="normal">
              {listItems.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export const Features: React.FC<FeaturesProps> = (props) => {
  const {
    title,
    description,
    features,
    columns = [1, 2, 3],
    spacing = 8,
    align: alignProp = "center",
    iconSize = 8,
    aside,
    reveal: Wrap = Revealer,
    ...rest
  } = props;

  const align = !!aside ? "left" : alignProp;

  const ip = align === "left" ? "left" : "top";

  return (
    <Section {...rest}>
      <Stack direction="row" height="full" align="flex-start">
        <VStack flex="1" spacing={[4, null, 8]} alignItems="stretch">
          {(title || description) && (
            <Wrap>
              <SectionTitle
                title={title}
                description={description}
                align={align}
              />
            </Wrap>
          )}
          {features.map((feature, i) => (
            <Wrap key={i} delay={feature.delay}>
              <Feature iconSize={iconSize} {...feature} ip={ip} />
            </Wrap>
          ))}
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
