import AuthCard from '@/components/forms/AuthCard';
import LoginForm from '@/components/forms/LoginForm';

const LoginView = () => {
  return (
    <div>
      <AuthCard title="Login" description="Please login your account.">
        <LoginForm />
      </AuthCard>
    </div>
  );
};

export default LoginView;
