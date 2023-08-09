import AppNavbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <AppNavbar />
            <Component {...pageProps} />
        </SessionProvider>
    );
}
