import axios from "axios";

export async function sendToWebhook(url: string, ...msg: any[]) {
    //send the timestamp and the args to the webhook
    try {
        await axios.post(url, {
            method: "POST",
            body: {
              content: msg
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.fatal("Error sending to webhook", err);
    }
}