import * as React from 'react';
import { FormProps, FieldErrors } from '@saas-ui/forms';
import { AuthActionEnum } from '../provider';
export interface MagicLinkFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
    action?: AuthActionEnum;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onValidationError?: (error: FieldErrors<SubmitParams>) => void;
    submitLabel?: string;
    emailLabel?: string;
    defaultValues?: Record<string, any>;
    renderSuccess?: (data: any) => React.ReactElement;
    children?: React.ReactNode;
}
interface SubmitParams {
    email: string;
    [key: string]: any;
}
export declare function MagicLinkSuccess({ email }: any): JSX.Element;
export declare namespace MagicLinkSuccess {
    var displayName: string;
}
export declare const MagicLinkForm: React.FC<MagicLinkFormProps>;
export {};
//# sourceMappingURL=magic-link-form.d.ts.map