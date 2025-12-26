import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-coding');

  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-hero-start to-primary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="w-full h-screen bg-gradient-to-b from-hero-start/30 via-hero-start/5 to-background absolute top-0 left-0 -z-10" />
      
      <section className="container mx-auto px-6 pt-24 sm:pt-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:pt-40 h-[calc(100vh-3.5rem)]">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl leading-tight">
            GO ALL IN ON YOUR CODE
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A serious developer tool, visually calm but powerful. Evaluate your code, track your progress, and get personalized feedback from our AI assistant.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button asChild size="lg" className="font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
              <Link href="/evaluate">Get Started</Link>
            </Button>
            <Button asChild variant="link" size="lg" className="text-white">
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
              width={800}
              height={600}
              className="mx-auto w-[40rem] rounded-xl shadow-2xl shadow-primary/10 ring-1 ring-white/10"
            />
          )}
        </div>
      </section>

      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-hero-start to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
