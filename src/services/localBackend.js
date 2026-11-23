import { subtractDates } from "../utils/helpers.js";
import { isFuture, isPast, isToday } from "date-fns";
import { PAGE_SIZE } from "../utils/constants.js";
import { guests } from "../data/data-guests.js";
import { bookings as rawBookings } from "../data/data-bookings.js";

function delay(ms = 120) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Clear any old local storage keys so state is cleanly session-only
try {
  localStorage.removeItem("wild_oasis_local_cabins");
  localStorage.removeItem("wild_oasis_local_bookings");
  localStorage.removeItem("wild_oasis_local_settings");
} catch {
  // ignore
}

// In-Memory state: lives while the browser tab is open.
// When the user refreshes the page, everything automatically resets to the clean original defaults!
let inMemoryCabins = null;
let inMemorySettings = null;
let inMemoryBookings = null;

function getInitialCabins() {
  return [
    {
      id: 1,
      created_at: new Date().toISOString(),
      name: "001",
      maxCapacity: 2,
      regularPrice: 250,
      discount: 0,
      image: "/cabins/cabin-001.jpg",
      description:
        "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat.",
    },
    {
      id: 2,
      created_at: new Date().toISOString(),
      name: "002",
      maxCapacity: 2,
      regularPrice: 350,
      discount: 25,
      image: "/cabins/cabin-002.jpg",
      description:
        "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest.",
    },
    {
      id: 3,
      created_at: new Date().toISOString(),
      name: "003",
      maxCapacity: 4,
      regularPrice: 300,
      discount: 0,
      image: "/cabins/cabin-003.jpg",
      description:
        "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities.",
    },
    {
      id: 4,
      created_at: new Date().toISOString(),
      name: "004",
      maxCapacity: 4,
      regularPrice: 500,
      discount: 50,
      image: "/cabins/cabin-004.jpg",
      description:
        "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler.",
    },
    {
      id: 5,
      created_at: new Date().toISOString(),
      name: "005",
      maxCapacity: 6,
      regularPrice: 350,
      discount: 0,
      image: "/cabins/cabin-005.jpg",
      description:
        "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature.",
    },
    {
      id: 6,
      created_at: new Date().toISOString(),
      name: "006",
      maxCapacity: 6,
      regularPrice: 800,
      discount: 100,
      image: "/cabins/cabin-006.jpg",
      description:
        "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat.",
    },
    {
      id: 7,
      created_at: new Date().toISOString(),
      name: "007",
      maxCapacity: 8,
      regularPrice: 600,
      discount: 100,
      image: "/cabins/cabin-007.jpg",
      description:
        "The grand wooden cabin 007 accommodates up to 8 guests. Offers expansive decks, private sauna, luxury hot tub, and panoramic forest views.",
    },
    {
      id: 8,
      created_at: new Date().toISOString(),
      name: "008",
      maxCapacity: 10,
      regularPrice: 1400,
      discount: 0,
      image: "/cabins/cabin-008.jpg",
      description:
        "The presidential cabin 008 is our premier luxury lodge. Featuring 5 bedrooms, heated outdoor spa, stone fireplace, and bespoke private dining.",
    },
  ];
}

function getInitialSettings() {
  return {
    id: 1,
    minBookingLength: 3,
    maxBookingLength: 30,
    maxGuestsPerBooking: 10,
    breakfastPrice: 15,
  };
}

function getInitialGuests() {
  return guests.map((g, idx) => ({
    id: idx + 1,
    fullName: g.fullName,
    email: g.email,
    nationality: g.nationality,
    country: g.nationality,
    nationalID: g.nationalID,
    countryFlag: g.countryFlag,
  }));
}

function getInitialBookings(cabinsList, guestsList) {
  return rawBookings.map((booking, index) => {
    const cabin = cabinsList.find((c) => c.id === booking.cabinId) || cabinsList[0];
    const guest = guestsList.find((g) => g.id === booking.guestId) || guestsList[0];

    const numNights = Math.max(1, Math.abs(subtractDates(booking.endDate, booking.startDate)));
    const cabinPrice = numNights * (cabin.regularPrice - (cabin.discount || 0));
    const extrasPrice = booking.hasBreakfast ? numNights * 15 * (booking.numGuests || 1) : 0;
    const totalPrice = cabinPrice + extrasPrice;

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    let status = "unconfirmed";
    if (isPast(end) && !isToday(end)) {
      status = "checked-out";
    } else if ((isFuture(end) || isToday(end)) && isPast(start) && !isToday(start)) {
      status = "checked-in";
    } else if (isToday(start)) {
      status = "unconfirmed";
    } else if (isToday(end)) {
      status = "checked-in";
    }

    return {
      id: index + 1,
      created_at: booking.created_at,
      startDate: booking.startDate,
      endDate: booking.endDate,
      numNights,
      numGuests: booking.numGuests || 1,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      hasBreakfast: Boolean(booking.hasBreakfast),
      isPaid: Boolean(booking.isPaid),
      observations: booking.observations || "",
      cabinId: cabin.id,
      guestId: guest.id,
      cabins: { name: cabin.name },
      guests: {
        fullName: guest.fullName,
        email: guest.email,
        country: guest.country || guest.nationality,
        nationality: guest.nationality,
        nationalID: guest.nationalID,
        countryFlag: guest.countryFlag,
      },
    };
  });
}

function getStoreCabins() {
  if (!inMemoryCabins) {
    inMemoryCabins = getInitialCabins();
  }
  return inMemoryCabins;
}

function getStoreSettings() {
  if (!inMemorySettings) {
    inMemorySettings = getInitialSettings();
  }
  return inMemorySettings;
}

function getStoreBookings() {
  if (!inMemoryBookings) {
    const cabins = getStoreCabins();
    const guestsList = getInitialGuests();
    inMemoryBookings = getInitialBookings(cabins, guestsList);
  }
  return inMemoryBookings;
}

export function resetLocalData() {
  inMemoryCabins = getInitialCabins();
  inMemorySettings = getInitialSettings();
  const guestsList = getInitialGuests();
  inMemoryBookings = getInitialBookings(inMemoryCabins, guestsList);
  return { cabins: inMemoryCabins, settings: inMemorySettings, bookings: inMemoryBookings };
}

// ----------------- CABINS API -----------------
export async function getLocalCabins() {
  await delay();
  return [...getStoreCabins()];
}

export async function createEditLocalCabin(newCabin, id) {
  await delay();
  const cabins = getStoreCabins();

  let imagePath = typeof newCabin.image === "string" ? newCabin.image : "/cabins/cabin-001.jpg";
  if (newCabin.image instanceof File) {
    try {
      imagePath = URL.createObjectURL(newCabin.image);
    } catch {
      imagePath = "/cabins/cabin-001.jpg";
    }
  }

  if (id) {
    const index = cabins.findIndex((c) => c.id === Number(id));
    if (index === -1) throw new Error("Cabin not found");
    const updated = {
      ...cabins[index],
      ...newCabin,
      image: imagePath || cabins[index].image,
    };
    cabins[index] = updated;
    return { ...updated };
  }

  const newId = cabins.length > 0 ? Math.max(...cabins.map((c) => c.id)) + 1 : 1;
  const created = {
    ...newCabin,
    id: newId,
    created_at: new Date().toISOString(),
    image: imagePath,
  };
  cabins.push(created);
  return { ...created };
}

export async function deleteLocalCabin(id) {
  await delay();
  const cabins = getStoreCabins();
  const index = cabins.findIndex((c) => c.id === Number(id));
  if (index !== -1) {
    cabins.splice(index, 1);
  }
  return { id };
}

// ----------------- SETTINGS API -----------------
export async function getLocalSettings() {
  await delay();
  return { ...getStoreSettings() };
}

export async function updateLocalSetting(newSetting) {
  await delay();
  const current = getStoreSettings();
  Object.assign(current, newSetting);
  return { ...current };
}

// ----------------- BOOKINGS API -----------------
export async function getLocalBookings({ filter, sortBy, page, search } = {}) {
  await delay();
  let bookings = [...getStoreBookings()];

  // 1. Filter
  if (filter && filter.value && filter.value !== "all") {
    bookings = bookings.filter((b) => String(b[filter.field]) === String(filter.value));
  }

  // 1.5 Search
  if (search && search.trim()) {
    const term = search.toLowerCase().trim();
    bookings = bookings.filter(
      (b) =>
        b.guests?.fullName?.toLowerCase().includes(term) ||
        b.cabins?.name?.toLowerCase().includes(term) ||
        b.guests?.email?.toLowerCase().includes(term) ||
        String(b.id).includes(term)
    );
  }

  // 2. Sort
  if (sortBy && sortBy.field) {
    const direction = sortBy.direction === "asc" ? 1 : -1;
    bookings.sort((a, b) => {
      let valA = a[sortBy.field];
      let valB = b[sortBy.field];
      if (sortBy.field.includes(".")) {
        const parts = sortBy.field.split(".");
        valA = a[parts[0]]?.[parts[1]];
        valB = b[parts[0]]?.[parts[1]];
      }

      if (typeof valA === "number" && typeof valB === "number") {
        return (valA - valB) * direction;
      }
      return String(valA || "").localeCompare(String(valB || "")) * direction;
    });
  }

  const count = bookings.length;

  // 3. Paginate
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    bookings = bookings.slice(from, to);
  }

  return { data: bookings, count };
}

export async function getLocalBooking(id) {
  await delay();
  const bookings = getStoreBookings();
  const booking = bookings.find((b) => b.id === Number(id));
  if (!booking) throw new Error("Booking not found");
  return { ...booking };
}

export async function getLocalBookingsAfterDate(date) {
  await delay();
  const bookings = getStoreBookings();
  const compareDate = new Date(date).getTime();
  return bookings
    .filter((b) => new Date(b.created_at).getTime() >= compareDate)
    .map((b) => ({
      created_at: b.created_at,
      totalPrice: b.totalPrice,
      extrasPrice: b.extrasPrice,
    }));
}

export async function getLocalStaysAfterDate(date) {
  await delay();
  const bookings = getStoreBookings();
  const compareDate = new Date(date).getTime();
  const now = new Date().getTime();

  return bookings.filter((b) => {
    const start = new Date(b.startDate).getTime();
    return start >= compareDate && start <= now;
  });
}

export async function getLocalStaysTodayActivity() {
  await delay();
  const bookings = getStoreBookings();
  const activities = bookings.filter((b) => b.status === "unconfirmed" || b.status === "checked-in");
  return activities.slice(0, 4);
}

export async function updateLocalBooking(id, obj) {
  await delay();
  const bookings = getStoreBookings();
  const index = bookings.findIndex((b) => b.id === Number(id));
  if (index === -1) throw new Error("Booking not found");

  const updated = { ...bookings[index], ...obj };
  bookings[index] = updated;
  return { ...updated };
}

export async function deleteLocalBooking(id) {
  await delay();
  const bookings = getStoreBookings();
  const index = bookings.findIndex((b) => b.id === Number(id));
  if (index !== -1) {
    bookings.splice(index, 1);
  }
  return { id };
}
