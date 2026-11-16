import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  DatabaseStore,
  CafeSettings,
  MenuCategory,
  MenuItem,
  ReservationRules,
  Reservation,
  ActivityLog,
  UserProfile,
  ReservationStatus,
  AuthSession,
} from "@/types";
import { initialData } from "@/data/initialData";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

let memoryStore: DatabaseStore | null = null;

async function ensureDataStore(): Promise<DatabaseStore> {
  if (memoryStore) return memoryStore;

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const fileExists = await fs
      .access(STORE_PATH)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const raw = await fs.readFile(STORE_PATH, "utf-8");
      memoryStore = JSON.parse(raw);

      // Ensure users have passwords if loading from an older store file
      let storeModified = false;
      for (const u of memoryStore!.users) {
        if (!u.password) {
          u.password = "password123";
          storeModified = true;
        }
      }
      if (storeModified) {
        await fs.writeFile(STORE_PATH, JSON.stringify(memoryStore, null, 2), "utf-8");
      }

      return memoryStore!;
    } else {
      memoryStore = JSON.parse(JSON.stringify(initialData));
      await fs.writeFile(STORE_PATH, JSON.stringify(memoryStore, null, 2), "utf-8");
      return memoryStore!;
    }
  } catch (error) {
    console.error("Error accessing data store file, falling back to memory:", error);
    if (!memoryStore) {
      memoryStore = JSON.parse(JSON.stringify(initialData));
    }
    return memoryStore!;
  }
}

async function persistStore(store: DatabaseStore): Promise<void> {
  memoryStore = store;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write data store to disk:", err);
  }
}

// Trigger On-Demand ISR Revalidation (PRD 7.2)
function triggerCacheRevalidation() {
  try {
    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/reservasi");
    revalidatePath("/admin");
  } catch {
    // In build or non-request context, revalidatePath may not run, which is safe to ignore
  }
}

export async function getCafeSettings(): Promise<CafeSettings> {
  const store = await ensureDataStore();
  return store.cafeSettings;
}

export async function updateCafeSettings(
  updated: Partial<CafeSettings>,
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<CafeSettings> {
  const store = await ensureDataStore();
  store.cafeSettings = {
    ...store.cafeSettings,
    ...updated,
    updatedAt: new Date().toISOString(),
  };

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "SETTINGS_UPDATE",
    description: "Memperbarui profil cafe dan informasi operasional.",
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return store.cafeSettings;
}

export async function getCategories(): Promise<MenuCategory[]> {
  const store = await ensureDataStore();
  return store.menuCategories.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveCategory(
  category: Partial<MenuCategory> & { name: string },
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<MenuCategory> {
  const store = await ensureDataStore();
  const id = category.id || `cat-${Date.now()}`;
  const slug = category.slug || category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const existingIndex = store.menuCategories.findIndex((c) => c.id === id);

  const categoryObj: MenuCategory = {
    id,
    name: category.name,
    slug,
    sortOrder: category.sortOrder ?? (store.menuCategories.length + 1),
    isActive: category.isActive !== undefined ? category.isActive : true,
  };

  if (existingIndex >= 0) {
    store.menuCategories[existingIndex] = categoryObj;
  } else {
    store.menuCategories.push(categoryObj);
  }

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "CATEGORY_SAVE",
    description: `Menyimpan kategori menu '${category.name}'.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return categoryObj;
}

export async function deleteCategory(
  id: string,
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<boolean> {
  const store = await ensureDataStore();
  const category = store.menuCategories.find((c) => c.id === id);
  if (!category) return false;

  store.menuCategories = store.menuCategories.filter((c) => c.id !== id);
  store.menuItems = store.menuItems.filter((i) => i.categoryId !== id);

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "CATEGORY_DELETE",
    description: `Menghapus kategori menu '${category.name}' dan item terkait.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return true;
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const store = await ensureDataStore();
  return store.menuItems.sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function saveMenuItem(
  item: Partial<MenuItem> & { name: string; categoryId: string; price: number },
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<MenuItem> {
  const store = await ensureDataStore();
  const id = item.id || `item-${Date.now()}`;
  const existingIndex = store.menuItems.findIndex((i) => i.id === id);

  const menuItemObj: MenuItem = {
    id,
    categoryId: item.categoryId,
    subcategory: item.subcategory || "",
    name: item.name,
    description: item.description || "",
    price: Number(item.price) || 0,
    imageUrl: item.imageUrl || "",
    isAvailable: item.isAvailable !== undefined ? item.isAvailable : true,
    isFeatured: item.isFeatured !== undefined ? item.isFeatured : false,
    sortOrder: item.sortOrder ?? (store.menuItems.length + 1),
    tempOptions: item.tempOptions || [],
    badge: item.badge || "",
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    store.menuItems[existingIndex] = menuItemObj;
  } else {
    store.menuItems.push(menuItemObj);
  }

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "MENU_SAVE",
    description: `Menyimpan item menu '${menuItemObj.name}' (Rp ${menuItemObj.price.toLocaleString("id-ID")}).`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return menuItemObj;
}

export async function toggleMenuItemStock(
  id: string,
  actorName = "Kasir",
  actorRole = "CASHIER",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<MenuItem | null> {
  const store = await ensureDataStore();
  const item = store.menuItems.find((i) => i.id === id);
  if (!item) return null;

  item.isAvailable = !item.isAvailable;
  item.updatedAt = new Date().toISOString();

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "STOCK_TOGGLE",
    description: `Mengubah stok '${item.name}' menjadi ${item.isAvailable ? "Tersedia" : "Habis"}.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return item;
}

export async function deleteMenuItem(
  id: string,
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<boolean> {
  const store = await ensureDataStore();
  const item = store.menuItems.find((i) => i.id === id);
  if (!item) return false;

  store.menuItems = store.menuItems.filter((i) => i.id !== id);

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "MENU_DELETE",
    description: `Menghapus item menu '${item.name}'.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return true;
}

export async function getReservationRules(): Promise<ReservationRules> {
  const store = await ensureDataStore();
  return store.reservationRules;
}

export async function updateReservationRules(
  updated: Partial<ReservationRules>,
  actorName = "Owner",
  actorRole = "OWNER",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<ReservationRules> {
  const store = await ensureDataStore();
  store.reservationRules = {
    ...store.reservationRules,
    ...updated,
    updatedAt: new Date().toISOString(),
  };

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "RULES_UPDATE",
    description: `Memperbarui parameter reservasi: min ${store.reservationRules.minGuests}, maks ${store.reservationRules.maxGuests}, mode ${store.reservationRules.overCapacityMode}.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return store.reservationRules;
}

export async function getReservations(): Promise<Reservation[]> {
  const store = await ensureDataStore();
  return store.reservations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createReservation(
  data: {
    customerName: string;
    customerPhone: string;
    bookingDate: string;
    bookingTime: string;
    durationHours: number;
    guestCount: number;
    customerNotes?: string;
    privacyConsent: boolean;
  },
  ipAddress = "127.0.0.1",
  userAgent = "Visitor"
): Promise<Reservation> {
  const store = await ensureDataStore();
  const rules = store.reservationRules;

  const priceFromGuests = data.guestCount * rules.pricePerPerson;
  const priceFromDuration = data.durationHours * rules.pricePerHour;
  const estimatedPrice = priceFromGuests + priceFromDuration + rules.baseFee;

  const count = store.reservations.length + 1;
  const codeSeq = String(count).padStart(3, "0");
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const bookingCode = `RT-${yy}${mm}-${codeSeq}`;

  const newReservation: Reservation = {
    id: `res-${Date.now()}`,
    bookingCode,
    customerName: data.customerName,
    customerPhone: data.customerPhone,
    bookingDate: data.bookingDate,
    bookingTime: data.bookingTime,
    durationHours: data.durationHours,
    guestCount: data.guestCount,
    estimatedPrice,
    customerNotes: data.customerNotes || "",
    status: "PENDING",
    privacyConsent: data.privacyConsent,
    createdAt: new Date().toISOString(),
  };

  store.reservations.unshift(newReservation);

  await logActivity(store, {
    userName: data.customerName,
    userRole: "PUBLIC",
    actionType: "RESERVATION_CREATE",
    description: `Pengajuan reservasi baru [${bookingCode}] (${data.guestCount} orang).`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return newReservation;
}

export async function updateReservationStatus(
  id: string,
  status: ReservationStatus,
  actorName = "Admin",
  actorRole = "MANAGEMENT",
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<Reservation | null> {
  const store = await ensureDataStore();
  const res = store.reservations.find((r) => r.id === id);
  if (!res) return null;

  const oldStatus = res.status;
  res.status = status;
  res.processedBy = actorName;

  await logActivity(store, {
    userName: actorName,
    userRole: actorRole,
    actionType: "RESERVATION_STATUS_CHANGE",
    description: `Mengubah status reservasi [${res.bookingCode}] dari ${oldStatus} menjadi ${status}.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  triggerCacheRevalidation();
  return res;
}

export async function getUsers(): Promise<UserProfile[]> {
  const store = await ensureDataStore();
  return store.users;
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const store = await ensureDataStore();
  return store.activityLogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

// Authentication Service (PRD-F-13)
export async function authenticateStaff(
  email: string,
  pass: string,
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
): Promise<{ success: boolean; session?: AuthSession; error?: string }> {
  const store = await ensureDataStore();
  const normalizedEmail = email.trim().toLowerCase();

  const user = store.users.find(
    (u) => u.email.toLowerCase() === normalizedEmail && u.isActive
  );

  if (!user || (user.password && user.password !== pass)) {
    await logActivity(store, {
      userName: email,
      userRole: "GUEST",
      actionType: "LOGIN_FAILED",
      description: `Percobaan login gagal untuk email '${email}'.`,
      ipAddress,
      userAgent,
    });
    await persistStore(store);
    return { success: false, error: "Email atau kata sandi tidak valid." };
  }

  // Update last login
  user.lastLoginAt = new Date().toISOString();

  // Create session with 30-minute expiry per PRD-F-13
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const token = `sess_${user.id}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const session: AuthSession = {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    token,
    expiresAt,
  };

  await logActivity(store, {
    userName: user.fullName,
    userRole: user.role,
    actionType: "LOGIN_SUCCESS",
    description: `Pengguna berhasil login sebagai ${user.role}.`,
    ipAddress,
    userAgent,
  });

  await persistStore(store);
  return { success: true, session };
}

export async function logStaffLogout(
  userName: string,
  userRole: string,
  ipAddress = "127.0.0.1",
  userAgent = "Browser"
) {
  const store = await ensureDataStore();
  await logActivity(store, {
    userName,
    userRole,
    actionType: "LOGOUT",
    description: `Pengguna ${userName} keluar dari sistem (logout).`,
    ipAddress,
    userAgent,
  });
  await persistStore(store);
}

async function logActivity(
  store: DatabaseStore,
  data: {
    userName: string;
    userRole: string;
    actionType: string;
    description: string;
    ipAddress?: string;
    userAgent?: string;
  }
) {
  const newLog: ActivityLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    userName: data.userName,
    userRole: data.userRole,
    actionType: data.actionType,
    description: data.description,
    ipAddress: data.ipAddress || "127.0.0.1",
    userAgent: data.userAgent || "Unknown",
    createdAt: new Date().toISOString(),
  };
  store.activityLogs.unshift(newLog);
  if (store.activityLogs.length > 200) {
    store.activityLogs = store.activityLogs.slice(0, 200);
  }
}
