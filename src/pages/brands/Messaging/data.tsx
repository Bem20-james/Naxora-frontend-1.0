import type { Conversation } from "./types";

const now = Date.now();
const mins = (n: number) => new Date(now - n * 60000).toISOString();
const hrs = (n: number) => new Date(now - n * 3600000).toISOString();
const days = (n: number) => new Date(now - n * 86400000).toISOString();

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv1",
    participantId: "brand1",
    participantName: "Lush Botanics",
    participantAvatar: "LB",
    participantColor: "#4ade80",
    participantRole: "brand",
    campaignId: "bc1",
    campaignTitle: "Botanical Serum Launch",
    lastMessage: "We'd love to see a 30-day transformation video!",
    lastMessageTime: mins(8),
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "brand1",
        content:
          "Hi! We're excited to have you on board for our Botanical Serum Launch.",
        type: "text",
        timestamp: hrs(2),
        read: true,
      },
      {
        id: "m2",
        senderId: "me",
        content:
          "Thank you! I've reviewed the brief and I'm really excited about this one.",
        type: "text",
        timestamp: hrs(1.8),
        read: true,
      },
      {
        id: "m3",
        senderId: "brand1",
        content:
          "Great! Here is the official campaign brief for your reference.",
        type: "text",
        timestamp: hrs(1.5),
        read: true,
      },
      {
        id: "m4",
        senderId: "brand1",
        content:
          "Botanical Serum Launch Campaign Brief\n\nObjective: Drive awareness and conversions for our Vitamin C + Hibiscus Brightening Serum.\n\nTone: Warm, educational, aspirational — not overly commercial.\n\nDeliverables:\n• 2× Instagram Reels\n• 1× TikTok video\n• 3× Stories\n\nKey Messages:\n• African botanical ingredients\n• 30-day visible transformation\n• Clean, dermatologist-tested formula\n\nDo Not:\n• Compare to competitor products\n• Make medical claims\n\nPayment: $1,200 upon content approval.",
        type: "brief",
        timestamp: hrs(1.4),
        read: true,
      },
      {
        id: "m5",
        senderId: "me",
        content: "Perfect, this is very clear. I'll start shooting next week.",
        type: "text",
        timestamp: hrs(1),
        read: true,
      },
      {
        id: "m6",
        senderId: "brand1",
        content: "We'd love to see a 30-day transformation video!",
        type: "text",
        timestamp: mins(8),
        read: false,
      },
    ],
  },
  {
    id: "conv2",
    participantId: "brand2",
    participantName: "FitFlow Apparel",
    participantAvatar: "FF",
    participantColor: "#f97316",
    participantRole: "brand",
    campaignId: "bc2",
    campaignTitle: "Spring Activewear Collection",
    lastMessage: "Can you confirm the posting schedule?",
    lastMessageTime: hrs(3),
    unread: 1,
    messages: [
      {
        id: "m7",
        senderId: "brand2",
        content: "Hey! We're thrilled you accepted our campaign invite.",
        type: "text",
        timestamp: days(2),
        read: true,
      },
      {
        id: "m8",
        senderId: "me",
        content:
          "Hi FitFlow! Yes, the collection looks amazing. Happy to create content.",
        type: "text",
        timestamp: days(1.9),
        read: true,
      },
      {
        id: "m9",
        senderId: "brand2",
        content: "Can you confirm the posting schedule?",
        type: "text",
        timestamp: hrs(3),
        read: false,
      },
    ],
  },
  {
    id: "conv3",
    participantId: "brand3",
    participantName: "NexTech Gear",
    participantAvatar: "NT",
    participantColor: "#60a5fa",
    participantRole: "brand",
    campaignId: "bc3",
    campaignTitle: "NexPod Pro Review",
    lastMessage: "Your review went live — the numbers look great!",
    lastMessageTime: days(1),
    unread: 0,
    messages: [
      {
        id: "m10",
        senderId: "brand3",
        content:
          "Your NexPod Pro review is scheduled — please confirm the go-live date.",
        type: "text",
        timestamp: days(3),
        read: true,
      },
      {
        id: "m11",
        senderId: "me",
        content: "Confirmed for this Friday at 6 PM.",
        type: "text",
        timestamp: days(2.9),
        read: true,
      },
      {
        id: "m12",
        senderId: "brand3",
        content: "Your review went live — the numbers look great!",
        type: "text",
        timestamp: days(1),
        read: true,
      },
    ],
  },
];
