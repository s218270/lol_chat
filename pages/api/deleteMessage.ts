import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  success: boolean;
  error?: string; // Optional error message
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { messageId, session, champion } = req.body;
  //console.log("received", messageId, session, champion);

  if (!messageId) {
    res
      .status(400)
      .json({ success: false, error: "Please provide a message ID" });
    return;
  }

  try {
    // Delete the message
    await adminDb
      .collection("users")
      .doc(session.user.email)
      .collection("champions")
      .doc(champion)
      .collection("messages")
      .doc(messageId)
      .delete();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    res
      .status(500)
      .json({
        success: false,
        error: "An error occurred while deleting the message",
      });
  }
}
