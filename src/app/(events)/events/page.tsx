"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}

const EventsPage: React.FC = () => {
  const router = useRouter();
  const [events, setEvents] = useState<EventType[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(events);
  const [newEvent, setNewEvent] = useState<EventType>({
    id: "",
    title: "",
    date: "",
    location: "",
    description: "",
    type: "",
  });
  const { type } = useParams<{ type: string }>();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/events");
        if (res.ok) {
          const data: EventType[] = await res.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

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
        router.push(`${eventType}`);
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

  const handleAddEvent = async () => {
    try {
      const res = await fetch(`/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (res.ok) {
        const newEventFromServer: EventType = await res.json();
        setFilteredEvents([...filteredEvents, newEventFromServer]);
        setNewEvent({
          id: "",
          title: "",
          date: "",
          location: "",
          description: "",
          type: "",
        });
      } else {
        console.error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewEvent({ ...newEvent, [field]: e.target.value });
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
      <div>
        <h2>Добавить событие:</h2>
        <input
          type="text"
          value={newEvent.title}
          onChange={(e) => handleInputChange(e, "title")}
          placeholder="Название"
        />
        <input
          type="text"
          value={newEvent.date}
          onChange={(e) => handleInputChange(e, "date")}
          placeholder="Дата"
        />
        <input
          type="text"
          value={newEvent.location}
          onChange={(e) => handleInputChange(e, "location")}
          placeholder="Место"
        />
        <input
          type="text"
          value={newEvent.description}
          onChange={(e) => handleInputChange(e, "description")}
          placeholder="Описание"
        />
        <input
          type="text"
          value={newEvent.type}
          onChange={(e) => handleInputChange(e, "type")}
          placeholder="Тип"
        />
        <button onClick={handleAddEvent}>Добавить событие</button>
      </div>
    </div>
  );
};

export async function getServerStaticParams() {
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
