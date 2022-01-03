import { useEffect, useState } from "react";

// Hook
export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(() => value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
