import React, {useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
require("moment/locale/es.js")
const localizer = momentLocalizer(moment);
const dayColors = [
  "#c6cbda",
  "#fee1e8",
  "#fed7c3",
  "#f6eac2",
  "#ecd5e3",
  "#ffd8be",
  "#eceae4"
];
const dayPropGetter = (date) => {
  //console.log('[dayPropGetter] ', date, ' day ', date.getDay());
  return {
    style: {
      backgroundColor: dayColors[date.getDay()]
    }
  };
}

export default function Modulo({eventos,onSelectEvent,onSelectSlot,styleProps}){
  const handleSelectEvent=(event)=>{
    console.log("[handleSelectEvent] ",event)
    if(onSelectEvent)onSelectEvent(event)
   }
   const handleSelectSlot = (event)=>{
     if(onSelectSlot)onSelectSlot(event)
   }
   const styleSelectEvent=props=>{
      if(styleProps)return styleProps(props)
   }

    return (
   
        <Calendar
          localizer={localizer}
          culture="es"
          defaultDate={new Date()}
          defaultView="month"
          events={eventos}
          selectable
          // scrollToTime={scrollToTime}
          style={{ height: "70vh",width:"100%" }}
          dayPropGetter={dayPropGetter}
          onDoubleClickEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={styleSelectEvent}
          messages={
            {
              week: 'Semana',
              work_week: 'Semana de trabajo',
              day: 'Día',
              month: 'Mes',
              previous: 'Atrás',
              next: 'Después',
              today: 'Hoy',
              agenda: 'Registro',
          
              showMore: (total) => `+${total} más`,
            }
          }
        />

    );
  }


