"use client";

import { useState } from "react";

type Animal = {
  id: string;
  name: string;
  tag: string;
};

interface TransactionFormDebugProps {
  animals: Animal[];
}

export function TransactionFormDebug({ animals }: TransactionFormDebugProps) {
  const [mounted, setMounted] = useState(false);

  // Simple mount effect
  if (typeof window !== 'undefined' && !mounted) {
    setMounted(true);
  }

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Debug Transaction Form</h2>
      
      <div className="p-4 bg-green-50 text-green-700 rounded-md">
        ✅ Client component mounted successfully
      </div>
      
      <div className="p-4 bg-blue-50 text-blue-700 rounded-md">
        <strong>Animals received:</strong> {animals.length}
        {animals.length > 0 && (
          <ul className="mt-2">
            {animals.map((animal) => (
              <li key={animal.id}>
                {animal.name} ({animal.tag})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-4 bg-yellow-50 text-yellow-700 rounded-md">
        Se você consegue ver esta mensagem, o problema não está nos dados ou na hidratação básica.
      </div>
    </div>
  );
}