export function handleAiAnalysis(request: Request, env: Record<string, unknown>): Promise<Response>;
export function validateBrief(input: unknown): unknown;
export function parseAnalysis(output: unknown): Record<string,string>;
export const AI_MODEL: string;
