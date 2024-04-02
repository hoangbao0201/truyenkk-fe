import { Fragment } from "react";

import CardBook from "@/components/Share/CardBook";
import SectionNavigation from "./SectionNavigation";
import { GetBooksProps } from "@/services/book.services";
import BoxHeading from "@/components/Share/BoxHeading";
import IconFireFlameCurved from "../Icons/IconFireFlameCurved";

interface HomeTemplateProps {
    countPage: number
    currentPage: number
    books: GetBooksProps[]
}
const HomeTemplate = async ({ countPage, currentPage, books }: HomeTemplateProps) => {

    return (
        <>
            <h1 className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center">
                <BoxHeading>
                    <IconFireFlameCurved size={32} className="py-1 fill-white"/>
                </BoxHeading>
                Truyện mới cập nhật
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-5 gap-y-3">
                {books && (
                    books.map((book, index) => {
                        return (
                            <Fragment key={book?.bookId}>
                                <CardBook book={book} />
                            </Fragment>
                        );
                    })
                )}
            </div>

            <div className="mt-4">
                <SectionNavigation countPage={countPage} currentPage={currentPage}/>
            </div>
        </>
    )
}

export default HomeTemplate;