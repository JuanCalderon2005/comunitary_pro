import React from 'react'
import AuthGuard from './guard/AuthGuard';
import Layout from '@/ui/layouts/Dashboard/layout';

export default function Privatelayout(
  { children }: { children: React.ReactNode; }
) {
  return (
    <AuthGuard>
      <Layout>
        {children}
      </Layout>
    </AuthGuard>
  )
}
