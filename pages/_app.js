import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

// this is providing the sesion context globally to the whole app 
// so at any point of the app, its exposing the session 
export default function App({
  Component,
  pageProps: { session, ...pageProps }, 
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
