import type { Metadata } from "next";
import "./globals.css";
import { ComparisonProvider } from "@/components/providers/comparison-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Gadget Compare",
  description: "A clean, responsive gadget comparison tool built with Next.js and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider>
          <ComparisonProvider>
            <div className="flex min-h-full flex-col">
              <SiteHeader />
              {children}
            </div>
            <Toaster richColors position="top-right" />
          </ComparisonProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
