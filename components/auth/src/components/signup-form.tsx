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

// import { useLogin, AuthActionEnum } from "../provider";

import { LoginButton } from "./login-button";

import { AuthFormSuccess } from "./success";
import { AuthFormTitle } from "@saas-ui/react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "graphql/mutation";
import { useRouter } from "next/router";
import { useAuth } from "context/AuthProvider";

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

export const SignupForm: React.FC<PasswordFormProps> = ({
  //   action = "logIn",
  onSuccess,
  submitLabel = "Sign up",
  emailLabel = "Email",
  passwordLabel = "Password",
  renderSuccess = () => (
    <AuthFormSuccess
      title="Success!"
      description="Check your mailbox to verify your account."
    />
  ),
  renderError = (message = "Something went wrong") => (
    <AuthFormSuccess title="Error!" description={message} />
  ),
  children,
  ...formProps
}) => {
  //   const [{ isLoading, isResolved, data }, submit] = useLogin({ action });
  const { setAuthToken, setUserId } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //   const [password, setPassword] = React.useState("");
  //   const data = { email: "", password: "" };
  //   React.useEffect(() => {
  //     if (isAuthenticated) {
  //       redirect("/");
  //     }
  //   }, [isAuthenticated]);

  const [signin, { loading, error }] = useMutation(CREATE_USER, {
    variables: {
      createUserInput: {
        email: email,
        password: password,
        firstName: "*",
        lastName: "*",
        username: email,
        selectedRoles: [
          email.endsWith("@adityabirla.com") ? "Internal" : "User",
        ],
      },
    },
    onCompleted: (data) => {
      //   if (data?.createUser?.id) {
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return renderSuccess();
      //   }

      // You might want to redirect the user or update the UI in some way
    },
    onError: (error) => {
      // Handle the error, e.g., show an error message
      //   console.log("errr", data, email, password);
      console.error("signup error:", error.message);
      return renderError(error.message);
    },
  });
  const handleSubmit: SubmitHandler<SubmitParams> = (params) => {
    // console.log(params.email!==params.);
    // console.log();
    if (params.password != params.confirmpassword) {
      console.log("hello");
      return renderError("password and confirm password did not match");
    }
    // console.log(email, password);
    setEmail(params.email);
    setPassword(params.password);
    return signin();
  };

  // Show a default success message on signup.
  //   if (isResolved && action === "signUp") {
  //     return renderSuccess(data);
  //   }

  return (
    <>
      <Form<SubmitParams>
        onSubmit={handleSubmit}
        //   onError={onValidationError}
        // defaultValues={{ email: "", password: "", ...defaultValues }}
        {...formProps}
      >
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
          <Field
            name="confirmpassword"
            label={"Confirm Password"}
            type="password"
            rules={{ required: true }}
            autoComplete="current-password"
          />

          {children}

          <LoginButton type="submit" width="full">
            {submitLabel}
          </LoginButton>
        </FormLayout>
      </Form>
    </>
  );
};

if (__DEV__) {
  SignupForm.displayName = "SignupForm";
}
