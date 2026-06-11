import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lora, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./portal.css";
import "./page.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-lora",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-poppins",
  display: "swap",
});

const description =
  "A personal invitation from Bo Matthews: join the inaugural Huntsville Hope Classic as a special guest — Monday, June 29, 2026 at Canebrake Club, Athens, AL. Green fees, lunch, and drinks are covered.";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "A Note from Bo — Guest Registration · Huntsville Hope Classic",
  description,
  // Invite-only page: shareable by link, but kept out of search engines.
  robots: { index: false, follow: false },
  openGraph: {
    title: "A Note from Bo — Guest Registration",
    description:
      "Join the Huntsville Hope Classic as a special guest. June 29, 2026 · Canebrake Club · free for invited guests.",
    url: "/",
    siteName: "Huntsville Hope Classic",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Bo Matthews at a One House Project food drive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Note from Bo — Guest Registration",
    description:
      "Join the Huntsville Hope Classic as a special guest. June 29, 2026 · Canebrake Club · free for invited guests.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "rgb(15, 31, 20)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${poppins.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
