import React from 'react'
import {FormatFunction, UseDateTimePickerProps} from '@datepicker-react/hooks'
import {DatepickerPhrases} from '../../phrases'
export interface DatepickerProps extends UseDateTimePickerProps {
  phrases?: DatepickerPhrases
  displayFormat?: string | FormatFunction
  onClose?(): void
  showResetDates?: boolean
  showClose?: boolean
  vertical?: boolean
  rtl?: boolean
  initialVisibleMonth?: Date
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  unavailableDates?: Date[]
}
declare const _default: React.ForwardRefExoticComponent<
  DatepickerProps & React.RefAttributes<unknown>
>
export default _default
