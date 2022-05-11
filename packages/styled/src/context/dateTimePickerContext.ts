import React from 'react'

interface DateTimePickerContext {
  rtl: boolean
  selectedDate: Date | null
  isDateBlocked(date: Date): boolean
  onDateSelect(date: Date): void
  onDayRender?(date: Date): React.ReactNode
}

export const dateTimePickerContextDefaultValue: DateTimePickerContext = {
  rtl: false,
  selectedDate: null,
  onDateSelect: () => {},
  isDateBlocked: () => false,
  onDayRender: undefined,
}

export default React.createContext<DateTimePickerContext>(dateTimePickerContextDefaultValue)
