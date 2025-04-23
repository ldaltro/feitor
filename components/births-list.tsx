"use client";

import { BirthsListClient } from "@/components/births-list-client";

// This component exists primarily for backward compatibility with tests
// It re-exports the BirthsListClient component as BirthsList
export function BirthsList(props: any) {
  return <BirthsListClient {...props} />;
}
