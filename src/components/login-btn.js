import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button className="btn btn-danger" onClick={() => signOut()}>
          Desconectar
        </button>
      </>
    );
  }
  return (
    <>
      <button className="btn btn-light" onClick={() => signIn()}>
        Entrar
      </button>
    </>
  );
}
