/**
 * Loading Component
 * Shown during page transitions
 */
import { Spinner } from '@/components/ui';

export default function Loading() {
  return (
    <div className="w-full h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-slate-500 text-sm">Loading Vantage...</p>
      </div>
    </div>
  );
}
