import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { createClient, UsermavenProvider } from "@usermaven/nextjs";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", display: "swap" });
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tanosei Studio",
  description: "Motion-led creative studio for tech and startup clients.",
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

const usermavenClient = createClient({
  key: process.env.NEXT_PUBLIC_USERMAVEN_KEY!,
  trackingHost: "https://events.usermaven.com",
  autocapture: true,
  autoPageview: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>
        <UsermavenProvider client={usermavenClient}>
          {/* — CURSOR AMBIENT LIGHT — */}
          <div className="cursor-light" id="cursorLight" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />

          {children}

          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  var el = document.getElementById('cursorLight');
                  if (!el) return;
                  window.addEventListener('mousemove', function(e){
                    el.style.left = e.clientX + 'px';
                    el.style.top  = e.clientY + 'px';
                  }, { passive: true });
                })();
              `,
            }}
          />
        </UsermavenProvider>
      </body>
    </html>
  );
}