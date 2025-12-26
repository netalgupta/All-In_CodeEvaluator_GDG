'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, GitBranch, Star, Target, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AnimatedNumber } from '@/components/shared/animated-number';

const userProfile = {
  name: 'Netal Gupta',
  handle: '@netal',
  avatar: 'https://i.pravatar.cc/150?u=netalgupta',
  bio: 'Senior Software Engineer specializing in full-stack development and competitive programming. Passionate about clean code and building scalable systems.',
  skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'System Design', 'Algorithms'],
  stats: [
    { name: 'Problems Solved', value: 342, icon: Code },
    { name: 'Avg. Rating', value: 4.6, icon: Star },
    { name: 'Contests Attended', value: 47, icon: Target },
    { name: 'Projects', value: 12, icon: GitBranch },
  ]
};

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full bg-card/50 border-border/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
              <AvatarImage src={user.photoURL || userProfile.avatar} alt={user.displayName || 'User'} />
              <AvatarFallback className="text-4xl bg-secondary">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle className="font-headline text-3xl">{user.displayName || user.email}</CardTitle>
            <CardDescription className="text-primary">{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="max-w-2xl mx-auto text-muted-foreground">{userProfile.bio}</p>
            
            <Separator className="my-8" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {userProfile.stats.map((stat) => (
                <div key={stat.name} className="p-4 rounded-lg bg-card/70">
                  <stat.icon className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold font-headline">
                    <AnimatedNumber value={stat.value} precision={stat.name === 'Avg. Rating' ? 1 : 0} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              ))}
            </div>

            <Separator className="my-8" />
            
            <div>
              <h3 className="font-headline text-xl font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {userProfile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 transition-transform hover:scale-105">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
