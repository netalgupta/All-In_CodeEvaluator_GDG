import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold tracking-tight">Create an Account</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Join the community and start your coding journey.
          </p>
        </header>
        <SignupForm />
      </div>
    </div>
  );
}
