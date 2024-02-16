import * as React from 'react';
import { HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { FormProps, FieldErrors } from '@saas-ui/forms';
import { AvailableProviders } from './providers';
import { AuthTypeEnum, AuthActionEnum } from '../provider';
export interface AuthFormProps extends Omit<FormProps<any>, 'defaultValues' | 'onSubmit' | 'onError' | 'title'>, ThemingProps<'AuthForm'> {
    /**
     * The authentication type, `magiclink` or `password`
     */
    type?: AuthTypeEnum;
    /**
     * List of OAuth providers
     */
    providers?: AvailableProviders;
    /**
     * The submit action, `logIn` or `signUp`
     */
    action?: AuthActionEnum;
    /**
     * The form title
     */
    title?: React.ReactNode;
    /**
     * Label for the submit button
     * @default "Sign in"
     */
    submitLabel?: string;
    /**
     * Label for the provider buttons
     * @default "Continue with"
     */
    providerLabel?: string;
    /**
     * Label for the divider between oath and the form
     * @default "or continue with"
     */
    dividerLabel?: string;
    /**
     * Children are passed down to the underlying form
     */
    children?: React.ReactNode;
    /**
     * Render custom elements under the submit button
     */
    footer?: React.ReactNode;
    /**
     * Callback executed after succesful login or signup
     */
    onSuccess?: (data: any) => void;
    /**
     * Error handler if login or signup fails
     */
    onError?: (error: Error) => void;
    /**
     * Callback executed when there are validation errors
     */
    onValidationError?: (errors: FieldErrors) => void;
}
export declare const AuthForm: React.FC<AuthFormProps>;
export interface AuthFormContainerProps extends HTMLChakraProps<'div'>, ThemingProps<'AuthForm'> {
}
export declare const AuthFormContainer: React.FC<AuthFormContainerProps>;
export interface AuthFormDividerProps {
    label?: string;
}
export declare const AuthFormDivider: React.FC<AuthFormDividerProps>;
export declare const AuthFormTitle: React.FC<HTMLChakraProps<'h2'>>;
export declare const LoginView: React.FC<AuthFormProps>;
export declare const SignupView: React.FC<AuthFormProps>;
export declare const OtpView: React.FC<AuthFormProps>;
export declare const ForgotPasswordView: React.FC<AuthFormProps>;
export declare const UpdatePasswordView: React.FC<AuthFormProps>;
//# sourceMappingURL=auth-form.d.ts.map