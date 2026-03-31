import Image from "next/image";
import { NavCard } from "@/components/nav-card";
import { ChatbotWidget } from "@/components/chatbot-widget";
import EdgeBinocularAIButton from "@/components/ui/edge-binocular-ai-button";
import Footer from "@/components/footer";

const navItems = [
  {
    title: "Artifacts",
    description: "Knowledge Fabric Excellence ",
    href: "https://crystal.ltm.com/innovation-wall/latest-type_edge_radar_project#ss_idea_bundle_type_edge_radar_project=type_edge_radar_project&sort_type=ds_changed&sort_order=desc",
    imageSrc: "/Artifacts_bg.png",
    bgImage: "/Button_bg.png",
  },
  {
    title: "Opportunity Tracker",
    description: "Capture. Track. Convert. Opportunities",
    href: "https://ltimindtree.sharepoint.com/:l:/r/sites/EDGE2/Lists/EDGE?e=cbsO6W",
    imageSrc: "/tracker_bg.png",
    bgImage: "/Button_bg.png",
  },
  {
    title: "EDGE Dashboard",
    description: "Power BI RFQ Analysis",
    href: "https://app.powerbi.com/groups/me/reports/755a3799-ebea-4862-9c14-6493af1c6404/718f23bb040216b409ea?experience=power-bi",
    imageSrc: "/dashboard_bg.png",
    bgImage: "/Button_bg.png",
  },
  {
    title: "Outcreate",
    description: "Data Value realization ",
    href: "https://crystal.ltm.com/innovation-wall/latest-type_egul_newsletter#ss_idea_bundle_type_egul_newsletter=type_egul_newsletter&sort_type=ds_changed&sort_order=desc",
    imageSrc: "/outcreate_bg.png",
    bgImage: "/Button_bg.png",
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-col items-center min-h-screen p-4 sm:p-6 md:p-8">

      {/* ✅ SUBTLE OVERLAY FOR PROFESSIONAL READABILITY */}
      <div className="fixed inset-0 -z-10 bg-black/40" />

      {/* ✅ HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between">

          {/* LEFT: LTM Logo */}
          <div className="flex items-center">
            <Image
              src="/LTM_logo.png"
              alt="LTM Logo"
              width={100}
              height={35}
              className="h-8 md:h-10 w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>

          {/* RIGHT: EDGE Logo */}
          <div className="flex items-center">
            <Image
              src="/EDGE_logo.png"
              alt="EDGE Logo"
              width={280}
              height={130}
              className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>
      </header>

      {/* ✅ MAIN CONTENT */}
      <main className="flex flex-col items-center w-full max-w-4xl space-y-8 pt-24 md:pt-28">

        {/* Portal Title */}
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center text-primary">
          EDGE Command Center 
        </h1>

        {/* EDGE Binocular AI Search */}
        <EdgeBinocularAIButton />

        {/* ✅ Navigation Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {navItems.map((item) => (
            <NavCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              imageSrc={item.imageSrc}
              bgImage={item.bgImage}
            />
          ))}
        </div>
      </main>

      {/* Chatbot */}
      <ChatbotWidget />

      <Footer />
    </div>
  );
}
