import { Button } from "@chakra-ui/react";
import { Link } from "@saas-ui/react";
import { NextSeoProps } from "next-seo";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { Logo } from "./logo";

const siteConfig = {
  logo: Logo,
  seo: {
    title: "Eternia",
    description: "Get Advanced Software for your business management",
  } as NextSeoProps,
  termsUrl: "#",
  privacyUrl: "#",
  header: {
    links: [
      {
        id: "features",
        label: "Features",
      },
      {
        id: "pricing",
        label: "Pricing",
      },
      // {
      //   id: 'faq',
      //   label: 'FAQ',
      // },
      {
        label: "Login",
        href: "/login",
      },
      {
        label: "Sign Up",
        href: "/signup",
        variant: "primary",
      },
    ],
    authenticatedLinks: [
      {
        id: "console",
        label: "Console",
        href: "/dashboard/home",
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by <Link href="/">Eternia Windows</Link>
      </>
    ),
    links: [
      {
        href: "info@adityabirla.com",
        label: "Contact",
      },
      {
        href: "/",
        label: <FaTwitter size="14" />,
      },
      {
        href: "/",
        label: <FaGithub size="14" />,
      },
    ],
  },
  signup: {
    title: "Start growing with Eternia",
    features: [
      {
        icon: FiCheck,
        title: "Accessible",
        description: "All components strictly follow WAI-ARIA standards.",
      },
      {
        icon: FiCheck,
        title: "Themable",
        description:
          "Fully customize all components to your brand with theme support and style props.",
      },
      {
        icon: FiCheck,
        title: "Composable",
        description:
          "Compose components to fit your needs and mix them together to create new ones.",
      },
      {
        icon: FiCheck,
        title: "Productive",
        description:
          "Designed to reduce boilerplate and fully typed, build your product at speed.",
      },
    ],
  },
};

export default siteConfig;
