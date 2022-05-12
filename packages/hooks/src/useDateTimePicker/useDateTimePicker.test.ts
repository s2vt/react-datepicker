import {act, renderHook} from '@testing-library/react-hooks'
import {addMonths} from 'date-fns'
import {MonthType} from '../useDatepicker'
import {useDateTimePicker, UseDateTimePickerProps} from './useDateTimePicker'

describe('useDateTimePicker', () => {
  const onDateChange = jest.fn()
  const selectedDate = new Date('2020/01/01')

  const setup = (props: Partial<UseDateTimePickerProps>) =>
    renderHook(() =>
      useDateTimePicker({
        focusedTarget: null,
        onDateChange,
        numberOfMonths: 1,
        selectedDate,
        ...props,
      }),
    )

  describe('activeMonths', () => {
    test('should return active months by selected Date', () => {
      // given
      const {result} = setup({})

      // then
      const firstMonth: MonthType = {date: selectedDate, month: 0, year: 2020}
      expect(result.current.activeMonths[0]).toEqual(firstMonth)
      expect(result.current.activeMonths.length).toBe(1)
    })

    test('should return months by numberOfMonths', () => {
      // given
      const {result} = setup({numberOfMonths: 2})

      // then
      const firstMonth: MonthType = {date: selectedDate, month: 0, year: 2020}
      const secondMonth: MonthType = {date: addMonths(selectedDate, 1), month: 1, year: 2020}
      expect(result.current.activeMonths[0]).toEqual(firstMonth)
      expect(result.current.activeMonths[1]).toEqual(secondMonth)
    })
  })

  describe('onResetDates', () => {
    test('should execute onDateChange with reset data', () => {
      // given
      const {result} = setup({})

      // when
      act(() => {
        result.current.onResetDates()
      })

      // then
      expect(onDateChange).toBeCalledWith({
        focusedTarget: null,
        selectedDate: null,
      })
    })
  })

  describe('onDateSelect', () => {
    test('should execute onDateChange with selected date', () => {
      // given
      const date = new Date()

      const {result} = setup({})

      // when
      act(() => {
        result.current.onDateSelect(date)
      })

      // then
      expect(onDateChange).toBeCalledWith({
        focusedTarget: 'date',
        selectedDate: date,
      })
    })
  })

  describe('onTimeSelect', () => {
    test('should execute onDateChange with selected date', () => {
      // given
      const date = new Date()

      const {result} = setup({})

      // when
      act(() => {
        result.current.onTimeSelect(date)
      })

      // then
      expect(onDateChange).toBeCalledWith({
        focusedTarget: null,
        selectedDate: date,
      })
    })
  })

  describe('goToPreviousMonths', () => {
    test('should change active months to previous', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToPreviousMonths()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2019)
      expect(result.current.activeMonths[0].month).toBe(11)
    })
  })

  describe('goToPreviousMonthsByOneMonth', () => {
    test('should change active months to previous', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToPreviousMonthsByOneMonth()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2019)
      expect(result.current.activeMonths[0].month).toBe(11)
    })
  })

  describe('goToNextMonths', () => {
    test('should change active months to next', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToNextMonths()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(1)
    })
  })

  describe('goToNextMonthsByOneMonth', () => {
    test('should change active months to next', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToNextMonthsByOneMonth()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(1)
    })
  })

  describe('goToDate', () => {
    test('should change active months to next', () => {
      // given
      const date = new Date('2020/03/03')
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToDate(date)
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(date.getFullYear())
      expect(result.current.activeMonths[0].month).toBe(date.getMonth())
    })
  })

  describe('goToPreviousYear', () => {
    test('should change active year to previous', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToPreviousYear()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2019)
      expect(result.current.activeMonths[0].month).toBe(0)
    })
  })

  describe('goToNextYear', () => {
    test('should change active year to next', () => {
      // given
      const {result} = setup({})

      expect(result.current.activeMonths[0].year).toBe(2020)
      expect(result.current.activeMonths[0].month).toBe(0)

      // when
      act(() => {
        result.current.goToNextYear()
      })

      // then
      expect(result.current.activeMonths[0].year).toBe(2021)
      expect(result.current.activeMonths[0].month).toBe(0)
    })
  })
})
