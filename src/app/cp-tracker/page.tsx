import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const trackedSubmissions = [
  { id: 1, problem: 'Two Sum', platform: 'LeetCode', date: '2024-07-20', rating: 4.5, status: 'Accepted' },
  { id: 2, problem: 'Longest Substring Without Repeating Characters', platform: 'LeetCode', date: '2024-07-19', rating: 4.2, status: 'Accepted' },
  { id: 3, problem: 'Weird Algorithm', platform: 'CSES', date: '2024-07-18', rating: 3.8, status: 'Accepted' },
  { id: 4, problem: 'Palindrome Reorder', platform: 'CSES', date: '2024-07-17', rating: 3.5, status: 'Time Limit Exceeded' },
  { id: 5, problem: 'Reverse a Linked List', platform: 'HackerRank', date: '2024-07-16', rating: 4.8, status: 'Accepted' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Accepted':
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20">Accepted</Badge>;
    case 'Time Limit Exceeded':
      return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20">TLE</Badge>;
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
      
      <Card className="max-w-6xl mx-auto bg-card/50 border-border/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300">
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
                <TableRow key={sub.id} className="transition-colors hover:bg-muted/20">
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
  );
}
