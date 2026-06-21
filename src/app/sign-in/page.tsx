import { CreatePage } from './_components/CreatePage';
import { LandingPage } from './_components/LandingPage';
import { LoginFlowProvider } from './_components/LoginFlow';
import { SignInPage } from './_components/SignInPage';

const Page = () => (
  <LoginFlowProvider
    landing={<LandingPage />}
    create={<CreatePage />}
    signIn={<SignInPage />}
    passkey={null}
    verify={null}
  />
);

export default Page;
