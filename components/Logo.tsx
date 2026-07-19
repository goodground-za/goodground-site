import Image from "next/image";
import { logos } from "@/content/logos";

/**
 * The client's real logo, replacing the interim custom-drawn sprout mark. Nav
 * swaps to the compact "gg" form below the `lg` breakpoint, matching the same
 * breakpoint the nav already uses to swap the link row for the hamburger menu.
 */
export function NavLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={logos.navDesktop.src}
        alt={logos.navDesktop.alt}
        width={logos.navDesktop.width}
        height={logos.navDesktop.height}
        priority
        className="hidden h-[22px] w-auto lg:block"
      />
      <Image
        src={logos.navMobile.src}
        alt={logos.navMobile.alt}
        width={logos.navMobile.width}
        height={logos.navMobile.height}
        priority
        className="h-9 w-auto lg:hidden"
      />
    </span>
  );
}

export function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logos.footer.src}
      alt={logos.footer.alt}
      width={logos.footer.width}
      height={logos.footer.height}
      className={`h-auto w-full max-w-[220px] ${className}`}
    />
  );
}

/** The giant hero lockup — this image IS the H1's visible content. */
export function HeroLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={logos.hero.src}
      alt={logos.hero.alt}
      width={logos.hero.width}
      height={logos.hero.height}
      priority
      sizes="100vw"
      className={`h-auto w-full ${className}`}
    />
  );
}
