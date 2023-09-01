import { MessageService } from "../services/services.js";

export const  getMessageController= async(req, res)=>{
    try {
        const messages= await MessageService.getAll()
        res.render("chat", {messages})

    } catch (err) {
        res.status(500).json({status: "error", error: err.message})
    }

}