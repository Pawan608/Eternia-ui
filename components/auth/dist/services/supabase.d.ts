import { AuthProviderProps } from '../';
import type { User, SupabaseClient } from '@supabase/supabase-js';
interface SupabaseServiceAuthOptions {
    loginOptions?: {
        data?: object;
        /** A URL to send the user to after they are confirmed. */
        redirectTo?: string;
        /** A space-separated list of scopes granted to the OAuth application. */
        scopes?: string;
        /** An object of query params */
        queryParams?: {
            [key: string]: string;
        };
        /** Verification token received when the user completes the captcha on the site. */
        captchaToken?: string;
        /** The redirect url embedded in the email link */
        emailRedirectTo?: string;
        /** If set to false, this method will not create a new user. Defaults to true. */
        shouldCreateUser?: boolean;
    };
    signupOptions?: {
        emailRedirectTo?: string;
        /**
         * A custom data object to store the user's metadata. This maps to the `auth.users.user_metadata` column.
         *
         * The `data` should be a JSON object that includes user-specific info, such as their first and last name.
         */
        data?: object;
        /** Verification token received when the user completes the captcha on the site. */
        captchaToken?: string;
    };
    verifyOptions?: {
        /** A URL to send the user to after they are confirmed. */
        redirectTo?: string;
        /** Verification token received when the user completes the captcha on the site. */
        captchaToken?: string;
    };
    resetPasswordOptions?: {
        redirectTo?: string;
        captchaToken?: string;
    };
}
export declare const createAuthService: (supabase: SupabaseClient<any, 'public', any>, serviceOptions?: SupabaseServiceAuthOptions) => AuthProviderProps<User>;
export {};
//# sourceMappingURL=supabase.d.ts.map