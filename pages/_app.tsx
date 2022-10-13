import "../styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
