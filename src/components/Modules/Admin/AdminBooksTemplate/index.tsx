"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";

import Modal from "@/components/Share/Modal";
import ToggleCheck from "@/components/Share/ToggleCheck";
import IconLoadingSpin from "../../Icons/IconLoadingSpin";
import { NavPagination } from "@/components/Share/NavPagination";
import SkeletonAdminItemBook from "../../Skeleton/SkeletonAdminItemBook";
import adminService, { AdminGetBooksProps } from "@/services/admin.services";
import { RootStateTypeLoadingSlide, setTypeLoading } from "@/redux/typeLoadingSlide";

interface AdminBooksTemplateProps {
}
const AdminBooksTemplate = ({}: AdminBooksTemplateProps) => {
    
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const { nameTypeLoading } = useSelector(
        (state: RootStateTypeLoadingSlide) => state.typeLoading
    );
    
    const [page, setPage] = useState(1);
    const [isShow, setIsShow] = useState(false);
    const [dataBooks, setDataBooks] = useState<null | {
        countBook: number;
        books: AdminGetBooksProps[];
    }>(null);
    const [isFormDeleteBook, setIsFormDeleteBook] = useState<null | number>(null);

    // Event Get Books
    const eventGetBooks = async ({page = 1}: {page?: number}) => {
        if (status !== "authenticated") {
            return;
        }
        try {
            const booksRes = await adminService.findAllBooks({
                query: `?take=30&skip=${(page - 1) * 30}`,
                token: session?.backendTokens.accessToken,
            });

            if (booksRes?.success) {
                setDataBooks({
                    countBook: booksRes?.countBook,
                    books: booksRes?.books,
                });
            }
        } catch (error) {}
    };

    // Handle Check Great Book
    const handleCheckGreatBook = async (id: number) => {

        if (status !== "authenticated") {
            return;
        }

        if (id && dataBooks) {
            const findBookIndex = dataBooks?.books.findIndex(
                (book) => book?.bookId === id
            );
            if (findBookIndex !== -1) {
                const updateddataBooks = [...dataBooks?.books]; // Copy the dataBooks array
                const bookUpdate = {
                    ...updateddataBooks[findBookIndex],
                    isGreatBook: !updateddataBooks[findBookIndex].isGreatBook,
                };
                updateddataBooks[findBookIndex] = bookUpdate;
                setDataBooks({
                    ...dataBooks,
                    books: updateddataBooks,
                });
                const check = await adminService.updateBook({
                    book: bookUpdate,
                    token: session?.backendTokens.accessToken,
                });
            }
        }
    };

    // Handle Change Page
    const handleChangePage = (page: number) => {
        setDataBooks(null);
        setPage(page);
        eventGetBooks({ page: page });
    };

    const handleDeleteBook = async (bookId: number) => {
        if (!session || status !== "authenticated") {
            return;
        }
        dispatch(setTypeLoading("button_delete_book"));

        try {
            const bookRes = await adminService.deleteBook({
                bookId: bookId,
                token: session?.backendTokens.accessToken,
            });

            if (bookRes.success && dataBooks) {
                const cvBooks = dataBooks?.books.filter(book => book?.bookId !== bookId);
                setDataBooks({
                    ...dataBooks,
                    books: cvBooks
                });
                setIsFormDeleteBook(null);
            }

            dispatch(setTypeLoading(""));
        } catch (error) {}
    };

    useEffect(() => {
        eventGetBooks({});
    }, [status]);

    return (
        <>
            <div>
                <div className="bg-white dark:bg-slate-700 px-3 py-4 rounded-md shadow-sm">
                    <div className="mb-4 sticky top-[52px] bg-white dark:bg-slate-700 z-10 left-0 right-0 border rounded-md px-4 py-3 flex items-end">
                        <div className="font-semibold mr-4">Show/Hidden</div>
                        <ToggleCheck
                            checked={isShow}
                            handleChecked={() => setIsShow(state => !state)}
                        />
                    </div>

                    <div className="overflow-y-auto relative border rounded-md mb-5">
                        <table className="table-auto w-full">
                            <colgroup>
                                <col style={{minWidth: "10%"}} />
                                <col style={{minWidth: "10%"}} />
                                <col style={{minWidth: "20%"}} />
                                <col style={{minWidth: "15%"}} />
                                <col style={{minWidth: "15%"}} />
                            </colgroup>
                            <thead className="text-gray-600 bg-gray-100">
                                <tr className="whitespace-nowrap [&>th]:px-2 [&>th]:py-2 [&>th]:font-semibold">
                                    <th className="rounded-tl-md">Id</th>
                                    <th>Truyện</th>
                                    <th>Web cào</th>
                                    <th>Siêu phẩm</th>
                                    <th className="rounded-tr-md">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y text-sm">
                                {
                                    status === "authenticated" && (
                                        dataBooks ? (
                                            dataBooks?.books.map((book, index) => {
                                                return (
                                                    <tr
                                                        key={book?.bookId}
                                                        className="[&>td]:px-2 [&>td]:py-2 divide-x"
                                                    >
                                                        <td className="text-center">{book?.bookId}</td>
                                                        <td className="">
                                                            <div className="flex">
                                                                <div className="w-20 h-28 flex-shrink-0 rounded-md border overflow-hidden mr-2">
                                                                    <Image
                                                                        unoptimized
                                                                        loading="lazy"
                                                                        width={100}
                                                                        height={200}
                                                                        alt=""
                                                                        className={`w-20 h-28 object-cover ${!isShow && "blur-xl"}`}
                                                                        src={`https://d32phrebrjmlad.cloudfront.net/${book?.thumbnail}`}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 hover:underline line-clamp-2">
                                                                        <strong>
                                                                            <Link href={`/truyen/${book?.bookId}`} prefetch={false} target="_blank">
                                                                                {book?.title}
                                                                            </Link>
                                                                        </strong>
                                                                    </div>
                                                                    <div className="mb-1">Số chương: {book?._count.chapters || 0}</div>
                                                                    <div>Type: <strong>{book?.type}</strong></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="">
                                                            {book?.scrapedUrl}
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="flex justify-center">
                                                                <Suspense>
                                                                    <ToggleCheck
                                                                        checked={book?.isGreatBook}
                                                                        handleChecked={() => handleCheckGreatBook(book?.bookId)}
                                                                    />
                                                                </Suspense>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="space-y-1">
                                                                <button onClick={() => setIsFormDeleteBook(book?.bookId)} className="btn bg-red-500 hover:bg-red-600 text-white">Xóa</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <SkeletonAdminItemBook count={20} />
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
    
                    {dataBooks && (
                        <NavPagination
                            currentPage={page}
                            countPage={Math.ceil(dataBooks?.countBook / 30)}
                            handleChangePage={handleChangePage}
                        />
                    )}
                </div>
            </div>
            {
                isFormDeleteBook && (
                    <Modal
                        size="medium"
                        title="Xóa truyện?"
                        isOpen={!!isFormDeleteBook}
                        setIsOpen={(type) => setIsFormDeleteBook(null)}
                    >
                        <div className="">
                            Bạn không thể khôi phục truyện này nếu xóa đi.
                        </div>

                        <div className="text-right mt-4 flex justify-end">
                            <button
                                title="Nút hủy phương thức"
                                onClick={() => setIsFormDeleteBook(null)}
                                className="py-2 px-3 rounded-md border text-black bg-white hover:bg-gray-200 min-w-20"
                            >
                                Hủy
                            </button>
                            <button
                                title="Nút xóa bình luận"
                                onClick={() => handleDeleteBook(isFormDeleteBook)}
                                className="py-2 px-3 flex items-center justify-center space-x-2 rounded-md border text-white bg-indigo-600 hover:bg-indigo-700 min-w-20 ml-2"
                            >
                                <span>Xóa</span>
                                {nameTypeLoading === "button_delete_book" && (
                                    <IconLoadingSpin size={14} />
                                )}
                            </button>
                        </div>
                    </Modal>
                )
            }
        </>
    );
};

export default AdminBooksTemplate;