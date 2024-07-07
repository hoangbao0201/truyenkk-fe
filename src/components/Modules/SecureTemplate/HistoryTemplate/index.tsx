// "use client"

// import { useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
// import calculateRank from "@/utils/calculateRank";
// import userService, { GetHistoryUserProps } from "@/services/user.services";
// import Image from "next/image";
// import Link from "next/link";
// import { NavPagination } from "@/components/Share/NavPagination";
// import { NavButtonPagination } from "@/components/Share/NavButtonPagination";

// const HistoryTemplate = () => {
//     const { data: session, status } = useSession();
//     const [page, setPage] = useState(1);
//     const [listHistory, setListHistory] = useState<null | { countPage: number, history: GetHistoryUserProps[] }>(null)

//     const getDataHistoryReal = async (page?: number) => {
//         if(status !== "authenticated") {
//             return;
//         }
//         try {
//             const dataListHistoryRes = await userService.history({ take: 10, skip: ((page || 1) - 1)*10, token: session.backendTokens.accessToken });
//             if(dataListHistoryRes.success) {
//                 console.log("dataListHistoryRes: ", dataListHistoryRes)
//                 setListHistory({
//                     countPage: Math.ceil( (Number(dataListHistoryRes?.countRealBook) || 1) / 10 ) || 1,
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
//         getDataHistoryReal(page);
//     }

//     useEffect(() => {
//         getDataHistoryReal();
//     }, [status])
    
//     return (
//         <div>
//             <h1
//                 title="THÔNG TIN CHUNG"
//                 className="postname"
//             >
//                 THÔNG TIN ĐỌC
//             </h1>
//             <div>
//                 <div className="mb-7">
//                     <h3 className="posttitle">Lịch sử đọc</h3>
//                     <div className="divide-y">
//                         {
//                             listHistory ? (
//                                 <div>
//                                     <div className="divide-y">
//                                         {
//                                             listHistory.history.map((history) => {
//                                                 return (
//                                                     <div key={String(history.createdAt)} className="flex py-2 px-3">
//                                                         <Link href={`/truyen/${history.book.slug}-${history.book.bookId}/chapter-${history.chapterNumber}`}>
//                                                             <Image
//                                                                 unoptimized
//                                                                 width={100}
//                                                                 height={100}
//                                                                 alt=""
//                                                                 className="w-20 rounded-md"
//                                                                 src={`https://d32phrebrjmlad.cloudfront.net/${history.book.thumbnail}`}
//                                                             />
//                                                         </Link>
//                                                         <div className="ml-3">
//                                                             <Link href={`/truyen/${history.book.slug}-${history.book.bookId}/chapter-${history.chapterNumber}`}>
//                                                                 <h3 className="font-semibold mb-1">{history?.book.title}</h3>
//                                                             </Link>
//                                                             <p>Đọc chương: {history?.chapterNumber}</p>
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

// export default HistoryTemplate;
