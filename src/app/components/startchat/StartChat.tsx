"use client";
import { createChat } from "@/app/utils/apiChat";

const StartChat = async (userLoggedId: number, userId: number) => {

    const chatId: string = await createChat(userLoggedId, userId);

    return chatId;
}


export default StartChat;