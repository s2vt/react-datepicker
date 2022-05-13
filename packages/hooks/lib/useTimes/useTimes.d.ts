export interface TimeType extends Time {
  timeLabel: string
  disabled?: boolean
}
export declare type Time = {
  hours: number
  minuets: number
  seconds: number
}
export interface UseTimesProps {
  minTime?: Time
  maxTime?: Time
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}
export declare function useTimes({
  minTime,
  maxTime,
  minutesStep,
  timeLabelFormat,
}: UseTimesProps): {
  times: TimeType[]
}
