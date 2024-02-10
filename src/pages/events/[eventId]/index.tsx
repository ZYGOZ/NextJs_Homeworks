import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events?id=${eventId}`);
        if (res.ok) {
          const data: EventType = await res.json();
          setSelectedEvent(data);
        } else {
          console.error("Failed to fetch event");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!selectedEvent) {
    return <div>Загрузка...</div>;
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
