import AppNavbar from "@/components/navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppNavbar />
      <Component {...pageProps} />
    </>
  );
}
