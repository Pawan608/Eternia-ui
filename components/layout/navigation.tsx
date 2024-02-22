import * as React from "react";
import { HStack } from "@chakra-ui/react";

import { useRouter } from "next/router";

import siteConfig from "data/config";

import { NavLink } from "components/nav-link";

import { useScrollSpy } from "hooks/use-scrollspy";

import { MobileNavButton } from "components/mobile-nav";
import { MobileNavContent } from "components/mobile-nav";
import { useDisclosure, useUpdateEffect } from "@chakra-ui/react";

import ThemeToggle from "./theme-toggle";
import { useAuth } from "context/AuthProvider";
import Button from "theme/components/button";
// import { useAuth } from '@saas-ui/react'

const Navigation: React.FC = () => {
  const mobileNav = useDisclosure();
  const router = useRouter();
  const activeId = useScrollSpy(
    siteConfig.header.links
      .filter(({ id }) => id)
      .map(({ id }) => `[id="${id}"]`),
    {
      threshold: 0.75,
    }
  );

  const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus();
  }, [mobileNav.isOpen]);
  const { isAuthenticated } = useAuth();
  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links
        .filter((el) => {
          if (!isAuthenticated) return true;
          else return !["Sign Up", "Login"].includes(el.label);
        })
        .map(({ href, id, ...props }, i) => {
          return (
            <NavLink
              display={["none", null, "block"]}
              href={href || `/#${id}`}
              key={i}
              isActive={
                !!(
                  (id && activeId === id) ||
                  (href && !!router.asPath.match(new RegExp(href)))
                )
              }
              {...props}
            />
          );
        })}
      {isAuthenticated
        ? siteConfig.header.authenticatedLinks.map(
            ({ href, id, ...props }, i) => {
              return (
                <NavLink
                  display={["none", null, "block"]}
                  href={href || `/${id}`}
                  key={i}
                  isActive={
                    !!(
                      (id && activeId === id) ||
                      (href && !!router.asPath.match(new RegExp(href)))
                    )
                  }
                  {...props}
                />
              );
            }
          )
        : ""}
      <ThemeToggle />

      <MobileNavButton
        ref={mobileNavBtnRef}
        aria-label="Open Menu"
        onClick={mobileNav.onOpen}
      />

      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </HStack>
  );
};

export default Navigation;
