const OLLAMA_URL = import.meta.env.VITE_OLLAMA_URL ?? 'http://localhost:11434';
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL ?? 'llama3';

type OllamaRequest = {
  model: string;
  prompt: string;
  stream: false;
};

type OllamaResponse = {
  response: string;
  done: boolean;
};

export const generateOllama = async (prompt: string, signal?: AbortSignal): Promise<string> => {
  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false } satisfies OllamaRequest),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Ollama request failed: ${res.status} ${res.statusText}`);
  }

  const data: OllamaResponse = await res.json();
  return data.response.trim();
};
