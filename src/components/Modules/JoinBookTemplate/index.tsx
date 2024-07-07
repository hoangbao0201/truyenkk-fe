import { Fragment } from "react";

import CardBook from "@/components/Share/CardBook";
import BoxHeading from "@/components/Share/BoxHeading";
import { GetBooksProps } from "@/services/book.services";
import IconFireFlameCurved from "../Icons/IconFireFlameCurved";
import Breadcrumbs from "@/components/Share/BreadCrumbs";
import SectionNavigation from "../HomeTemplate/SectionNavigation";

interface JoinBookTemplateProps {
    tag: string;
    title: string;
    slug: string;
    countPage: number;
    currentPage: number;
    books: GetBooksProps[];
}
const JoinBookTemplate = async ({
    title,
    tag,
    slug,
    countPage,
    currentPage,
    books,
}: JoinBookTemplateProps) => {
    return (
        <>
        <div className="py-2">
            <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md mx-auto bg-white dark:bg-slate-900 md:rounded-md shadow py-3">
                <Breadcrumbs
                    listBreadcrumbs={[
                        {
                            title: title,
                            slug: `/${slug}${tag ? "-" + tag : ""}`,
                        },
                    ]}
                    className="mx-3 mb-3 pb-3"
                />
                <div className="px-3">
                    <article>
                        <h1 className="text-xl mb-3 text-red-600 dark:text-gray-100 font-semibold flex items-center">
                            <BoxHeading>
                                <IconFireFlameCurved
                                    size={32}
                                    className="py-1 fill-white"
                                />
                            </BoxHeading>
                            Truyện: {title}
                        </h1>
                        <p className="mb-4 text-[15px]">
                            Danh sách truyện {title} với hình ảnh nóng bỏng,
                            bản dịch tiếng việt chuẩn, chất lượng ảnh full HD mới
                            nhất tại TRUYENKK. Ngoài ra còn nhiều thể loại truyện
                            tranh như: manhwa, manhua... được cập nhật các chap mới liên tục mỗi ngày.
                        </p>
                    </article>
                    <div className="pb-3 grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-4 gap-y-3">
                        {books &&
                            books.map((book, index) => {
                                return (
                                    <Fragment key={book?.bookId}>
                                        <CardBook book={book} />
                                    </Fragment>
                                );
                            })}
                    </div>
                    <div className="py-4">
                        <SectionNavigation
                            countPage={countPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default JoinBookTemplate;
