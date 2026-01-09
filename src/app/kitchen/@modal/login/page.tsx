import { ScrollLock } from "~/app/_components/behavior/scroll-lock";
import LoginScreen from "../../login/_components/login-screen";

export default async function LoginModal() {
  return (
    <>
      <LoginScreen />;
      <ScrollLock />
    </>
  );
}
