"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import userService from "@/services/user.services";
import InputForm from "@/components/Share/InputForm";
import IconLoadingSpin from "../../Icons/IconLoadingSpin";

const UserProfileTemplate = () => {
    const { data: session, status, update } = useSession();
    const [dataUpdate, setDataUpdate] = useState({
        name: "",
        email: "",
    });
    const [isLoad, setIsLoad] = useState(false);
    const [isError, setIsError] = useState<{ [key: string]: string }>({});
    const [isSuccess, setIsSuccess] = useState<null | string>(null);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        delete isError[e.target.name]
        delete isError["common"]
        setIsSuccess(null);
        setDataUpdate({
            ...dataUpdate,
            [e.target.name]: e.target.value,
        });
    };

    // Handle Update User
    const handleUpdate = async () => {
        const { name } = dataUpdate;
        if(status !== "authenticated" || session?.user.name === name) {
            return;
        }

        let errors: { [key: string]: string } = {};
        if(name.length < 4 || name.length > 20) {
            errors.name = "Tên phải có từ 4 đến 20 ký tự.";
        }
        if(Object.keys(errors).length !== 0) {
            setIsError(errors);
            return;
        }
        setIsLoad(true);
        try {
            const userRes = await userService.updateName({
                name: name,
                token: session?.backendTokens.accessToken
            });

            if(userRes?.success) {
                console.log("name: ", name);
                console.log("session: ", session);
                let newSS = { ...session };
                newSS.user.name = name;
                await update({ ...newSS });
                setIsSuccess("Cập nhật thành công");
            };

            setIsLoad(false);
        } catch (error) {
            setIsLoad(false);
        }
    }

    useEffect(() => {
        if(status === "authenticated") {
            setDataUpdate({
                name: session?.user.name,
                email: session?.user.email,
            })
        }
    }, [session]);

    console.log(dataUpdate)

    return (
        <div>
            <h1 title="THÔNG TIN CHUNG" className="postname">
                THÔNG TIN TÀI KHOẢN
            </h1>
            <div className="mb-1">
                <InputForm
                    title="Tên"
                    type="name"
                    placehoder=""
                    data={dataUpdate?.name}
                    setData={eventChangeValueInput}
                    error={isError["name"]}
                />
                <InputForm
                    title="Email"
                    type="email"
                    data={session?.user.email}
                    setData={() => {}}
                    disabled={true}
                    error={isError["email"]}
                />
                {isError["common"] && <div className="text-red-500 line-clamp-none mb-1">{isError["common"]}</div>}
                {isSuccess && <div className="text-green-500 line-clamp-none mb-1">{isSuccess}</div>}
                {/* <div
                    onClick={handleUpdate}
                    className="mb-2 border select-none bg-blue-600 hover:bg-blue-700 active:bg-blue-700/90 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                >
                    Cập nhật
                </div> */}
                <button
                    title="Nút cập nhật tên"
                    onClick={handleUpdate}
                    className="w-full select-none bg-blue-600 hover:bg-blue-700 active:bg-blue-700/90 text-lg h-11 px-2 cursor-pointer text-center text-white rounded-md flex items-center justify-center"
                >
                    {isLoad ? (
                        <IconLoadingSpin />
                    ) : (
                        "Cập nhật"
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserProfileTemplate;