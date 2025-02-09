import React, {useState} from 'react'
import {ThemeProvider} from 'styled-components'
import {format, addDays, isSameDay, addMonths} from 'date-fns'
import {
  dayLabelFormat as dayLabelFormatFn,
  weekdayLabelFormat as weekdayLabelFormatFn,
  monthLabelFormat as monthLabelFormatFn,
  OnDateTimeChangeProps,
  DATE,
} from '@datepicker-react/hooks'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {text, boolean} from '@storybook/addon-knobs'
import {es as locale} from 'date-fns/locale'
import {FirstDayOfWeek, DatepickerPhrases, datepickerPhrases} from '../../index'
import Flex from '../Flex'
import DateTimePicker from './DateTimePicker'

interface AppProps {
  displayFormat?: string
  vertical?: boolean
  rtl?: boolean
  showResetDates?: boolean
  showClose?: boolean
  exactMinBookingDays?: boolean
  minBookingDays?: number
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  phrasesProp?: DatepickerPhrases
  isDateBlocked?(date: Date): boolean
  minBookingDate?: Date
  maxBookingDate?: Date
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  unavailableDates?: Date[]
  initialVisibleMonth?: Date
}

function App({
  displayFormat = 'MM/DD/YYYY',
  showClose = true,
  showResetDates = false,
  vertical = false,
  rtl = false,
  exactMinBookingDays = false,
  minBookingDays = 1,
  numberOfMonths = 1,
  firstDayOfWeek = 1,
  phrasesProp = datepickerPhrases,
  isDateBlocked = () => false,
  minBookingDate,
  maxBookingDate,
  initialVisibleMonth,
  dayLabelFormat = dayLabelFormatFn,
  weekdayLabelFormat = weekdayLabelFormatFn,
  monthLabelFormat = monthLabelFormatFn,
  onDayRender = undefined,
  unavailableDates = [],
}: AppProps) {
  const [state, setState] = useState<OnDateTimeChangeProps>({
    selectedDate: null,
    focusedTarget: DATE,
  })

  function handleDataChange(data: OnDateTimeChangeProps) {
    action('onDatesChange')(data)
    setState(data)
  }

  return (
    <DateTimePicker
      minBookingDate={minBookingDate}
      maxBookingDate={maxBookingDate}
      onDateChange={handleDataChange}
      selectedDate={state.selectedDate}
      focusedTarget={state.focusedTarget}
      onClose={action('onClose')}
      displayFormat={displayFormat}
      vertical={vertical}
      rtl={rtl}
      showClose={showClose}
      showResetDates={showResetDates}
      numberOfMonths={numberOfMonths}
      firstDayOfWeek={firstDayOfWeek}
      phrases={phrasesProp}
      isDateBlocked={isDateBlocked}
      dayLabelFormat={dayLabelFormat}
      weekdayLabelFormat={weekdayLabelFormat}
      monthLabelFormat={monthLabelFormat}
      onDayRender={onDayRender}
      unavailableDates={unavailableDates}
      initialVisibleMonth={initialVisibleMonth}
    />
  )
}

storiesOf('DateTimePicker', module)
  .add('Simple demo', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
    />
  ))
  .add('Initial visible month', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      initialVisibleMonth={addMonths(new Date(), 6)}
    />
  ))
  .add('Number of months (3 months)', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      numberOfMonths={3}
    />
  ))
  .add('First day of the week (Sunday)', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      firstDayOfWeek={0}
    />
  ))
  .add('Custom phrases', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      firstDayOfWeek={0}
      phrasesProp={{
        datepickerStartDatePlaceholder: 'Seleccionar',
        datepickerStartDateLabel: 'Fecha de inicio:',
        datepickerEndDatePlaceholder: 'Seleccionar',
        datepickerEndDateLabel: 'Fecha final:',
        resetDates: 'Deshacer',
        close: 'Cerca',
      }}
    />
  ))
  .add('Localization', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      firstDayOfWeek={0}
      phrasesProp={{
        datepickerStartDatePlaceholder: 'Seleccionar',
        datepickerStartDateLabel: 'Fecha de inicio:',
        datepickerEndDatePlaceholder: 'Seleccionar',
        datepickerEndDateLabel: 'Fecha final:',
        resetDates: 'Deshacer',
        close: 'Cerca',
      }}
      dayLabelFormat={(date: Date) => format(date, 'dd', {locale})}
      weekdayLabelFormat={(date: Date) => format(date, 'eeeeee', {locale})}
      monthLabelFormat={(date: Date) => format(date, 'MMMM yyyy', {locale})}
    />
  ))
  .add('Block dates', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      firstDayOfWeek={0}
      isDateBlocked={(date: Date) => isSameDay(date, addDays(new Date(), 1))}
    />
  ))
  .add('Unavailable dates', () => (
    <App
      rtl={boolean('rtl', false)}
      vertical={boolean('vertical', false)}
      exactMinBookingDays={boolean('exactMinBookingDays', false)}
      showResetDates={boolean('showResetDates', true)}
      showClose={boolean('showClose', true)}
      displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      firstDayOfWeek={0}
      unavailableDates={[addDays(new Date(), 3), addDays(new Date(), 4), addDays(new Date(), 5)]}
    />
  ))
  .add('Custom day size', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          daySize: 40,
        },
      }}
    >
      <App
        rtl={boolean('rtl', false)}
        vertical={boolean('vertical', false)}
        exactMinBookingDays={boolean('exactMinBookingDays', false)}
        showResetDates={boolean('showResetDates', true)}
        showClose={boolean('showClose', true)}
        displayFormat={text('displayFormat', 'MM/dd/yyyy')}
        firstDayOfWeek={0}
        isDateBlocked={(date: Date) => isSameDay(date, addDays(new Date(), 1))}
      />
    </ThemeProvider>
  ))
  .add('MinBookingDate and maxBookingDate', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          daySize: 40,
        },
      }}
    >
      <App
        minBookingDate={new Date()}
        maxBookingDate={addDays(new Date(), 20)}
        rtl={boolean('rtl', false)}
        vertical={boolean('vertical', false)}
        exactMinBookingDays={boolean('exactMinBookingDays', false)}
        showResetDates={boolean('showResetDates', true)}
        showClose={boolean('showClose', true)}
        displayFormat={text('displayFormat', 'MM/dd/yyyy')}
        firstDayOfWeek={0}
        isDateBlocked={(date: Date) => isSameDay(date, addDays(new Date(), 1))}
      />
    </ThemeProvider>
  ))
  .add('Custom day render', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          daySize: 50,
        },
      }}
    >
      <App
        rtl={boolean('rtl', false)}
        vertical={boolean('vertical', false)}
        exactMinBookingDays={boolean('exactMinBookingDays', false)}
        showResetDates={boolean('showResetDates', true)}
        showClose={boolean('showClose', true)}
        displayFormat={text('displayFormat', 'MM/dd/yyyy')}
        onDayRender={(date: Date) => (
          <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
            {dayLabelFormatFn(date)}
            😜
          </Flex>
        )}
      />
    </ThemeProvider>
  ))
  .add('Theming', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          fontFamily: 'system-ui, -apple-system',
          colors: {
            accessibility: '#D80249',
            selectedDay: '#f7518b',
            selectedDayHover: '#F75D95',
            primaryColor: '#d8366f',
          },
        },
      }}
    >
      <App
        rtl={boolean('rtl', false)}
        vertical={boolean('vertical', false)}
        exactMinBookingDays={boolean('exactMinBookingDays', false)}
        showResetDates={boolean('showResetDates', true)}
        showClose={boolean('showClose', true)}
        displayFormat={text('displayFormat', 'MM/dd/yyyy')}
      />
    </ThemeProvider>
  ))
