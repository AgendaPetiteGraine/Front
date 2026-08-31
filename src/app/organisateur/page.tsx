"use client";

import Image from "next/image";
import LeftColumn from "../components/LeftColumn";
import styles from "./page.module.css";
import axios, { AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  saveTokenToCookie,
  displayDateDay,
  getTokenFromCookie,
  removeTokenFromCookie,
  saveEventIdToCookie,
} from "../utils/auth";
import Header from "../components/Header";
// comment
export default function Home() {
  interface Data {
    email: string;
    status: string;
    name: string;
    city: string;
    phone: string;
    contact: string;
    website: string;
    events: Event[];
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
    place: string;
    price: string;
    status: string;
    pictures: string[];
    keyWords: string[];
    description: string;
    city: string;
    free: boolean;
    favorites: number;
  }
  const [token, setToken] = useState(null);
  const [data, setData] = useState<Data | null>(null);
  const [email, setEmail] = useState("");
  const [comingEvents, setComingEvents] = useState<Event[]>([]);
  const [deletedEvents, setDeletedEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [reload, setReload] = useState(false);
  //
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const { data } = await axios.get(
            "https://site--petitegraine--xj5ljztnmr2k.code.run/host/account",
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );
          setData(data);
          const newComingEvents = data.events.filter(
            (event: Event) =>
              event.status === "À venir" || event.status === "Complet",
          );
          setComingEvents(newComingEvents);
          const newPastEvents = data.events.filter(
            (event: Event) => event.status === "Passé",
          );
          setPastEvents(newPastEvents);
          const newDeletedEvents = data.events.filter(
            (event: Event) => event.status === "Annulé",
          );
          setDeletedEvents(newDeletedEvents);
        } catch (error: unknown) {
          console.error("Erreur lors de la récupération des données:", error);
          if (axios.isAxiosError(error)) {
            // Vérifiez la réponse de l'erreur
            if (error.response?.statusText === "Not Found") {
              removeTokenFromCookie();
              setToken(null);
            }
          }
        }
      }
    };
    fetchData();
  }, [token, reload]);

  useEffect(() => {
    const tokenFromCookie = getTokenFromCookie();
    console.log("token", tokenFromCookie);
    setToken(tokenFromCookie);
  }, []);

  const signin = async () => {
    try {
      const { data } = await axios.post(
        "https://site--petitegraine--xj5ljztnmr2k.code.run/host/signin",
        {
          email: email,
          password: password,
        },
      );
      setToken(data.token);
      saveTokenToCookie(data.token);
      // const temporaryToken = ""
      // saveTokenToCookie(temporaryToken);
      // saveTokenToCookie(temporaryToken);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Les identifiants sont incorrects.");
    }
  };

  const soldout = async (eventId: string) => {
    try {
      const { data } = await axios.post(
        `https://site--petitegraine--xj5ljztnmr2k.code.run/event/complet/${eventId}`,
        {
          status: "Complet",
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      alert("L'événement est bien marqué complet.");
      const tokenToUpdate = token;
      setToken(tokenToUpdate);
      setReload(!reload);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Une erreur s'est produite.");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.leftColumn}>
        <LeftColumn
          setToken={setToken}
          token={token}
          filter={null}
          setFilter={null}
          keyWords={null}
          cities={null}
          types={null}
          events={null}
          data={data}
          page="home"
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        {token ? (
          <section className={styles.section}>
            <h1>Bienvenue sur votre espace organisateur</h1>
            <br />
            <div className={styles.mobile}>
              <button
                className={styles.btnCreate}
                onClick={() => {
                  router.push("/organisateur/nouveau");
                }}
              >
                Créer un nouvel événement
              </button>
              <br />
              <button
                className={styles.btnContact}
                onClick={() => {
                  router.push(`/contact/`);
                }}
              >
                Contacter l'Administrateur
              </button>
            </div>
            {data ? (
              <>
                <div className={styles.eventsList}>
                  <h2>Vos événements à venir</h2>
                  <br />
                  <div className={styles.eventsTab}>
                    {comingEvents.map((event, index) => {
                      return (
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
                          {event.free && (
                            <div className={styles.free}>GRATUIT</div>
                          )}
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
                          </div>
                          <div>
                            Nombre d'ajouts en favoris : {event.favorites}
                          </div>
                          <div className={styles.actions}>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/modifier`);
                              }}
                            >
                              Modifier
                            </button>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/copier`);
                              }}
                            >
                              Copier
                            </button>
                            {event.status === "À venir" && (
                              <button
                                className={styles.btn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soldout(event._id);
                                }}
                              >
                                🔐 Complet
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* événements passés */}
                <div className={styles.eventsList}>
                  <h2>Vos événements passés</h2>
                  <br />
                  <div className={styles.eventsTab}>
                    {pastEvents.map((event, index) => {
                      return (
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
                          {event.free && (
                            <div className={styles.free}>GRATUIT</div>
                          )}
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
                          </div>
                          <div className={styles.actions}>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/modifier`);
                              }}
                            >
                              Modifier
                            </button>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/copier`);
                              }}
                            >
                              Copier
                            </button>
                            {event.status === "À venir" && (
                              <button
                                className={styles.btn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soldout(event._id);
                                }}
                              >
                                🔐 Complet
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* événements annulés */}
                <div className={styles.eventsList}>
                  <h2>Vos événements annulés</h2>
                  <br />
                  <div className={styles.eventsTab}>
                    {deletedEvents.map((event, index) => {
                      return (
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
                          {event.free && (
                            <div className={styles.free}>GRATUIT</div>
                          )}
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
                          </div>
                          <div className={styles.actions}>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/modifier`);
                              }}
                            >
                              Modifier
                            </button>
                            <button
                              className={styles.btn}
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEventIdToCookie(event._id);
                                router.push(`/organisateur/copier`);
                              }}
                            >
                              Copier
                            </button>
                            {event.status === "À venir" && (
                              <button
                                className={styles.btn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  soldout(event._id);
                                }}
                              >
                                🔐 Complet
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.mobile}>
                    <button
                      className={styles.btnCreate}
                      onClick={() => {
                        removeTokenFromCookie();
                        setToken(null);
                      }}
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p>Chargement des données...</p>
            )}
          </section>
        ) : (
          <section className={styles.section}>
            <h2>Connectez-vous pour accéder à votre espace</h2>
            <div className={styles.connexionForm}>
              <label>
                Email :
                <input
                  type="email"
                  value={email}
                  placeholder="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </label>
              <label>
                Mot de passe :
                <input
                  type="password"
                  value={password}
                  placeholder="mot de passe"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </label>
              <button
                onClick={() => {
                  signin();
                }}
              >
                Se connecter
              </button>
            </div>
            <br />
            <h2>Pas encore de compte ?</h2>
            <div>
              Vous organisez des événements dédiés aux tout-petits dans la zone
              géographique ciblée ? N'hésitez pas à nous contacter pour créer
              votre compte et référencer vos événements sur l'agenda.
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
