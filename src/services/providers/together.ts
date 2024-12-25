interface TogetherResponse {
  status: string;
  output?: string[];
  error?: string;
}

export async function generateTogetherImage(
  apiKey: string,
  prompt: string
): Promise<string> {
  const response = await fetch('https://api.together.xyz/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'black-forest-labs/FLUX.1-schnell-Free',
      prompt,
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1,
      stream_tokens: false,
    }),
  });

  const img: TogetherResponse = await response.json();

  if (!response.ok || !img.data?.[0]) {
    debugger
    throw new Error(img.error || 'Failed to generate image with Together AI');
  }

  return img.data[0].url;
}
