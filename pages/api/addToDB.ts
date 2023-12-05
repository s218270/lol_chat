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
    const {prompt, champion, model, session} = req.body

    const message: Message = {
        text: prompt || 'Chat couldn\'t find an answer for that',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: 'ChatGPT',
            name: 'ChatGPT',
            avatar: 'https://links.papareact.com/89k'
        }
    }

    //Ensure that session and session.users exist before accessing email
    if(res.status(504)){
        console.log('status 504');
    }
    if (session && session.user && session.user.email) {
        await adminDb.collection('users').doc(session.user.email).collection('champions').doc(champion).collection('messages').add(message)
        res.status(200).json({answer: message.text})
    } else {
        res.status(400).json({answer: 'Invalid session data. Could not save the message.'})
    }

}