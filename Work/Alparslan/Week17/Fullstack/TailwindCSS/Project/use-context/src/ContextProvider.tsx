import { useState, createContext } from 'react';

export const MyContext = createContext<{value: string, setValue: (value: string) => void}>()

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState('blue');
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}
