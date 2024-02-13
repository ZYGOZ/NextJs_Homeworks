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

const eventsData: EventsData = require("../events/db.json");

export async function GET(req: NextApiRequest, context: any) {
  const eventId = context.params.id as string;

  const event = eventsData.events.find((event) => event.id === eventId);

  return NextResponse.json(event);
}
