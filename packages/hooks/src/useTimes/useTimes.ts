import {useMemo} from 'react'
import {getTimes} from './useTimes.utils'

export interface Time {
  timeLabel: string
  date: Date
  disabled?: boolean
}

export type CompareTime = {
  hours: number
  minuets: number
  seconds: number
}

export interface UseTimesProps {
  baseDate: Date
  onTimeChange(date: Date): void
  minTime?: CompareTime
  maxTime?: CompareTime
  minutesStep?: number
  timeLabelFormat?: (date: Date) => string
}

export function useTimes({
  baseDate,
  minTime,
  maxTime,
  minutesStep,
  timeLabelFormat,
}: UseTimesProps) {
  const times = useMemo(
    () => getTimes({baseDate, minTime, maxTime, minutesStep, timeLabelFormat}),
    [baseDate, minTime, maxTime, minutesStep, timeLabelFormat],
  )

  return {times}
}
