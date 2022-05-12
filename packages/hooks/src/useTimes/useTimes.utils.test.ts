import {format} from 'date-fns'
import {GetTimeProps, getTimes} from './useTimes.utils'

describe('useTimes utils', () => {
  describe('getTimes', () => {
    test('should return times with default format', () => {
      // given
      const getTimeProps: GetTimeProps = {}

      // when
      const result = getTimes(getTimeProps)

      // then
      const firstTime = result[0]
      const secondTime = result[1]
      const lastTime = result[result.length - 1]

      expect(firstTime.timeLabel).toBe('00:00:00')
      expect(secondTime.timeLabel).toBe('00:05:00')
      expect(lastTime.timeLabel).toBe('23:55:00')
    })

    test('should return times custom format', () => {
      // given
      const getTimeProps: GetTimeProps = {
        timeLabelFormat: (date: Date) => format(date, 'HH,mm,ss'),
      }

      // when
      const result = getTimes(getTimeProps)

      // then
      const firstTime = result[0]
      const lastTime = result[result.length - 1]

      expect(firstTime.timeLabel).toBe('00,00,00')
      expect(lastTime.timeLabel).toBe('23,55,00')
    })

    test('should return times with default format', () => {
      // given
      const getTimeProps: GetTimeProps = {minutesStep: 1}

      // when
      const result = getTimes(getTimeProps)

      // then
      const firstTime = result[0]
      const secondTime = result[1]
      const lastTime = result[result.length - 1]

      expect(firstTime.timeLabel).toBe('00:00:00')
      expect(secondTime.timeLabel).toBe('00:01:00')
      expect(lastTime.timeLabel).toBe('23:59:00')
    })
  })
})
