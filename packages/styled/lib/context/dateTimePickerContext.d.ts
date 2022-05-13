import React from 'react'
interface DateTimePickerContext {
  rtl: boolean
  selectedDate: Date | null
  isDateBlocked(date: Date): boolean
  onDateSelect(date: Date): void
  onDayRender?(date: Date): React.ReactNode
}
export declare const dateTimePickerContextDefaultValue: DateTimePickerContext
declare const _default: React.Context<DateTimePickerContext>
export default _default
