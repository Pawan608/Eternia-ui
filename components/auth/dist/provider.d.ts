import * as React from 'react';
export type AuthTypeEnum = 'magiclink' | 'password';
export type AuthActionEnum = 'logIn' | 'signUp';
export type AuthToken = string | null | undefined;
export interface AuthParams {
    email?: string;
    password?: string;
    provider?: string;
    refreshToken?: string;
    otp?: string;
    [key: string]: any;
}
export type ExtraAuthOptions = Record<string, unknown>;
export type AuthOptions<ExtraOptions extends object = ExtraAuthOptions> = {
    /**
     * The url to redirect to after social or magic link login.
     */
    redirectTo?: string;
} & ExtraOptions;
/**
 * The user object, id is required.
 */
export interface User {
    id: string;
    email?: string;
    [key: string]: any;
}
type UnsubscribeHandler = () => void;
export type AuthStateChangeCallback<TUser extends User = User> = (user?: TUser | null) => void;
export interface AuthProviderProps<TUser extends User = User> {
    /**
     * Loads user data after authentication
     */
    onLoadUser?: () => Promise<TUser | null>;
    /**
     * The signup method
     */
    onSignup?: (params: AuthParams, options?: AuthOptions) => Promise<TUser | undefined | null>;
    /**
     * The login method
     */
    onLogin?: (params: AuthParams, options?: AuthOptions) => Promise<TUser | undefined | null>;
    /**
     * Request to reset a password.
     */
    onResetPassword?: (params: Required<Pick<AuthParams, 'email'>>, options?: AuthOptions) => Promise<void>;
    /**
     * Update the password.
     */
    onUpdatePassword?: (params: Required<Pick<AuthParams, 'password'>>, options?: AuthOptions) => Promise<void>;
    /**
     * Verify an one time password (2fa)
     */
    onVerifyOtp?: (params: OtpParams, options?: AuthOptions) => Promise<boolean | undefined | null>;
    /**
     * The logout method
     */
    onLogout?: (options?: AuthOptions) => Promise<unknown>;
    /**
     * Should trigger whenever the authentication state changes
     */
    onAuthStateChange?: (callback: AuthStateChangeCallback<TUser>) => UnsubscribeHandler;
    /**
     * Return the session token
     */
    onGetToken?: () => Promise<AuthToken>;
    children?: React.ReactNode;
}
export type AuthFunction<TParams = AuthParams, TExtraOptions extends object = Record<string, unknown>> = (params: TParams, options?: AuthOptions<TExtraOptions>) => Promise<any>;
interface OtpParams extends AuthParams {
    otp: string;
}
type ResetPasswordParams = Required<Pick<AuthParams, 'email'>>;
type UpdatePasswordParams = Required<Pick<AuthParams, 'password'>>;
export interface AuthContextValue<TUser extends User = User> {
    isAuthenticated: boolean;
    isLoggingIn: boolean;
    isLoading: boolean;
    user?: TUser | null;
    signUp: AuthFunction;
    logIn: AuthFunction;
    verifyOtp: AuthFunction<OtpParams>;
    resetPassword: AuthFunction<ResetPasswordParams>;
    updatePassword: AuthFunction<UpdatePasswordParams>;
    logOut: (options?: AuthOptions) => Promise<unknown>;
    loadUser: () => void;
    getToken: () => Promise<AuthToken>;
}
export declare const AuthContext: React.Context<AuthContextValue<User> | null>;
export declare const AuthProvider: <TUser extends User = User>({ onLoadUser, onSignup, onLogin, onVerifyOtp, onLogout, onAuthStateChange, onGetToken, onResetPassword, onUpdatePassword, children, }: AuthProviderProps<TUser>) => JSX.Element;
export declare const useAuth: <TUser extends User = User>() => AuthContextValue<TUser>;
export declare const useCurrentUser: <TUser extends User = User>() => TUser | null | undefined;
export interface UseLoginProps {
    action?: AuthActionEnum;
}
export declare const useLogin: ({ action }?: UseLoginProps) => [import("@saas-ui/hooks").UsePromise, AuthFunction<AuthParams, Record<string, unknown>>];
export declare const useSignUp: () => [import("@saas-ui/hooks").UsePromise, AuthFunction<AuthParams, Record<string, unknown>>];
export declare const useOtp: () => [import("@saas-ui/hooks").UsePromise, AuthFunction<OtpParams, Record<string, unknown>>];
export declare const useResetPassword: () => [import("@saas-ui/hooks").UsePromise, AuthFunction<Required<Pick<AuthParams, "email">>, Record<string, unknown>>];
export declare const useUpdatePassword: () => [import("@saas-ui/hooks").UsePromise, AuthFunction<Required<Pick<AuthParams, "password">>, Record<string, unknown>>];
export {};
//# sourceMappingURL=provider.d.ts.map