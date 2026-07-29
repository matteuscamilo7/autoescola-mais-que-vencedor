import Image from "next/image";
import { brandLogo } from "../data/content";

export default function Brand({ className = "brand" }: { className?: string }) {
  return (
    <span className={className} aria-label="Autoescola Mais que Vencedor">
      <Image
        src={brandLogo}
        alt="Auto Escola Mais que Vencedor"
        width={1200}
        height={427}
        priority
      />
    </span>
  );
}
