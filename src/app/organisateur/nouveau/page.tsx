"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getTokenFromCookie } from "../../utils/auth";
import MyDropzone from "../../components/MyDropzone";
import { useRouter } from "next/navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../../../../lib/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

export default function NewEvent() {
  interface Address {
    description: string;
    place_id: string;
    // Autres propriétés éventuelles
  }
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
  const [access, setAccess] = useState("");
  const [address, setAddress] = useState("");
  const [googleAddress, setGoogleAddress] = useState<Address[]>([]);
  const [addressChecked, setAddressChecked] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [previousPictures, setPreviousPictures] = useState<string[]>([]);
  const [video, setVideo] = useState("");
  const [website, setWebsite] = useState("");
  const [ticketing, setTicketing] = useState("");
  const [bookingRequired, setBookingRequired] = useState("");
  const [bookingSpecifications, setBookingSpecifications] = useState("");
  const [recurrence, setRecurrence] = useState("false");
  const [picturesLib, setPicturesLib] = useState<string[]>([]);
  const router = useRouter();
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [place_id, setPlace_id] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
        setIsLoading(false);
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
          console.log("google address", data);
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

  const submit = async () => {
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
      bookingRequired &&
      place_id
    ) {
      let formattedWebsite = website;
      if (website && website.slice(0, 8) === "https://") {
        formattedWebsite = website.slice(8);
      }
      if (website && website.slice(0, 7) === "http://") {
        alert("L'adresse du site internet n'est pas sécurisée.");
        return;
      }
      let formattedTicketing = ticketing;
      if (ticketing && ticketing.slice(0, 8) === "https://") {
        formattedTicketing = ticketing.slice(8);
      }
      if (ticketing && ticketing.slice(0, 7) === "http://") {
        alert("L'adresse du site de réservation n'est pas sécurisée.");
        return;
      }
      if (video && video.slice(0, 17) !== "https://youtu.be/") {
        alert(
          "L'adresse de la vidéo youtube doit commencer par https://youtu.be/"
        );
        return;
      }
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
        formData.append("description", description);
        for (let i = 0; i < pictures.length; i++) {
          formData.append("pictures", pictures[i]);
        }
        formData.append("video", video);
        formData.append("website", formattedWebsite);
        formData.append("ticketing", formattedTicketing);
        formData.append("place_id", place_id);
        formData.append("bookingRequired", bookingRequired);
        formData.append("recurrence", recurrence);
        for (let i = 0; i < previousPictures.length; i++) {
          formData.append("previousPictures", previousPictures[i]);
        }
        formData.append("bookingSpecifications", bookingSpecifications);
        const { data } = await axios.post(
          `https://site--petitegraine--xj5ljztnmr2k.code.run/event/create`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setIsLoading(false);
        alert("L'événement a bien été créé !");
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
      {token ? (
        <section className={styles.section}>
          <h2>Créer un nouvel événement</h2>
          <br />
          <p>
            Tous les champs <span className={styles.required}>colorés</span>{" "}
            sont obligatoires pour créer un nouvel événement. <br /> Une fois
            créé, l'événement sera automatiquement rendu public sur l'agenda.
            Vous pourrez toutefois le modifier par la suite.
          </p>
          <br />
          <div className={styles.form}>
            <label>
              <span className={title ? styles.checked : styles.required}>
                Titre :
              </span>
              <input
                className={styles.largeInput}
                type="text"
                value={title}
                placeholder="titre de l'événement"
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
                    placeholder="9h30"
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
                    placeholder="11h"
                    onChange={(event) => {
                      setTimeEnd(event.target.value);
                    }}
                  />
                </label>
              </div>
              <div>
                <label className={ageMin ? styles.checked : styles.required}>
                  Âge minimal (en années) :
                  <input
                    type="number"
                    value={ageMin}
                    placeholder="2"
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
                    placeholder="5"
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
                placeholder="Nom du lieu"
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
                placeholder=" 3 rue ..."
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
                      console.log("suggestion", suggestion.place_id);
                    }}
                  >
                    {suggestion.description}
                  </li>
                ))}
            </ul>
            <label>
              <span>Accès:</span>
              <input
                className={styles.largeInput}
                type="text"
                value={access}
                placeholder="Bus 210, arrêt Hotel de Ville."
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
                placeholder="ex: 3€ pour les enfants, 5€ pour les adultes"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </label>
            <fieldset>
              <legend>
                <span
                  className={bookingRequired ? styles.checked : styles.required}
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
                placeholder="Vous pouvez préciser si la réservation se fait par téléphone ou email (dans ce cas, écrivez les coordonnées ici). Si la réservation se fait en ligne sur le site, précisez juste qu'il faut cliquer sur le bouton de réservation."
                onChange={(event) => {
                  setBookingSpecifications(event.target.value);
                }}
              />
            </label>
            <label>
              <span className={description ? styles.checked : styles.required}>
                Description :
              </span>
              <textarea
                cols={100}
                rows={6}
                value={description}
                placeholder="description de l'événement"
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
                placeholder="cirque musique clown"
                onChange={(event) => {
                  setKeyWords(event.target.value);
                }}
              />
            </label>
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
                    Récurrence : Cochez la case si vous pensez réutiliser ces
                    images pour d'autres événements. Vous pourrez les retrouver
                    plus rapidement dans votre bibliothèque, sans avoir à les
                    charger.
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
                            checked={previousPictures.includes(picture) ?? true}
                            onChange={(event) => {
                              const ind = previousPictures.indexOf(picture);
                              if (ind === -1) {
                                const newPreviousPictures = [
                                  ...previousPictures,
                                ];
                                newPreviousPictures.push(picture);
                                setPreviousPictures(newPreviousPictures);
                              } else {
                                const newPreviousPictures = [
                                  ...previousPictures,
                                ];
                                newPreviousPictures.splice(ind, 1);
                                setPreviousPictures(newPreviousPictures);
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
            <div className={styles.center}>
              <button
                onClick={() => {
                  submit();
                }}
                className={styles.btn}
              >
                Créer l'événement
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>Vous n'êtes plus connecté. Retour à la page d'accueil.</>
      )}
    </main>
  );
}
