'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, LogOut } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Evaluate', href: '/evaluate' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'CP Tracker', href: '/cp-tracker' },
  { name: 'Chatbot', href: '/chatbot' },
  { name: 'Profile', href: '/profile' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block text-lg">
              ALL IN
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative transition-colors hover:text-primary',
                  pathname === item.href ? 'text-foreground font-semibold' : 'text-muted-foreground',
                  'after:content-[""] after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100',
                  pathname === item.href && 'after:scale-x-100'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end">
          {!isUserLoading && (
            <>
              {user ? (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button asChild size="sm">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
