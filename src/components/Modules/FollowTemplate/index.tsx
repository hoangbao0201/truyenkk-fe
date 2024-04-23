import CardBook from "@/components/Share/CardBook";
import { GetBooksProps } from "@/services/book.services";
import { Fragment } from "react";

interface FollowTemplateProps {
    books: GetBooksProps[]
}
const FollowTemplate = ({ books }: FollowTemplateProps) => {

    return (
        <div className="py-2">
            <div className="xl:max-w-screen-lg lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-900 md:rounded-md shadow">
                
                <div className="py-4 lg:flex">
                    <div className="lg:w-8/12 px-3 mb-5">
                        <h2 className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold">
                            Truyện đang theo dõi
                        </h2>
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
                            {/* <SectionNavigation countPage={countPage} currentPage={currentPage}/> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FollowTemplate;