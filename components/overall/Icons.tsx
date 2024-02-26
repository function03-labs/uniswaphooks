import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Laptop,
  Loader2,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  Search,
  BookOpenText,
  LucideIcon,
  Github,
  MoreHorizontal,
  Equal,
} from "lucide-react";
import Image from "next/image";

export type Icon = LucideIcon;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  search: Search,
  gitHub: Github,
  twitter: X,
  check: Check,
  orderbook: BookOpenText,
  more: MoreHorizontal,
  equal: Equal,
  image: ImageIcon,
};

export function IconMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAIjUlEQVR4AZVXBXjjRhN1mTHgY74rMzMzMzMzN5bsJM4xlpmZ22NmZmZmjHclWTIlseafN3b/upBLq+/bT7j73s68AQXoqOieAT5UafhMuyRMusQgVRTyVWM+l/LAPUZx/r6IR+BVUq3N/PVLpBrlvzkkJN/It0EeR5eTOq6C1AmVpNqEfc3P7dIwAQuYgl1IAC81JrcyfSwiAMH8aGzmgPYJ8YJRkBBwfUU3Um150cMjpI4oxxyQkW9jgSd53M/jIR4v+rqRSXbxzgjAAgwUC7zgqxb8YTGDHchjlzKc+fnj5LwzgJLLt5A7aDq5I2aTHfmGnz+RH8+QasnzmplCzn69L7kj5/D5N9KXd/f1oWyBRjsj0DLCE18mfccbvvPxUNIXdMnt+PhK0tf04HevkDtqLmXqiNLxDKWrPfKmLiVvxnJKzFtDzht9sVMZ+s7XKW2nyO0/lccUkPEVP7ebM0aTfyCAh3axSbp1hPS1vf34l6PI6fUbQHmxN8ju/gvFPxtByRVbKO2kKK08SusEpRM1lHYzQsqbtDiniRZiRbbUZnIHTKXqwKWk9nw17wKzHgscygSasgsCZTz5YV9f0wsCEgIY2BVcYPf8SQAF3GNwK8lk+DrmMplaiv84nr97lNQ5nYRAJkPkfDoMevD1UeXEbq6HQFsmwODWld3JeuIDvzpwF096nlQ7nnAki+ukSr5/jqwXPmILpAXYHT6bUtscXAup5JrtpM7uxDu+iZyPh5A7eh5Zz3xE3rgFpC7tlnNBB17rgLJ/IHBKlAm8RNZNfSi1Pua7Q2eSvqUPgz4rKsZkmNWOfEWZLFFy2SYGupMSs1ZSJlknFkltiJE7eAbpm3tDjCDOc+4h563+TORDJvA02YdXgEA9GmiVE6H1ymd+YvYqSq2rpsSCtRTvO5msx95jwNvEnKntceyUQ7A7pTZbLEi2SMwj54PBZPdmrXwzhtTuISGvDjVYB9Pwra+wgfb1WeDQvAibmQgnn3fNYuxJzkeD2ZRzKblyq4CLJo6uJLvjdwyuJRqg9nS1S974haJ+VWrCXTxeEvD4V6OgH18fzhoINpQHgqzSvct81TYCRfPEx3jn53HcT6VM2qf4FyPIm7KEMqms7BzAEJ83eQmpczuzRj4Rl9mdvydvwiJy3h8kZFQzw9dNGoqCljlQffvrvvXy57lsd0FnirHv4j9PECCMvM/F7Nh9akec3L5TSB0TJYgXySoxcyXpq7sLuL6gKwTt6+bhnUQBNNCELbCbQdaLn/tIIJb5JamjKiSlxn8aTxkQAGg+B4j6cXbSkpTi340jtZ9BHqtfP/g2LMEuHMpWG0X6wm6wQP0ugAWQJnWpAfH41hMfkb6kK/I87+o6ju9xubhXeWAZQkBCMDF3NVlPvs9WKxNr6Mu7YfeICHbDYNLX9fKhH7tFpIFiVGQg9n11kBCR/B7/fixMzX6vK9y9DNzDJagNudzxFNm9fuE6MUcsJ/7nBCcuaNZQMQIBDhvV0vSR+RBmiUXrBcibuEhSLcBEfAAvIAFRggQIIF847w3MRcVV3XHPriz39UENleMik3SHiJROmDC1SUs1UywepFdkRnfgNAD+nQSGW0N29FtYToRrhb9CdEiZZvP7ulUYUbATAgczAa58DObbld9QgqtcNWcyscZlPXBGnSB1WkdCsUIahmvy9UA0kly1DTtGBCGE2RKDuH78zNeP+Po4zh+H1EOAxXeWfSgTENU/4Vtln5NtfpXzafnXUDjKtJRod9hMSi7diPD7mx6gE2RRFTSFPMq680Y/RISPzYEAsP5GwAkap1mHGKSPrZCsZYW/pPgvE7EbKUTOh0PIuv8dSTCZWoLPAYYI+IOEk5bs6I2dDxFCvJIJ1alRiuVdYLELgPUHgcCHe+CmutjoEDs4lLaPQ7v1RNYKfU6J+Wt54su59HtsFJZBpoOpAQRSaERwD2uAFITKO7+B1IWdST/6roQl1tAtwllYOFZqpIEFTMGmwC274WZLk+i+6qDQeu/4jhQDAeOLXHk9rQr+RMOJ6iY6SCxcx7VhC8oua6Ob+D9fE/L+foZDOSJClH6xuYmilPWC5Wha1wMLmIKNY2wgurvo4BCjb+1hnRjw+Vrr/rcRSpiAyehwEdMMejN6QTG55t5B+sTPhsMKIIA0LlGAflJf3xuRw/ND6LZra0uj8H/fQkw5KPC7EM2764rZBU2MGr1rSASo9gvBBRARp+hPpMtJrt5G0AiswfEtO7ae+1gKkzt8Ft8/QNZLn3H9mEj64XdJty1HU1tT17iKdJF5dyFmnkBgF5xXtntmL5jIK4GpQnWaTY4WW1/VA90PGlDe7TCSSnlKFYN+mhPpmVVsmRvJm7aUBTgv15K1iUhXbBsg+nKd17xCzL8y8MxehZiFVhCTMOBDFOyEvj6jmpjif/3gO+R8MhT5HV2QCMuu+o7cflywnv6I2/aQdEDojvR9b/3f7ArtF6xUFMpgTaxdiFV4FDICiaEyodhI5ki8wIvel4uGk+UvR0CsVz7nYoO27UFC3nAHTpf8r9pHRDfyT9E6nKRgZ8Kaf8cqOAqFYR0cPZgnrM4GqyhWbKQYMKtPZm1wHKt9Q7mFm4JYCOYWrbjDZrE1PoRQEXIgn401MVPZkirCWlizEKO+oyAvvNpElZjLxBJFrIeDQmlWto9yjYHeHxaxQl9I5xPnSOB+EgLm/t9IM2gdlXYirIG1Ctdu8KDAo/LhtuDL+/ECPyF86oKykyyDp1WRUcOuyaLnc74YiT8ivr6nRrcOp/kfMlvH32MO5mKNwjX/9TGrYIJValzPCp6eLC0nWKQ2GCW3OAIrSB6IswtqT+gi75LF5YRvMedva/3XA2rlsevv95xMztHFZk9dYo5nkC2sdJ//irnKVWzR+4fG492OxmXnFszflRrw+f8AoTBnWX6MqToAAAAASUVORK5CYII="
      alt="UniswapHooks Logo"
      className={className}
      width={64}
      height={64}
      quality={100}
    />
  );
}
