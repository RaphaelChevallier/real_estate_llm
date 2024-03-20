import { getUserData } from "@/app/actions/getUserInfo";
import ProfilePage from "@/components/ProfilePage";
import { getServerSession } from "next-auth";

const handleGetUser = async () => {
  const session = await getServerSession();
  const user = await getUserData(session?.user?.email);
  return user;
};

export default async function Profile() {
  const userData = await handleGetUser();
  return <ProfilePage userData={userData} />;
}
