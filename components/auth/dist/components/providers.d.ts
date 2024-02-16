import * as React from 'react';
export interface Provider {
    /**
     * The provider name
     */
    name: string;
    /**
     * The provider icon
     */
    icon?: any;
    /**
     * The provider color
     */
    color?: string;
}
export interface AvailableProviders {
    [id: string]: Provider;
}
export interface ProviderProps {
    providers: AvailableProviders;
    redirectTo?: string;
    label?: string;
}
export declare const Providers: React.FC<ProviderProps>;
//# sourceMappingURL=providers.d.ts.map