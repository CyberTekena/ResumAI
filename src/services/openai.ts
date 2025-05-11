
import OpenAI from 'openai';

// In a real application, you'd want to use environment variables or a secure backend
// This is just for demonstration purposes
let openaiClient: OpenAI | null = null;
let apiKey: string | null = null;

export const initializeOpenAI = (key: string) => {
  apiKey = key;
  openaiClient = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true, // Note: In production, you should proxy these requests through a backend
  });
};

export const getOpenAI = () => {
  if (!openaiClient) {
    throw new Error('OpenAI client not initialized. Please set an API key first.');
  }
  return openaiClient;
};

export const hasApiKey = () => {
  return !!apiKey;
};

export const generateContent = async (
  prompt: string,
  options: { maxTokens?: number; temperature?: number } = {}
) => {
  try {
    const openai = getOpenAI();
    const { maxTokens = 500, temperature = 0.7 } = options;

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: maxTokens,
      temperature: temperature,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
};

export const generateJobDescription = async (
  jobTitle: string,
  company: string,
  years: number
) => {
  const prompt = `Write a professional job description for a ${jobTitle} role at ${company} with ${years} years of experience. Format it as 3-5 bullet points.`;
  return generateContent(prompt);
};

export const generateSummary = async (
  jobTitle: string,
  years: number,
  skills: string[]
) => {
  const skillsText = skills.join(', ');
  const prompt = `Write a professional summary for a ${jobTitle} with ${years} years of experience. Skills include: ${skillsText}. Keep it concise (3-4 sentences).`;
  return generateContent(prompt);
};

export const generateCoverLetter = async (
  name: string,
  jobTitle: string,
  company: string,
  experience: string,
  jobDescription?: string
) => {
  const prompt = `Write a professional cover letter for ${name} applying for a ${jobTitle} position at ${company}. 
  Experience: ${experience}.
  ${jobDescription ? `Job description: ${jobDescription}` : ''}
  Keep it to 3-4 paragraphs, professional tone.`;
  
  return generateContent(prompt, { maxTokens: 800 });
};
