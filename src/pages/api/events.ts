import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { stringify } from "querystring";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
}
interface EventsData {
  events: EventType[];
}

const eventsData: EventsData = require("../../../db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      console.log(req.query.id);
      const hasIdQueryParam = req.query.id !== undefined;
      return hasIdQueryParam ? getEventById(req, res) : getEvents(req, res);
    case "POST":
      return addEvent(req, res);
    case "DELETE":
      return deleteEvent(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

function getEvents(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(eventsData.events);
}

function getEventById(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.id as string;

  const event = eventsData.events.find((event) => event.id === eventId);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.status(200).json(event);
}

function addEvent(req: NextApiRequest, res: NextApiResponse) {
  const { title, date, location, description, type }: EventType = req.body;

  if (!title || !date || !location || !type) {
    return res.status(400).json({ message: "Missing parameters" });
  }
  const id = (eventsData.events.length + 1).toString();
  const newEvent: EventType = { id, title, date, location, description, type };
  eventsData.events.push(newEvent);

  fs.writeFileSync(
    path.join(process.cwd(), "", "db.json"),
    JSON.stringify(eventsData, null, 2)
  );

  return res
    .status(201)
    .json({ message: "Event added successfully", event: newEvent });
}

function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const eventId: string = req.query.id as string;

  if (!eventId) {
    return res.status(400).json({ message: "Missing event ID" });
  }

  const index: number = eventsData.events.findIndex(
    (event) => event.id === eventId
  );

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }
  eventsData.events.splice(index, 1);

  fs.writeFileSync(
    path.join(process.cwd(), "", "db.json"),
    JSON.stringify(eventsData, null, 2)
  );

  return res.status(200).json({ message: "Event deleted successfully" });
}
