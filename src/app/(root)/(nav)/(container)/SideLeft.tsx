import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import commentService, { GetCommentsProps } from "@/services/comment.services";

const TextLevel = dynamic(() => import('@/components/Share/TextLevel'), { ssr: false, loading: () => <div className="w-[110px] h-[20px] my-[2px] rounded-sm bg-gray-300 animate-pulse"></div> });

const SideLeft = async () => {
    const { comments }: { comments: GetCommentsProps[] } =
        await commentService.findAll({ query: "?take=5", revalidate: 10 * 60 });

    return (
        <>
            <ul className="divide-y">
                {comments?.map((comment, index) => {
                    return (
                        <li key={comment?.commentId} className="py-2">
                            <div className="flex overflow-hidden">
                                <div className="mt-[5px] flex-shrink-0">
                                    <Link
                                        aria-label={`${comment?.sender.name}`}
                                        href={`/user/${comment?.sender.username}`}
                                    >
                                        <Image
                                            unoptimized
                                            width={60}
                                            height={60}
                                            loading="lazy"
                                            alt={`Ảnh người dùng ${comment?.sender.name}`}
                                            src={
                                                "/static/images/avatar_default.png"
                                            }
                                            className={`md:w-8 md:h-8 w-8 h-8 flex-shrink-0 block object-cover rounded-full`}
                                        />
                                    </Link>
                                </div>
                                <div className="ml-2 flex-1">
                                    <div className="whitespace-nowrap line-clamp-1 flex items-center">
                                        <TextLevel
                                            role={comment?.sender.role.roleName}
                                            rank={comment?.sender.rank}
                                        >
                                            {comment?.sender.name}
                                        </TextLevel>
                                        
                                        <Link
                                            href={`/truyen/${comment?.bookId}${
                                                comment?.chapterNumber
                                                    ? "/" +
                                                      comment?.chapterNumber
                                                    : ""
                                            }#comment`}
                                            className="text-blue-500 text-sm hover:underline ml-2"
                                        >
                                            xem
                                        </Link>
                                    </div>
                                    <div
                                        className="relative overflow-hidden"
                                        dangerouslySetInnerHTML={{
                                            __html: JSON.parse(comment?.commentText),
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default SideLeft;
