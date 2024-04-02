import { API_BASE_URL } from "@/lib/config";

class ImageServices {
    async uploadAvatar({ file, token }: { file: FormData, token: string }): Promise<any> {
        try {
            const imageRes = await fetch(`${API_BASE_URL}/api/users/upload-avatar`, {
                method: "POST",
                body: file,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const image = await imageRes.json();
            return image;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const imageService = new ImageServices();

export default imageService;
