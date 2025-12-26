import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code, Bot, BarChart, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Code,
    title: 'Code Evaluation',
    description: 'Get instant feedback on your code with our AI-powered analysis. Improve your skills with personalized suggestions.',
    link: '/evaluate',
  },
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: 'Stuck on a problem? Our AI chatbot is here to help you with hints, explanations, and code examples.',
    link: '/chatbot',
  },
  {
    icon: BarChart,
    title: 'CP Tracker',
    description: 'Track your competitive programming progress across different platforms. Visualize your journey and stay motivated.',
    link: '/cp-tracker',
  },
  {
    icon: Trophy,
    title: 'Leaderboard',
    description: 'Compete with others and climb the leaderboard. See where you stand among the best programmers.',
    link: '/leaderboard',
  }
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-minimal-code');

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <section className="container mx-auto px-6 pt-24 sm:pt-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-40 min-h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-6xl leading-tight">
            Go All In On Your Code
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A serious developer tool, visually calm but powerful. Evaluate your code, track your progress, and get personalized feedback from our AI assistant.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg" className="font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
              <Link href="/evaluate">Get Started</Link>
            </Button>
            <Button asChild variant="link" size="lg">
              <Link href="/leaderboard">View Leaderboard &rarr;</Link>
            </Button>
          </div>
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              width={600}
              height={400}
              className="mx-auto w-[32rem] h-auto rounded-xl shadow-2xl shadow-primary/10 ring-1 ring-foreground/10"
            />
          )}
        </div>
      </section>

      <section id="features" className="py-24 sm:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Everything you need to ship</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A complete toolkit to help you improve as a programmer and stay ahead of the competition.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/50 border-border/50 hover:shadow-primary/10 transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-full">
                         <feature.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                     <Button asChild variant="link" className="mt-4 px-0 group-hover:text-primary transition-colors">
                      <Link href={feature.link}>Learn More &rarr;</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
