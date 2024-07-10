"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getTokenFromCookie } from "../../../utils/auth";
import MyDropzone from "../../../components/MyDropzone";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../../../../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EventToUpdate({
  params,
}: {
  params: { eventId: string };
}) {
  const event_Id = params.eventId;
  const [isLoading, setIsLoading] = useState(true);
  interface Address {
    description: string;
    place_id: string;
    // Autres propriétés éventuelles
  }
  const [eventId, setEventId] = useState<any>();
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [areBabyAccepted, setAreBabyAccepted] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [access, setAccess] = useState("");
  const [googleAddress, setGoogleAddress] = useState<Address[]>([]);
  const [addressChecked, setAddressChecked] = useState(true);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [currentPictures, setCurrentPictures] = useState<string[]>([]);
  const [video, setVideo] = useState("");
  const [website, setWebsite] = useState("");
  const [ticketing, setTicketing] = useState("");
  const [bookingRequired, setBookingRequired] = useState("");
  const [bookingSpecifications, setBookingSpecifications] = useState("");
  const [recurrence, setRecurrence] = useState("false");
  const [status, setStatus] = useState("");
  const [picturesLib, setPicturesLib] = useState<string[]>([]);
  const router = useRouter();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [place_id, setPlace_id] = useState("");

  useEffect(() => {
    if (event_Id) {
      setEventId(event_Id);
    }
    const tokenFromCookie = getTokenFromCookie();
    setToken(tokenFromCookie);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/host/account`,
          {
            headers: {
              authorization: `Bearer ${tokenFromCookie}`,
            },
          }
        );
        setPicturesLib(data.pictures_lib);
      } catch (error) {
        console.error("Aucun compte trouvé", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    //   faire valider l'adresse par googleMaps
    const handleChange = async () => {
      if (address.length > 5 && !addressChecked) {
        // Limiter les requêtes
        try {
          const { data } = await axios.get(
            `https://site--petitegraine--xj5ljztnmr2k.code.run/googlePlace?address=${encodeURIComponent(
              address
            )}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setGoogleAddress(data);
        } catch (error) {
          console.error("Aucune adresse trouvée:", error);
        }
      }
    };
    const fetchAccess = async () => {
      if (addressChecked) {
        try {
          console.log("adresse", address);
          const { data } = await axios.post(
            `https://site--petitegraine--xj5ljztnmr2k.code.run/place/`,
            {
              address,
            }
          );
          console.log("Acces", data);
          setAccess(data.access);
        } catch (error) {
          console.error("Aucune adresse trouvée:", error);
        }
      }
    };
    handleChange();
    fetchAccess();
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/event/${eventId}`
        );
        console.log("data", data);
        setTitle(data.event.title);
        setType(data.event.type);
        const keyWordsTab: string[] = [];
        if (data.event.keyWords && data.event.keyWords.length > 0) {
          data.event.keyWords.map((keyWord: string) => {
            keyWordsTab.push(keyWord);
          });
        }
        setKeyWords(keyWordsTab.join(" "));
        const formattedDate = new Date(data.event.date)
          .toISOString()
          .split("T")[0];
        setDate(formattedDate);
        setTimeStart(data.event.timeStart);
        setTimeEnd(data.event.timeEnd);
        if (data.event.areBabyAccepted) {
          setAreBabyAccepted("true");
        } else {
          setAreBabyAccepted("false");
        }
        setPlace(data.event.place);
        setAddress(data.event.address);
        setPrice(data.event.price);
        setDescription(data.event.description);
        setCurrentPictures(data.event.pictures);
        setVideo(data.event.video);
        setWebsite(data.event.website);
        setAgeMin(data.event.ageMin);
        setAgeMax(data.event.ageMax);
        setTicketing(data.event.ticketing);
        setStatus(data.event.status);
        if (data.event.bookingRequired) {
          setBookingRequired("true");
        } else {
          setBookingRequired("false");
        }
        setBookingSpecifications(data.event.bookingSpecifications);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
    if (eventId) {
      fetchData();
      setIsLoading(false);
    }
  }, [eventId]);

  const deletePicture = (picture: string) => {
    const index = currentPictures.indexOf(picture);
    if (index > -1) {
      const updatedPictures = [...currentPictures];
      updatedPictures.splice(index, 1);
      setCurrentPictures(updatedPictures);
    }
  };

  const updateEvent = async () => {
    if (
      title &&
      type &&
      date &&
      timeStart &&
      place &&
      address &&
      price &&
      bookingSpecifications &&
      description &&
      areBabyAccepted &&
      bookingRequired
    ) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("type", type);
        formData.append("keyWords", keyWords);
        formData.append("date", date);
        formData.append("timeStart", timeStart);
        formData.append("timeEnd", timeEnd);
        formData.append("ageMin", ageMin);
        formData.append("ageMax", ageMax);
        formData.append("areBabyAccepted", areBabyAccepted);
        formData.append("place", place);
        formData.append("address", address);
        formData.append("access", access);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("description", description);
        for (let i = 0; i < pictures.length; i++) {
          formData.append("pictures", pictures[i]);
        }
        for (let i = 0; i < currentPictures.length; i++) {
          formData.append("currentPictures", currentPictures[i]);
        }
        formData.append("video", video);
        formData.append("website", website);
        formData.append("recurrence", recurrence);
        formData.append("ticketing", ticketing);
        formData.append("place_id", place_id);
        formData.append("bookingRequired", bookingRequired);
        formData.append("bookingSpecifications", bookingSpecifications);
        const { data } = await axios.post(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/event/update/${eventId}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsLoading(false);
        alert("L'événement a bien été modifié !");
        router.push("/organisateur");
      } catch (error) {
        setIsLoading(false);
        alert("Une erreur s'est produite.");
        console.error("Une erreur s'est produite:", error);
      }
    } else {
      alert("Tous les champs colorés doivent être complétés.");
      return;
    }
  };

  return (
    <main className={styles.main}>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loading}>
            <div>En cours de chargement</div>
            <div>
              <Image
                src="/teapot.gif"
                alt="chargement"
                width={150}
                height={122}
              />
            </div>
          </div>
        </div>
      )}
      {eventId && (
        <div className={styles.main}>
          <section className={styles.section}>
            Modifier un événement
            <div>
              <div className={styles.form}>
                <label>
                  <span className={title ? styles.checked : styles.required}>
                    Titre :
                  </span>
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </label>
                <fieldset>
                  <legend>
                    <span className={type ? styles.checked : styles.required}>
                      Type d'événement :
                    </span>{" "}
                  </legend>
                  <label className={styles.radio}>
                    Spectacle 
                    <input
                      type="radio"
                      value="Spectacle"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      checked={type === "Spectacle"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Cinéma 
                    <input
                      type="radio"
                      value="Cinéma"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      checked={type === "Cinéma"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Lecture 
                    <input
                      type="radio"
                      value="Lecture"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      checked={type === "Lecture"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Atelier 
                    <input
                      type="radio"
                      value="Atelier"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      checked={type === "Atelier"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Échanges 
                    <input
                      type="radio"
                      value="Échanges"
                      name="type"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      checked={type === "Échanges"}
                    />
                  </label>
                </fieldset>
                <div className={styles.columns}>
                  <div className={styles.leftCol}>
                    <label>
                      <span className={date ? styles.checked : styles.required}>
                        Date :
                      </span>
                      <input
                        type="date"
                        value={date}
                        onChange={(event) => {
                          setDate(event.target.value);
                        }}
                      />
                    </label>
                    <label>
                      <span
                        className={timeStart ? styles.checked : styles.required}
                      >
                        Heure de début :
                      </span>
                      <input
                        type="text"
                        value={timeStart}
                        onChange={(event) => {
                          setTimeStart(event.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Heure de fin :
                      <input
                        type="text"
                        value={timeEnd}
                        onChange={(event) => {
                          setTimeEnd(event.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className={styles.rightCol}>
                    <label
                      className={ageMin ? styles.checked : styles.required}
                    >
                      Âge minimal (en années) :
                      <input
                        type="number"
                        value={ageMin}
                        onChange={(event) => {
                          setAgeMin(event.target.value);
                        }}
                      />
                    </label>
                    <label>
                      Âge maximum (en années) :
                      <input
                        type="number"
                        value={ageMax}
                        onChange={(event) => {
                          setAgeMax(event.target.value);
                        }}
                      />
                    </label>
                    <fieldset>
                      <legend>
                        <span
                          className={
                            areBabyAccepted ? styles.checked : styles.required
                          }
                        >
                          Présence de bébé(s) autorisée ?
                        </span>
                      </legend>
                      <label className={styles.radio}>
                        Oui 
                        <input
                          type="radio"
                          value="true"
                          name="baby"
                          onChange={(event) => {
                            setAreBabyAccepted(event.target.value);
                          }}
                          checked={areBabyAccepted === "true"}
                        />
                      </label>
                      <label className={styles.radio}>
                        Non 
                        <input
                          type="radio"
                          value="false"
                          name="baby"
                          onChange={(event) => {
                            setAreBabyAccepted(event.target.value);
                          }}
                          checked={areBabyAccepted === "false"}
                        />
                      </label>
                    </fieldset>
                  </div>
                </div>
                <label>
                  <span className={place ? styles.checked : styles.required}>
                    Lieu :
                  </span>
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={place}
                    onChange={(event) => {
                      setPlace(event.target.value);
                    }}
                  />
                </label>
                <label>
                  <span className={address ? styles.checked : styles.required}>
                    Adresse :
                  </span>
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={address}
                    onChange={(event) => {
                      setAddressChecked(false);
                      setAddress(event.target.value);
                    }}
                  />
                </label>
                <ul>
                  {googleAddress.length > 0 &&
                    googleAddress.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setAddressChecked(true);
                          setAddress(suggestion.description);
                          setGoogleAddress([]);
                          setPlace_id(suggestion.place_id);
                        }}
                      >
                        {suggestion.description}
                      </li>
                    ))}
                </ul>
                <label>
                  <span>Accès: </span>
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={access}
                    onChange={(event) => {
                      setAccess(event.target.value);
                    }}
                  />
                </label>
                <label>
                  <span className={price ? styles.checked : styles.required}>
                    Prix :
                  </span>
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </label>
                <fieldset>
                  <legend>
                    <span
                      className={
                        bookingRequired ? styles.checked : styles.required
                      }
                    >
                      Réservation obligatoire ?
                    </span>
                  </legend>
                  <label className={styles.radio}>
                    Oui
                    <input
                      type="radio"
                      value="true"
                      name="booking"
                      onChange={(event) => {
                        setBookingRequired(event.target.value);
                      }}
                      checked={bookingRequired === "true"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Non
                    <input
                      type="radio"
                      value="false"
                      name="booking"
                      onChange={(event) => {
                        setBookingRequired(event.target.value);
                      }}
                      checked={bookingRequired === "false"}
                    />
                  </label>
                </fieldset>
                <label>
                  <span
                    className={
                      bookingSpecifications ? styles.checked : styles.required
                    }
                  >
                    Modalités de réservation :
                  </span>
                  <textarea
                    cols={100}
                    rows={6}
                    value={bookingSpecifications}
                    onChange={(event) => {
                      setBookingSpecifications(event.target.value);
                    }}
                  />
                </label>
                <label>
                  <span
                    className={description ? styles.checked : styles.required}
                  >
                    Description :
                  </span>
                  <textarea
                    cols={100}
                    rows={6}
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </label>
                <label>
                  Mots-clés (séparés par des espaces) :
                  <input
                    className={styles.largeInput}
                    type="text"
                    value={keyWords}
                    onChange={(event) => {
                      setKeyWords(event.target.value);
                    }}
                  />
                </label>
                <h4>Images actuelles :</h4>
                <div className={styles.currentPicturesContainer}>
                  {currentPictures.map((picture, index) => (
                    <div key={index}>
                      <Image
                        src={picture}
                        alt={`image ${index}`}
                        width={300}
                        height={250}
                      />
                      <button
                        onClick={() => {
                          deletePicture(picture);
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.picturesContainer}>
                  <div>
                    <MyDropzone setPictures={setPictures} key={dropzoneKey} />
                    {pictures && pictures.length > 0 && (
                      <label>
                        <input
                          type="checkbox"
                          checked={recurrence === "true" ?? true}
                          onChange={(event) => {
                            if (recurrence === "true") {
                              setRecurrence("false");
                            } else {
                              setRecurrence("true");
                            }
                          }}
                        />
                        Récurrence : Cochez la case si vous pensez réutiliser
                        ces images pour d'autres événements. Vous pourrez les
                        retrouver plus rapidement dans votre bibliothèque, sans
                        avoir à les charger.
                      </label>
                    )}
                    <button
                      onClick={() => {
                        setPictures([]);
                        setDropzoneKey((prevKey) => prevKey + 1);
                      }}
                      className={styles.noborder}
                    >
                      <FontAwesomeIcon
                        icon="trash"
                        size="2xl"
                        className={styles.trash}
                      />
                    </button>
                  </div>
                  <div>
                    Ou sélectionner des images déjà chargées dans votre
                    bibliothèque :
                    <div className={styles.picturesLibContainer}>
                      {picturesLib &&
                        picturesLib.map((picture, index) => {
                          return (
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  currentPictures.includes(picture) ?? true
                                }
                                onChange={(event) => {
                                  const ind = currentPictures.indexOf(picture);
                                  if (ind === -1) {
                                    const newCurrentPictures = [
                                      ...currentPictures,
                                    ];
                                    newCurrentPictures.push(picture);
                                    setCurrentPictures(newCurrentPictures);
                                  } else {
                                    const newCurrentPictures = [
                                      ...currentPictures,
                                    ];
                                    newCurrentPictures.splice(ind, 1);
                                    setCurrentPictures(newCurrentPictures);
                                  }
                                }}
                              />
                              <Image
                                src={picture}
                                key={index}
                                alt={`image ${index}`}
                                width={300 / 1.5}
                                height={200 / 1.5}
                              />
                            </label>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <label>
                  Lien vers une vidéo youtube :
                  <input
                    className={styles.largeInput}
                    type="url"
                    value={video}
                    placeholder="https://youtu.be/"
                    onChange={(event) => {
                      setVideo(event.target.value);
                    }}
                  />
                </label>
                <label>
                  Lien vers une page d'informations :
                  <input
                    className={styles.largeInput}
                    type="url"
                    value={website}
                    placeholder="https://www..."
                    onChange={(event) => {
                      setWebsite(event.target.value);
                    }}
                  />
                </label>
                <label>
                  Lien vers une page de réservation :
                  <input
                    className={styles.largeInput}
                    type="url"
                    value={ticketing}
                    placeholder="https://www..."
                    onChange={(event) => {
                      setTicketing(event.target.value);
                    }}
                  />
                </label>
                <fieldset>
                  <legend>
                    <span className={status ? styles.checked : styles.required}>
                      Statut :
                    </span>{" "}
                  </legend>
                  <label className={styles.radio}>
                    À venir
                    <input
                      type="radio"
                      value="À venir"
                      name="status"
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                      checked={status === "À venir"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Complet
                    <input
                      type="radio"
                      value="Complet"
                      name="status"
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                      checked={status === "Complet"}
                    />
                  </label>
                  <label className={styles.radio}>
                    Annulé
                    <input
                      type="radio"
                      value="Annulé"
                      name="status"
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                      checked={status === "Annulé"}
                    />
                  </label>
                </fieldset>
                <div className={styles.center}>
                  <button
                    onClick={() => {
                      updateEvent();
                    }}
                    className={styles.btn}
                  >
                    Modifier l'événement
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
