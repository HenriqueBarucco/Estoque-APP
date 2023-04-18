import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PowerBI() {
  return (
    <div>
      <Head>
        <title>PowerBI</title>
      </Head>
        <iframe title="PetShop" src="https://app.powerbi.com/view?r=eyJrIjoiMDk2Zjc3ZDUtZWM3OC00N2M5LTlkY2QtNDQ3YjBmM2IxNGI4IiwidCI6IjNiMThmODUyLTJkZjgtNDE0Ni05ZGU0LWIxYjYyZmRlNDliMyJ9&$toolbarType=0" frameborder="0" allowFullScreen="true"></iframe>
    </div>
  );
}
