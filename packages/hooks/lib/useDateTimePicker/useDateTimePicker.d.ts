import {FirstDayOfWeek} from '../useDatepicker'
export declare const DATE = 'date'
export declare const TIME = 'time'
export declare type FocusedTarget = 'date' | 'time' | null
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
export declare function useDateTimePicker({
  selectedDate,
  minBookingDate,
  maxBookingDate,
  focusedTarget,
  onDateChange,
  initialVisibleMonth,
  numberOfMonths,
  firstDayOfWeek,
  isDateBlocked: isDateBlockedProps,
  unavailableDates,
}: UseDateTimePickerProps): {
  activeMonths: import('../useDatepicker').MonthType[]
  firstDayOfWeek: FirstDayOfWeek
  disabledDatesByUser: (date: Date) => boolean
  isDateBlocked: (date: Date) => boolean
  onResetDates: () => void
  focusedTarget: FocusedTarget
  onDateSelect: (date: Date) => void
  onTimeSelect: (date: Date) => void
  goToPreviousMonths: () => void
  goToPreviousMonthsByOneMonth: () => void
  goToNextMonths: () => void
  goToNextMonthsByOneMonth: () => void
  goToDate: (date: Date) => void
  goToPreviousYear: (numYears?: number) => void
  goToNextYear: (numYears?: number) => void
}
