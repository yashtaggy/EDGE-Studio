import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NavCardProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;      // ✅ Tile image from /public
  bgImage?: string;      // ✅ Background image
  className?: string;
};

export function NavCard({
  title,
  description,
  href,
  imageSrc,
  bgImage,
  className,
}: NavCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <Card
        className={cn(
          "relative overflow-hidden border-border/50 transition-all duration-500",
          "hover:border-primary/80 hover:-translate-y-2 hover:scale-[1.02]",
          "shadow-xl hover:shadow-primary/30 bg-transparent",
          className
        )}
      >
        {/* ✅ Background image layer */}
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}

        {/* ✅ Premium overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 to-black/65 z-10" />

        {/* ✅ Card Content */}
        <CardHeader className="relative z-20 p-6 space-y-4">
          <div className="flex items-start justify-between">
            {/* ✅ Image instead of icon */}
            <div className="relative w-14 h-14 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={`${title} icon`}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <ArrowRight className="w-5 h-5 text-white/70 transition-all group-hover:text-primary group-hover:translate-x-1" />
          </div>

          <CardTitle className="text-xl font-headline font-semibold text-white">
            {title}
          </CardTitle>

          <CardDescription className="text-white/80">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}