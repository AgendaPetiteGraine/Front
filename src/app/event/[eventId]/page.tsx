import axios from "axios";
import EventClientComponent from "./EventClientComponent"; // Importez le composant client

export async function generateStaticParams() {
  const { data } = await axios.get(
    "https://site--petitegraine--xj5ljztnmr2k.code.run/eventsId"
  );
  return data.events.map((event: { _id: string }) => ({
    eventId: event._id,
  }));
}

async function fetchEventData(eventId: string) {
  const { data } = await axios.get(
    `https://site--petitegraine--xj5ljztnmr2k.code.run/event/${eventId}`
  );
  return data;
}

async function fetchApiKey() {
  const { data } = await axios.get(
    `https://site--petitegraine--xj5ljztnmr2k.code.run/g3t0Gg!APIk3y`
  );
  return data;
}

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const eventData = await fetchEventData(params.eventId);
  const apiKey = await fetchApiKey();

  return <EventClientComponent eventData={eventData} apiKey={apiKey} />;
}
