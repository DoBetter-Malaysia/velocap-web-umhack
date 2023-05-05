import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import AuthGuard from "@/components/auth/AuthGuard";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
} & {
  isPublic?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProps) {
  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <ModalsProvider modals={{}}>
          <AuthGuard Component={Component} pageProps={pageProps} />
        </ModalsProvider>
        <Notifications />
      </MantineProvider>
    </>
  );
}
