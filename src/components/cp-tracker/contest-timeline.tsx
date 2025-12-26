'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Bell, Calendar, Clock, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

const upcomingContests = [
  {
    id: 1,
    name: 'Codeforces Round 962 (Div. 3)',
    platform: 'Codeforces',
    startTime: '2024-08-01T14:35:00Z',
    duration: '2h 15m',
    url: 'https://codeforces.com/contests',
  },
  {
    id: 2,
    name: 'Weekly Contest 405',
    platform: 'LeetCode',
    startTime: '2024-08-03T02:30:00Z',
    duration: '1h 30m',
    url: 'https://leetcode.com/contest/',
  },
  {
    id: 3,
    name: 'AtCoder Beginner Contest 364',
    platform: 'AtCoder',
    startTime: '2024-08-03T12:00:00Z',
    duration: '1h 40m',
    url: 'https://atcoder.jp/contests',
  },
  {
    id: 4,
    name: 'Codeforces Round 963 (Div. 2)',
    platform: 'Codeforces',
    startTime: '2024-08-05T14:35:00Z',
    duration: '2h',
    url: 'https://codeforces.com/contests',
  },
    {
    id: 5,
    name: 'Biweekly Contest 136',
    platform: 'LeetCode',
    startTime: '2024-08-10T14:30:00Z',
    duration: '1h 30m',
    url: 'https://leetcode.com/contest/',
  },
];

export function ContestTimeline() {
  const [reminderContest, setReminderContest] = useState<string | null>(null);

  const handleSetReminder = (contestName: string) => {
    setReminderContest(contestName);
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="font-headline">Upcoming Contests</CardTitle>
          <CardDescription>Stay ahead of the competition.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:w-0.5 before:bg-border before:left-0">
            {upcomingContests.map((contest, index) => {
                const startTime = parseISO(contest.startTime);
                return (
                    <div key={contest.id} className="relative">
                         <div className="absolute left-[-2.2rem] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                             <Calendar className="h-4 w-4" />
                         </div>
                        <Card className="bg-card/50 hover:border-primary/50 transition-colors">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold flex justify-between items-start">
                                    <span>{contest.name}</span>
                                    <Link href={contest.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </CardTitle>
                                <CardDescription>{contest.platform}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4"/>
                                        <span>{format(startTime, 'MMMM d, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4"/>
                                        <span>{format(startTime, 'p')} ({contest.duration})</span>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleSetReminder(contest.name)}
                                >
                                    <Bell className="mr-2 h-4 w-4" />
                                    Set Reminder
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
          </div>
        </CardContent>
      </Card>
      
      <AlertDialog open={!!reminderContest} onOpenChange={() => setReminderContest(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reminder Set!</AlertDialogTitle>
            <AlertDialogDescription>
              We'll notify you before the "{reminderContest}" contest begins. Good luck!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setReminderContest(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}