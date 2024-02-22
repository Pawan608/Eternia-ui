import * as React from "react";

import { __DEV__ } from "@chakra-ui/utils";

import {
  Form,
  FormProps,
  FormLayout,
  Field,
  SubmitHandler,
  FieldErrors,
} from "@saas-ui/forms";
// import { redirect } from "next/navigation";
import { useRouter } from "next/router";
// import { useLogin, AuthActionEnum } from "../provider";

import { LoginButton } from "./login-button";

import { AuthFormSuccess } from "./success";
import { AuthFormTitle } from "@saas-ui/react";
import { useAuth } from "context/AuthProvider";
import { LOGIN_MUTATION } from "graphql/mutation";
import { useMutation } from "@apollo/client";
import { AuthFormError } from "./error";
import { Progress } from "@chakra-ui/react";

interface SubmitParams {
  email: string;
  password: string;
  rememberMe?: boolean;
  [key: string]: any;
}

export interface PasswordFormProps
  extends Pick<FormProps<SubmitParams>, "schema" | "resolver"> {
  schema?: any;
  //   action?: AuthActionEnum;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  //   onValidationError?: (error: FieldErrors<SubmitParams>) => void;
  submitLabel?: string;
  emailLabel?: string;
  passwordLabel?: string;
  //   defaultValues?: Record<string, any>;
  renderSuccess?: () => React.ReactElement;
  renderError?: (data: any) => React.ReactElement;
  children?: React.ReactNode;
}

export const LoginForm: React.FC<PasswordFormProps> = ({
  //   action = "logIn",
  onSuccess,
  submitLabel = "Login",
  emailLabel = "Email",
  passwordLabel = "Password",
  renderSuccess = () => (
    <AuthFormSuccess title="Success!" description="Loggen In Successfully" />
  ),
  renderError = (message = "Something went wrong") => (
    <AuthFormError title="Error!" description={message} />
  ),
  children,
  ...formProps
}) => {
  //   const [{ isLoading, isResolved, data }, submit] = useLogin({ action });

  const { setAuthToken, setUserId } = useAuth();
  const router = useRouter();
  const [showSnackbar, setShowSnackbar] = React.useState({
    status: "error",
    message: "",
    show: false,
  });
  //   const data = { email: "", password: "" };
  //   React.useEffect(() => {
  //     if (isAuthenticated) {
  //       redirect("/");
  //     }
  //   }, [isAuthenticated]);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: null,
        password: null,
      },
    },
    onCompleted: (data) => {
      // Handle the response data, e.g., store the access_token

      setAuthToken(data.login.access_token);
      setUserId(data.login.userId, data.login.user);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setShowSnackbar({
        show: true,
        message: "Successfully logged in",
        status: "success",
      });

      // You might want to redirect the user or update the UI in some way
    },
    onError: (error) => {
      // Handle the error, e.g., show an error message
      //   console.log("errr", data, email, password);
      console.error("Login error:", error.message);
      setShowSnackbar({
        show: true,
        message: error.message,
        status: "error",
      });
      return renderError(error.message);
    },
  });
  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    return login({
      variables: {
        loginInput: {
          email: params.email,
          password: params.password,
        },
      },
    });
  };

  if (showSnackbar.show && showSnackbar.status == "success")
    return (
      <>
        <AuthFormSuccess
          title="Success!"
          description="Logged In Successfully"
        />
      </>
    );
  return (
    <Form<SubmitParams>
      onSubmit={handleSubmit}
      defaultValues={{ email: "" }}
      {...formProps}
    >
      {loading ? <Progress size="xs" isIndeterminate /> : ""}
      {showSnackbar.show && showSnackbar.status == "error" ? (
        <AuthFormError title="Error!" description={showSnackbar.message} />
      ) : (
        ""
      )}
      <FormLayout>
        <Field
          name="email"
          label={emailLabel}
          type="email"
          rules={{ required: true }}
          autoComplete="email"
        />
        <Field
          name="password"
          label={passwordLabel}
          type="password"
          rules={{ required: true }}
          autoComplete="current-password"
        />

        <LoginButton type="submit" width="full">
          {submitLabel}
        </LoginButton>
      </FormLayout>
    </Form>
  );
};

if (__DEV__) {
  LoginForm.displayName = "LoginForm";
}
