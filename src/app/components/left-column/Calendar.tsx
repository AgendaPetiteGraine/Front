import React from "react";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import dynamic from "next/dynamic";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface MyCalendarProps {
  setFilter: (filter: any) => void;
  filter: any;
  events: Event[];
}
interface Event {
  _id: string;
  title: string;
  type: string;
  date: Date;
  timeStart: string;
  timeEnd: string;
  ageMin: number;
  ageMax: number;
  areBabyAccepted: boolean;
  city: string;
  place: string;
  address: string;
  price: string;
  status: string;
  pictures: string[];
  keyWords: string[];
  description: string;
}
const DynamicCalendar = dynamic(() => import("react-calendar"), { ssr: false });
export default function MyCalendar({
  setFilter,
  filter,
  events,
}: MyCalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [datesList, setDatesList] = useState<Number[]>([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [eventsAreSaved, setEventsAreSaved] = useState(false);

  useEffect(() => {
    if (events && !eventsAreSaved) {
      setEventsList([...events]);
      setEventsAreSaved(true);
    }
  }, [events]);

  useEffect(() => {
    if (eventsList) {
      const dates: number[] = [];
      eventsList.forEach((event) => {
        const date = new Date(event.date);
        if (date.getMonth() === month && date.getFullYear() === year) {
          dates.push(date.getUTCDate());
        }
      });
      setDatesList(dates);
    }
  }, [eventsList, month]);

  return (
    <div className="calendar">
      <Calendar
        locale="fr-FR"
        onClickDay={(value, event) => {
          const date = value;
          const newFilter = { ...filter };
          newFilter.date = date;
          setFilter(newFilter);
        }}
        value={value}
        tileContent={({ activeStartDate, date, view }) => {
          if (view === "month") {
            const isSameMonth =
              activeStartDate.getMonth() === date.getMonth() &&
              activeStartDate.getFullYear() === date.getFullYear();
            if (isSameMonth) {
              const hasEvent = datesList.includes(date.getUTCDate() + 1);
              if (hasEvent) {
                return <div className="event"></div>;
              }
            }
          }
          return <div className="no-event"></div>;
        }}
        onActiveStartDateChange={({ activeStartDate }) => {
          activeStartDate && setMonth(activeStartDate.getMonth());
          activeStartDate && setYear(activeStartDate.getFullYear());
          const newFilter = { ...filter };
          newFilter.date = null;
          setFilter(newFilter);
        }}
      />
      <style jsx>{`
        .calendar {
          width: 100%;
          border: none;
        }
        .event {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2a4160;
        }
        .no-event {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: none;
        }
      `}</style>
    </div>
  );
}
