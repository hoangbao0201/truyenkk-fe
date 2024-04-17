import adminService from "@/services/admin.services";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";


interface CloudBoxProps {
    bookId: number
}
const CloudBox = ({ bookId }: CloudBoxProps) => {
    const { data: session, status } = useSession();
    const [cloud, setCloud] = useState<string>("");
    const [countChange, setCountChange] = useState<number>(5);

    const eventOnchangeCloud = (e: ChangeEvent<HTMLInputElement>) => {
        setCloud(e.target.value);
    }

    const handleChangeCloudBook = async () => {
        if(status !== "authenticated") {
            return;
        }
        try {
            const bookRes = await adminService.changeCloudBook({
                bookId: bookId,
                email: cloud,
                token: session?.backendTokens.accessToken
            });

            console.log(bookRes);
        } catch (error) {
            
        }
    }
    const handleChangeCloudChapters = async () => {
        if(status !== "authenticated") {
            return;
        }
        try {
            const chaptersRes = await adminService.changeCloudChapters({
                bookId: bookId,
                email: cloud,
                take: 5,
                token: session?.backendTokens.accessToken
            });

            console.log(chaptersRes);
        } catch (error) {
            
        }
    }

    return (
        <div>
            <h3 className="font-semibold text-base mb-2">
                Chọn Cloud
            </h3>
            <div className="mb-3">
                <input
                    name="email"
                    value={cloud}
                    onChange={eventOnchangeCloud}
                    className={`border h-10 px-4 rounded-md w-full outline-none`}
                />
            </div>
            <h3 className="font-semibold text-base mb-2">
                Update Book
            </h3>
            <div className="mb-3 flex">
                <input
                    name="email"
                    value={cloud}
                    onChange={eventOnchangeCloud}
                    disabled={true}
                    className={`border h-10 px-4 rounded-md w-full outline-none bg-gray-200`}
                />
                <button
                    title="Nút thay đổi cloud book"
                    onClick={handleChangeCloudBook}
                    className="py-2 px-3 w-[150px] flex-shrink-0 flex items-center justify-center space-x-2 whitespace-nowrap rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                >
                    <span>Update Book</span>
                </button>
            </div>
            <h3 className="font-semibold text-base mb-2">
                Update Chapters
            </h3>
            <div className="mb-3 flex">
                <input
                    name="email"
                    value={cloud}
                    onChange={eventOnchangeCloud}
                    className={`border h-10 px-4 rounded-md w-full outline-none`}
                />
                <button
                    title="Nút thay đổi cloud chapter"
                    onClick={handleChangeCloudChapters}
                    className="py-2 px-3 w-[150px] flex-shrink-0 flex items-center justify-center space-x-2 whitespace-nowrap rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                >
                    <span>Update Chapter</span>
                </button>
            </div>
        </div>
    )
}

export default CloudBox;