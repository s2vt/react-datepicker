import {isSameDay} from 'date-fns'
import {useCallback, useState} from 'react'
import {FirstDayOfWeek} from '../useDatepicker'
import {
  getInitialMonths,
  getNextActiveMonth,
  isInUnavailableDates,
} from '../useDatepicker/useDatepicker.utils'
import {Time} from '../useTimes/useTimes'
import {isDateBlocked as isDateBlockedFn} from './useDateTimePicker.utils'

export const DATE = 'date'
export const TIME = 'time'

export type FocusedTarget = 'date' | 'time' | null

export interface OnDateTimeChangeProps {
  focusedTarget: FocusedTarget
  selectedDate: Date | null
}

export interface UseDateTimePickerProps {
  onDateChange(data: OnDateTimeChangeProps): void
  minBookingDate?: Date
  maxBookingDate?: Date
  selectedDate: Date | null
  focusedTarget: FocusedTarget
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  isDateBlocked?(date: Date): boolean
  unavailableDates?: Date[]
}

export function useDateTimePicker({
  selectedDate,
  minBookingDate,
  maxBookingDate,
  focusedTarget,
  onDateChange,
  initialVisibleMonth,
  numberOfMonths = 2,
  firstDayOfWeek = 1,
  isDateBlocked: isDateBlockedProps = () => false,
  unavailableDates = [],
}: UseDateTimePickerProps) {
  const [activeMonths, setActiveMonths] = useState(
    selectedDate
      ? getInitialMonths(numberOfMonths, selectedDate)
      : getInitialMonths(numberOfMonths, initialVisibleMonth || null),
  )

  const disabledDatesByUser = useCallback(
    (date: Date) => {
      return isInUnavailableDates(unavailableDates, date) || isDateBlockedProps(date)
    },
    [isDateBlockedProps, unavailableDates],
  )

  const isDateSelected = useCallback(
    (date: Date) => (selectedDate ? isSameDay(date, selectedDate) : false),
    [selectedDate],
  )

  const isDateBlocked = useCallback(
    (date: Date) =>
      isDateBlockedFn({
        date,
        minBookingDate,
        maxBookingDate,
        unavailableDates,
      }),
    [maxBookingDate, minBookingDate, unavailableDates],
  )

  const onResetDates = useCallback(() => {
    onDateChange({
      focusedTarget: null,
      selectedDate: null,
    })
  }, [onDateChange])

  const onDateSelect = useCallback(
    (date: Date) => {
      onDateChange({selectedDate: date, focusedTarget: TIME})
    },
    [onDateChange],
  )

  const onTimeSelect = useCallback(
    (time: Time) => {
      const {hours, minuets, seconds} = time

      const copied = selectedDate ? new Date(selectedDate) : new Date()
      copied.setHours(hours)
      copied.setMinutes(minuets)
      copied.setSeconds(seconds)

      onDateChange({selectedDate: copied, focusedTarget: null})
    },
    [onDateChange, selectedDate],
  )

  const goToPreviousMonths = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, -1))
  }, [activeMonths, numberOfMonths])

  const goToPreviousMonthsByOneMonth = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, -1, 1))
  }, [activeMonths, numberOfMonths])

  const goToNextMonths = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, 1))
  }, [activeMonths, numberOfMonths])

  const goToNextMonthsByOneMonth = useCallback(() => {
    setActiveMonths(getNextActiveMonth(activeMonths, numberOfMonths, 1, 1))
  }, [activeMonths, numberOfMonths])

  const goToDate = useCallback(
    (date: Date) => {
      setActiveMonths(getInitialMonths(numberOfMonths, date))
    },
    [numberOfMonths],
  )

  const goToPreviousYear = useCallback(
    (numYears: number = 1) => {
      setActiveMonths(
        getNextActiveMonth(activeMonths, numberOfMonths, -(numYears * 12 - numberOfMonths + 1)),
      )
    },
    [activeMonths, numberOfMonths],
  )

  const goToNextYear = useCallback(
    (numYears: number = 1) => {
      setActiveMonths(
        getNextActiveMonth(activeMonths, numberOfMonths, numYears * 12 - numberOfMonths + 1),
      )
    },
    [activeMonths, numberOfMonths],
  )

  return {
    activeMonths,
    firstDayOfWeek,
    disabledDatesByUser,
    isDateSelected,
    isDateBlocked,
    onResetDates,
    focusedTarget,
    onDateSelect,
    onTimeSelect,
    goToPreviousMonths,
    goToPreviousMonthsByOneMonth,
    goToNextMonths,
    goToNextMonthsByOneMonth,
    goToDate,
    goToPreviousYear,
    goToNextYear,
  }
}
