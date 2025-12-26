import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ContestHeatmap } from '@/components/cp-tracker/contest-heatmap';
import { ContestTimeline } from '@/components/cp-tracker/contest-timeline';

const trackedSubmissions = [
  { id: 1, problem: 'Two Sum', platform: 'LeetCode', date: '2024-07-20', rating: 4.5, status: 'Accepted' },
  { id: 2, problem: 'A. Watermelon', platform: 'Codeforces', date: '2024-07-19', rating: 3.2, status: 'Accepted' },
  { id: 3, problem: 'Regular Bracket Sequences', platform: 'Codeforces', date: '2024-07-26', rating: 4.1, status: 'Accepted' },
  { id: 4, problem: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', date: '2024-07-25', rating: 4.8, status: 'Accepted' },
  { id: 5, problem: 'A. Way Too Long Words', platform: 'Codeforces', date: '2024-07-17', rating: 3.1, status: 'Time Limit Exceeded' },
  { id: 6, problem: 'B. Drinks', platform: 'Codeforces', date: '2024-07-24', rating: 3.5, status: 'Wrong Answer' },
  { id: 7, problem: 'Median of Two Sorted Arrays', platform: 'LeetCode', date: '2024-07-14', rating: 4.9, status: 'Accepted' },
  { id: 8, problem: 'C. Word Game', platform: 'Codeforces', date: '2024-07-23', rating: 3.9, status: 'Accepted' },
  { id: 9, problem: 'Reverse Integer', platform: 'LeetCode', date: '2024-07-12', rating: 4.1, status: 'Accepted' },
  { id: 10, problem: 'D. Odd Queries', platform: 'Codeforces', date: '2024-07-22', rating: 4.2, status: 'Accepted' },
  { id: 11, problem: 'String to Integer (atoi)', platform: 'LeetCode', date: '2024-07-10', rating: 3.8, status: 'Wrong Answer' },
  { id: 12, problem: 'A. Bit++', platform: 'Codeforces', date: '2024-07-09', rating: 3.3, status: 'Accepted' },
  { id: 13, problem: 'Palindrome Number', platform: 'LeetCode', date: '2024-07-08', rating: 4.0, status: 'Accepted' },
  { id: 14, problem: 'A. Petya and Strings', platform: 'Codeforces', date: '2024-07-07', rating: 3.7, status: 'Accepted' },
  { id: 15, problem: 'Container With Most Water', platform: 'LeetCode', date: '2024-07-06', rating: 4.7, status: 'Time Limit Exceeded' },
  { id: 16, problem: '3Sum', platform: 'LeetCode', date: '2024-07-05', rating: 4.6, status: 'Accepted' },
  { id: 17, problem: 'B. Following the String', platform: 'Codeforces', date: '2024-07-04', rating: 3.8, status: 'Accepted' },
  { id: 18, problem: 'Valid Parentheses', platform: 'LeetCode', date: '2024-07-03', rating: 4.3, status: 'Accepted' },
  { id: 19, problem: 'A. Theatre Square', platform: 'Codeforces', date: '2024-07-02', rating: 3.0, status: 'Wrong Answer' },
  { id: 20, problem: 'Merge Two Sorted Lists', platform: 'LeetCode', date: '2024-07-01', rating: 4.4, status: 'Accepted' },
  { id: 21, problem: 'C. Can I Square?', platform: 'Codeforces', date: '2024-06-30', rating: 4.0, status: 'Accepted' },
  { id: 22, problem: 'Generate Parentheses', platform: 'LeetCode', date: '2024-06-29', rating: 4.7, status: 'Accepted' },
  { id: 23, problem: 'A. Helpful Maths', platform: 'Codeforces', date: '2024-06-28', rating: 3.6, status: 'Accepted' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Accepted':
      return <Badge variant="default" className="bg-green-500/80 hover:bg-green-500/90 text-white">Accepted</Badge>;
    case 'Time Limit Exceeded':
      return <Badge variant="destructive" className="bg-yellow-500/80 hover:bg-yellow-500/90 text-white">TLE</Badge>;
    case 'Wrong Answer':
      return <Badge variant="destructive" className="bg-red-500/80 hover:bg-red-500/90 text-white">WA</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function CpTrackerPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">CP Tracker</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Monitor your competitive programming submissions and ratings.
        </p>
      </header>
      
      <div className="grid gap-8 max-w-7xl mx-auto lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recent Submissions</CardTitle>
                <CardDescription>A log of your recent activity on various platforms.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Problem</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {trackedSubmissions.map((sub) => (
                    <TableRow key={sub.id} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium">{sub.problem}</TableCell>
                        <TableCell>{sub.platform}</TableCell>
                        <TableCell className="text-muted-foreground">{sub.date}</TableCell>
                        <TableCell>
                        <StatusBadge status={sub.status} />
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-lg">{sub.rating.toFixed(1)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle className="font-headline">Contest Heatmap</CardTitle>
                <CardDescription>Your submission activity over the last year.</CardDescription>
            </CardHeader>
            <CardContent>
                <ContestHeatmap />
            </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <ContestTimeline />
        </div>
      </div>
    </div>
  );
}
