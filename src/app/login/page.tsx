import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Sign in to access your profile and track your progress.
          </p>
        </header>
        <LoginForm />
      </div>
    </div>
  );
}
