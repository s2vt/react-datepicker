import {act, renderHook} from '@testing-library/react-hooks'
import {useTime, UseTimeProps} from './useTime'

describe('useTime', () => {
  const date = new Date('2020/01/01')
  const onTimeChange = jest.fn()

  const setup = (props: Partial<UseTimeProps>) =>
    renderHook(() => useTime({date, onTimeChange, ...props}))

  describe('onClick', () => {
    test('should execute onTimeChange', () => {
      // given
      const {result} = setup({})

      // when
      act(() => {
        result.current.onClick()
      })

      // then
      expect(onTimeChange).toBeCalledWith(date)
    })
  })
})
