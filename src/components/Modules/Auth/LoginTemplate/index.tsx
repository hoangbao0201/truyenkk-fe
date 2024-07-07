"use client";

import Link from "next/link";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ButtonAuth from "../ButtonAuth";
import { API_BASE_URL } from "@/lib/config";
interface LoginTemplateProps {
    token?: string;
    returnurl?: string;
}
const LoginTemplate = ({ token, returnurl }: LoginTemplateProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isError, setIsError] = useState<null | string>(null);
    const [dataLogin, setDataLogin] = useState({
        accout: "",
        password: "",
    });
    const [loadingLogin, setLoadingLogin] = useState(!!token);

    const eventChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setDataLogin({
            ...dataLogin,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        if (isError) {
            return;
        }
        const { accout, password } = dataLogin;
        if (!accout || !password) {
            setIsError("Chưa điền đầy đủ thông tin");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        if (accout.length < 3 || accout.length > 50) {
            setIsError("Tài khoản phải từ 3 đến 50 kí tự");
            setTimeout(() => {
                setIsError(null);
            }, 5000);
            return;
        }
        setLoadingLogin(true);

        try {
            const { accout, password } = dataLogin;

            const result = await signIn("login-basic", {
                redirect: false,
                accout: accout,
                password: password,
            });
            setLoadingLogin(false);

            if (!result?.ok) {
                setIsError("Tài khoản hoặc mật khẩu không đúng");
                setTimeout(() => {
                    setIsError(null);
                }, 5000);
            } else {
                router.push(returnurl || "/");
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
        localStorage.setItem("returnurl", returnurl || "/");
        window.location.href = `${API_BASE_URL}/api/auth/google`;
    };
    // window.open(`${API_BASE_URL}/api/auth/google`, "_self", 'toolbar=no, scrollbars=yes, resizable=no, width=1000, height=auto')

    const handleLoginWithToken = async () => {
        if (!token) {
            return;
        }
        setLoadingLogin(true);
        try {
            const result = await signIn("login-token", {
                redirect: false,
                token: token,
            });

            setLoadingLogin(false);

            if (!result?.ok) {
                router.push("/auth/login");
            } else {
                router.push(localStorage.getItem('returnurl') || "/");
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (token) {
            handleLoginWithToken();
        }
    }, [token]);

    return (
        <>
            <div>
                <div
                    className="py-8"
                >
                    <div
                        className={`bg-white dark:bg-slate-800 rounded-md shadow-sm max-w-xl w-full mx-auto overflow-hidden ${
                            loadingLogin && "pointer-events-none opacity-70"
                        }`}
                    >
                        <div
                            className={`loading-bar dark:bg-slate-800 ${
                                !loadingLogin && "before:content-none"
                            }`}
                        ></div>
                        <div className="px-5 py-5">
                            <div className="mb-3">
                                <Link
                                    href={`/`}
                                    className="flex items-center justify-center"
                                >
                                    <Image
                                        unoptimized
                                        loading="lazy"
                                        width={100}
                                        height={100}
                                        alt="Logo TRUYENKK"
                                        src={`/static/images/logo.png`}
                                        className="w-8 h-8 object-cover"
                                    />
                                    <h1 className="ml-2 font-bold text-xl text-red-600 dark:text-white">
                                        TRUYENKK
                                    </h1>
                                </Link>
                            </div>
                            <div className="font-semibold text-center text-xl mb-5">
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
                                        className="border dark:border-gray-600 h-11 py-2 px-4 rounded-md w-full transition-all bg-[#e8f0fe] dark:bg-[#2e3d55] focus:border-blue-600 focus:outline outline-blue-600"
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
                                        className="border dark:border-gray-600 h-11 py-2 px-4 rounded-md w-full transition-all bg-[#e8f0fe] dark:bg-[#2e3d55] focus:border-blue-600 focus:outline outline-blue-600"
                                    />
                                </div>
                                <div className="mb-3 text-blue-600 dark:text-gray-100 flex items-center gap-4">
                                    {/* <Link aria-label={`Quên mật khẩu`} href={`/`}><span className="hover:underline">Quên mật khẩu</span></Link> */}
                                    <div className="text-red-500 line-clamp-none mr-auto">
                                        {isError}
                                    </div>
                                    <Link
                                        aria-label={`Đăng kí mới`}
                                        href={`/auth/register?returnurl=${
                                            pathname === "/auth/login" ||
                                            pathname === "/auth/register"
                                                ? returnurl || "/"
                                                : pathname
                                        }`}
                                    >
                                        <span className="hover:underline">
                                            Đăng kí mới
                                        </span>
                                    </Link>
                                </div>

                                <div className={``}>
                                    <div
                                        onClick={handleLogin}
                                        className={`mb-2 select-none bg-blue-600 hover:bg-blue-700 text-lg h-13 py-2 px-2 cursor-pointer text-center text-white rounded-md`}
                                    >
                                        Đăng nhập
                                    </div>
    
                                    <ButtonAuth
                                        // pointer-events-none opacity-50
                                        color="text-black dark:text-white text-[15px] leading-[44px] bg-white border dark:border-none hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-700/90"
                                        content="Đăng nhập với Google"
                                        linkIcon="/static/icons/google.svg"
                                        handle={handleSigninGoogle}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginTemplate;
