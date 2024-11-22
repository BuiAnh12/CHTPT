export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface FlightInfo {
  flightId?: string;
  arrival: LocationInfo;
  departure: LocationInfo;
  flightNumber: string;
  economyPrice: number;
  businessPrice: number;
  seats: Seats;
}

interface LocationInfo {
  airportCode: string;
  city: string;
  time: string;
}

interface Seats {
  [seatNumber: string]: Seat;
}

export interface Seat {
  [x: string]: any;
  status: "free" | "register" | "purchase" | "locked";
  registeredBy?: RegistrationInfo;
  purchasedBy?: PurchaseInfo;
  lockedBy?: LockedInfo;
  passengerDetail?: PassengerDetail;
}

export interface PassengerDetail {
  passengerId: string;
  firstName: string;
  lastName: string;
  title: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  seatId: string;
  status: "free" | "register" | "purchase" | "locked";
}

export type SeatEntry = [string, Seat];

interface RegistrationInfo {
  timestamp: string;
  userId: string;
}

interface PurchaseInfo {
  paymentInfo: PaymentInfo;
  timestamp: string;
  userId: string;
  ticketCode: string;
}

interface LockedInfo {
  paymentInfo: PaymentInfo;
  timestamp: string;
  userId: string;
}

interface PaymentInfo {
  amount: number;
  method: string;
}
