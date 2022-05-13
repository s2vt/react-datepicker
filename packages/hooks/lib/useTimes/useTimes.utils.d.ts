import {TimeType, Time} from './useTimes'
export interface GetTimeProps {
  minTime?: Time
  maxTime?: Time
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}
export declare function getTimes({
  minTime,
  maxTime,
  minutesStep,
  timeLabelFormat,
}: GetTimeProps): TimeType[]
