"use server";

import { Fragment } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CardBook from "@/components/Share/CardBook";
import bookService, { GetBooksProps } from "@/services/book.services";
import SectionNavigation from "../HomeTemplate/SectionNavigation";

interface ListBookFollowProps {
    currentPage: number;
}
const ListBookFollow = async ({ currentPage }: ListBookFollowProps) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <div>Bạn chưa đăng nhập tài khoản!</div>;
    }

    const booksRes: {
        success: boolean;
        countPage: number;
        books: { book: GetBooksProps }[];
    } = await bookService.findAllBookFollow({
        query: `?take=12&skip=${(currentPage - 1) * 12}`,
        cache: "no-store",
        token: session?.backendTokens.accessToken,
    });

    return (
        <>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3">
                {booksRes?.success &&
                    booksRes?.books.map((book, index) => {
                        return (
                            <Fragment key={book?.book?.bookId}>
                                <CardBook book={book?.book} />
                            </Fragment>
                        );
                    })}
            </div>
            <div className="mt-4">
                <SectionNavigation
                    countPage={
                        Math.ceil((Number(booksRes?.countPage) || 1) / 12) || 1
                    }
                    currentPage={currentPage}
                />
            </div>
        </>
    );
};

export default ListBookFollow;
