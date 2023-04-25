import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  iframe: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "fixed",
  },
};

export default function PowerBI() {
  return (
    <div>
      <Head>
        <title>PowerBI</title>
      </Head>
      <iframe
        style={styles.iframe}
        title="PetShop"
        key="if"
        src="https://app.powerbi.com/reportEmbed?reportId=a5671dad-a499-4e16-ac05-411d82a0911c&autoAuth=true&ctid=da49a844-e2e3-40af-86a6-c3819d704f49"
        frameborder="0"
      ></iframe>
    </div>
  );
}
