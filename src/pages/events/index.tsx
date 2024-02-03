import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const EventsPage: React.FC = () => {
  const router = useRouter();
  const events = [
    {
      id: "1",
      title: 'Концерт "Рок ночь"',
      date: "2024-02-10",
      location: 'Стадион "РокАрена"',
    },
    {
      id: "2",
      title: "Выставка современного искусства",
      date: "2024-02-15",
      location: 'Галерея "ArtSpace"',
    },
    {
      id: "3",
      title: "Презентация новой книги",
      date: "2024-02-20",
      location: 'Книжный магазин "Прочитай меня"',
    },
  ];

  return (
    <div>
      <h1>Список событий</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <a
              style={{ color: "blue", fontWeight: "bold" }}
              onClick={() => {
                router.push(`/events/${event.id}/photos/${event.id}`);
              }}
            >
              <strong>{event.title}</strong>
            </a>{" "}
            - {event.date}, {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
