import { Center } from "@chakra-ui/react";
import { Auth, Link } from "@saas-ui/react";
import { LoginForm } from "components/auth/src/components/login-form";
import { BackgroundGradient } from "components/gradients/background-gradient";
import { Layout } from "components/layout";
import { PageTransition } from "components/motion/page-transition";
import { Section } from "components/section";
import { NextPage } from "next";
import { FaGithub, FaGoogle } from "react-icons/fa";
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
    <Section height="calc(100vh - 200px)" innerWidth="container.sm">
      <BackgroundGradient zIndex="-1" />

      <Center height="100%" pt="20">
        <PageTransition width="100%">
          {/* <Auth
            view="login"
            type="password"
            providers={providers}
            signupLink={<Link href="/signup">Sign up</Link>}
          /> */}
          <LoginForm />
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
