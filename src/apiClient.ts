const openAiKey = import.meta.env.VITE_OPENAI_KEY as string | undefined;
const openAiBase = (import.meta.env.VITE_OPENAI_API_BASE as string | undefined) ?? 'https://api.openai.com/v1';

export const hasOpenAI = Boolean(openAiKey);

async function openAiRequest(payload: any) {
  if (!openAiKey) throw new Error('OpenAI key not configured');

  const res = await fetch(`${openAiBase}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const details = await res.text();
    throw new Error(`OpenAI request failed: ${res.status} ${details}`);
  }

  const json = await res.json();
  return json;
}

export async function searchWeb(query: string, useRealApi = hasOpenAI) {
  if (!useRealApi || !hasOpenAI) {
    return [
      { title: 'AI safety paper from 2025', snippet: `Latest research on ${query} shows an emphasis on interpretability, red-teaming, and robust model governance.`, url: 'https://example.com/ai-safety-2025' },
      { title: 'Agent trust and prompt injection', snippet: `A new framework for agent trust evaluation and prompt injection mitigation in multi-agent systems.`, url: 'https://example.com/agent-trust' },
      { title: 'Secure AI pipeline design', snippet: `Design patterns for secure autonomous pipelines and cross-agent verification.`, url: 'https://example.com/secure-pipelines' },
    ];
  }

  const result = await openAiRequest({
    model: 'gpt-3.5-turbo',
    temperature: 0.3,
    messages: [
      { role: 'system', content: 'You are a research assistant that returns short web search-like results.' },
      { role: 'user', content: `Provide three concise search results with titles, snippets, and URLs for: ${query}` },
    ],
  });

  const text = result.choices?.[0]?.message?.content ?? '';
  const lines = text.split('\n').filter(Boolean).slice(0, 9);
  return lines.map((line: string) => {
    const parts = line.split(' - ');
    if (parts.length >= 3) {
      return { title: parts[0].trim(), snippet: parts[1].trim(), url: parts[2].trim() };
    }
    return { title: line.slice(0, 60), snippet: '', url: '' };
  });
}

export async function summarizeQuery(query: string, sources: Array<{ title: string; snippet: string; url: string }>, useRealApi = hasOpenAI) {
  if (!useRealApi || !hasOpenAI) {
    return `Summary for "${query}":

1. Research continues to emphasize safety, governance, and prompt integrity.
2. Multi-agent trust is measured through behavioral signals and interception.
3. The system should isolate suspicious outputs and produce a final safe report.`;
  }

  const sourceText = sources.map((s, index) => `${index + 1}. ${s.title}: ${s.snippet} (${s.url})`).join('\n');
  const result = await openAiRequest({
    model: 'gpt-3.5-turbo',
    temperature: 0.4,
    messages: [
      { role: 'system', content: 'You are a secure executive assistant. Produce a concise report with a safe summary and source provenance.' },
      { role: 'user', content: `Create a concise report for the query: ${query}. Use these sources:\n${sourceText}` },
    ],
  });

  return result.choices?.[0]?.message?.content ?? `Summary for ${query}`;
}
