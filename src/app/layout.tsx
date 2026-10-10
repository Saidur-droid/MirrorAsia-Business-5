import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "MirrorAsia | Consumer Intelligence Studio",
  description: "Experimental FMCG scenario simulation with transparent provenance and human validation recommendations.",
  robots: { index: false, follow: false }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
