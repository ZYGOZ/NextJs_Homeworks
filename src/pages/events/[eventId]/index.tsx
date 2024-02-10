import React from "react";
import { useRouter } from "next/router";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

const EventDetailPage: React.FC<{ selectedEvent: EventType }> = ({
  selectedEvent,
}) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Загрузка...</div>;
  }

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

export async function getStaticPaths() {
  return {
    paths: [{ params: { eventId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const eventId = params.eventId;

  try {
    const res = await fetch(`http://localhost:3000/api/events?id=${eventId}`);
    if (res.ok) {
      const selectedEvent: EventType = await res.json();
      return { props: { selectedEvent } };
    } else {
      return { props: { selectedEvent: null } };
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return { props: { selectedEvent: null } };
  }
}

export default EventDetailPage;
