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
    console.log(events);
    if (type) {
      const filtered = events.filter((event) => event.type === type);
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [type, events]);

  const handleClick = async (eventType: string) => {
    try {
      const res = await fetch(`/api/events?type=${eventType}`);
      const data: EventType[] = await res.json();
      setFilteredEvents(data);
      router.push(`/events?type=${eventType}`, undefined, { shallow: true });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  return (
    <div>
      <h1>Список событий</h1>
      <div>
        <button onClick={() => handleClick("")}>All</button>
        <button onClick={() => handleClick("holiday")}>Holiday</button>
        <button onClick={() => handleClick("networking")}>Networking</button>
        <button onClick={() => handleClick("charity")}>Charity</button>
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
