import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

// 👇 Ta configuration de polices
const GlobalStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    /* SF Pro Display pour les titres */
    .font-display {
      font-family: "SF Pro Display", "SF Pro", "Inter", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
      letter-spacing: -0.02em; 
    }

    /* SF Pro Text pour le corps */
    .font-text {
      font-family: "SF Pro Text", "SF Pro", "Inter", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, sans-serif;
      letter-spacing: 0em; 
    }
  `}</style>
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RIM PARFUMS</title>
      </Head>
      {/* On active les styles ici */}
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}