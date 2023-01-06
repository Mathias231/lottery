import '../styles/globals.css';
import '../styles/index.css';
import '../styles/spinnerWheel.css';
import '../styles/winner.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
