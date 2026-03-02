'use client'; // This directive is mandatory

import { createClient, UsermavenProvider as Provider } from '@usermaven/nextjs';
import { ReactNode, useMemo } from 'react';

export default function UsermavenProvider({ children }: { children: ReactNode }) {
  // useMemo ensures the client is created only once during the lifecycle
  const client = useMemo(() => createClient({
    key: process.env.NEXT_PUBLIC_USERMAVEN_KEY!,
    tracking_host: "https://events.usermaven.com",
    autocapture: true, // This enables automatic tracking for your portfolio
  }), []);

  return <Provider client={client}>{children}</Provider>;
}