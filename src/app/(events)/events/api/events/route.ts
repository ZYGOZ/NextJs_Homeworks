import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

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

const eventsData: EventsData = require("./db.json");

export async function GET(req: NextApiRequest, context: NextPageContext) {
  console.log(context);
  return NextResponse.json({
    title: "Hello from get product request",
    id: `id from params ${context}`,
  });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
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

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
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
