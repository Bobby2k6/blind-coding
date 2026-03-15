import axios from "axios";

const API_URL =
  "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

const languageMap: Record<string, number> = {
  python: 71,
  c: 50,
  cpp: 54,
  java: 62,
  javascript: 63,
};

export async function runCode(code: string, language: string, input: string) {
  const language_id = languageMap[language];

  const res = await axios.post(API_URL, {
    source_code: code,
    language_id,
    stdin: input,
  });

  return res.data;
}
