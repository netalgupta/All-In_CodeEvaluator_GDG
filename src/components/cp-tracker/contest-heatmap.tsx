'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { subDays, format } from 'date-fns';

const today = new Date();
const data = Array.from({ length: 365 }).map((_, i) => {
  const date = subDays(today, i);
  return {
    date: format(date, 'yyyy-MM-dd'),
    count: Math.floor(Math.random() * 5),
  };
}).reverse();

const chartConfig = {
  count: {
    label: 'Submissions',
  },
};

export function ContestHeatmap() {
  return (
    <div className="w-full overflow-x-auto">
      <ChartContainer config={chartConfig} className="h-40 min-w-full">
        <Heatmap data={data} />
      </ChartContainer>
    </div>
  );
}

function Heatmap({ data }: { data: { date: string; count: number }[] }) {
  const weeks = [];
  let currentWeek = [];
  let firstDayOfWeek = new Date(data[0].date).getDay();

  // Add padding for the first week if it doesn't start on Sunday
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (const day of data) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
        currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const getColor = (count: number) => {
    if (count === 0) return 'bg-muted/30';
    if (count <= 1) return 'bg-primary/20';
    if (count <= 2) return 'bg-primary/40';
    if (count <= 3) return 'bg-primary/60';
    return 'bg-primary/80';
  };
  
  const monthLabels = data.reduce((acc, day) => {
      const month = format(new Date(day.date), 'MMM');
      if (!acc.includes(month)) {
          acc.push(month);
      }
      return acc;
  }, [] as string[]);
  
  const weekCount = weeks.length;
  const monthPositions: { [key: string]: number } = {};
  data.forEach((day, index) => {
    const weekIndex = Math.floor((index + firstDayOfWeek) / 7);
    const month = format(new Date(day.date), 'MMM');
    if (monthPositions[month] === undefined) {
      monthPositions[month] = weekIndex;
    }
  });


  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-flow-col justify-start gap-1">
        {weeks[0].map((_, colIndex) => {
          const month = format(new Date(data[0].date), 'MMM');
          const shouldShowLabel = colIndex === monthPositions[month];
          return (
             <div key={colIndex} className="w-10 text-xs text-muted-foreground text-center">
                {Object.keys(monthPositions).find(m => monthPositions[m] === colIndex)}
            </div>
          )
        })}
      </div>
      <div className="grid grid-flow-col justify-start gap-1">
        <div className="flex flex-col gap-1">
            {['', 'M', '', 'W', '', 'F', ''].map((day, i) => <div key={i} className="h-4 w-4 text-xs text-muted-foreground text-center leading-4">{day}</div>)}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              if (!day) return <div key={`${weekIndex}-${dayIndex}`} className="h-4 w-4 rounded-sm bg-background" />;
              
              return (
              <ChartTooltip
                key={day.date}
                content={
                  <ChartTooltipContent>
                    {day.count} submissions on {format(new Date(day.date), 'PPP')}
                  </ChartTooltipContent>
                }
              >
                <div className={`h-4 w-4 rounded-sm ${getColor(day.count)}`} />
              </ChartTooltip>
            )})}
          </div>
        ))}
      </div>
    </div>
  );
}
