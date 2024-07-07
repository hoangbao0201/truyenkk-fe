
// "use client"

// import { useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
// import calculateRank from "@/utils/calculateRank";
// import userService, { GetHistoryPaymentUserProps, GetHistoryUserProps } from "@/services/user.services";
// import Image from "next/image";
// import Link from "next/link";
// import { NavPagination } from "@/components/Share/NavPagination";
// import { NavButtonPagination } from "@/components/Share/NavButtonPagination";
// import formatFullDateTime from "@/utils/formatFullDateTime";

// const HistoryPaymentTemplate = () => {
//     const { data: session, status } = useSession();
//     const [page, setPage] = useState(1);
//     const [listHistory, setListHistory] = useState<null | { countPage: number, history: GetHistoryPaymentUserProps[] }>(null)

//     const getDataHistoryPayment = async (page?: number) => {
//         if(status !== "authenticated") {
//             return;
//         }
//         try {
//             const dataListHistoryRes = await userService.historyPayment({ take: 10, skip: ((page || 1) - 1)*10, token: session.backendTokens.accessToken });
//             if(dataListHistoryRes.success) {
//                 console.log("dataListHistoryRes: ", dataListHistoryRes)
//                 setListHistory({
//                     countPage: Math.ceil( (Number(dataListHistoryRes?.countHistoryPayment) || 1) / 10 ) || 1,
//                     history: dataListHistoryRes.history
//                 })
//             }
//             else {
//                 setListHistory({
//                     countPage: 1,
//                     history: []
//                 })
//             }
//         } catch (error) {
            
//         }
//     }

//     const handleChangePage = (page: number) => {
//         setPage(page);
//         setListHistory(null)
//         getDataHistoryPayment(page);
//     }

//     useEffect(() => {
//         getDataHistoryPayment();
//     }, [status])
    
//     return (
//         <div>
//             <h1
//                 title="THÔNG TIN CHUNG"
//                 className="postname"
//             >
//                 GIAO DỊCH
//             </h1>
//             <div>
//                 <div className="mb-7">
//                     <h3 className="posttitle">Lịch sử giao dịch</h3>
//                     <div className="my-3"><strong>Số lần giao dịch: </strong>{listHistory && listHistory.history.length}</div>
//                     <div className="divide-y">
                        
//                         {
//                             listHistory ? (
//                                 <div>
//                                     <div className="divide-y space-y-1 mb-4">
//                                         {
//                                             listHistory.history.map((history) => {
//                                                 return (
//                                                     <div key={String(history.createdAt)} className="flex items-center justify-between py-2 px-3 shadow rounded-md">
//                                                         <h4 className="font-semibold text-2xl text-green-500">+{history.price.toLocaleString("de-DE")} VNĐ</h4>
//                                                         <div className="">
//                                                             <p className="font-semibold">{formatFullDateTime(history.createdAt)}</p>
//                                                             {/* <Link href={`/truyen/${history.book.slug}-${history.book.bookId}/chapter-${history.chapterNumber}`}>
//                                                                 <h3 className="font-semibold mb-1">{history?.book.title}</h3>
//                                                             </Link>
//                                                             <p>Đọc chương: {history?.chapterNumber}</p> */}
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                     <NavButtonPagination
//                                         countPage={listHistory?.countPage}
//                                         currentPage={page}
//                                         handleChangePage={handleChangePage}
//                                     />
//                                 </div>
//                             ) : (
//                                 <div>Loading</div>
//                             )
//                         }
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default HistoryPaymentTemplate;
