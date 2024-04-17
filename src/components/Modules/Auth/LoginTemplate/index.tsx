"use client"

import Link from "next/link";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import ButtonAuth from "../ButtonAuth";
import { API_BASE_URL } from "@/lib/config";

interface LoginTemplateProps {
    token?: string
    returnurl?: string
}
const LoginTemplate = ({ token, returnurl }: LoginTemplateProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, status, update } = useSession();
    const [isError, setIsError] = useState<null | string>(null);
    const [dataLogin, setDataLogin] = useState({
        accout: "",
        password: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(false);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        const { accout, password } = dataLogin;
        if(isError) {
            return;
        }
        if(!accout || !password) {
            setIsError("Chưa điền đầy đủ thông tin");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        if(accout.length<3 || accout.length>50) {
            setIsError("Tài khoản phải từ 3 đến 50 kí tự");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        setLoadingLogin(true);
        
        try {
            const { accout, password } = dataLogin;

            const result = await signIn("credentials", {
                redirect: false,
                accout: accout,
                password: password,
            });
            setLoadingLogin(false);

            // console.log(result)
            // if(!result?.ok)
            if (!result?.ok) {
                setIsError("Tài khoản hoặc mật khẩu không đúng");
                setTimeout(() => {
                    setIsError(null);
                }, 5000);
            }
            else {
                router.push(returnurl || "/")
            }
        } catch (error) {
            setLoadingLogin(false);
        }
    };

    // Handle Signin Github
    const handleSigninGithub = async () => {
        signIn("github", { redirect: false });
    };

    // Handle Signin Google
    const handleSigninGoogle = async () => {
        // window.location.href = `${API_BASE_URL}/api/auth/google`;
        window.open(`${API_BASE_URL}/api/auth/google`, "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')
    };

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
                                Đăng nhập
                            </div>
                            <div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="idInputAccout"
                                        className="select-none cursor-pointer mb-1 block"
                                    >
                                        Tài khoản
                                    </label>
                                    <input
                                        id="idInputAccout"
                                        name="accout"
                                        value={dataLogin.accout}
                                        onChange={eventChangeValueInput}
                                        className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                    />
                                </div>
                                <div className="mb-3 relative">
                                    <label
                                        htmlFor="idInputPassword"
                                        className="select-none cursor-pointer mb-1 block"
                                    >
                                        Mật khẩu
                                    </label>
                                    <input
                                        id="idInputPassword"
                                        name="password"
                                        type="password"
                                        value={dataLogin.password}
                                        onChange={eventChangeValueInput}
                                        className="border h-11 py-2 px-4 rounded-md w-full transition-all focus:border-blue-600 focus:outline outline-blue-600"
                                    />
                                </div>
                                <div className="mb-3 text-blue-600 dark:text-gray-100 flex items-center gap-4">
                                    {/* <Link aria-label={`Quên mật khẩu`} href={`/`}><span className="hover:underline">Quên mật khẩu</span></Link> */}
                                    <div className="text-red-500 line-clamp-none mr-auto">{isError}</div>
                                    <Link aria-label={`Đăng kí mới`} href={`/auth/register?returnurl=${(pathname === "/auth/login" || pathname === "/auth/register") ? returnurl || "/" : pathname}`}><span className="hover:underline">Đăng kí mới</span></Link>
                                </div>
    
                                <div
                                    onClick={handleLogin}
                                    className="mb-2 select-none border bg-blue-600 hover:bg-blue-700 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md"
                                >
                                    Đăng nhập
                                </div>
                                
                                <ButtonAuth
                                    color="text-black bg-white shadow hover:bg-gray-100 pointer-events-none opacity-50"
                                    content="Google"
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

export default LoginTemplate;