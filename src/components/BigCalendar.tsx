"use client"

import { Calendar, momentLocalizer, View, Views} from 'react-big-calendar'
import { useState } from 'react'
import moment from 'moment'
import { calendarEvents } from '@/lib/data'
import 'react-big-calendar/lib/css/react-big-calendar.css'


const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK)


  // Handle view change
  const handleOnChangeView = (selectedView:View) => {
    setView(selectedView);
  }
  return (
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          views={["work_week", "day"]}
          view={view}
          onView={handleOnChangeView}
          defaultView={Views.WORK_WEEK}
          min={new Date(2025, 1, 0, 8, 0,0)}
          max={new Date(2025, 1, 0, 17,0, 0)}
          style={{ height: "98%" }}
        />
)
}

export default BigCalendar;