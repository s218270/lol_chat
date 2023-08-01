import query from "../../lib/queryApi"
import type { NextApiRequest, NextApiResponse } from "next"
import admin from 'firebase-admin'
import { adminDb } from "@/firebaseAdmin"

type Data = {
    answer: string
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {prompt, chatId, model, session} = req.body

    if(!prompt){
        res.status(400).json({answer: 'Please provide a prompt'})
        return
    }
    if(!chatId){
        res.status(400).json({answer: 'Please provide a valid chatId!'})
        return
    }

    //ChatGPT query
    const response = await query(prompt, chatId, model)

    const message: Message = {
        text: response || 'Chat couldn\'t find and answer for that',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://links.papareact.com/89k'
        }
    }

    // Ensure that session and session.users exist before accessing email
    if (session && session.user && session.user.email) {
        await adminDb.collection('users').doc(session.user.email).collection('chats').doc(chatId).collection('messages').add(message)
        res.status(200).json({answer: message.text})
    } else {
        res.status(400).json({answer: 'Invalid session data. Could not save the message.'})
    }
}