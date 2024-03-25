"use client";

import { getTokenCount, llmResponse } from "@/app/actions/llmServer";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { SignOut } from "./SignOut";

export default function ChatRoom(props: any) {
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);
  const bottomMessage = useRef<HTMLDivElement | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const [tokenCount, setTokenCount] = useState(0);
  const [allMessages, setAllMessages] = useState<Map<string, string>[]>([]);

  useEffect(() => {
    bottomMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [allMessages.length]);

  useEffect(() => {
    async function getMessages() {
      const res = await fetch("/api/messages/getAllMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: props.userData?.email,
        }),
      });

      let chatMap = new Map<string, string>();
      chatMap.set("from", "ai");
      chatMap.set(
        "message",
        "**Welcome!** I&apos;m \
      EstateMate. I&apos;m an expert in real estate and \
      I help brokers and investors identify the rare find in home properties \
      to invest in and maximize profit. I can help you talk to the data directly…\
      \n  \n *Some examples you can type to get started in your real estate journey:* \n \
      *Example 1:* \
      Could you summarize for me the pros and cons of this property at 11903 NE 128TH ST UNIT 5, in KIRKLAND in the state of Washington? \
      \n \n*Example 2:* \
      Give me the average property value for homes in 98034? \
      \n \n*Example 3:* \
      what is seller financing vs subject to financing? \
      *Example 4:* \
      Would subject-to financing be a good option for 201 Galer St unit 104 in Seattle?"
      );
      const allMessages = await res.json();
      const mapMessages = allMessages.data.map((obj: any) => {
        return new Map(Object.entries(obj));
      });
      const messages = [chatMap, ...mapMessages];
      setAllMessages(messages);
      setLoading(false);
    }
    if (props.userData != null && allMessages.length == 0) {
      getMessages();
    }
  }, [props.userData, allMessages.length]);

  const handleKeyDown = async (event: any) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      (!aiThinking || !loading || !(tokenCount > 100))
    ) {
      // Trigger the button click
      handleSubmit();
    }
  };

  useEffect(() => {
    async function getTokens() {
      if (userMessage.length == 0 || userMessage == "") {
        setTokenCount(0);
      } else {
        const tokenCount = await getTokenCount(userMessage);
        setTokenCount(tokenCount.total_tokens);
      }
    }
    getTokens();
  }, [userMessage]);

  const handleSubmit = async () => {
    if (!userMessage || aiThinking || loading || tokenCount > 100) {
      return;
    }
    setAiThinking(true);
    setTokenCount(0);
    let chatMap = new Map<string, string>();
    chatMap.set("from", "user");
    chatMap.set("message", userMessage);
    setAllMessages([...allMessages, chatMap]);
    setUserMessage("");
    fetch("/api/messages/saveUserMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: props.userData?.email,
        message: userMessage,
      }),
    });
    const data = await llmResponse(userMessage);
    const aiResponse = data.llmResponse;

    chatMap = new Map<string, string>();
    chatMap.set("from", "ai");
    chatMap.set("message", aiResponse);
    setAllMessages((allMessages) => [...allMessages, chatMap]);
    setAiThinking(false);
    fetch("/api/messages/saveAiMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: aiResponse,
      }),
    });
  };

  function formatTextWithTailwind(text: string | undefined) {
    if (text) {
      // Optimize replacements for efficiency
      const replacements = [
        [/\*\*(.*?)\*\*/g, '<header class="text-md font-bold">$1</header><p>'],
        [/\#\#(.*?)\#\#/g, '<header class="text-md font-bold">$1</header><p>'],
        [/\*(.*?)\*/g, '<p class="font-semibold">$1</p>'],
      ];
      const formattedText = replacements
        .reduce(
          (acc: string, [pattern, replacement]) =>
            acc.replace(pattern, replacement as string),
          text
        )
        // .replace(/\n/g, "<br />\n") // Insert <br> for newlines
        .replace(/^(?=[^\s])/gm, "<p>") // Wrap paragraphs
        .trim(); // Tidy up whitespace

      return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
    }
    return null;
  }

  const navigation = [
    { name: "Contact Us", href: "/contactUs" },
    { name: "Product", href: "/about" },
  ];

  return (
    <div className="h-screen bg-[#251E1E] flex flex-col overflow-hidden">
      <div className="px-6 pt-6 lg:px-8 bg-[#251E1E] mb-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Data Dive Homes</span>
              <Image
                src="/aiOrb.gif"
                className="hover:scale-110"
                width={50}
                height={50}
                alt="Logo Image"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-200 hover:underline hover:scale-110"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <div className="flex items-center justify-center space-x-4">
              <SignOut />
              <Link
                href={
                  "/profile/" +
                  props.userData?.firstName +
                  props.userData?.lastName
                }
                className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
              >
                {props.userData?.firstName + " " + props.userData?.lastName}{" "}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex-col flex h-screen items-center justify-between overflow-hidden">
        <Card
          isFooterBlurred
          className="bg-[#251E1E]  bg-gray-200 text-black w-[80%] h-[95%] text-sm items-center"
        >
          <CardBody id="message_body" className="overflow-auto scroll-smooth">
            <div className="h-full overflow-hidden py-4">
              <div className="h-full overflow-y-auto">
                {allMessages.length == 0 && loading == true ? (
                  <div className="flex justify-center items-center text-violet-700 font-bold text-lg">
                    We&apos;re waking up our ai! Give us a second!
                  </div>
                ) : null}
                <div className="grid grid-cols-12 gap-y-2">
                  {allMessages.map((item) =>
                    item.get("from") == "user" ? (
                      <div
                        key={item.get("message")}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center font-bold h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {props.userData.firstName.charAt(0) +
                              props.userData.lastName.charAt(0)}
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{item.get("message")}</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={item.get("message")}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black flex-shrink-0">
                            <Image
                              src="/aiOrb.gif"
                              width={35}
                              height={35}
                              alt="Logo Image"
                            />
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            {item.get("message") != null ||
                            item.get("message") != undefined
                              ? formatTextWithTailwind(item.get("message"))
                              : null}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {aiThinking ? (
                    <Skeleton
                      isLoaded={aiThinking}
                      className="col-start-6 col-end-13 p-3 rounded-lg"
                    >
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <Skeleton isLoaded={aiThinking} className="rounded-lg">
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-black flex-shrink-0">
                              <Image
                                src="/aiOrb.gif"
                                width={35}
                                height={35}
                                alt="Logo Image"
                              />
                            </div>
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <CircularProgress
                                aria-label="Loading..."
                                label={"Thinking..."}
                                color="secondary"
                              />
                            </div>
                          </div>
                        </Skeleton>
                      </div>
                    </Skeleton>
                  ) : null}
                  <div
                    ref={bottomMessage}
                    className="col-start-1 col-end-13 p-3 h-[8em] rounded-lg"
                  >
                    <div className="flex items-center justify-start flex-row-reverse"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="border-1 py-1 before:rounded-xl absolute bottom-5 p-2 border border-black text-black rounded-large w-[60%] shadow-small overflow-hidden ml-1 z-10">
            <Textarea
              variant="bordered"
              isDisabled={aiThinking || loading}
              ref={textareaRef}
              isInvalid={tokenCount > 100 ? true : false}
              errorMessage={tokenCount > 100 ? "Too many tokens!" : ""}
              onKeyDown={handleKeyDown}
              value={userMessage}
              onValueChange={setUserMessage}
              minRows={2}
              maxRows={4}
              endContent={
                <div className="flex justify-center items-center">
                  {aiThinking ? (
                    <CircularProgress
                      aria-label="Loading..."
                      color="secondary"
                    />
                  ) : (
                    <Button
                      role="button"
                      isDisabled={aiThinking || loading || tokenCount > 100}
                      onPress={handleSubmit}
                      onSubmit={handleSubmit}
                      isIconOnly
                      size="md"
                      variant="light"
                    >
                      <IoSend color="#000000" />
                    </Button>
                  )}
                </div>
              }
            />
          </CardFooter>
          {tokenCount} tokens of 100
        </Card>
      </div>
    </div>
  );
}
