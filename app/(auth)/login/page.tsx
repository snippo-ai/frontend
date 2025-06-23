import LoginForm from "./_components/login-form";

type LoginPageProps = {
  searchParams: Promise<{ redirectUrl: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { redirectUrl = "/dashboard" } = await searchParams;

  return <LoginForm redirectTo={redirectUrl} />;
};

export default LoginPage;
