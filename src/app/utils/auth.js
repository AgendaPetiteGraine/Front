// utils/auth.js
import Cookies from "js-cookie";

export const saveTokenToCookie = (token) => {
  Cookies.set("token", token, { expires: 30 }); // Le token expire dans 30 jours
};
export const getTokenFromCookie = () => {
  // Récupérez le token depuis le cookie
  return Cookies.get("token");
};
export const removeTokenFromCookie = (token) => {
  Cookies.remove("token");
};

export const saveEventIdToCookie = (eventId) => {
  Cookies.set("eventId", eventId, { expires: 1 });
};
export const getEventIdFromCookie = () => {
  // Récupérez le token depuis le cookie
  return Cookies.get("eventId");
};
export const removeEventIdFromCookie = () => {
  Cookies.remove("eventId");
};

export const setInterestsToCookie = (interests, eventId) => {
  const newInterests = [...interests];
  const index = newInterests.indexOf(eventId);
  console.log(index);
  if (index > -1) {
    newInterests.splice(index, 1);
  } else {
    newInterests.push(eventId);
  }
  console.log("Setting interests to cookie:", newInterests);
  Cookies.set("interests", JSON.stringify(newInterests), { expires: 360 });
  return newInterests;
};

export const getInterestsFromCookie = () => {
  const interests = Cookies.get("interests");
  console.log("récupérer interests des cookies", interests);
  return interests;
};

export const updateInterestsInCookie = (interests) => {
  console.log("Updating interests in cookie:", interests);
  Cookies.set("interests", JSON.stringify(interests), { expires: 360 });
};

export const displayDate = (date) => {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${day} ${months[monthIndex]} ${year}`;
};

export const displayDateDay = (date) => {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  const days = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const day = date.getUTCDate();
  const dayIndex = date.getDay();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${days[dayIndex]} ${day} ${months[monthIndex]} ${year}`;
};
