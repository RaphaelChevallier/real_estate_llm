import Login from "@/components/Login";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserData } from "../../actions/getUserInfo";

export default async function LoginPage() {
  const session = await getServerSession();
  const userData = await getUserData(session?.user?.email);
  if (session && userData?.email) {
    revalidatePath("/chat");
    redirect("/chat");
  } else {
    return <Login />;
  }
}
