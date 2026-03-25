import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-border/50 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-start">

        {/* EGUL Logo – Left aligned, parallel to LTM */}
        <Image
          src="/EGUL_logo.png"
          alt="EGUL Logo"
          width={160}
          height={64}
          className="h-12 md:h-14 w-auto object-contain drop-shadow-sm"
          priority
        />

      </div>
    </footer>
  );
}
