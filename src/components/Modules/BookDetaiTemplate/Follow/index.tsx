"use client"

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import bookService, { GetBookProps } from "@/services/book.services";
import { useDebounceValue } from "usehooks-ts";

interface FollowProps {
    book: GetBookProps;
}

const Follow = ({ book }: FollowProps) => {
    const { data: session, status } = useSession();
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isFollow, setIsFollow] = useState<boolean>(false);

    const handleClickFollowBook = async () => {
        if(isFollow === null) {
            return;
        }
        if(status !== "authenticated") {
            alert("Bạn chưa đăng nhập tài khoản!");
            return;
        }
        setIsFollow(state => !state);
    }

    const handleActionFollowBook = async () => {
        if(isFollow === null || status !== "authenticated") {
            return;
        }
        try {
            const bookRes = await bookService?.actionFollow({ type: isFollow ? "follow" : "unfollow", bookId: book?.bookId, token: session?.backendTokens.accessToken });
        } catch (error) {
            
        }
    }

    const eventCheckFollowBook = async () => {
        setIsLoad(true);
        if(status !== "authenticated") {
            setIsFollow(false);
            setIsLoad(false);
            return;
        }
        try {
            const followingCheck = await bookService.checkFollow({
                bookId: book?.bookId,
                token: session.backendTokens.accessToken,
                cache: "no-store"
            });

            if(followingCheck?.success) {
                setIsFollow(followingCheck?.isFollowed ? true : false);
            }
            setIsLoad(false);
        } catch (error) {
            
        }
    }

    const userActionDebounce = useDebounceValue(JSON.stringify(isFollow), 1000);

    useEffect(() => {
        eventCheckFollowBook();
    }, [status])
    
    useEffect(() => {
        if(!isLoad) {
            handleActionFollowBook();
        }
    }, [userActionDebounce])

    if(isLoad) {
        return <div className="h-[36px] w-[110px]"></div>
    }

    return (
        <button onClick={handleClickFollowBook} title="Theo dõi truyện">
            <div className={clsx(
                "btn text-white",
                {
                    "bg-red-600 hover:bg-red-700": isFollow,
                    "bg-green-500 hover:bg-green-600": !isFollow,
                }
            )}>
                {isFollow ? "Bỏ theo dõi" : "Theo dõi"}
            </div>
        </button>
    )

};

export default Follow;
