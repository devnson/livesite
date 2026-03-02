import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers"; // Your PostHog Provider

// 1. Define fonts at the top
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// 2. Define Metadata
export const metadata: Metadata = {
  title: "Tanosei Studio",
  description: "Motion-led creative studio for tech and startup clients.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

// 3. One single RootLayout function
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>
        {/* Wrap everything in PostHog Provider */}
        <PHProvider>
          {/* — CURSOR AMBIENT LIGHT — */}
          <div className="cursor-light" id="cursorLight" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />
          
          {children}

          {/* Custom Cursor Script */}
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
        </PHProvider>
      </body>
    </html>
  );
}