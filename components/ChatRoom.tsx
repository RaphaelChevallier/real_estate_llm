"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Skeleton,
  Textarea,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Socket, io } from "socket.io-client";

export default function ChatRoom() {
  const socketRef = useRef<Socket | null>(null);
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [aiThinking, setAiThinking] = useState(false);
  const bottomMessage = useRef<HTMLDivElement | null>(null);
  const [userMessage, setUserMessage] = useState("");
  const [allMessages, setAllMessages] = useState<Map<string, string>[]>([]);

  useEffect(() => {
    bottomMessage.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [allMessages.length]);

  useEffect(() => {
    const socket = io("localhost:5001/", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {});

    setLoading(false);

    socket.on("disconnect", () => {});

    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Trigger the button click
      handleSubmit();
    }
  };

  useEffect(() => {
    socketRef.current?.on("data", (data: string) => {
      let chatMap = new Map<string, string>();
      chatMap.set("from", "ai");
      chatMap.set("message", data);
      setAllMessages([...allMessages, chatMap]);
      setAiThinking(false);
    });
  }, [socketRef, allMessages]);

  const handleSubmit = () => {
    if (!userMessage) {
      return;
    }
    setAiThinking(true);
    socketRef.current?.emit("data", userMessage);
    let chatMap = new Map<string, string>();
    chatMap.set("from", "user");
    chatMap.set("message", userMessage);
    setAllMessages([...allMessages, chatMap]);
    setUserMessage("");
  };

  const navigation = [
    // { name: "Pricing", href: "/pricing" },
    { name: "Contact Us", href: "/contactUs" },
    // { name: "Product", href: "/about" },
    // { name: 'About Us', href: '#' },
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
            <Link
              onClick={() => signOut()}
              href="/"
              className="text-sm font-semibold leading-6 text-gray-200 hover:scale-110"
            >
              Sign Out <span aria-hidden="true">&rarr;</span>
            </Link>
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
                {allMessages.length == 0 ? (
                  <div className="flex justify-center items-center text-violet-700 font-bold text-lg">
                    Write your first query and explore the world of real estate!
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
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            RC
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
                            <div>{item.get("message")}</div>
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
              isDisabled={aiThinking}
              ref={textareaRef}
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
                      isDisabled={aiThinking}
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
        </Card>
      </div>
    </div>
  );
}
