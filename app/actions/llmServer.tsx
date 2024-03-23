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
  if (session && userId?.id && tokenCount.total_tokens <= 100) {
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
  } else if(tokenCount.total_tokens > 100){
    return {llmResponse: "You have too many tokens in the query. Please write a shorter query."}
  } else if (!session || !userId?.id){
    return {llmResponse: "You are not authorized to be querying me at the moment."}
  } 
  return {llmResponse: "**Something went wrong.** Please try again later. Contact us if the problem persists."};
}
