export type MessageType = "text" | "brief";

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  type: MessageType;
  timestamp: string; // ISO
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantColor: string;
  participantRole: "brand" | "creator";
  campaignId: string;
  campaignTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: ChatMessage[];
}
