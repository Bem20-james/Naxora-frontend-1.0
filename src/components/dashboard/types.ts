//Campaign Invite
export type CampaignStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "completed"
  | "draft"
  | "active"
  | "in_review"
  | "paused";

export interface Campaign {
  id: string;
  brand: string;
  brandLogo: string; // initials fallback
  brandColor: string;
  category: string;
  description: string;
  budget: number;
  deadline: string; // ISO date string
  deliverables: string[];
  requirements: string[];
  status: CampaignStatus;
  platforms: string[];
}

// Project (accepted campaign in progress)
export type ProjectStatus = "active" | "in_review" | "completed" | "paused";

export interface Project {
  id: string;
  brand: string;
  brandLogo: string;
  brandColor: string;
  category: string;
  description: string;
  budget: number;
  amountEarned: number;
  startDate: string;
  endDate: string;
  progress: number; // 0–100
  status: ProjectStatus;
  platforms: string[];
  deliverables: ProjectDeliverable[];
  analytics: ProjectAnalytics;
}

export interface ProjectDeliverable {
  id: string;
  label: string;
  done: boolean;
}

export interface ProjectAnalytics {
  views: number;
  clicks: number;
  conversions: number;
  engagement: number; // percentage
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  followers: number;
}

export interface CreatorProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  location: string;
  niche: string[];
  socialLinks: SocialLink[];
  joinedDate: string;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  label: string;
  last4: string;
  expiry?: string;
  isDefault: boolean;
}

export interface BrandProfile {
  id: string;
  companyName: string;
  logo: string; // initials fallback
  logoColor: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  teamSize: string;
  foundedYear: string;
  socialLinks: BrandSocialLink[];
  joinedDate: string;
}

export interface BrandSocialLink {
  platform: string;
  url: string;
  handle: string;
}

export type BrandCampaignStatus =
  | "draft"
  | "active"
  | "in_review"
  | "completed"
  | "paused";

export interface BrandCampaign {
  id: string;
  title: string;
  description: string;
  brief: string;
  status: BrandCampaignStatus;
  budget: number;
  budgetSpent: number;
  startDate: string;
  endDate: string;
  platforms: string[];
  targetNiches: string[];
  deliverables: string[];
  requirements: string[];
  applicationsCount: number;
  creatorsHired: number;
  analytics: CampaignAnalytics;
}

export interface CampaignAnalytics {
  impressions: number;
  reach: number;
  clicks: number;
  conversions: number;
  engagementRate: number; // %
  roi: number; // %
  weeklyData: WeeklyPoint[];
}

export interface WeeklyPoint {
  day: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

// Applications
export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "shortlisted";

export interface Application {
  id: string;
  campaignId: string;
  campaignTitle: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorColor: string;
  niche: string[];
  platforms: CreatorPlatform[];
  pitch: string;
  appliedDate: string;
  status: ApplicationStatus;
  proposedRate: number;
}

export interface CreatorPlatform {
  name: string;
  handle: string;
  followers: number;
}

// Creator Discovery
export interface DiscoverableCreator {
  id: string;
  name: string;
  avatar: string;
  color: string;
  location: string;
  niche: string[];
  bio: string;
  platforms: CreatorPlatform[];
  totalFollowers: number;
  avgEngagement: number; // %
  completedCampaigns: number;
  rating: number; // 0–5
  priceRange: string;
}

//Analytics Overview
export interface OverviewMetric {
  label: string;
  value: string | number;
  change: number; // % change vs last period
  positive: boolean;
}

// Transactions
export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  description: string;
  brand?: string;
  amount: number;
  type: TransactionType;
  date: string;
  status: "completed" | "pending" | "failed";
}

//Subscription Plans
export type PlanTier = "starter" | "growth" | "enterprise" | "business";

export interface Plan {
  id: PlanTier;
  name: string;
  price: number;
  //billingCycle: "monthly" | "yearly";
  features: string[];
  isCurrent: boolean;
  highlight?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  label: string;
  last4: string;
  expiry?: string;
  isDefault: boolean;
}

//Notifications
export type NotificationType =
  | "campaign_invite"
  | "application"
  | "payment"
  | "approval"
  | "system"
  | "reminder";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  actionPath?: string;
  avatarInitials?: string;
  avatarColor?: string;
}

export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  /** Custom cell renderer — receives the row, returns ReactNode */
  render?: (row: T) => React.ReactNode;
  /** Which field to use for plain text sorting/searching. Defaults to `key` */
  sortKey?: keyof T;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  /** Optional colour override for the icon */
  color?: string;
  hoverColor?: string;
  /** Hide action when this returns true */
  hidden?: (row: T) => boolean;
}

export interface FilterConfig {
  /** The column key to filter against */
  rowKey: string;
  /** Placeholder in the select when showing all */
  allLabel: string;
  /** Available filter option values */
  options: string[];
}

export interface DataTableProps<T extends { id: string | number }> {
  title?: string;
  subtitle?: string;
  columns: ColumnDef<T>[];
  rows: T[];
  actions?: RowAction<T>[];
  filters?: FilterConfig[];
  /** Show a search bar that searches across all string fields */
  searchable?: boolean;
  /** Rows per page. Defaults to 10 */
  pageSize?: number;
  /** Called when a row is clicked (outside action buttons) */
  onRowClick?: (row: T) => void;
  /** Extra content rendered in the header row (right side) */
  headerAction?: React.ReactNode;
  /** Empty state message */
  emptyMessage?: string;
}
