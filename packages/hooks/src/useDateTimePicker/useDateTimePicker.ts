import {useCallback, useState} from 'react'
import {
  getInitialMonths,
  getNextActiveMonth,
  isInUnavailableDates,
} from '../useDatepicker/useDatepicker.utils'
import {isDateBlocked as isDateBlockedFn} from './useDateTimePicker.utils'

export const DATE = 'date'
export const TIME = 'time'

export type FocusedTarget = 'date' | 'time' | null

export interface OnDateTimeChangeProps {
  focusedTarget: FocusedTarget
  selectedDate: Date | null
}

export type FirstDayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface UseDateTimePickerProps {
  onDateChange(data: OnDateTimeChangeProps): void
  minBookingDate?: Date
  maxBookingDate?: Date
  selectedDate: Date | null
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  initialVisibleMonth?: Date
  isDateBlocked?(date: Date): boolean
  unavailableDates?: Date[]
}

export default function useDateTimePicker({
  selectedDate,
  minBookingDate,
  maxBookingDate,
  onDateChange,
  initialVisibleMonth,
  numberOfMonths = 2,
  firstDayOfWeek = 1,
  isDateBlocked: isDateBlockedProps = () => false,
  unavailableDates = [],
}: UseDateTimePickerProps) {
  const [activeMonths, setActiveMonths] = useState(() =>
    selectedDate
      ? getInitialMonths(numberOfMonths, selectedDate)
      : getInitialMonths(numberOfMonths, initialVisibleMonth || null),
  )

  const disabledDatesByUser = (date: Date) => {
    return isInUnavailableDates(unavailableDates, date) || isDateBlockedProps(date)
  }

  const isDateBlocked = (date: Date) =>
    isDateBlockedFn({
      date,
      minBookingDate,
      maxBookingDate,
      unavailableDates,
    })

  function onResetDates() {
    onDateChange({
      focusedTarget: null,
      selectedDate: null,
    })
  }

  function onDateSelect(date: Date) {
    onDateChange({selectedDate: date, focusedTarget: DATE})
  }

  function onTimeSelect(date: Date) {
    onDateChange({selectedDate: date, focusedTarget: null})
  }

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
    isDateBlocked,
    onResetDates,
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
