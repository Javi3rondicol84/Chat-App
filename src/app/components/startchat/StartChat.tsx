"use client";
import { createChat } from "@/app/utils/apiChat";

const StartChat = async (userLoggedId: number, userId: number) => {

    type Data = {
        
    }

    const response: boolean = await createChat(userLoggedId, userId);

    return response;
}


export default StartChat;