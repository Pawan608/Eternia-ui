function t(){return t=Object.assign?Object.assign.bind():function(t){for(var o=1;o<arguments.length;o++){var r=arguments[o];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},t.apply(this,arguments)}const o=(o,r)=>({onLogin:async(n,i)=>{const e=t({},null==r?void 0:r.loginOptions,i),s=await function(){const{email:t,password:r,provider:i,phone:s}=n;if(t&&r)return o.auth.signInWithPassword({email:t,password:r,options:e});if(t)return o.auth.signInWithOtp({email:t,options:e});if(i)return o.auth.signInWithOAuth({provider:i,options:e});if(s&&r)return o.auth.signInWithPassword({phone:s,password:r,options:e});if(s)return o.auth.signInWithOtp({phone:s,options:e});throw new Error("Could not find correct authentication method")}();if(s.error)throw s.error;if(Boolean(null==(a=s.data)?void 0:a.provider)){const t=await o.auth.getUser();if(t.error)throw t.error;return t.data.user}var a;return s.data.user},onSignup:async(n,i)=>{const e=await async function(){const{email:e,phone:s,password:a}=n,u=t({},null==r?void 0:r.signupOptions,i);return e&&a?await o.auth.signUp({email:e,password:a,options:u}):s&&a?await o.auth.signUp({phone:s,password:a,options:u}):e?o.auth.signInWithOtp({email:e,options:u}):s?o.auth.signInWithOtp({phone:s,options:u}):void 0}();if(null!=e&&e.error)throw e.error;return null==e?void 0:e.data.user},onVerifyOtp:async(n,i)=>{const{email:e,phone:s,otp:a,type:u}=n;if(e){const n={email:e,token:a,type:u||"signup",options:t({},null==r?void 0:r.verifyOptions,i)},s=await o.auth.verifyOtp(n);if(s.error)throw s.error;return Boolean(s.data.session)}if(s){const n={phone:s,token:a,type:u||"sms",options:t({},null==r?void 0:r.verifyOptions,i)},e=await o.auth.verifyOtp(n);if(e.error)throw e.error;return Boolean(e.data.session)}throw new Error("You need to provide either email or phone")},onLogout:async()=>await o.auth.signOut(),onAuthStateChange:t=>{const{data:r}=o.auth.onAuthStateChange((o,r)=>{t(null==r?void 0:r.user)});return()=>null==r?void 0:r.subscription.unsubscribe()},onLoadUser:async()=>{const{data:t,error:r}=await o.auth.getUser();if(r)throw r;return t.user},onGetToken:async()=>{var t;const{data:r,error:n}=await o.auth.getSession();if(n)throw n;return(null==(t=r.session)?void 0:t.access_token)||null},onResetPassword:async({email:n},i)=>{const{error:e}=await o.auth.resetPasswordForEmail(n,t({},null==r?void 0:r.resetPasswordOptions,i));if(e)throw e},onUpdatePassword:async({password:t})=>{const r=window.location.hash.replace("#","").split("&").reduce((t,o)=>{const[r,n]=o.split("=");return t[r]=n,t},{});if("recovery"===(null==r?void 0:r.type)){const{error:r}=await o.auth.updateUser({password:t});if(r)throw r}}});export{o as createAuthService};
//# sourceMappingURL=supabase.modern.mjs.map
