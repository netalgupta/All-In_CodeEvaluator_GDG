import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ContestHeatmap } from '@/components/cp-tracker/contest-heatmap';

const trackedSubmissions = [
  { id: 1, problem: 'Two Sum', platform: 'LeetCode', date: '2024-07-20', rating: 4.5, status: 'Accepted' },
  { id: 2, problem: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', date: '2024-07-19', rating: 4.2, status: 'Accepted' },
  { id: 3, problem: 'Weird Algorithm', platform: 'CSES', date: '2024-07-18', rating: 3.8, status: 'Accepted' },
  { id: 4, problem: 'Palindrome Reorder', platform: 'CSES', date: '2024-07-17', rating: 3.5, status: 'Time Limit Exceeded' },
  { id: 5, problem: 'Reverse a Linked List', platform: 'HackerRank', date: '2024-07-16', rating: 4.8, status: 'Accepted' },
  { id: 6, problem: 'Watermelon', platform: 'Codeforces', date: '2024-07-15', rating: 3.2, status: 'Wrong Answer' },
  { id: 7, problem: 'Median of Two Sorted Arrays', platform: 'LeetCode', date: '2024-07-14', rating: 4.9, status: 'Accepted' },
  { id: 8, problem: 'Way Too Long Words', platform: 'Codeforces', date: '2024-07-13', rating: 3.1, status: 'Accepted' },
  { id: 9, problem: '3Sum', platform: 'LeetCode', date: '2024-07-12', rating: 4.6, status: 'Accepted' },
  { id: 10, problem: 'Theatre Square', platform: 'Codeforces', date: '2024-07-11', rating: 3.9, status: 'Accepted' },
  { id: 11, problem: 'Valid Parentheses', platform: 'LeetCode', date: '2024-07-10', rating: 4.3, status: 'Accepted' },
  { id: 12, problem: 'Next Round', platform: 'Codeforces', date: '2024-07-09', rating: 3.4, status: 'Time Limit Exceeded' },
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
      
      <div className="grid gap-8 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Contest Heatmap</CardTitle>
            <CardDescription>Your submission activity over the last year.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContestHeatmap />
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
}
