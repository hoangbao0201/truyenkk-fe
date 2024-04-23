import { API_BASE_URL } from "@/lib/config";

export interface GetChatMessageProps {
    messageId: string
    socketId: string
    user: null | {
        userId: number
        name: string
        username: string
        role: "admin" | "editor" | "guest"
    }
    content: string
}
class ChatService {
    async findAllMessage(): Promise<any> {
        try {
            const messagesRes = await fetch(
                `${API_BASE_URL}/api/chat/messages`,
                {
                    method: "GET",
                    cache: "no-store",
                }
            );
            const messages = await messagesRes.json();
            return messages;
        } catch (error) {
            return {
                success: false,
                message: "error blog successful",
                error: error,
            };
        }
    }
}

const chatService = new ChatService();

export default chatService;
