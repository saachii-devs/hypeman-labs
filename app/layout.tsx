import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { MotionProvider } from "@/components/motion-provider";
import { Cursor } from "@/components/cursor";
import { ClickPops } from "@/components/click-pops";

export const metadata: Metadata = {
  title: "HYPEMAN — we make brands loud",
  description:
    "Hypeman is a creative studio cooking logos, 3D mascots, flyers, merch drops and hype campaigns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <MotionProvider>
          <Cursor />
          {children}
          <ClickPops />
        </MotionProvider>
      </body>
    </html>
  );
}
