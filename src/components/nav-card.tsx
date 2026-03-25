import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type NavCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  className?: string;
};

export function NavCard({ icon: Icon, title, description, href, className }: NavCardProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className={cn(
        "bg-card hover:bg-card/90 border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20 h-full",
        className
      )}>
        <CardHeader className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon className="w-8 h-8 text-primary" />
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
          </div>
          <CardTitle className="text-xl font-headline font-semibold text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
