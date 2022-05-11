import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import {isInUnavailableDates} from '../useDatepicker/useDatepicker.utils'

interface IsDateBlockedProps {
  date: Date
  minBookingDate?: Date
  maxBookingDate?: Date
  unavailableDates?: Date[]
}
export function isDateBlocked({
  date,
  minBookingDate,
  maxBookingDate,
  unavailableDates = [],
}: IsDateBlockedProps) {
  const compareMinDate = minBookingDate
    ? new Date(
        minBookingDate.getFullYear(),
        minBookingDate.getMonth(),
        minBookingDate.getDate(),
        0,
        0,
        0,
      )
    : minBookingDate
  const compareMaxDate = maxBookingDate
    ? new Date(
        maxBookingDate.getFullYear(),
        maxBookingDate.getMonth(),
        maxBookingDate.getDate(),
        0,
        0,
        0,
      )
    : maxBookingDate

  return !!(
    isInUnavailableDates(unavailableDates, date) ||
    (compareMinDate && isBefore(date, compareMinDate)) ||
    (compareMaxDate && isAfter(date, compareMaxDate))
  )
}
