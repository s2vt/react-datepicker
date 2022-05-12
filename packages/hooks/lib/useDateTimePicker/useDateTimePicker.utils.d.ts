interface IsDateBlockedProps {
  date: Date
  minBookingDate?: Date
  maxBookingDate?: Date
  unavailableDates?: Date[]
}
export declare function isDateBlocked({
  date,
  minBookingDate,
  maxBookingDate,
  unavailableDates,
}: IsDateBlockedProps): boolean
export {}
