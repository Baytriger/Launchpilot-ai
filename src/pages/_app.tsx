import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { ThemeProvider } from "@/lib/theme";
import "@/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 60_000, retry: 1 },
  },
});

const manifestUrl = "https://launchpilot-ai-out5.vercel.app/tonconnect-manifest.json";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </TonConnectUIProvider>
  );
}
