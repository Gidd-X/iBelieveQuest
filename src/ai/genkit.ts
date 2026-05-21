let aiInstance: any = null;

export async function getAi() {
  if (aiInstance) return aiInstance;
  
  const { genkit } = await import('genkit');
  const { googleAI } = await import('@genkit-ai/googleai');
  
  aiInstance = genkit({
    // @ts-ignore - bypassing version mismatch type error between @genkit-ai/core and @genkit-ai/googleai
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });
  
  return aiInstance;
}
