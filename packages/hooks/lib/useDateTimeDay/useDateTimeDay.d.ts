export interface UseDateTimeDayProps {
  date: Date
  isDateSelected(date: Date): boolean
  isDateBlocked(date: Date): boolean
  onDateSelect(date: Date): void
}
export declare function useDateTimeDay({
  date,
  isDateSelected,
  isDateBlocked,
  onDateSelect,
}: UseDateTimeDayProps): {
  isSelected: boolean
  disabledDate: boolean
  onClick: () => void
}
