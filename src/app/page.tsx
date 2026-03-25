import { Shield, Rss, Siren, ClipboardCheck } from "lucide-react";
import { NavCard } from "@/components/nav-card";
import { ChatbotWidget } from "@/components/chatbot-widget";
import EdgeBinocularAIButton from "@/components/ui/edge-binocular-ai-button";

const navItems = [
  {
    title: "Artifacts",
    description: "Monitor and analyze security alerts.",
    icon: Shield,
    href: "https://crystal.ltimindtree.com/innovation-wall/latest-type_edge_radar_project#ss_idea_bundle_type_edge_radar_project=type_edge_radar_project&sort_type=ds_changed&sort_order=desc",
  },
  {
    title: "Opportunity Tracker",
    description: "Latest updates on global threats.",
    icon: Rss,
    href: "https://ltimindtree.sharepoint.com/:l:/r/sites/EDGE2/Lists/EDGE?e=tcDPBq",
  },
  {
    title: "EDGE Dashboard",
    description: "Manage and track security incidents.",
    icon: Siren,
    href: "https://app.powerbi.com/groups/me/reports/755a3799-ebea-4862-9c14-6493af1c6404/718f23bb040216b409ea?experience=power-bi",
  },
  {
    title: "Outcreate",
    description: "Oversee regulatory compliance status.",
    icon: ClipboardCheck,
    href: "https://crystal.ltimindtree.com/innovation-wall/latest-type_egul_newsletter#ss_idea_bundle_type_egul_newsletter=type_egul_newsletter&sort_type=ds_changed&sort_order=desc",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
      <main className="flex flex-col items-center w-full max-w-4xl space-y-8">

        {/* Portal Title */}
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center text-primary">
          EDGE Central Command Portal
        </h1>

        {/* ✅ EDGE Binocular AI Button */}
        <EdgeBinocularAIButton />

        {/* Navigation Cards */}
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

      {/* Existing Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}