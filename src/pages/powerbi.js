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
        src="https://app.powerbi.com/view?r=eyJrIjoiMDk2Zjc3ZDUtZWM3OC00N2M5LTlkY2QtNDQ3YjBmM2IxNGI4IiwidCI6IjNiMThmODUyLTJkZjgtNDE0Ni05ZGU0LWIxYjYyZmRlNDliMyJ9&$toolbarType=0"
        frameborder="0"
      ></iframe>
    </div>
  );
}
