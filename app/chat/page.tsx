import ChatRoom from "@/components/ChatRoom";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserData } from "../actions/getUserInfo";

export default async function Chat() {
  const session = await getServerSession();
  const userData = await getUserData(session?.user?.email);
  let freeTrial = false;
  if (
    userData &&
    new Date().getTime() - userData.createdAt.getTime() < 259200000
  ) {
    freeTrial = true;
    return <ChatRoom userData={userData} freeTrial={freeTrial} />;
  } else if (userData && userData.isSubscribed && userData.stripeId) {
    return <ChatRoom userData={userData} freeTrial={freeTrial} />;
  } else {
    revalidatePath("/pricing");
    redirect("/pricing");
  }
}
