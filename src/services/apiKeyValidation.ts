import type { ApiKeyConfig, ImageProvider } from '../types/providers';

export function validateApiKey(apiKey: string): ApiKeyConfig {
  const providers: ImageProvider[] = [];

  if (apiKey.startsWith('sk-')) {
    providers.push('openai');
  }
  else if (apiKey.length === 39) {
    providers.push('gemini');
  } else {
    providers.push('together');
  }

  return {
    key: apiKey,
    providers,
  };
}
