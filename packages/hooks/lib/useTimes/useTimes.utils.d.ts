import {CompareTime, Time} from './useTimes'
export interface GetTimeProps {
  minTime?: CompareTime
  maxTime?: CompareTime
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}
export declare function getTimes({
  minTime,
  maxTime,
  minutesStep,
  timeLabelFormat,
}: GetTimeProps): Time[]
