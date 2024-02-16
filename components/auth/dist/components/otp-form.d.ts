import * as React from 'react';
import { FormProps } from '@saas-ui/forms';
interface SubmitParams {
    otp: string;
    [key: string]: any;
}
export interface OtpFormProps extends Pick<FormProps<SubmitParams>, 'schema' | 'resolver'> {
    label?: string;
    helpText?: string;
    pinLength?: number;
    onSuccess?: (error: any) => void;
    onError?: (error: any) => void;
    onValidationError?: (error: any) => void;
    submitLabel?: string;
    renderSuccess?: (data: any) => React.ReactElement;
    children?: React.ReactNode;
}
export declare const OtpForm: React.FC<OtpFormProps>;
export {};
//# sourceMappingURL=otp-form.d.ts.map