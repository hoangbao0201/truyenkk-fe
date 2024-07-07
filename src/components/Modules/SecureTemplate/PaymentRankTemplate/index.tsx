// "use client";

// import { ChangeEvent, useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
// import userService from "@/services/user.services";
// import IconLoadingSpin from "../../Icons/IconLoadingSpin";
// import Modal from "@/components/Share/Modal";
// import calculateRank from "@/utils/calculateRank";

// interface PaymentRankTemplateProps {
//     isSuccess: boolean
//     amount: number
// }
// const PaymentRankTemplate = ({ isSuccess, amount }: PaymentRankTemplateProps) => {
//     const { data: session, status, update } = useSession();

//     console.log("isSuccess: ", isSuccess)

//     const [price, setPrice] = useState("");
//     const [dataAmount, setDataAmount] = useState(amount);
//     const [isFormSuccess, setIsFormSuccee] = useState(isSuccess);
//     const [loadingPaymentRank, setLoadingPaymentRank] = useState(false);
//     const [isError, setIsError] = useState<null | string>(null);

//     const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setPrice(value);
//     };

//     const handlePaymentRank = async () => {
//         if(status !== "authenticated") {
//             return;
//         }
//         if(price.length === 0) {
//             alert("Số điểm nhập vào không hợp lệ");
//             return;
//         }
//         if(parseInt(price) <= 5) {
//             alert("Số điểm nhập vào phải trên 5");
//             return;
//         }
//         setLoadingPaymentRank(true);
//         try {
//             console.log("price: ", price)
//             const priceCv = parseInt(price);
//             const paymentRes = await userService.paymentRank({ token: session?.backendTokens.accessToken, price: priceCv*1000 / 2 });

//             if(paymentRes?.success) {
//                 window.location.href = `${paymentRes?.data.order_url}`;
//             }
//             else { 

//             }
//             setLoadingPaymentRank(false);
//         } catch (error) {
//             setLoadingPaymentRank(false);
//         }
//     }

//     const handleUpRank = async () => {
//         if(status !== "authenticated") {
//             return;
//         }
//         try {
//             let newSS = { ...session };
//             newSS.user.rank = session.user?.rank + amount/500;
//             console.log("newSS: ", newSS);
//             console.log("amount: ", amount/500);
//             await update({ ...newSS });
//             setDataAmount(0);
//             await userService.historyPaymentPost({ token: session.backendTokens.accessToken, price: amount });
//         } catch(error) {

//         }
//     }

//     useEffect(() => {
//         if(dataAmount > 1000 && !isFormSuccess) {
//             handleUpRank();
//         }
//     }, [dataAmount, status, isFormSuccess])

//     return (
//         <div>
//             <h1 title="THÔNG TIN CHUNG" className="postname">
//                 Mua điểm thưởng
//             </h1>
//             <div>
//                 <div className="mb-7">
//                     <h3 className="posttitle">Số điểm hiện có</h3>
//                     <div><span className="font-semibold text-xl">{session?.user.rank}</span> điểm</div>
//                 </div>
//                 <div className="mb-7">
//                     <h3 className="posttitle">Chi tiết mua điểm thưởng</h3>
//                     <div>
//                         <div>
//                             <div className="mb-2">
//                                 <label className="mb-1 block font-semibold">Số điểm cần tăng: </label>
//                                 <input
//                                     value={parseInt(price)}
//                                     type="number"
//                                     onChange={onChangePrice}
//                                     className="border h-10 px-4 rounded-md outline-none w-full null"
//                                 />
//                             </div>
//                             <label className="mb-1 block font-semibold">Giá tiền:</label>
//                             <div className="mb-2">
//                                 <div
//                                     className="border px-4 py-3 outline-none w-full flex flex-col items-center justify-center text-white bg-indigo-500 rounded-lg"
//                                 >
//                                     <p className="text-xl">Thành tiền: {Math.round((parseInt(price) || 0)*1000 / 2).toLocaleString("de-DE")} VNĐ</p>
//                                     {
//                                         status === "authenticated" && (
//                                             <div>
//                                                 Sẽ được thăng lên cấp: {price.length > 0 && calculateRank(parseInt(price) + session?.user.rank).level || calculateRank(session?.user.rank).level}
//                                             </div>
//                                         )
//                                     }
//                                     <p>Với giá 500đ / điểm</p>
//                                 </div>
//                             </div>

//                             {/* <div>
//                                 {
//                                     status === "authenticated" && <ListRankPayment currentRank={session?.user.rank}/>
//                                 }
//                             </div> */}

//                             <div className="mb-3 text-blue-600 dark:text-gray-100 flex items-center gap-4">
//                                 <div className="text-red-500 line-clamp-none mr-auto">
//                                     {isError}
//                                 </div>
//                             </div>
//                             <button onClick={handlePaymentRank} className=" min-w-[150px] text-white bg-blue-500 hover:bg-blue-600 rounded-md h-[40px] px-2 flex justify-center items-center">
//                                 {
//                                     loadingPaymentRank ? (
//                                         <IconLoadingSpin />
//                                     ) : (
//                                         <>Mua ngay</>
//                                     )
//                                 }
//                             </button>

//                             <Modal
//                                 title="Thành công tăng điểm"
//                                 isOpen={!!isFormSuccess}
//                                 setIsOpen={(type) => setIsFormSuccee(false)}
//                             >
//                                 <div className="text-center">
//                                     <p>Chúc mừng bạn đã nhận được {Math.round(dataAmount/500).toLocaleString("de-DE")} điểm</p>
//                                 </div>
//                             </Modal>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentRankTemplate;
