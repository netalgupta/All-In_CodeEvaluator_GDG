import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Crown, Medal, Trophy } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Alex Turing', score: 4850, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { rank: 2, name: 'Brendan Eich', score: 4700, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705d' },
  { rank: 3, name: 'Grace Hopper', score: 4680, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706d' },
  { rank: 4, name: 'Linus Torvalds', score: 4520, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d' },
  { rank: 5, name: 'Ada Lovelace', score: 4310, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
  { rank: 6, name: 'Yukihiro Matsumoto', score: 4200, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026709d' },
  { rank: 7, name: 'Guido van Rossum', score: 4150, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
];

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-slate-400" />;
  if (rank === 3) return <Crown className="w-6 h-6 text-amber-600" />;
  return <span className="font-bold text-lg w-6 text-center">{rank}</span>;
};

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See who's at the top of their game.
        </p>
      </header>

      <Card className="max-w-4xl mx-auto bg-card/50 border-border/50 shadow-lg shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="font-headline">Top Programmers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((user) => (
                <TableRow key={user.rank} className="transition-colors hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center justify-center h-full">
                      <RankIcon rank={user.rank} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-lg">{user.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
