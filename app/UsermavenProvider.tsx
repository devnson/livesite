"use client";

import { createClient, UsermavenProvider, usePageView } from "@usermaven/nextjs";

const usermavenClient = createClient({
  key: process.env.NEXT_PUBLIC_USERMAVEN_KEY!,
  trackingHost: "https://events.usermaven.com",
  autocapture: true,
  autoPageview: true,
});

function PageViewTracker() {
  usePageView(usermavenClient);
  return null;
}

export default function UsermavenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <UsermavenProvider client={usermavenClient}>
      <PageViewTracker />
      {children}
    </UsermavenProvider>
  );
}