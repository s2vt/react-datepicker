import {addDays, subDays} from 'date-fns'
import {isDateBlocked} from './useDateTimePicker.utils'

describe('useDateTimePicker utils', () => {
  describe('isDateBlocked', () => {
    test('should return false when not blocked', () => {
      // given
      const date = new Date('2020/01/01')

      // when
      const result = isDateBlocked({date})

      // then
      expect(result).toBe(false)
    })

    test('should return true when includes unavailableDates', () => {
      // given
      const date = new Date('2020/01/01')
      const unavailableDates: Date[] = [date]

      // when
      const result = isDateBlocked({date, unavailableDates})

      // then
      expect(result).toBe(true)
    })

    test('should return true when is before minBookingDate', () => {
      // given
      const date = new Date('2020/01/01')
      const minBookingDate = addDays(date, 1)

      // when
      const result = isDateBlocked({date, minBookingDate})

      // then
      expect(result).toBe(true)
    })

    test('should return true when is after maxBookingDate', () => {
      // given
      const date = new Date('2020/01/01')
      const maxBookingDate = subDays(date, 1)

      // when
      const result = isDateBlocked({date, maxBookingDate})

      // then
      expect(result).toBe(true)
    })
  })
})
