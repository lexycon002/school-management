"use client"

import { Calendar, momentLocalizer, View, Views} from 'react-big-calendar'
import { useState } from 'react'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  // const [view, setView] = useState<View>(Views.WORK_WEEK)

  const [view, setView] = useState<View>('week');

  const handleOnChangeView = (selectedView:View) => {
    setView(selectedView);
  }
  return (
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        // views={['work_week' ,'day']}
        views={['week', 'day']}
        view={view}
        style={{ height: "98%" }}
        onView={handleOnChangeView}
        min={new Date(2025,7,0,7,0,0)}
        max={new Date(2025,7,0,19,0,0)}
    />
)
}

export default BigCalendar;