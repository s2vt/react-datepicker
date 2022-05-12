export interface UseTimeProps {
  date: Date
  onTimeChange(date: Date): void
}
export declare function useTime({
  date,
  onTimeChange,
}: UseTimeProps): {
  onClick: () => void
}
