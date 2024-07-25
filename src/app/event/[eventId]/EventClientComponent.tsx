"use client"; // Marquer ce composant comme client

import Image from "next/image";
import styles from "./page.module.css";
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

export default function EventClientComponent({
  eventData,
  apiKey,
}: {
  eventData: any;
  apiKey: string;
}) {
  const [indexPicture, setIndexPicture] = useState(0);
  const [picture, setPicture] = useState("/image.png");
  const router = useRouter();

  useEffect(() => {
    setPicture(
      eventData.event.pictures.length > 0
        ? eventData.event.pictures[0]
        : "/image.png"
    );
  }, [eventData]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const event = eventData.event;
  const host = eventData.host;

  const videoId = event.video.includes("youtu.be")
    ? event.video.split("youtu.be/")[1]
    : event.video.split("v=")[1]?.split("&")[0];

  // paramètres pour le lecteur vidéo Youtube
  const opts = {
    height: `260`,
    width: `430`,
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (event.pictures.length > 0) {
      setPicture(event.pictures[indexPicture]);
    }
  }, [indexPicture, event.pictures]);

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
                    event.pictures.map((pic: any, index: any) => (
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
                {event.video && (
                  <div className={styles.video}>
                    {" "}
                    {event.video && <YouTube videoId={videoId} opts={opts} />}
                  </div>
                )}
                <div className={styles.direction}>
                  <h4>Comment s'y rendre ?</h4>
                  <div>{event.address}</div>
                  {event.access && <div>🚍 {event.access}</div>}
                </div>
              </div>
              <div className={styles.imageContainer}>
                <Image
                  alt="carte"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${event.lat},${event.lng}&zoom=16&size=500x400&key=${apiKey}&markers=color:orange%7C${event.lat},${event.lng}`}
                  width={500}
                  height={400}
                  className={styles.responsiveImage}
                  layout="responsive"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
