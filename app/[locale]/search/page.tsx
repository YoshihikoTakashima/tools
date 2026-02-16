'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchPage from '@/src/components/SearchPage';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  return <SearchPage query={query} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
