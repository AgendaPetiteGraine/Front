"use client";
import Image from "next/image";
import Header from "./components/Header";
import LeftColumn from "./components/LeftColumn";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { displayDateDay, displayDateMonth } from "./utils/auth";
import { useRouter } from "next/navigation";
import {
  setInterestsToCookie,
  getInterestsFromCookie,
  updateInterestsInCookie,
} from "../app/utils/auth";
import { init } from "@amplitude/analytics-browser";
import { logEvent } from "@amplitude/analytics-browser";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import "../../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  // comments
  interface Suggestion {
    name: string;
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
    free: boolean;
  }
  interface Filter {
    type: string[];
    ageMin: number;
    areBabyAccepted: boolean;
    city: string[];
    keyWords: string;
    free: boolean;
    date: Date | null;
  }
  const defaultFilter: Filter = {
    type: [],
    ageMin: 4,
    areBabyAccepted: false,
    city: [],
    keyWords: "",
    free: false,
    date: null,
  };
  interface KeyWord {
    name: string;
  }
  const [events, setEvents] = useState<Event[] | null>(null);
  const [eventsToDisplay, setEventsToDisplay] = useState<Event[] | null>(null);
  const [eventsList, setEventslist] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [keyWords, setKeyWords] = useState<KeyWord[]>([]);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey, setApiKey] = useState();
  const [week, setWeek] = useState(0);
  const [weekStart, setWeekStart] = useState<Date>(new Date());
  const [weekEnd, setWeekEnd] = useState<Date>(new Date());
  const [displayMoreFilters, setDisplayMoreFilters] = useState(false);
  const [isFree, setIsFree] = useState(false);
  const [areBabyAccepted, setAreBabyAccepted] = useState(false);

  const getStartOfWeek = (date: Date, weekOffset: number = 0) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const startOfWeek = new Date(date.setDate(diff));
    startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7); // Décalage en fonction de la semaine
    setWeekStart(startOfWeek);
    return startOfWeek;
  };

  const getEndOfWeek = (startOfWeek: Date) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Ajouter 6 jours pour obtenir le samedi
    setWeekEnd(endOfWeek);
    return endOfWeek;
  };

  const handleResize = () => {
    if (window.innerWidth < 650) {
      console.log("Responsive");
      if (events) {
        const startOfWeek = getStartOfWeek(new Date(), week);
        const endOfWeek = getEndOfWeek(startOfWeek);
        const filteredEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= startOfWeek && eventDate <= endOfWeek;
        });
        setEventsToDisplay(filteredEvents);
      }
    } else {
      setEventsToDisplay(events); // Afficher tous les événements lorsque la fenêtre est plus large que 650px
    }
  };

  const changeFilter = (type: any, element: any) => {
    if (filter) {
      const newFilter = { ...filter };
      if (type === "city") {
        const index = newFilter.city.indexOf(element);
        if (index > -1) {
          newFilter.city.splice(index, 1);
        } else {
          newFilter.city.push(element);
        }
      }
      if (type === "type") {
        const index = newFilter.type.indexOf(element);
        if (index > -1) {
          newFilter.type.splice(index, 1);
        } else {
          newFilter.type.push(element);
        }
      }
      if (type === "keyWords") {
        newFilter.keyWords = element;
      }
      if (type === "free") {
        newFilter.free = !isFree;
        setIsFree(!isFree);
      }
      if (type === "areBabyAccepted") {
        newFilter.areBabyAccepted = true;
      }
      setFilter(newFilter);
    }
  };

  // Récupérer les données au premier chargement de la page
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/g3tAmp!APIk3y`,
          {}
        );
        console.log("API key", data);
        setApiKey(data);
      } catch (error) {
        console.error("Error fetching Api key:", error);
      }
    };
    const fetchData = async () => {
      try {
        let request = `https://site--petitegraine--xj5ljztnmr2k.code.run/events?`;
        const { data } = await axios.get(request);
        setEvents(data.eventsComing);
        setEventsToDisplay(data.eventsComing);
        const newEventsList = [""];
        data.eventsComing.map((event: Event) => {
          newEventsList.push(event._id);
        });
        setEventslist(newEventsList);
        setCities([...data.cities]);
        setFilter({
          city: data.cities,
          type: data.types,
          ageMin: 4,
          areBabyAccepted: false,
          keyWords: data.keyWordsList,
          free: false,
          date: null,
        });
        setTypes([...data.types]);
        const keyWordsTab = data.keyWordsList.map((keyWord: string) => ({
          name: keyWord,
        }));
        setKeyWords([...keyWordsTab]);
        console.log(data.eventsComing);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
    fetchApiKey();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsClient(true);
    if (eventsList.length > 0) {
      let interestsList = [];
      const newInterests: string[] = [];
      const interestsFromCookies = getInterestsFromCookie();
      if (interestsFromCookies) {
        interestsList = JSON.parse(interestsFromCookies);
        interestsList.map((interest: string) => {
          if (eventsList.includes(interest)) {
            newInterests.push(interest);
          }
          setInterests(newInterests);
          updateInterestsInCookie(newInterests);
        });
      }
    }
  }, [eventsList]);

  // Actualiser les données quand les filtres sont modifiés
  useEffect(() => {
    const fetchData = async () => {
      try {
        let request = `https://site--petitegraine--xj5ljztnmr2k.code.run/events?`;
        if (filter && filter.type) {
          const typesList = filter.type.map((type) => `type=${type}`).join(`&`);
          request = request + `&` + typesList;
        }
        request = request + `&ageMin=${filter.ageMin}`;
        if (filter && filter.keyWords && typeof filter.keyWords === "string") {
          request = request + `&keyWords=${filter.keyWords}`;
        }
        if (filter && filter.free) {
          request = request + `&free=${true}`;
        }
        if (filter && filter.date) {
          request = request + `&date=${filter.date}`;
        }
        if (filter && filter.city) {
          const citiesList = filter.city
            .map((city) => `city=${city}`)
            .join(`&`);
          request = request + `&` + citiesList;
        }
        const { data } = await axios.get(request);
        setEvents(data.eventsComing);
        setEventsToDisplay(data.eventsComing);
        console.log(request);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (apiKey) {
      console.log("Initializing Amplitude with API key:", apiKey);
      init(apiKey);
    }
  }, [apiKey]);

  useEffect(() => {
    // Appeler handleResize au premier rendu pour vérifier la largeur initiale
    handleResize();
    // Ajouter un écouteur d'événement pour détecter les changements de dimension
    window.addEventListener("resize", handleResize);
    // Nettoyer l'écouteur d'événement lorsqu'il n'est plus nécessaire
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [events, week]);

  const handleClick = (eventName: string) => {
    logEvent(eventName, { buttonName: eventName });
  };

  // ajouter ou enlever des favoris (actualiser les stats)
  const favorites = async (eventId: string, change: string) => {
    try {
      const { data } = await axios.post(
        `https://site--petitegraine--xj5ljztnmr2k.code.run/event/favorites/${eventId}`,
        {
          change,
        }
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftColumn}>
        <LeftColumn
          filter={filter}
          setFilter={setFilter}
          keyWords={keyWords}
          cities={cities}
          types={types}
          events={events}
          page="events"
          data={null}
          setToken={null}
          token={null}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <section className={styles.section}>
          <div className={styles.mobile}>
            <div className={styles.flexColumnCenter}>
              <Image
                src="/logo.png" // Le chemin vers l'image dans le dossier public
                alt="Logo" // Texte alternatif pour l'accessibilité
                width={258} // Largeur de l'image
                height={195} // Hauteur de l'image
              />
              <h3>L'Agenda Culturel des Tout-Petits</h3>
              <br />
            </div>
          </div>
          {isLoading ? (
            <div>En cours de chargement</div>
          ) : events && events.length > 0 ? (
            <div>
              <div className={styles.inversedColors}>
                <h3 className={styles.h3}>Vos événements favoris</h3>
                {interests.length > 0 ? (
                  <div className={styles.favTab}>
                    {events?.map((event) => {
                      return (
                        interests.includes(event._id) && (
                          <div
                            key={event._id}
                            className={styles.eventFav}
                            onClick={() => {
                              handleClick(event.title);
                              isClient && router.push(`/event/${event._id}`);
                            }}
                          >
                            {event.pictures.length > 0 ? (
                              <Image
                                src={event.pictures[0]}
                                alt={event.title}
                                width={298}
                                height={200}
                                className={styles.eventImageFav}
                                style={{
                                  filter:
                                    event.status === "Complet"
                                      ? "grayscale(1)"
                                      : "grayscale(0)",
                                  objectPosition: `center center`,
                                }}
                              />
                            ) : (
                              <Image
                                src="/image.png"
                                alt={event.title}
                                width={298}
                                height={200}
                                className={styles.eventImageFav}
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
                            {interests.includes(event._id) ? (
                              <div
                                className={styles.heart}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("eventId", event._id);
                                  const newInterests = setInterestsToCookie(
                                    interests,
                                    event._id
                                  );
                                  favorites(event._id, "remove");
                                  console.log("newInterests", newInterests);
                                  setInterests(newInterests);
                                }}
                              >
                                <FontAwesomeIcon icon="heart" size="2xl" />
                              </div>
                            ) : (
                              //
                              <div
                                className={styles.heartEmpty}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("eventId", event._id);
                                  const newInterests = setInterestsToCookie(
                                    interests,
                                    event._id
                                  );
                                  favorites(event._id, "add");
                                  console.log("newInterests", newInterests);
                                  setInterests(newInterests);
                                }}
                              >
                                <FontAwesomeIcon icon="heart" size="2xl" />
                              </div>
                            )}
                            {event.free && (
                              <div className={styles.free}>GRATUIT</div>
                            )}
                            <div className={styles.dateBox}>
                              <div
                                style={{ width: "200px", overflow: "hidden" }}
                              >
                                <Image
                                  src="/feuille.png"
                                  alt="date"
                                  width={250}
                                  height={25}
                                />
                              </div>
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
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    Vous n'avez aucun événement favori à venir. Gérez vos
                    favoris en cliquant sur le ❤︎ correspondant à chaque
                    événement.
                  </div>
                )}
              </div>
              <h3 className={styles.h3}>Prochains événements</h3>
              <div className={styles.mobile}>
                <div className={styles.filters}>
                  <div>
                    <div className={styles.filtersLeft}>
                      <div>
                        <label>
                          Gratuits uniquement{" "}
                          <input
                            type="checkbox"
                            checked={isFree}
                            onChange={() => {
                              setIsFree(!isFree);
                              changeFilter("free", isFree);
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <label>
                          Bébés acceptés{" "}
                          <input
                            type="checkbox"
                            checked={areBabyAccepted}
                            onChange={() => {
                              setAreBabyAccepted(!areBabyAccepted);
                              changeFilter("areBabyAccepted", areBabyAccepted);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                    <div className={styles.filterTypes}>
                      {types.map((type, index) => (
                        <label key={index}>
                          {type}
                          <input
                            type="checkbox"
                            value={type}
                            checked={
                              (filter && filter.type.includes(type)) ?? false
                            }
                            onChange={() => {
                              changeFilter("type", type);
                            }}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  {!displayMoreFilters && (
                    <button
                      className={styles.plus}
                      onClick={() => {
                        setDisplayMoreFilters(!displayMoreFilters);
                      }}
                    >
                      + Plus de Filtres
                    </button>
                  )}
                  {displayMoreFilters && (
                    <div className={styles.filterPlace}>
                      Filtrer par ville : <br />
                      {cities.map((city, index) => (
                        <label key={index}>
                          {city}
                          <input
                            type="checkbox"
                            value={city}
                            checked={
                              (filter && filter.city.includes(city)) ?? false
                            }
                            onChange={(event) => {
                              changeFilter("city", city);
                            }}
                          />
                        </label>
                      ))}
                    </div>
                  )}
                  {displayMoreFilters && (
                    <button
                      className={styles.plus}
                      onClick={() => {
                        setDisplayMoreFilters(!displayMoreFilters);
                      }}
                    >
                      - Moins de Filtres
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.mobile}>
                <div className={styles.flex}>
                  <button
                    onClick={() => {
                      week > 0 && setWeek(week - 1);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-left" size="2xl" />
                  </button>
                  {week === 0 ? (
                    <h3>Cette semaine</h3>
                  ) : (
                    <h3 className={styles.center}>
                      Semaine du {displayDateMonth(weekStart)}
                      <br /> au {displayDateMonth(weekEnd)}
                    </h3>
                  )}
                  <button
                    onClick={() => {
                      setWeek(week + 1);
                    }}
                  >
                    <FontAwesomeIcon icon="chevron-right" size="2xl" />
                  </button>
                </div>
              </div>
              <div className={styles.eventsTab}>
                {eventsToDisplay?.map((event) => (
                  <div
                    key={event._id}
                    className={styles.event}
                    onClick={() => {
                      handleClick(event.title);
                      isClient && router.push(`/event/${event._id}`);
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {event.pictures.length > 0 ? (
                        <Image
                          src={event.pictures[0]}
                          alt={event.title}
                          // width={298}
                          // height={200}
                          layout="fill"
                          className={styles.eventImage}
                          style={{
                            filter:
                              event.status === "Complet"
                                ? "grayscale(1)"
                                : "grayscale(0)",
                            objectPosition: `center center`,
                          }}
                        />
                      ) : (
                        <Image
                          src="/image.png"
                          alt={event.title}
                          // width={298}
                          // height={200}
                          className={styles.eventImage}
                          layout="fill"
                          style={{
                            filter:
                              event.status === "Complet"
                                ? "grayscale(1)"
                                : "grayscale(0)",
                          }}
                        />
                      )}
                    </div>
                    {event.status === "Complet" && (
                      <div className={styles.complet}>Complet</div>
                    )}
                    {interests.includes(event._id) ? (
                      <div
                        className={styles.heart}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("eventId", event._id);
                          const newInterests = setInterestsToCookie(
                            interests,
                            event._id
                          );
                          favorites(event._id, "remove");
                          console.log("newInterests", newInterests);
                          setInterests(newInterests);
                        }}
                      >
                        <FontAwesomeIcon icon="heart" size="2xl" />
                      </div>
                    ) : (
                      //
                      <div
                        className={styles.heartEmpty}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("eventId", event._id);
                          const newInterests = setInterestsToCookie(
                            interests,
                            event._id
                          );
                          favorites(event._id, "add");
                          console.log("newInterests", newInterests);
                          setInterests(newInterests);
                        }}
                      >
                        <FontAwesomeIcon icon="heart" size="2xl" />
                      </div>
                    )}
                    {event.free && <div className={styles.free}>GRATUIT</div>}
                    <div className={styles.dateBox}>
                      <div style={{ width: "200px", overflow: "hidden" }}>
                        <Image
                          src="/feuille.png"
                          alt="date"
                          width={250}
                          height={25}
                        />
                      </div>
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
                      <div className={styles.list}>
                        {event.areBabyAccepted && (
                          <div className={styles.listInfos}>
                            <Image
                              src="/baby.png"
                              alt="poussette"
                              width={20}
                              height={20}
                            />{" "}
                            Bébés bienvenus
                          </div>
                        )}
                        <div className={styles.listInfos}>
                          <Image
                            src="/here.png"
                            alt="ici"
                            width={20}
                            height={20}
                          />{" "}
                          {event.place} -{" "}
                          <span className={styles.orange}>{event.city}</span>
                        </div>
                        <div className={styles.listInfos}>
                          <Image
                            src="/money.png"
                            alt="prix"
                            width={20}
                            height={20}
                          />{" "}
                          {event.price}
                        </div>
                      </div>
                      <div className={styles.separateur}>
                        <Image
                          src="/separateur.png"
                          alt="séparateur"
                          height={20}
                          width={300}
                        />
                      </div>
                      <div className={styles.description}>
                        {event.description.slice(0, 350)}
                        {event.description.slice(350) && "..."}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.mobile}>
                <div className={styles.flexCenter}>
                  <button
                    className={styles.btnWeek}
                    onClick={() => {
                      setWeek(week + 1);
                    }}
                  >
                    Semaine Prochaine
                    <FontAwesomeIcon icon="chevron-right" size="2xl" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>Aucun événement à afficher</div>
          )}
        </section>
      </div>
    </main>
  );
}
