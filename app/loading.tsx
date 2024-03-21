import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="bg-[#251E1E] flex-col flex h-screen items-center justify-center overflow-hidden">
      <CircularProgress />
    </div>
  );
}
