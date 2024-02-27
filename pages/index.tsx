import * as React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import {
  Container,
  Box,
  Stack,
  HStack,
  ButtonGroup,
  Button,
  Icon,
  Heading,
  Text,
  Wrap,
  Tag,
  useClipboard,
  IconButton,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { SEO } from "components/seo/seo";

import { FallInPlace } from "components/motion/fall-in-place";
import { Hero } from "components/hero";
import { Link, Br } from "@saas-ui/react";
import { Em } from "components/typography";
import { NextjsLogo, ChakraLogo } from "components/logos";
import {
  FiArrowRight,
  FiBox,
  FiCheck,
  FiCode,
  FiCopy,
  FiFlag,
  FiGrid,
  FiLock,
  FiSearch,
  FiSliders,
  FiSmile,
  FiTerminal,
  FiThumbsUp,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
// import { Faq } from "components/faq";
import { Pricing } from "components/pricing/pricing";

import { ButtonLink } from "components/button-link/button-link";
import { Testimonial, Testimonials } from "components/testimonials";

import faq from "data/faq";
import testimonials from "data/testimonials";
import pricing from "data/pricing";

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from "components/highlights";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthProvider";
import { useSearchStore } from "data/store";
import { NextPageWithLayout } from "./_app";
// import { useData } from "context/DataContext";
import { Layout } from "components/layout";
import MicComponent from "components/announcement-banner/MicComponent";
import { motion, AnimatePresence } from "framer-motion";
const Home: NextPageWithLayout = () => {
  const { showMic } = useSearchStore();
  return (
    <Box>
      <SEO title="Eternia Windows" description="Eternia Windows" />
      <Box>
        {showMic ? (
          <MicComponent />
        ) : (
          <>
            <HeroSection />

            {/* <HighlightsSection /> */}

            <FeaturesSection />

            <TestimonialsSection />

            {/* <PricingSection /> */}

            {/* <FaqSection /> */}
          </>
        )}
      </Box>
    </Box>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
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

const HeroSection: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { isSearched } = useSearchStore();
  const variants = {
    hidden: { opacity: 0, x: 0, transition: { duration: 2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };
  return (
    <Box position="relative" overflow="hidden">
      <AnimatePresence>
        {isSearched ? (
          <>
            {" "}
            <BackgroundGradient height="100%" />
            <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="10">
              <Stack
                direction={{ base: "column", lg: "row" }}
                alignItems="center"
              ></Stack>
            </Container>
          </>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            key="hero-section"
          >
            <BackgroundGradient height="100%" />
            <Container maxW="container.xl" pt={{ base: 40, lg: 60 }} pb="10">
              <Stack
                direction={{ base: "column", lg: "row" }}
                alignItems="center"
              >
                <Hero
                  id="home"
                  justifyContent="flex-start"
                  px="0"
                  title={
                    <FallInPlace>
                      Build Your Company
                      <Br /> With Futuristic Softwares
                    </FallInPlace>
                  }
                  description={
                    <FallInPlace delay={0.4} fontWeight="medium">
                      Eternia Windows <Em>Provides various Products</Em>
                      <Br /> for efficient management of <Br /> your company
                    </FallInPlace>
                  }
                >
                  <FallInPlace delay={0.8}>
                    <ButtonGroup spacing={4} alignItems="center" mt={2}>
                      <ButtonLink
                        colorScheme="primary"
                        size="lg"
                        href={isAuthenticated ? "#features" : "/signup"}
                        onClick={() => {
                          router.push(
                            isAuthenticated ? "#features" : "/signup"
                          );
                        }}
                      >
                        {isAuthenticated ? "View Features" : "Sign Up"}
                      </ButtonLink>
                    </ButtonGroup>
                  </FallInPlace>
                </Hero>

                <Box
                  height="600px"
                  position="absolute"
                  display={{ base: "none", lg: "block" }}
                  left={{ lg: "60%", xl: "55%" }}
                  width="80vw"
                  maxW="1100px"
                  margin="0 auto"
                >
                  <FallInPlace delay={1}>
                    <Box overflow="hidden" height="100%">
                      <Image
                        src="/static/screenshots/list.png"
                        layout="fixed"
                        width={1200}
                        height={762}
                        alt="Screenshot of a ListPage in Saas UI Pro"
                        quality="75"
                        priority
                      />
                    </Box>
                  </FallInPlace>
                </Box>
              </Stack>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: "Accessible",
            icon: FiSmile,
            description: "All components strictly follow WAI-ARIA standards.",
            iconPosition: "left",
            delay: 0.6,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Themable",
            icon: FiSliders,
            description:
              "Fully customize all components to your brand with theme support and style props.",
            iconPosition: "left",
            delay: 0.8,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Composable",
            icon: FiGrid,
            description:
              "Compose components to fit your needs and mix them together to create new ones.",
            iconPosition: "left",
            delay: 1,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Productive",
            icon: FiThumbsUp,
            description:
              "Designed to reduce boilerplate and fully typed, build your product at speed.",
            iconPosition: "left",
            delay: 1.1,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Accessible",
            icon: FiSmile,
            description: "All components strictly follow WAI-ARIA standards.",
            iconPosition: "left",
            delay: 0.6,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Themable",
            icon: FiSliders,
            description:
              "Fully customize all components to your brand with theme support and style props.",
            iconPosition: "left",
            delay: 0.8,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Composable",
            icon: FiGrid,
            description:
              "Compose components to fit your needs and mix them together to create new ones.",
            iconPosition: "left",
            delay: 1,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
          {
            title: "Productive",
            icon: FiThumbsUp,
            description:
              "Designed to reduce boilerplate and fully typed, build your product at speed.",
            iconPosition: "left",
            delay: 1.1,
            listItems: [
              "Manage customer interactions, sales pipelines, and marketing campaigns.",
              "Track leads, contacts, deals, and opportunities in real-time.",
            ],
          },
        ]}
        reveal={FallInPlace}
      /> */}
    </Box>
  );
};

const HighlightsSection = () => {
  const { value, onCopy, hasCopied } = useClipboard("yarn add @saas-ui/react");

  return (
    <Highlights>
      <HighlightsItem colSpan={[1, null, 2]} title="Core components">
        <VStack alignItems="flex-start" spacing="8">
          <Text color="muted" fontSize="xl">
            Get started for free with <Em>30+ open source components</Em>.
            Including authentication screens with Clerk, Supabase and Magic.
            Fully functional forms with React Hook Form. Data tables with React
            Table.
          </Text>

          <Flex
            rounded="full"
            borderWidth="1px"
            flexDirection="row"
            alignItems="center"
            py="1"
            ps="8"
            pe="2"
            bg="primary.900"
            _dark={{ bg: "gray.900" }}
          >
            <Box>
              <Text color="yellow.400" display="inline">
                yarn add
              </Text>{" "}
              <Text color="cyan.300" display="inline">
                @saas-ui/react
              </Text>
            </Box>
            <IconButton
              icon={hasCopied ? <FiCheck /> : <FiCopy />}
              aria-label="Copy install command"
              onClick={onCopy}
              variant="ghost"
              ms="4"
              isRound
              color="white"
            />
          </Flex>
        </VStack>
      </HighlightsItem>
      <HighlightsItem title="Solid foundations">
        <Text color="muted" fontSize="lg">
          We don&apos;t like to re-invent the wheel, neither should you. We
          selected the most productive and established tools in the scene and
          build Saas UI on top of it.
        </Text>
      </HighlightsItem>
      <HighlightsTestimonialItem
        name="Renata Alink"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={["pink.200", "purple.500"]}
      >
        “Saas UI helped us set up a beautiful modern UI in no time. It saved us
        hundreds of hours in development time and allowed us to focus on
        business logic for our specific use-case from the start.”
      </HighlightsTestimonialItem>
      <HighlightsItem
        colSpan={[1, null, 2]}
        title="Start your next idea two steps ahead"
      >
        <Text color="muted" fontSize="lg">
          We took care of all your basic frontend needs, so you can start
          building functionality that makes your product unique.
        </Text>
        <Wrap mt="8">
          {[
            "authentication",
            "navigation",
            "crud",
            "settings",
            "multi-tenancy",
            "layouts",
            "billing",
            "a11y testing",
            "server-side rendering",
            "documentation",
            "onboarding",
            "storybooks",
            "theming",
            "upselling",
            "unit testing",
            "feature flags",
            "responsiveness",
          ].map((value) => (
            <Tag
              key={value}
              variant="subtle"
              colorScheme="purple"
              rounded="full"
              px="3"
            >
              {value}
            </Tag>
          ))}
        </Wrap>
      </HighlightsItem>
    </Highlights>
  );
};

const FeaturesSection = () => {
  return (
    <Features
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={["2xl", null, "4xl"]}
          textAlign="left"
          as="p"
        >
          Futuristic Software
          <Br /> with advance features.
        </Heading>
      }
      description={
        <>
          Saas UI Pro includes everything you need to build modern frontends.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      // features={[
      //   {
      //     title: "Components.",
      //     icon: FiBox,
      //     description:
      //       "All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Starterkits.",
      //     icon: FiLock,
      //     description:
      //       "Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Documentation.",
      //     icon: FiSearch,
      //     description:
      //       "Extensively documented, including storybooks, best practices, use-cases and examples.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Onboarding.",
      //     icon: FiUserPlus,
      //     description:
      //       "Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Feature flags.",
      //     icon: FiFlag,
      //     description:
      //       "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Upselling.",
      //     icon: FiTrendingUp,
      //     description:
      //       "Components and hooks for upgrade flows designed to make upgrading inside your app frictionless.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Themes.",
      //     icon: FiToggleLeft,
      //     description:
      //       "Includes multiple themes with darkmode support, always have the perfect starting point for your next project.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Generators.",
      //     icon: FiTerminal,
      //     description:
      //       "Extend your design system while maintaininig code quality and consistency with built-in generators.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Monorepo.",
      //     icon: FiCode,
      //     description: (
      //       <>
      //         All code is available as packages in a high-performance{" "}
      //         <Link href="https://turborepo.com">Turborepo</Link>, you have full
      //         control to modify and adjust it to your workflow.
      //       </>
      //     ),
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Documentation.",
      //     icon: FiSearch,
      //     description:
      //       "Extensively documented, including storybooks, best practices, use-cases and examples.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Onboarding.",
      //     icon: FiUserPlus,
      //     description:
      //       "Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Feature flags.",
      //     icon: FiFlag,
      //     description:
      //       "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Upselling.",
      //     icon: FiTrendingUp,
      //     description:
      //       "Components and hooks for upgrade flows designed to make upgrading inside your app frictionless.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Themes.",
      //     icon: FiToggleLeft,
      //     description:
      //       "Includes multiple themes with darkmode support, always have the perfect starting point for your next project.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Generators.",
      //     icon: FiTerminal,
      //     description:
      //       "Extend your design system while maintaininig code quality and consistency with built-in generators.",
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      //   {
      //     title: "Monorepo.",
      //     icon: FiCode,
      //     description: (
      //       <>
      //         All code is available as packages in a high-performance{" "}
      //         <Link href="https://turborepo.com">Turborepo</Link>, you have full
      //         control to modify and adjust it to your workflow.
      //       </>
      //     ),
      //     variant: "inline",
      //     listItems: [
      //       "Manage customer interactions, sales pipelines, and marketing campaigns.",
      //       "Track leads, contacts, deals, and opportunities in real-time.",
      //     ],
      //   },
      // ]}
    />
  );
};

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (columns, t, i) => {
        columns[i % 3].push(t);

        return columns;
      },
      [[], [], []]
    );
  }, []);

  return (
    <Testimonials
      title={testimonials.title}
      columns={[1, 2, 3]}
      innerWidth="container.xl"
    >
      <>
        {columns.map((column, i) => (
          <Stack key={i} spacing="8">
            {column.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </Stack>
        ))}
      </>
    </Testimonials>
  );
};

// const PricingSection = () => {
//   return (
//     <Pricing {...pricing}>
//       <Text p="8" textAlign="center" color="muted">
//         VAT may be applicable depending on your location.
//       </Text>
//     </Pricing>
//   );
// };

// const FaqSection = () => {
//   return <Faq {...faq} />;
// };

export default Home;

export async function getStaticProps() {
  return {
    props: {
      announcement: {
        title: "Get 50% off Saas UI Pro while in beta.",
        href: "https://appulse.gumroad.com/l/saas-ui-pro-pre-order",
      },
    },
  };
}
