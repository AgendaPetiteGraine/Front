"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { displayDateDay } from "../../utils/auth";
import { useRouter } from "next/navigation";
import LeftColumn from "../../components/LeftColumn";
import Header from "../../components/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../../../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import YouTube from "react-youtube";

export async function getStaticPaths() {
  // Utilisez generateStaticParams() ici pour générer les chemins statiques
  const paths = generateStaticParams();

  return {
    paths,
    fallback: false, // ou true si vous utilisez le fallback
  };
}

// Fonction pour générer les paramètres statiques
export function generateStaticParams() {
  // Remplacez cette logique par votre propre logique pour générer les chemins statiques
  return [{ params: { eventId: "1" } }, { params: { eventId: "2" } }];
}

export default function Event({ params }: { params: { eventId: string } }) {
  const event_Id = params.eventId;
  // paramètres pour le lecteur vidéo Youtube
  const opts = {
    height: `260`,
    width: `430`,
    playerVars: {
      autoplay: 0,
    },
  };

  interface Address {
    description: string;
    // Autres propriétés éventuelles
  }
  interface Event {
    _id: string;
    title: string;
    type: string;
    date: Date;
    timeStart: string;
    timeEnd: string;
    ageMin: number;
    ageMax: number;
    areBabyAccepted: boolean;
    city: string;
    place: string;
    address: string;
    price: string;
    status: string;
    pictures: string[];
    keyWords: string[];
    description: string;
    bookingRequired: boolean;
    bookingSpecifications: string;
    website: string;
    ticketing: string;
    video: string;
    access: string;
    lat: number;
    lng: Number;
    free: boolean;
  }
  interface Host {
    _id: string;
    name: string;
    city: string;
    website: string;
    facebook: string;
    events: Event[];
  }
  const [eventId, setEventId] = useState<any>();
  const [event, setEvent] = useState<Event | null>(null);
  const [picture, setPicture] = useState<any>();
  const [indexPicture, setIndexPicture] = useState(0);
  const [host, setHost] = useState<Host | null>(null);
  const [video, setVideo] = useState();
  const [key, setKey] = useState("");
  const [address, setAddress] = useState("10 Bd du Palais, 75001 Paris");
  const router = useRouter();

  useEffect(() => {
    if (event_Id) {
      setEventId(event_Id);
    }
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/event/${event_Id}`
        );
        setEvent(data.event);
        console.log("event", data.event);
        setHost(data.host);
        const videoId = data.event.video.includes("youtu.be")
          ? data.event.video.split("youtu.be/")[1]
          : data.event.video.split("v=")[1]?.split("&")[0];
        setVideo(videoId);
        setAddress(data.event.address);
        console.log(videoId);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    const fetchApiKey = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/g3t0Gg!APIk3y`,
          {}
        );
        console.log("API key", data);
        setKey(data);
      } catch (error) {
        console.error("Error fetching Api key:", error);
      }
    };
    fetchData();
    fetchApiKey();
  }, []);

  useEffect(() => {
    if (event && event.pictures.length > 0) {
      setPicture(event.pictures[indexPicture]);
    } else {
      setPicture("/image.png");
    }
  }, [indexPicture, event]);

  return (
    <main className={styles.main}>
      <div className={styles.leftColumn}>
        <LeftColumn
          filter={null}
          setFilter={null}
          keyWords={null}
          cities={null}
          types={null}
          events={null}
          page="event"
          data={host}
          setToken={null}
          token={null}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <section className={styles.section}>
          <h2 className={styles.mainTitle}>
            {event && event.title.toUpperCase()}
          </h2>
          <div className={styles.part1}>
            <div>
              <div className={styles.containerPhotos}>
                <div>
                  {indexPicture > 0 ? (
                    <FontAwesomeIcon
                      icon="caret-left"
                      style={{ color: "#294260" }}
                      size="2xl"
                      onClick={() => {
                        if (indexPicture > 0) {
                          setIndexPicture(indexPicture - 1);
                        }
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon="caret-left"
                      style={{ color: "#BABABA" }}
                      size="2xl"
                    />
                  )}
                </div>
                <div className={styles.photos}>
                  {picture && event && (
                    <Image
                      src={picture}
                      alt={event.title}
                      width={600}
                      height={400}
                      className={styles.picture}
                    />
                  )}
                </div>
                <div>
                  {event && indexPicture < event.pictures.length - 1 ? (
                    <FontAwesomeIcon
                      icon="caret-right"
                      style={{ color: "#294260" }}
                      size="2xl"
                      onClick={() => {
                        if (event && indexPicture < event.pictures.length - 1) {
                          setIndexPicture(indexPicture + 1);
                        }
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon="caret-right"
                      style={{ color: "#BABABA" }}
                      size="2xl"
                    />
                  )}
                </div>
              </div>
              {event && event.pictures.length > 0 && (
                <div className={styles.miniatures}>
                  {event &&
                    event.pictures.map((pic, index) => (
                      <div
                        key={index}
                        className={styles.circle}
                        onClick={() => {
                          setPicture(pic);
                          setIndexPicture(index);
                        }}
                      >
                        <Image src={pic} alt="image" width={20} height={20} />
                      </div>
                    ))}
                </div>
              )}
            </div>
            {event && (
              <div>
                <div>
                  <span className={styles.bold}>Date : </span>
                  {displayDateDay(new Date(event.date))}
                </div>
                <div>
                  <span className={styles.bold}>Heure : </span>
                  {event.timeEnd
                    ? `De ${event.timeStart} à ${event.timeEnd}`
                    : `À partir de ${event.timeStart}`}
                </div>
                <div>
                  <span className={styles.bold}>Type d'événement : </span>
                  {event.type}
                </div>
                <div>
                  <span className={styles.bold}>Âge : </span>
                  {event.ageMax
                    ? event.ageMin
                      ? event.ageMax === 99
                        ? `À partir de ${event.ageMin} ans`
                        : `De ${event.ageMin} à ${event.ageMax} ans`
                      : `De la naissance à ${event.ageMax} ans`
                    : event.ageMin
                    ? `À partir de ${event.ageMin} ans`
                    : `Dès la naissance`}
                </div>
                <div>
                  {event.areBabyAccepted && event.ageMin > 0 && (
                    <div>
                      <Image
                        src="/baby.png"
                        alt="poussette"
                        width={20}
                        height={20}
                      />{" "}
                      Bébés bienvenus : Les petits frères et soeurs qui n'ont
                      pas l'âge minimum peuvent quand même assister à
                      l'événement.
                    </div>
                  )}
                </div>
                <div>
                  <span className={styles.bold}>Prix : </span>
                  {event.price}
                </div>
                <div>{event.bookingRequired && "Réservation obligatoire"}</div>
                <div className={styles.description}>{event.description}</div>
              </div>
            )}
          </div>
          {event && (
            <div className={styles.part2}>
              <div>
                {event.website && (
                  <div
                    className={styles.buttonLG}
                    onClick={() => {
                      window.open(`https://${event.website}`, "_blank");
                    }}
                  >
                    {"-> Plus d'infos".toUpperCase()}
                  </div>
                )}
                {event.ticketing && (
                  <div
                    className={styles.buttonLG}
                    onClick={() => {
                      window.open(`https://${event.ticketing}`, "_blank");
                    }}
                  >
                    {"-> Réserver".toUpperCase()}
                  </div>
                )}
              </div>
              <div className={styles.bookingSpecifications}>
                <span className={styles.bold}>
                  Conditions de réservation : 
                </span>
                {event.bookingSpecifications}
              </div>
            </div>
          )}
          {event && (
            <div className={styles.part3}>
              <div>
                <div className={styles.video}>
                  {" "}
                  {event.video && <YouTube videoId={video} opts={opts} />}
                </div>
                <div className={styles.direction}>
                  <h4>Comment s'y rendre ?</h4>
                  <div>{event.address}</div>
                  {event.access && <div>🚍 {event.access}</div>}
                </div>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  alt="carte"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${event.lat},${event.lng}&zoom=16&size=500x400&key=${key}&markers=color:orange%7C${event.lat},${event.lng}`}
                  width={500}
                  height={400}
                  className={styles.responsiveImage}
                  layout="responsive"
                />
              </div>
            </div>
          )}
          {host && <h3>Prochains événements du même organisateur :</h3>}
          {host && (
            <div className={styles.part4}>
              {host.events.map((event) => (
                <div
                  key={event._id}
                  className={styles.event}
                  onClick={() => {
                    router.push(`/event/${event._id}`);
                  }}
                >
                  {event.pictures.length > 0 ? (
                    <Image
                      src={event.pictures[0]}
                      alt={event.title}
                      width={298}
                      height={200}
                      className={styles.eventImage}
                      style={{
                        filter:
                          event.status === "Complet"
                            ? "grayscale(1)"
                            : "grayscale(0)",
                      }}
                    />
                  ) : (
                    <Image
                      src="/image.png"
                      alt={event.title}
                      width={298}
                      height={200}
                      className={styles.eventImage}
                      style={{
                        filter:
                          event.status === "Complet"
                            ? "grayscale(1)"
                            : "grayscale(0)",
                      }}
                    />
                  )}
                  {event.status === "Complet" && (
                    <div className={styles.complet}>Complet</div>
                  )}
                  {event.free && <div className={styles.free}>GRATUIT</div>}
                  <div className={styles.dateBox}>
                    <Image
                      src="/feuille.png"
                      alt="date"
                      width={250}
                      height={25}
                    />
                    <h4 className={styles.date}>
                      {displayDateDay(new Date(event.date))}
                    </h4>
                    <h4 className={styles.time}>
                      {event.timeEnd
                        ? `De ${event.timeStart} à ${event.timeEnd}`
                        : `À partir de ${event.timeStart}`}
                    </h4>
                  </div>
                  <div className={styles.eventInfos}>
                    <h3 className={styles.title}>
                      {event.title.toUpperCase()}
                    </h3>
                    {event.ageMax
                      ? event.ageMin
                        ? event.ageMax === 99
                          ? `À partir de ${event.ageMin} ans`
                          : `De ${event.ageMin} à ${event.ageMax} ans`
                        : `De la naissance à ${event.ageMax} ans`
                      : event.ageMin
                      ? `À partir de ${event.ageMin} ans`
                      : `Dès la naissance`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
