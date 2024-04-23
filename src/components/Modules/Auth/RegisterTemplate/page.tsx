"use client"

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

import ButtonAuth from "../ButtonAuth";
import authService from "@/services/auth.services";
import InputForm from "@/components/Share/InputForm";
import checkDataRegister from "@/utils/checkDataRegister";
import { API_BASE_URL } from "@/lib/config";

interface RegisterTemplateProps {
    token?: string
    returnurl?: string
}
const RegisterTemplate = ({ token, returnurl }: RegisterTemplateProps) => {
    const router = useRouter();
    
    const [isError, setIsError] = useState<{ [key: string]: string }>({});
    const [dataRegister, setDataRegister] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(!!token);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        delete isError[e.target.name]
        delete isError["common"]
        setDataRegister({
            ...dataRegister,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async () => {
        if(Object.keys(isError).length !== 0) {
            return;
        }
        const { name, email, password, rePassword } = dataRegister;
        const errors = checkDataRegister({ name, email, password, rePassword });
        
        if(Object.keys(errors).length !== 0) {
            setIsError(errors);
            return;
        }

        setLoadingLogin(true);
        try {

            const result = await authService.register({ name, email, password })
            setLoadingLogin(false);

            console.log(result)
            if(result?.success) {
                router.push(`/auth/login?returnurl=${returnurl}`); 
            }
            else if(!result?.success && result?.error ) {
                setIsError({ common: "Server đang bảo trì" })
            }
            else {
                setIsError({ common: result?.message })
            }
            
        } catch (error) {
            setLoadingLogin(false);
        }
    };

    const handleSigninGithub = async () => {
        signIn("github", { redirect: false });
    };

    // Handle Signin Google
    const handleSigninGoogle = async () => {
        localStorage.setItem("returnurl", returnurl || "/");
        window.location.href = `${API_BASE_URL}/api/auth/google`;
        // window.open(`${API_BASE_URL}/api/auth/google`, "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    };

    const handleLoginWithToken = async () => {
        if(!token) {
            return;
        }
        setLoadingLogin(true);
        try {
            const result = await signIn("login-token", {
                redirect: false,
                token: token
            });

            setLoadingLogin(false);

            if (!result?.ok) {
                router.push("/auth/login")
                setIsError({
                    common: "Tài khoản hoặc mật khẩu không đúng"
                });
                setTimeout(() => {
                    setIsError({});
                }, 5000);
            }
            else {
                router.push(localStorage.getItem('returnurl') || "/");
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(token) {
            handleLoginWithToken();
        }
    }, [token])

    return (
        <>
            <div>
                <div className="py-4" style={{ minHeight: "calc(100vh - 174px)" }}>
                    <div
                        className={`bg-white dark:bg-slate-800/70 rounded-md shadow-sm border max-w-xl w-full mx-auto overflow-hidden ${loadingLogin && "pointer-events-none opacity-70"}`}
                    >
                        <div
                            className={`loading-bar ${!loadingLogin && "before:content-none"}`}
                        ></div>
                        <div className="px-5 py-5">
                            <div className="mb-3">
                                <Link href={`/`} className="flex items-center justify-center">
                                    <Image
                                        unoptimized
                                        loading="lazy"
                                        width={100}
                                        height={100}
                                        alt="Logo TRUYENKK"
                                        src={`/static/images/logo.png`}
                                        className="w-8 h-8 object-cover"
                                    />
                                    <h1 className="ml-2 font-bold text-2xl text-red-600 dark:text-white">TRUYENKK</h1>
                                </Link>
                            </div>
                            <div className="font-semibold text-center text-2xl mb-5">
                                Đăng kí
                            </div>
                            <div className="mb-1">
                                <InputForm
                                    title="Tên"
                                    type="name"
                                    placehoder=""
                                    data={dataRegister?.name}
                                    setData={eventChangeValueInput}
                                    error={isError["name"]}
                                />
                                <InputForm
                                    title="Email"
                                    type="email"
                                    data={dataRegister?.email}
                                    setData={eventChangeValueInput}
                                    error={isError["email"]}
                                />
                                <InputForm
                                    title="Mật khẩu"
                                    type="password"
                                    data={dataRegister?.password}
                                    setData={eventChangeValueInput}
                                    error={isError["password"]}
                                />
                                <InputForm
                                    title="Nhập lại mật khẩu"
                                    type="rePassword"
                                    data={dataRegister?.rePassword}
                                    setData={eventChangeValueInput}
                                    error={isError["rePassword"]}
                                />
                            </div>
                            {isError["common"] && <div className="text-red-500 line-clamp-none mb-1">{isError["common"]}</div>}

                            <div className="pt-1">
                                <div
                                    onClick={handleRegister}
                                    className="mb-2 border select-none bg-blue-600 hover:bg-blue-700 active:bg-blue-700/90 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                                >
                                    Đăng kí
                                </div>
        
                                <ButtonAuth
                                    color="text-black bg-white hover:bg-gray-100"
                                    content="Đăng kí với Google"
                                    linkIcon="/static/icons/google.svg"
                                    handle={handleSigninGoogle}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterTemplate;