import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface EventType {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
}

interface EventsData {
  events: EventType[];
}

const eventsData: EventsData = require("../../../db.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getEvents(req, res);
    case "POST":
      return addEvent(req, res);
    case "DELETE":
      console.log("hello ", req.method);
      return deleteEvent(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

function getEvents(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(eventsData.events);
}

function addEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, date, location, type }: EventType = req.body;

  if (!id || !title || !date || !location || !type) {
    return res.status(400).json({ message: "Missing parameters" });
  }

  const newEvent: EventType = { id, title, date, location, type };
  eventsData.events.push(newEvent);

  fs.writeFileSync(
    path.join(process.cwd(), "data", "events.json"),
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
