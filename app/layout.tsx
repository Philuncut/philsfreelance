import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Philipp Gassner — Next.js Entwicklung & Post Production",
  description:
    "Streaming-Plattformen, Web-Anwendungen und Post Production aus einer Hand.",
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  viewportFit: "cover",
};

/*
 * Laeuft vor dem Rest der Seite. Verhindert, dass der Browser beim Neuladen
 * die alte Scrollposition wiederherstellt, und entfernt einen Anker aus der
 * Adresse, bevor der Sprung dorthin stattfinden kann. Beides ist reine
 * Browsersteuerung und laesst sich nicht in CSS abbilden.
 */
const IMMER_OBEN = `
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
if (location.hash) history.replaceState(null, "", location.pathname + location.search);
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: IMMER_OBEN }} />
        {children}
      </body>
    </html>
  );
}
