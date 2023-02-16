import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";

export const LandingScreen = () => {
  const { data, status } = useSession();
  return (
    <Fragment>
      <main>
        <p>status: {status}</p>

        {/* TODO 마크업 수정 예정 */}
        <p>{data?.user?.name}</p>
        {!data?.user ? (
          <>
            <button type="button" onClick={() => signIn("google")}>
              Google Login
            </button>
            <button type="button" onClick={() => signIn("kakao")}>
              Kakao Login
            </button>
          </>
        ) : (
          <button type="button" onClick={() => signOut()}>
            Logout
          </button>
        )}
      </main>
    </Fragment>
  );
};
