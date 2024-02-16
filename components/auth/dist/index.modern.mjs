import*as e from"react";import{usePromise as t}from"@saas-ui/hooks";import{useTheme as r,Alert as n,AlertIcon as o,AlertTitle as l,AlertDescription as a,SimpleGrid as i,Icon as s,createStylesContext as c,useMultiStyleConfig as u,omitThemingProps as m,chakra as d,Link as p}from"@chakra-ui/react";import{__DEV__ as E,cx as f}from"@chakra-ui/utils";import{Divider as b}from"@saas-ui/layout";import{Form as g,FormLayout as h,Field as w}from"@saas-ui/forms";import{Button as L}from"@saas-ui/button";const{createContext:y,useState:v,useContext:S,useEffect:P,useCallback:k}=e,N=y(null),O=({onLoadUser:t=(()=>Promise.resolve(null)),onSignup:r=(()=>Promise.resolve(null)),onLogin:n=(()=>Promise.resolve(null)),onVerifyOtp:o=(()=>Promise.resolve(null)),onLogout:l=(()=>Promise.resolve()),onAuthStateChange:a,onGetToken:i,onResetPassword:s,onUpdatePassword:c,children:u})=>{const[m,d]=v(!1),[p,E]=v(),[f,b]=v(!0);P(()=>{if(a){const e=a(e=>{d(!!e)});return()=>{null==e||e()}}},[]),P(()=>{h()},[m]);const g=k(async()=>{try{i&&d(!!await i())}catch(e){d(!1)}},[i]);P(()=>(window.addEventListener("focus",g),g(),()=>{window.removeEventListener("focus",g)}),[g]);const h=k(async()=>{if(m){const e=await t();e?E(e):d(!1)}b(!1)},[t,m]),w=k(async(e,t)=>{const n=await r(e,t);return g(),n},[r]),L=k(async(e,t)=>{const r=await n(e,t);return g(),r},[n]),y=k(async()=>{await l(),E(null),d(!1)},[l]),S=k(async(e,t)=>await o(e,t),[o]),O=k(async(e,t)=>{await(null==s?void 0:s(e,t))},[s]),A=k(async(e,t)=>{await(null==c?void 0:c(e,t))},[c]),C=k(async()=>null==i?void 0:i(),[i]);/*#__PURE__*/return e.createElement(N.Provider,{value:{isAuthenticated:m,isLoggingIn:m&&!p,isLoading:f,user:p,signUp:w,logIn:L,logOut:y,verifyOtp:S,loadUser:h,getToken:C,resetPassword:O,updatePassword:A}},u)},A=()=>{const e=S(N);if(null===e)throw new Error("Auth context missing, did you forget to wrap your app in AuthProvider?");return e},C=()=>A().user,V=({action:e="logIn"}={})=>{const r=A();return t(r[e]||r.logIn)},x=()=>{const{signUp:e}=A();return t(e)},F=()=>{const{verifyOtp:e}=A();return t(e)},I=()=>{const{resetPassword:e}=A();return t(e)},T=()=>{const{updatePassword:e}=A();return t(e)};function U(){return U=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},U.apply(this,arguments)}function _(e,t){if(null==e)return{};var r,n,o={},l=Object.keys(e);for(n=0;n<l.length;n++)t.indexOf(r=l[n])>=0||(o[r]=e[r]);return o}const G=["children"],R=t=>{var n;const{children:o}=t,l=_(t,G),a=U({p:6,colorScheme:"gray"},null==(n=r().components.LoginButton)?void 0:n.defaultProps);/*#__PURE__*/return e.createElement(L,U({},a,l),o)};E&&(R.displayName="LoginButton");const D=["title","description"],W=t=>{let{title:r,description:i}=t,s=_(t,D);/*#__PURE__*/return e.createElement(n,U({status:"success",variant:"subtle",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"},s),/*#__PURE__*/e.createElement(o,{boxSize:"40px",mr:0}),/*#__PURE__*/e.createElement(l,{mt:4,mb:1,fontSize:"lg"},r),/*#__PURE__*/e.createElement(a,{maxWidth:"sm"},i))};E&&(W.displayName="AuthFormSuccess");const j=["action","onSuccess","onError","onValidationError","submitLabel","emailLabel","defaultValues","renderSuccess","children"];function q({email:t}){/*#__PURE__*/return e.createElement(W,{title:"Check your mailbox!",description:/*#__PURE__*/e.createElement(e.Fragment,null,`We've sent a magic link to ${t||"your email address"}.`/*#__PURE__*/,e.createElement("br",null),"Click on the link to continue.")})}E&&(q.displayName="MagicLinkSuccess");const z=t=>{let{action:r="logIn",onSuccess:n=(()=>null),onError:o=(()=>null),onValidationError:l,submitLabel:a="Continue with Email",emailLabel:i="Email",defaultValues:s,renderSuccess:c=(t=>/*#__PURE__*/e.createElement(q,{email:null==t?void 0:t.email})),children:u}=t,m=_(t,j);const[{isLoading:d,isResolved:p,data:E},f]=V({action:r});return p?c(E):/*#__PURE__*/e.createElement(g,U({onSubmit:({email:e})=>f({email:e}).then(n).catch(o),onError:l,defaultValues:U({email:""},s)},m),/*#__PURE__*/e.createElement(h,null,/*#__PURE__*/e.createElement(w,{name:"email",label:i,type:"email",rules:{required:!0},autoComplete:"email"}),u,/*#__PURE__*/e.createElement(R,{type:"submit",isLoading:d,width:"full",label:a})))};E&&(z.displayName="MagicLinkForm");const B=["action","onSuccess","onError","onValidationError","submitLabel","emailLabel","passwordLabel","defaultValues","children","renderSuccess"],Y=t=>{let{action:r="logIn",onSuccess:n=(()=>null),onError:o=(()=>null),onValidationError:l,submitLabel:a="Log in",emailLabel:i="Email",passwordLabel:s="Password",defaultValues:c,children:u,renderSuccess:m=(()=>/*#__PURE__*/e.createElement(W,{title:"Success!",description:"Check your mailbox to verify your account."}))}=t,d=_(t,B);const[{isLoading:p,isResolved:E,data:f},b]=V({action:r});return E&&"signUp"===r?m(f):/*#__PURE__*/e.createElement(g,U({onSubmit:e=>b(e).then(n).catch(o),onError:l,defaultValues:U({email:"",password:""},c)},d),/*#__PURE__*/e.createElement(h,null,/*#__PURE__*/e.createElement(w,{name:"email",label:i,type:"email",rules:{required:!0},autoComplete:"email"}),/*#__PURE__*/e.createElement(w,{name:"password",label:s,type:"password",rules:{required:!0},autoComplete:"current-password"}),u,/*#__PURE__*/e.createElement(R,{type:"submit",width:"full",isLoading:p},a)))};E&&(Y.displayName="PasswordForm");const M=["onSuccess","onError","onValidationError","submitLabel","label","helpText","pinLength","children","renderSuccess"],$=t=>{let{onSuccess:r=(()=>null),onError:n=(()=>null),onValidationError:o,submitLabel:l="Verify",label:a,helpText:i,pinLength:s=4,children:c,renderSuccess:u=(()=>/*#__PURE__*/e.createElement(W,{title:"Success!",description:"You are now logged in."}))}=t,m=_(t,M);const[{isLoading:d,data:p},E]=F();return p?u(p):/*#__PURE__*/e.createElement(g,U({onSubmit:e=>E(e).then(r).catch(n),onError:o,defaultValues:{otp:""}},m),/*#__PURE__*/e.createElement(h,null,/*#__PURE__*/e.createElement(w,{name:"otp",label:a,help:i,type:"pin",pinLength:s,rules:{required:!0}}),c,/*#__PURE__*/e.createElement(R,{type:"submit",width:"full",isLoading:d},l)))};$.defaultProps={helpText:"You can find your one-time password in the Google Authenticator or Authy app.",submitLabel:"Verify",label:"Your verification code"},E&&($.displayName="OtpForm");const H=["children"],J=t=>{var n;const{children:o}=t,l=_(t,H),a=U({p:6,variant:"outline"},null==(n=r().components.ProviderButton)?void 0:n.defaultProps);/*#__PURE__*/return e.createElement(L,U({},a,l),o)};E&&(J.displayName="ProviderButton");const K=["providers","redirectTo","label"],Q=t=>{let{providers:r,redirectTo:n,label:o="Continue with"}=t,l=_(t,K);const{logIn:a}=A();if(!r)return null;const c=e=>async()=>{await a({provider:e},{redirectTo:n})};/*#__PURE__*/return e.createElement(i,U({spacing:4},l),Object.entries(r).map(([t,r])=>{const{name:n,icon:l,color:a}=r;/*#__PURE__*/return e.createElement(J,{onClick:c(t),color:a,leftIcon:l&&/*#__PURE__*/e.createElement(s,{as:l}),key:t},o," ",n)}))};E&&(Q.displayName="Providers");const X=["onSuccess","onError","onValidationError","submitLabel","emailLabel","label","helpText","children","renderSuccess"],Z=t=>{let{onSuccess:r=(()=>null),onError:n=(()=>null),onValidationError:o,submitLabel:l,emailLabel:a,label:i,children:s,renderSuccess:c=(()=>/*#__PURE__*/e.createElement(W,{title:"Success!",description:"Please check your email for instructions to reset your password."}))}=t,u=_(t,X);const[{isLoading:m,data:d},p]=I();return d?c(d):/*#__PURE__*/e.createElement(g,U({onSubmit:e=>p(e).then(r).catch(n),onError:o,defaultValues:{email:""}},u),/*#__PURE__*/e.createElement(h,null,/*#__PURE__*/e.createElement(w,{name:"email",label:null!=i?i:a,type:"email",rules:{required:!0},autoComplete:"email"}),s,/*#__PURE__*/e.createElement(R,{type:"submit",width:"full",isLoading:m},l)))};Z.defaultProps={submitLabel:"Reset password",emailLabel:"Your email address"},E&&(Z.displayName="ForgotPasswordForm");const ee=["onSuccess","onError","onValidationError","submitLabel","passwordLabel","label","confirmLabel","helpText","children"],te=t=>{let{onSuccess:r=(()=>null),onError:n=(()=>null),onValidationError:o,submitLabel:l,passwordLabel:a,label:i,confirmLabel:s,children:c}=t,u=_(t,ee);const[{isLoading:m},d]=T(),p=e.useRef(null),E=e.useCallback(e=>{var t;return e===(null==(t=p.current)?void 0:t.getValues("password"))},[]);/*#__PURE__*/return e.createElement(g,U({onSubmit:({password:e})=>d({password:e}).then(r).catch(n),onError:o,defaultValues:{password:"",confirmPassword:""},ref:p},u),/*#__PURE__*/e.createElement(h,null,/*#__PURE__*/e.createElement(w,{name:"password",label:null!=i?i:a,type:"password",rules:{required:!0},autoComplete:"current-password"}),/*#__PURE__*/e.createElement(w,{name:"confirmPassword",label:s,type:"password",rules:{validate:E},autoComplete:"new-password"}),c,/*#__PURE__*/e.createElement(R,{type:"submit",width:"full",isLoading:m},l)))};te.defaultProps={submitLabel:"Update password",passwordLabel:"New password",confirmLabel:"Confirm password"},E&&(te.displayName="UpdatePasswordForm");const re=["type","providers","title","providerLabel","dividerLabel","footer"],ne=["children"],oe=["title","footer"],le=["title","footer"],ae=["title","footer"],[ie,se]=c("AuthForm"),ce=t=>{const{type:r,providers:n,title:o,providerLabel:l,dividerLabel:a,footer:i}=t,s=_(t,re);let c;return c=/*#__PURE__*/e.createElement("password"===r?Y:z,s),/*#__PURE__*/e.createElement(ue,null,"string"==typeof o?/*#__PURE__*/e.createElement(de,null,o):o,n&&/*#__PURE__*/e.createElement(e.Fragment,null,/*#__PURE__*/e.createElement(Q,{providers:n,label:l}),/*#__PURE__*/e.createElement(me,{label:a})),c,i)};ce.defaultProps={type:"magiclink",providerLabel:"Continue with",dividerLabel:"or continue with"},E&&(ce.displayName="AuthForm");const ue=t=>{const{children:r}=t,n=u("AuthForm",t),o=m(t),l=U({display:"flex",flexDirection:"column",alignItems:"stretch",width:"full"},n.container);/*#__PURE__*/return e.createElement(ie,{value:n},/*#__PURE__*/e.createElement(d.div,U({__css:l},o,{className:f("saas-auth-form",t.className)}),r))};E&&(ue.displayName="AuthFormContainer");const me=t=>{const r=U({my:4},se().divider);/*#__PURE__*/return e.createElement(b,U({},t,{sx:r}))},de=t=>{let{children:r}=t,n=_(t,ne);const o=U({fontSize:"2xl",fontWeight:"bold",textAlign:"center",mb:8},se().title);/*#__PURE__*/return e.createElement(d.h2,U({__css:o},n,{className:f("saas-auth-form__title",n.className)}),r)};E&&(de.displayName="AuthFormTitle");const pe=t=>/*#__PURE__*/e.createElement(ce,U({action:"logIn"},t));pe.defaultProps={title:"Log in",submitLabel:"Log in"},E&&(pe.displayName="LoginView");const Ee=t=>/*#__PURE__*/e.createElement(ce,U({action:"signUp"},t));Ee.defaultProps={title:"Sign up",submitLabel:"Sign up"},E&&(Ee.displayName="SignupView");const fe=t=>{const{title:r,footer:n}=t,o=_(t,oe);/*#__PURE__*/return e.createElement(ue,null,"string"==typeof r?/*#__PURE__*/e.createElement(de,null,r):r,/*#__PURE__*/e.createElement($,o),n)};fe.defaultProps={title:"One-time password"},E&&(fe.displayName="OtpView");const be=t=>{const{title:r,footer:n}=t,o=_(t,le);/*#__PURE__*/return e.createElement(ue,null,"string"==typeof r?/*#__PURE__*/e.createElement(de,null,r):r,/*#__PURE__*/e.createElement(Z,o),n)};be.defaultProps={title:"Forgot password"},E&&(be.displayName="ForgotPasswordView");const ge=t=>{const{title:r,footer:n}=t,o=_(t,ae);/*#__PURE__*/return e.createElement(ue,null,"string"==typeof r?/*#__PURE__*/e.createElement(de,null,r):r,/*#__PURE__*/e.createElement(te,o),n)};ge.defaultProps={title:"Choose a new password"},E&&(ge.displayName="UpdatePasswordView");const he=["view","providers","signupLink","loginLink","forgotLink","backLink","noAccount","haveAccount"],we={LOGIN:"login",SIGNUP:"signup",FORGOT_PASSWORD:"forgot_password",UPDATE_PASSWORD:"update_password",OTP:"otp"},Le=t=>{const{view:r=we.LOGIN,providers:n,signupLink:o,loginLink:l,forgotLink:a,backLink:i,noAccount:s,haveAccount:c}=t,u=_(t,he),{type:m}=u,[d,E]=e.useState(r);switch(e.useEffect(()=>{E(r)},[r]),d){case we.LOGIN:/*#__PURE__*/return e.createElement(pe,U({providers:n,footer:/*#__PURE__*/e.createElement(ye,{onClick:()=>E(we.SIGNUP),label:s,link:o})},u),"password"===m&&("string"==typeof a?/*#__PURE__*/e.createElement(p,{fontSize:"md",color:"muted",float:"right",onClick:()=>E(we.FORGOT_PASSWORD)},a):a));case we.SIGNUP:/*#__PURE__*/return e.createElement(Ee,U({providers:n,footer:/*#__PURE__*/e.createElement(ye,{onClick:()=>E(we.LOGIN),label:c,link:l})},u));case we.FORGOT_PASSWORD:/*#__PURE__*/return e.createElement(be,U({footer:/*#__PURE__*/e.createElement(ye,{onClick:()=>E(we.LOGIN),link:i})},u));case we.UPDATE_PASSWORD:/*#__PURE__*/return e.createElement(ge,u);case we.OTP:/*#__PURE__*/return e.createElement(fe,u)}return null},ye=({label:t,link:r,onClick:n})=>/*#__PURE__*/e.createElement(d.div,{__css:{textAlign:"center",py:8,fontSize:"md"}},t&&/*#__PURE__*/e.createElement(d.span,{color:"muted"},t)," ","string"==typeof r?/*#__PURE__*/e.createElement(p,{onClick:n},r):r);Le.defaultProps={noAccount:"No account yet?",haveAccount:"Already have an account?",signupLink:"Sign up",loginLink:"Log in",forgotLink:"Forgot password?",backLink:"Back to log in"},E&&(Le.displayName="Auth");export{Le as Auth,N as AuthContext,ce as AuthForm,ue as AuthFormContainer,me as AuthFormDivider,de as AuthFormTitle,O as AuthProvider,be as ForgotPasswordView,R as LoginButton,pe as LoginView,z as MagicLinkForm,q as MagicLinkSuccess,$ as OtpForm,fe as OtpView,Y as PasswordForm,J as ProviderButton,Q as Providers,Ee as SignupView,ge as UpdatePasswordView,we as VIEWS,A as useAuth,C as useCurrentUser,V as useLogin,F as useOtp,I as useResetPassword,x as useSignUp,T as useUpdatePassword};
//# sourceMappingURL=index.modern.mjs.map
