import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { FooterVideo } from "./footer-video";

export function Footer() {
  return (
    <footer className="footer">
      <FooterVideo />
      <div className="foot-wrap">
        <a href="#top" className="foot-word" data-hover="UP">
          <Image src={logo} alt="Hypemann" sizes="(max-width: 700px) 100vw, (max-width: 1375px) 80vw, 1100px" />
        </a>
        <div className="foot-bot">
          <span>© 2026 hypemann studio. all rights reserved, all vibes shared.</span>
          <span>branding that pops &amp; design that clicks.</span>
        </div>
      </div>
    </footer>
  );
}
