"use server";

import { getServerSession } from "next-auth";
import { getUserId } from "./getUserInfo";

export async function getTokenCount(userMessage: string) {
  const session = await getServerSession();
  if (session) {
    const tokenCount = await fetch(
      "http://localhost:5001/llm_server/tokenCount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
        }),
      }
    );

    return await tokenCount.json();
  }
  return;
}

export async function llmResponse(userMessage: string) {
  const tokenCount = await getTokenCount(userMessage);
  const session = await getServerSession();
  const userId = await getUserId(session?.user?.email);
  if (session && userId?.id && tokenCount <= 100) {
    const response = await fetch(
      "http://localhost:5001/llm_server/getLLMResponse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          userId: userId.id,
        }),
      }
    );

    return await response.json();
  }
  return;
}
