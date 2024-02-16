import { AuthProviderProps } from '../';
/**
 * MagicLink auth service
 *
 * Only supports magic link at the moment.
 * `checkAuth` will refresh the id token after 10 minute.
 *
 * @param client MagicLink
 * @returns {AuthProviderProps}
 */
export declare const createAuthService: (client: any) => AuthProviderProps;
//# sourceMappingURL=magic-link.d.ts.map