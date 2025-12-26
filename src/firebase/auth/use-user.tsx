'use client';
import { useFirebase } from '@/firebase/provider';

// This is just an alias of useFirebase for semantic clarity
export const useUser = () => useFirebase();
