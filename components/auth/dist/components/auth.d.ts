import * as React from 'react';
import { AuthFormProps } from './auth-form';
import { AvailableProviders } from '.';
export declare const VIEWS: {
    LOGIN: string;
    SIGNUP: string;
    FORGOT_PASSWORD: string;
    UPDATE_PASSWORD: string;
    OTP: string;
};
type ViewType = 'login' | 'signup' | 'forgot_password' | 'update_password' | 'otp';
export interface AuthProps extends Omit<AuthFormProps, 'action' | 'defaultValues' | 'onSubmit'> {
    /**
     * Sets the visible authentication form.
     * Supported views are:
     * - login
     * - signup
     * - forgot_password
     * - update_password
     * - otp
     */
    view?: ViewType;
    /**
     * The OAuth providers that are supported.
     */
    providers?: AvailableProviders;
    /**
     * Customize the signup link under the log in form.
     * @default "Sign up"
     */
    signupLink?: React.ReactNode;
    /**
     * Customize the login link under the sign up form.
     * @default "Log in"
     */
    loginLink?: React.ReactNode;
    /**
     * The forgot password link
     * @default "Forgot password?"
     */
    forgotLink?: React.ReactNode;
    /**
     * Back to log in link
     * @default "Back to log in"
     */
    backLink?: React.ReactNode;
    /**
     * Text shown before the signupLink
     * @default "No account?"
     */
    noAccount?: React.ReactNode;
    /**
     * Text shown before the loginLink
     * @default "Already have an account?"
     */
    haveAccount?: React.ReactNode;
}
export declare const Auth: React.FC<AuthProps>;
export {};
//# sourceMappingURL=auth.d.ts.map