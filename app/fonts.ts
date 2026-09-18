import {
  Anton,
  Bagel_Fat_One,
  Bungee,
  DM_Mono,
  Roboto_Slab,
  Rubik_Wet_Paint,
  Syne,
} from "next/font/google";
import localFont from "next/font/local";

/* Google fonts are self-hosted by next/font: no third-party request, no layout shift. */
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const syne = Syne({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-syne" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono" });
const robotoSlab = Roboto_Slab({ weight: "600", subsets: ["latin"], variable: "--font-roboto-slab" });

/* Only used below the fold (work tiles) or on interaction (click pops): fetched on demand, not preloaded. */
const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bagel",
  preload: false,
});
const bungee = Bungee({ weight: "400", subsets: ["latin"], variable: "--font-bungee", preload: false });
const rubikWetPaint = Rubik_Wet_Paint({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-wet-paint",
  preload: false,
});

const nauryz = localFont({
  src: "./fonts/NauryzRedKeds-s1.woff2",
  weight: "400",
  variable: "--font-nauryz",
});
const comicBold = localFont({
  src: "./fonts/comicbold.ttf",
  weight: "400",
  variable: "--font-comic-bold",
});

export const fontVariables = [
  anton,
  syne,
  dmMono,
  robotoSlab,
  bagelFatOne,
  bungee,
  rubikWetPaint,
  nauryz,
  comicBold,
]
  .map((f) => f.variable)
  .join(" ");
