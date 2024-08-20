import { Card, Skeleton } from '@nextui-org/react';
import React from 'react';

export default function SkeletonCard() {
  return (
    <Card
      className="w-[200px] space-y-5 p-4 bg-blur-500 border border-default-200"
      radius="lg"
    >
      <Skeleton className="rounded-lg h-24 bg-default-300" />
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg h-3 bg-default-200" />
        <Skeleton className="w-4/5 rounded-lg h-3 bg-default-200" />
        <Skeleton className="w-2/5 rounded-lg h-3 bg-default-300" />
      </div>
    </Card>
  );
}
