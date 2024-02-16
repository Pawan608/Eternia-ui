const a=a=>{let t,n=0;return{onLogin:async t=>await a.auth.loginWithMagicLink(t),onLogout:async()=>(t=null,n=0,await a.auth.signOut()),onLoadUser:async()=>{if(await a.user.isLoggedIn())return await a.user.getMetadata()},onGetToken:async()=>((!t||Date.now()<=n)&&(n=Date.now()+600,t=await a.user.getIdToken()),t)}};export{a as createAuthService};
//# sourceMappingURL=magic-link.modern.mjs.map
