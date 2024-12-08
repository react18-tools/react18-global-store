import { Demo } from "@repo/shared";
import { LandingPage } from "@repo/shared/dist/server";

/** Remix App */
export default function Index() {
  return (
    <LandingPage title="Remix Example">
      <Demo />
    </LandingPage>
  );
}
