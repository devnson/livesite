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


<script
  dangerouslySetInnerHTML={{
    __html: `
      (function(m,a,v,e,n){
        m.UsermavenObject=n;m[n]=m[n]||function(){(m[n].q=m[n].q||[]).push(arguments)};
        var s=a.createElement('script');s.async=1;s.src=v;
        a.getElementsByTagName('head')[0].appendChild(s);
      })(window,document,'https://t.usermaven.com/lib.js','um');
      um('init', { key: '${process.env.NEXT_PUBLIC_USERMAVEN_KEY}', tracking_host: 'https://events.usermaven.com', autocapture: true });
      um('pageview');
    `,
  }}
/>

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${bricolage.variable}`}>
      <body>
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
      </body>
    </html>
  );
}