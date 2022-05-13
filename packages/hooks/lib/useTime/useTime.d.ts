import {Time} from '../useTimes/useTimes'
export interface UseTimeProps {
  time: Time
  onTimeSelect(time: Time): void
}
export declare function useTime({
  time,
  onTimeSelect,
}: UseTimeProps): {
  onClick: () => void
}
