import * as React from "react";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";

export interface AuthFormSuccessProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export const AuthFormError: React.FC<AuthFormSuccessProps> = ({
  title,
  description,
  ...rest
}) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      {...rest}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  );
};

if (__DEV__) {
  AuthFormError.displayName = "AuthFormError";
}
