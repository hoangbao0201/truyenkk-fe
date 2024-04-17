"use client"

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

import { listIdToData } from "@/constants/data";
import CardBook from "@/components/Share/CardBook";
import { GetBooksProps } from "@/services/book.services";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import { NavPagination } from "@/components/Share/NavPagination";
import BoxHeading from "@/components/Share/BoxHeading";
import IconFireFlameCurved from "../Icons/IconFireFlameCurved";

interface BookTypeTemplateProps {
    genre: string
    countPage: number
    currentPage: number
    books: GetBooksProps[]
}
const BookTypeTemplate = ({ genre, books, countPage, currentPage }: BookTypeTemplateProps) => {
    const router = useRouter();

    // Handle Change Page
    const handleChangePage = (page: number) => {
        const queryC = `/tim-truyen/${genre}?page=${page}`;

        router.push(queryC);
    };

    return (
        <>
            <div className="py-2">
                <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-800 md:rounded-md shadow">
                    <Breadcrumbs
                        listBreadcrumbs={[
                            { title: "Tìm truyện", slug: "/tim-truyen" },
                            { title: listIdToData.hasOwnProperty(genre) ? listIdToData[genre as keyof typeof listIdToData].title : genre, slug: "/tim-truyen/" + genre },
                        ]}
                        className="mx-3 mb-3 py-3 rounded-t-md"
                    />

                    <h1 className="text-xl px-3 mb-4 text-red-600 dark:text-gray-100 font-semibold flex items-center">
                        <BoxHeading>
                            <IconFireFlameCurved size={32} className="py-1 fill-white"/>
                        </BoxHeading>
                        Truyện thể loại&nbsp;
                        <strong>{ listIdToData.hasOwnProperty(genre) ? listIdToData[genre as keyof typeof listIdToData].title : genre}</strong>
                    </h1>

    
                    <div className="pb-4 px-3">
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3">
                            {
                                books && books.map((book, index) => {
                                    return (
                                        <Fragment key={book?.bookId}>
                                            <CardBook book={book} />
                                        </Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
    
                    <div className="pb-4">
                        {
                            books && (
                                <NavPagination
                                    countPage={countPage}
                                    currentPage={currentPage}
                                    handleChangePage={handleChangePage}
                                />
                            )
                        }
                    </div>
    
                </div>
            </div>
        </>
    )
}

export default BookTypeTemplate;