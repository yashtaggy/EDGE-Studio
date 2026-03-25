import { Shield, Rss, Siren, ClipboardCheck } from 'lucide-react';
import { NavCard } from '@/components/nav-card';
import { ChatbotWidget } from '@/components/chatbot-widget';

const navItems = [
  {
    title: 'Security Operations Center (SOC)',
    description: 'Monitor and analyze security alerts.',
    icon: Shield,
    href: '#',
  },
  {
    title: 'Threat Intelligence Feed',
    description: 'Latest updates on global threats.',
    icon: Rss,
    href: '#',
  },
  {
    title: 'Incident Response',
    description: 'Manage and track security incidents.',
    icon: Siren,
    href: '#',
  },
  {
    title: 'Compliance Dashboard',
    description: 'Oversee regulatory compliance status.',
    icon: ClipboardCheck,
    href: '#',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <main className="flex flex-col items-center w-full max-w-4xl space-y-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center text-primary">
          EDGE Central Command Portal
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map((item) => (
            <NavCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
      </main>
      <ChatbotWidget />
    </div>
  );
}
