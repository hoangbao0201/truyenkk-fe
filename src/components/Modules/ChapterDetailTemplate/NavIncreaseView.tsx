"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import bookService from "@/services/book.services";

interface NavIncreaseViewProps {
    bookId: number
    chapterNumber: number
}
const NavIncreaseView = ({ bookId, chapterNumber }: NavIncreaseViewProps) => {
    const { data: session, status } = useSession();
    useEffect(() => {
        let timerId: NodeJS.Timeout;
    
        const handleReadTime = () => {
            timerId = setTimeout(() => {
                increaseView(bookId, chapterNumber);
            }, 15000);
        };
    
        handleReadTime();
    
        return () => clearTimeout(timerId);
    }, [status]);

    const increaseView = async (bookId: number, chapterNumber: number) => {
        try {
            const bookRes = await bookService.increaseView({ bookId: bookId, chapterNumber: chapterNumber, token: status === "authenticated" ? session?.backendTokens.accessToken : undefined });
        } catch (error) {
        }
    };

    return (
        <div></div>
    )
}

export default NavIncreaseView;