// import type { AppProps } from "next/app";

// import { SaasProvider } from "@saas-ui/react";
// import { Layout } from "components/layout";

// import theme from "../theme";
// import { DataProvider } from "context/DataContext";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "utils/apollo";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { AuthProvider } from "context/AuthProvider";
// import type { ReactElement, ReactNode } from "react";
// import type { NextPage } from "next";
// // import { DataProvider } from "context/DataContext";
// export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
//   getLayout?: (page: ReactElement) => ReactNode;
// };

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout;
// };

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   const { announcement, header, footer } = pageProps;
//   const getLayout = Component.getLayout ?? ((page) => page);
//   return (
//     <SaasProvider theme={theme}>
//       {/* <QueryClientProvider client={QueryClient}> */}
//       <ApolloProvider client={client}>
//         <AuthProvider>
//           <DataProvider>
//             <Layout
//               announcementProps={announcement}
//               headerProps={header}
//               footerProps={footer}
//             >
//               <Component {...pageProps} />
//             </Layout>
//           </DataProvider>
//         </AuthProvider>
//       </ApolloProvider>
//       {/* </QueryClientProvider> */}
//     </SaasProvider>
//   );
// }

// export default MyApp;

import type { AppProps } from "next/app";

import { SaasProvider } from "@saas-ui/react";
// import { Layout } from "components/layout";

import theme from "../theme";
import { DataProvider } from "context/DataContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "utils/apollo";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "context/AuthProvider";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import "./global.css";
// import { DataProvider } from "context/DataContext";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { announcement, header, footer } = pageProps;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SaasProvider theme={theme}>
      {/* <QueryClientProvider client={QueryClient}> */}
      <ApolloProvider client={client}>
        <AuthProvider>
          <DataProvider>{getLayout(<Component {...pageProps} />)}</DataProvider>
        </AuthProvider>
      </ApolloProvider>
      {/* </QueryClientProvider> */}
    </SaasProvider>
  );
}

export default MyApp;
