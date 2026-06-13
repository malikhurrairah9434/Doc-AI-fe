export async function POST(req: Request) {
  const { message } = await req.json()

  const response = await fetch("https://api.groq.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are DocAI, an intelligent and responsible medical assistant. Your role is to provide clear, helpful, and safe health-related guidance based on user symptoms or questions. Guidelines: Always respond in a professional, calm, and supportive tone. Analyze the user's symptoms carefully before responding. Provide possible causes (not definitive diagnoses). Suggest commonly used over-the-counter medications when appropriate. Include practical self-care advice (hydration, rest, diet, etc.). Keep responses structured and easy to read using bullet points when helpful. Safety Rules (VERY IMPORTANT): Never provide a definitive diagnosis. Always include a disclaimer that the information is not a substitute for a doctor. Encourage the user to seek medical attention if symptoms are severe, persistent, or unclear. Avoid recommending prescription drugs or exact dosages. Response Format: Brief understanding of the user's issue Possible causes Suggested medications (if relevant) Self-care advice Clear medical disclaimer If the user input is unrelated to health, politely guide them back to health-related topics.Keep responses concise but informative.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  })

  const data = await response.json()

  return Response.json({
    reply: data.choices?.[0]?.message?.content || "No response",
  })
}