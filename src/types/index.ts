export type UserRole = "OWNER" | "MANAGEMENT" | "CASHIER" | "DEVELOPER";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  password?: string;
  lastLoginAt?: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  };
  token: string;
  expiresAt: number; // Timestamp in milliseconds (30 minutes expiry per PRD-F-13)
}

export interface OperatingHours {
  weekday: string;
  weekend: string;
  isOpenToday: boolean;
}

export interface CafeSettings {
  id: number;
  cafeName: string;
  tagline: string;
  storyTitle: string;
  storyText: string;
  features: string[];
  address: string;
  mapsEmbedUrl: string;
  mapsLinkUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
  operatingHours: OperatingHours;
  heroCaptionTitle: string;
  heroCaptionDesc: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  tempOptions?: string[];
  badge?: string;
  updatedAt: string;
}

export type OverCapacityMode = "STRICT" | "WARNING";

export interface ReservationRules {
  id: number;
  isBookingOpen: boolean;
  minGuests: number;
  maxGuests: number;
  overCapacityMode: OverCapacityMode;
  overCapacityNote: string;
  pricePerPerson: number;
  pricePerHour: number;
  baseFee: number;
  availableDurations: number[];
  availableTimeSlots: string[];
  termsAndConditions: string[];
  updatedAt: string;
}

export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface Reservation {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  bookingTime: string;
  durationHours: number;
  guestCount: number;
  estimatedPrice: number;
  customerNotes?: string;
  status: ReservationStatus;
  privacyConsent: boolean;
  createdAt: string;
  processedBy?: string;
}

export interface ActivityLog {
  id: string;
  userId?: string;
  userName: string;
  userRole: string;
  actionType: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface DatabaseStore {
  cafeSettings: CafeSettings;
  menuCategories: MenuCategory[];
  menuItems: MenuItem[];
  reservationRules: ReservationRules;
  reservations: Reservation[];
  users: UserProfile[];
  activityLogs: ActivityLog[];
}
