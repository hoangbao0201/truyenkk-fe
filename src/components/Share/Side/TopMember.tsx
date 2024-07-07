import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import userService, { GetTopMembersProps } from "@/services/user.services";

const TextLevel = dynamic(() => import("@/components/Share/TextLevel"), {
    ssr: false,
    loading: () => (
        <div className="w-[110px] h-[20px] my-[2px] rounded-sm bg-gray-300 animate-pulse"></div>
    ),
});

const SideTopMember = async () => {
    const { members }: { members: GetTopMembersProps[] } =
        await userService.topUsers({ revalidate: 24 * 60 });

    return (
        <>
            <ul className="divide-y">
                {members?.map((member, index) => {
                    return (
                        <li key={member?.userId} className="py-2">
                            <div className="flex overflow-hidden">
                                <span
                                    className={`member-${
                                        index + 1
                                    } w-10 h-10 leading-10 text-lg text-center font-semibold`}
                                >
                                    0{index + 1}
                                </span>
                                <div className="mt-[5px] flex-shrink-0 mr-3">
                                    <Link
                                        aria-label={`${member?.userId}`}
                                        href={`/user/${member?.username}`}
                                    >
                                        <Image
                                            unoptimized
                                            width={60}
                                            height={60}
                                            loading="lazy"
                                            alt={`Ảnh người dùng ${member?.name}`}
                                            src={`${
                                                member?.avatarUrl
                                                    ? "https://d32phrebrjmlad.cloudfront.net/" +
                                                      member?.avatarUrl
                                                    : "/static/images/avatar_default.png"
                                            }`}
                                            className={`md:w-8 md:h-8 w-8 h-8 flex-shrink-0 block object-cover rounded-full`}
                                        />
                                    </Link>
                                </div>
                                <TextLevel
                                    item={member?.item}
                                    role={member?.role.roleName}
                                    rank={member?.rank}
                                >
                                    {member?.name}
                                </TextLevel>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default SideTopMember;
