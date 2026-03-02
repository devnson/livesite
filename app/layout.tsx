import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>
        {/* — CURSOR AMBIENT LIGHT — */}
        <div className="cursor-light" id="cursorLight" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        {children}

        {/* — CURSOR SCRIPT — */}
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

        {/* — MICROSOFT CLARITY — */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "t4241c53ut");
            `,
          }}
        />
      </body>
    </html>
  );
}