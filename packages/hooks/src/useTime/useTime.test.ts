import {act, renderHook} from '@testing-library/react-hooks'
import {Time} from '../useTimes/useTimes'
import {useTime, UseTimeProps} from './useTime'

describe('useTime', () => {
  const time: Time = {hours: 0, minuets: 0, seconds: 0}
  const onTimeSelect = jest.fn()

  const setup = (props: Partial<UseTimeProps>) =>
    renderHook(() => useTime({time, onTimeSelect, ...props}))

  describe('onClick', () => {
    test('should execute onTimeSelect', () => {
      // given
      const {result} = setup({})

      // when
      act(() => {
        result.current.onClick()
      })

      // then
      expect(onTimeSelect).toBeCalledWith(time)
    })
  })
})
