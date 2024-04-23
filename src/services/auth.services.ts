import axios from "axios";
import { API_BASE_URL } from "@/lib/config";

export interface GetTagsProps {
    tagId: number,
    name: string,
    slug: string,
    _count: {
        blogTags: number
    }
}
class AuthService {

    async login(data: { accout: string, password: string }): Promise<any> {
        try {
            const { accout, password } = data;
            const tagsRes = await axios.post(
                `${API_BASE_URL}/api/auth/login`,
                {
                    accout: accout,
                    password: password,
                }
            );
            return tagsRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
    async register(data: { name: string, email: string, password: string }): Promise<any> {
        try {
            const { name, email, password } = data;
            const registerRes = await axios.post(
                `${API_BASE_URL}/api/auth/register`,
                {
                    name: name,
                    email: email,
                    password: password,
                }
            );
            return registerRes.data;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }

    async loginWithToken(token: string): Promise<any> {
        try {
            const loginRes = await fetch(`${API_BASE_URL}/api/auth/login/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const login = await loginRes.json();
            return login;
        } catch (error) {
            return {
                success: false,
                message: "Login error",
                error: error,
            };
        }
    }
}

const authService = new AuthService();

export default authService;
