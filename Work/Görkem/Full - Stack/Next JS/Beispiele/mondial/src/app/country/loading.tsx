import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="p-6 flex flex-col items-center justify-center text-gray-600">
      <Loader2 className="w-6 h-6 animate-spin mb-2" />
      <span className="text-lg">Loading...</span>
    </div>
  );
}
