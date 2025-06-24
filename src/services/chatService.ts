// src/services/chatService.ts
import { db } from "@/lib/firebase";
import { ref, push, onChildAdded, off, DataSnapshot } from "firebase/database";

export interface ChatMessage {
  senderId: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
}

export function sendMessage(companyId: string, message: ChatMessage) {
  const messagesRef = ref(db, `companies/${companyId}/messages`);
  return push(messagesRef, message);
}

export function listenForMessages(
  companyId: string,
  callback: (msg: ChatMessage) => void
): () => void {
  const messagesRef = ref(db, `companies/${companyId}/messages`);

  const listener = onChildAdded(messagesRef, (snapshot: DataSnapshot) => {
    const message = snapshot.val() as ChatMessage;
    callback(message);
  });

  return () => off(messagesRef, "child_added", listener);
}
