"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/events?id=${eventId}`
        );
        if (res.ok) {
          const data: EventType = await res.json();
          setSelectedEvent(data);
        } else {
          console.error("Failed to fetch event");
          setSelectedEvent(null);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setSelectedEvent(null);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!selectedEvent) {
    return <div>Событие не найдено</div>;
  }

  return (
    <div>
      <h1>Детали события: </h1>
      <p>Название: {selectedEvent.title}</p>
      <p>Дата: {selectedEvent.date}</p>
      <p>Местоположение: {selectedEvent.location}</p>
      <p>Тип: {selectedEvent.type}</p>
      <p>Описание: {selectedEvent.description}</p>
    </div>
  );
};

export default EventDetailPage;
