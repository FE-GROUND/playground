import { Noto_Sans_KR } from "@next/font/google";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const font = Noto_Sans_KR({ weight: "500", subsets: ["latin"] });

export type NextLayoutPage<PageProps = {}> = NextPage<PageProps> & {
  layout?: (page: ReactElement) => ReactNode;
};

type NextPageProps = AppProps & {
  Component: NextLayoutPage;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: NextPageProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const layout = Component.layout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={font.className}>
          {layout(<Component {...pageProps} />)}
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
