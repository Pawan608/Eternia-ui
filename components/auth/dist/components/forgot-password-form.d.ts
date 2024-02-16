import * as React from 'react';
import { FormProps, FieldErrors } from '@saas-ui/forms';
interface SubmitParams {
    email: string;
    [key: string]: any;
}
export interface ForgotPasswordFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
    /**
     * @deprecated use emailLabel instead
     */
    label?: string;
    emailLabel?: string;
    helpText?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onValidationError?: (error: FieldErrors<SubmitParams>) => void;
    submitLabel?: string;
    renderSuccess?: (data: any) => React.ReactElement;
    children?: React.ReactNode;
}
export declare const ForgotPasswordForm: React.FC<ForgotPasswordFormProps>;
export {};
//# sourceMappingURL=forgot-password-form.d.ts.map