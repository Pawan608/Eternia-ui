import * as React from 'react';
import { FormProps, FieldErrors } from '@saas-ui/forms';
import { AuthActionEnum } from '../provider';
interface SubmitParams {
    email: string;
    password: string;
    rememberMe?: boolean;
    [key: string]: any;
}
export interface PasswordFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
    schema?: any;
    action?: AuthActionEnum;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    onValidationError?: (error: FieldErrors<SubmitParams>) => void;
    submitLabel?: string;
    emailLabel?: string;
    passwordLabel?: string;
    defaultValues?: Record<string, any>;
    renderSuccess?: (data: any) => React.ReactElement;
    children?: React.ReactNode;
}
export declare const PasswordForm: React.FC<PasswordFormProps>;
export {};
//# sourceMappingURL=password-form.d.ts.map