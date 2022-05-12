import {useCallback} from 'react'

export interface UseDateTimeDayProps {
  date: Date
  isDateSelected(date: Date): boolean
  isDateBlocked(date: Date): boolean
  onDateSelect(date: Date): void
}

export function useDateTimeDay({
  date,
  isDateSelected,
  isDateBlocked,
  onDateSelect,
}: UseDateTimeDayProps) {
  const onClick = useCallback(() => onDateSelect(date), [date, onDateSelect])
  const disabled = isDateBlocked(date)

  return {
    isSelected: isDateSelected(date),
    disabledDate: disabled,
    onClick: disabled ? () => {} : onClick,
  }
}
