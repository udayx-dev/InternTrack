export const STATUS_COLUMNS = ["Applied", "OA", "Interview", "Offer", "Rejected"];

export const STATUS_STYLES = {
  Applied:   { bg: "bg-blue-100",   text: "text-blue-800",   dot: "bg-blue-500"   },
  OA:        { bg: "bg-purple-100", text: "text-purple-800", dot: "bg-purple-500" },
  Interview: { bg: "bg-amber-100",  text: "text-amber-800",  dot: "bg-amber-500"  },
  Offer:     { bg: "bg-green-100",  text: "text-green-800",  dot: "bg-green-500"  },
  Rejected:  { bg: "bg-red-100",    text: "text-red-800",    dot: "bg-red-500"    },
};

export const COLUMN_HEADERS = {
  Applied:   { label: "Applied",   emoji: "📤" },
  OA:        { label: "Online Assessment", emoji: "📝" },
  Interview: { label: "Interview", emoji: "💬" },
  Offer:     { label: "Offer",     emoji: "🎉" },
  Rejected:  { label: "Rejected",  emoji: "❌" },
};