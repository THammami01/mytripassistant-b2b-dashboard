import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex items-center">
        <Image alt="logo" height={40} src="/logo192.png" width={40} />
        <p className="font-medium">
          MyTripAssistant <span className="text-gray-400">| B2B Dashboard</span>
        </p>
      </div>
    </div>
  );
}
