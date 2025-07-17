import LoginForm from "./_components/login-form";

type LoginPageProps = {
  searchParams: Promise<{ redirectUrl: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirectUrl = "/platform" } = await searchParams;

  return <LoginForm redirectTo={redirectUrl} aria-label="Login Form" />;
};

export default LoginPage;
