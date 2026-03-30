import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const agentResponse = await fetch(
      process.env.BLUEVERSE_CHAT_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.BLUEVERSE_BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          query: message,
          space_name: "EDGE_Binocular_Ai_613db791",
          flowId: "69c517b98bbe8031ba4ebb5c",
        }),
      }
    );

    if (!agentResponse.ok) {
      throw new Error("Agent API call failed");
    }

    const data = await agentResponse.json();

    return NextResponse.json({
      reply: data.response, // ✅ confirmed from Step 1
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      { error: "Agent request failed" },
      { status: 500 }
    );
  }
}