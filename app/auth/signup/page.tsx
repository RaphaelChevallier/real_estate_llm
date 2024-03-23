import Signup from "@/components/Signup";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserData } from "../../actions/getUserInfo";

async function refreshRoutes() {
  "use server";
  revalidatePath("/", "layout");
}

export default async function SignUpPage() {
  const session = await getServerSession();
  const userData = await getUserData(session?.user?.email);
  if (session && userData?.email) {
    revalidatePath("/", "layout");
    redirect("/chat");
  } else {
    return <Signup refreshRoutes={refreshRoutes} />;
  }
}
