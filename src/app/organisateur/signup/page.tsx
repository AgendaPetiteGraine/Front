"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import LeftColumn from "../../components/LeftColumn";

import styles from "./page.module.css";
import { saveTokenToCookie } from "@/app/utils/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  const signup = async () => {
    try {
      if (!email || !name || !city || !phone || !contact || !password || !key) {
        alert("Les informations inscrites en orange sont obligatoires.");
        return;
      }
      if (!email.includes("@")) {
        alert("L'adresse email renseignée n'est pas correcte.");
        return;
      }
      if (website && website.slice(0, 3) !== "www") {
        alert("Le site internet doit commencer par www.");
        return;
      }
      if (password.length < 8) {
        alert("Le mot de passe doit faire au moins 8 caractères");
        return;
      }
      if (phone.split(".").length !== 5) {
        alert(
          "Le numéro de téléphone doit être écrit avec des . entre chaque dizaine, sans espace."
        );
        return;
      }
      const { data } = await axios.post(
        "https://site--petitegraine--xj5ljztnmr2k.code.run/host/signup",
        {
          email,
          name,
          city,
          phone,
          contact,
          website,
          password,
          key,
        }
      );
      console.log("data", data);
      setToken(data.token);
      saveTokenToCookie(data.token);
      alert("Votre compte a bien été créé");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("La clé de validation est incorrecte.");
    }
  };

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
          data={null}
          page="signup"
          setToken={setToken}
          token={token}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <div className={styles.intro}>
          <h2>Créer un compte organisateur</h2>
          <br />
          Vous êtes organisateur et vous voulez renseigner vos événements sur
          l'Agenda Culturel Petite Graine ? Complétez ce formulaire en indiquant
          la clé de validation donnée par Petite Graine. Si vous ne la
          connaissez pas, contactez l'administrateur en cliquant ici.
        </div>
        <br />
        <div className={styles.form}>
          <label>
            <span className={email ? styles.checked : styles.required}>
              Email :
            </span>
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
            <span className={name ? styles.checked : styles.required}>
              Nom de l'organisation :
            </span>
            <input
              type="text"
              value={name}
              placeholder="nom de l'organisation"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={city ? styles.checked : styles.required}>
              Ville :
            </span>
            <input
              type="text"
              value={city}
              placeholder="ville"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={contact ? styles.checked : styles.required}>
              Contact{" "}
            </span>
            (prénom et nom du contact en charge du référencement) :
            <input
              type="text"
              value={contact}
              placeholder="Prénom Nom"
              onChange={(event) => {
                setContact(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={phone ? styles.checked : styles.required}>
              Téléphone du contact :
            </span>
            <input
              type="text"
              value={phone}
              placeholder="01.00..."
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </label>
          <label>
            Site internet :
            <input
              type="text"
              value={website}
              placeholder="www."
              onChange={(event) => {
                setWebsite(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={password ? styles.checked : styles.required}>
              Mot de passe :
            </span>
            <input
              type="password"
              value={password}
              placeholder="mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={key ? styles.checked : styles.required}>
              Clé de validation :
            </span>
            <input
              type="text"
              value={key}
              placeholder="donnée par Petite Graine"
              onChange={(event) => {
                setKey(event.target.value);
              }}
            />
          </label>
          <div className={styles.right}>
            <button
              className={styles.btn}
              onClick={() => {
                signup();
              }}
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
