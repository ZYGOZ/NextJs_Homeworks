import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface EventType {
  id: string;
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

  const handleClick = async (eventType: string) => {
    try {
      const res = await fetch(`/api${eventType}`);
      if (res.ok) {
        const data: EventType[] = await res.json();
        setFilteredEvents(data);
        router.push(`${eventType}`, undefined, { shallow: false });
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const res = await fetch(`/api/events?id=${eventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const updatedEvents = filteredEvents.filter(
          (event) => event.id !== eventId
        );
        setFilteredEvents(updatedEvents);
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div>
      <h1>Список событий</h1>
      <div>
        <button onClick={() => handleClick("/events")}>All</button>
        <button onClick={() => handleClick("/events?type=holiday")}>
          Holiday
        </button>
        <button onClick={() => handleClick("/events?type=networking")}>
          Networking
        </button>
        <button onClick={() => handleClick("/events?type=charity")}>
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
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>// реализовать добавление события</div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/events");
    const events: EventType[] = await res.json();
    return { props: { events } };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { props: { events: [] } };
  }
}

export default EventsPage;
