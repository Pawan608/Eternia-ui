import { NextPage } from "next";
import NextLink from "next/link";
import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { Auth, Link } from "@saas-ui/react";
import { Features } from "components/features";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Section, SectionTitle } from "components/section";
import siteConfig from "data/config";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { PageTransition } from "components/motion/page-transition";
import { SignupForm } from "components/auth/src/components/signup-form";
import { Layout } from "components/layout";
import { NextPageWithLayout } from "./_app";

const providers = {
  google: {
    name: "Google",
    icon: FaGoogle,
  },
  github: {
    name: "Github",
    icon: FaGithub,
    variant: "solid",
  },
};

const Login: NextPageWithLayout = () => {
  const onSuccess = () => {};
  return (
    <Section height="calc(100vh - 100px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />
      <Center height="100%" pt="20">
        <PageTransition width="100%">
          {/* <SectionTitle
            title={"Sign Up"}
            // description={"Sign up to avail all the perks of Eternia Windows"}
            align={"center"}
            width="100%"
          /> */}
          <SignupForm onSuccess={onSuccess}>
            <Text color="muted" fontSize="sm">
              By signing up you agree to our{" "}
              {/* <Link href={siteConfig.termsUrl} color="white"> */}
              Terms of Service {/* </Link>{" "} */}
              and {/* <Link href={siteConfig.privacyUrl} color="white"> */}
              Privacy Policy
              {/* </Link> */}
            </Text>
          </SignupForm>
        </PageTransition>
      </Center>
    </Section>
  );
};

Login.getLayout = function getLayout(page: React.ReactElement) {
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

export default Login;
