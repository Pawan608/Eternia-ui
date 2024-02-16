import * as React from 'react';
import { FormProps, FieldErrors } from '@saas-ui/forms';
interface SubmitParams {
    password: string;
    confirmPassword: string;
    [key: string]: any;
}
export interface UpdatePasswordFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
    /**
     * @deprecated use passwordLabel instead
     */
    label?: string;
    passwordLabel?: string;
    confirmLabel?: string;
    helpText?: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onValidationError?: (error: FieldErrors<SubmitParams>) => void;
    submitLabel?: string;
    renderSuccess?: (data: any) => React.ReactElement;
    children?: React.ReactNode;
}
export declare const UpdatePasswordForm: React.FC<UpdatePasswordFormProps>;
export {};
//# sourceMappingURL=update-password-form.d.ts.map