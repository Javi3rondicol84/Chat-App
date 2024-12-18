type Messages = {
    loggedUser: string; 
    message: string; 
  }

export const getAllMessages = async (chatId: string) => {
    console.log("geeeeeeeeeet"+chatId);
    try {
        const response = await fetch('/api/chat/messages/getall?chatid='+chatId);
        
        if(!response.ok) {
            console.log("response is not ok");
        }

        const allMessages = await response.json();
        
        console.log(allMessages);
        return allMessages;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

export const saveMessageInDb = async (chatId: string, loggedUser: string, message: string) => {
    try {
        const response = await fetch('/api/chat/messages/saveMessage', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({chatId, loggedUser, message})
        });

        if(!response.ok) {
            console.log("error response");
            return;
        }

        console.log("message saved");
    }
    catch(err) {
        console.log("error saving massage: "+err);
        return;
    }

}