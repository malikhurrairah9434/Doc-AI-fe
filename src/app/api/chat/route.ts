import OpenAI from "openai"
import { NextResponse } from "next/server"

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // 👈 GROQ
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const completion = await client.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are DocAI, a helpful medical assistant. Always include a disclaimer.",
      },
      ...messages,
    ],
  })

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  })
}