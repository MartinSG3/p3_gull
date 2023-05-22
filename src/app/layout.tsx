import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "NRK P3",
  description: "NRK P3 Gull",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
