export interface Time {
  timeLabel: string
  date: Date
  disabled?: boolean
}
export declare type CompareTime = {
  hours: number
  minuets: number
  seconds: number
}
export interface UseTimesProps {
  date: Date
  onTimeChange(date: Date): void
  minTime?: CompareTime
  maxTime?: CompareTime
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}
export declare function useTimes({
  minTime,
  maxTime,
  minutesStep,
  timeLabelFormat,
}: UseTimesProps): {
  times: Time[]
}
