import React from "react";
import { useRouter } from "next/router";

const EventDetailPage: React.FC = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const events = [
    {
      id: "1",
      title: 'Концерт "Рок ночь"',
      date: "2024-02-10",
      location: 'Стадион "РокАрена"',
      description: "Это будет великолепный концерт рок-музыки!",
    },
    {
      id: "2",
      title: "Выставка современного искусства",
      date: "2024-02-15",
      location: 'Галерея "ArtSpace"',
      description:
        "Приходите на нашу выставку и наслаждайтесь произведениями современных художников!",
    },
    {
      id: "3",
      title: "Презентация новой книги",
      date: "2024-02-20",
      location: 'Книжный магазин "Прочитай меня"',
      description:
        "Приглашаем вас на презентацию новой книги известного автора!",
    },
  ];

  const selectedEvent = events.find((event) => event.id === eventId);

  if (!selectedEvent) {
    return <div>Событие не найдено</div>;
  }

  return (
    <div>
      <h1>Детали события: {selectedEvent.title}</h1>
      <p>Дата: {selectedEvent.date}</p>
      <p>Местоположение: {selectedEvent.location}</p>
      <p>Описание: {selectedEvent.description}</p>
    </div>
  );
};

export default EventDetailPage;
