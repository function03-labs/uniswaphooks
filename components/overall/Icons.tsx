import {
  AlertTriangle,
  ArrowRight,
  ChevronDown,
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
  X,
  Search,
  BookOpenText,
  LucideIcon,
  GithubIcon as Github,
  MoreHorizontal,
  Equal,
  Copy,
  Check as CheckIcon,
  BookCheck,
  UserRound,
  LibrarySquare,
  Link,
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
  copy: Copy,
  checkIcon: CheckIcon,
  chevronDown: ChevronDown,
  book: BookCheck,
  user: UserRound,
  library: LibrarySquare,
  link: Link,
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
      src="/uniswap-hooks-logo.png"
      alt="UniswapHooks Logo"
      className={className}
      width={64}
      height={64}
      quality={100}
    />
  );
}

export function LogoImage({ className }: { className?: string }) {
  return (
    <Image
      src="/uniswap-hooks-logo.png"
      alt="UniswapHooks Logo"
      className={className}
      width={64}
      height={64}
      quality={100}
    />
  );
}
