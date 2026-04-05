import { useRef, useState } from 'react';

import { generateOllama } from '@/api/ollama';

type AiRequestState = {
  isLoading: boolean;
  result: string;
  error: boolean;
  isDone: boolean;
  anchorEl: HTMLButtonElement | null;
};

type UseAiRequestReturn = AiRequestState & {
  run: (prompt: string, el: HTMLButtonElement) => void;
  closePopover: () => void;
};

export const useAiRequest = (): UseAiRequestReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const run = async (prompt: string, el: HTMLButtonElement) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    setError(false);
    setAnchorEl(el);

    try {
      const response = await generateOllama(prompt, abortRef.current.signal);
      setResult(response);
      setIsDone(true);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError(true);
        setIsDone(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return { isLoading, result, error, isDone, anchorEl, run, closePopover };
};
