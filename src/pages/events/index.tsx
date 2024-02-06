import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface EventType {
  id: number;
  title: string;
  date: string;
  location: string;
  type: string;
}

const EventsPage: React.FC<{ events: EventType[] }> = ({ events }) => {
  const router = useRouter();
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(events);
  const { type } = router.query;

  useEffect(() => {
    if (type) {
      const filtered = events.filter((event) => event.type === type);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [type, events]);

  return (
    <div>
      <h1>Список событий</h1>
      <div>
        <button
          onClick={() => router.push("/events", undefined, { shallow: true })}
        >
          All
        </button>
        <button
          onClick={() =>
            router.push("/events?type=holiday", undefined, { shallow: true })
          }
        >
          Holiday
        </button>
        <button
          onClick={() =>
            router.push("/events?type=networking", undefined, {
              shallow: true,
            })
          }
        >
          Networking
        </button>
        <button
          onClick={() =>
            router.push("/events?type=charity", undefined, { shallow: true })
          }
        >
          Charity
        </button>
      </div>
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <a
              style={{ color: "blue", fontWeight: "bold" }}
              onClick={() => {
                router.push(`/events/${event.id}`);
              }}
            >
              <strong>{event.title}</strong>
            </a>
            - {event.date}, {event.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8001/events");
  const events: EventType[] = await res.json();

  return { props: { events } };
}

export default EventsPage;
