"use client";

import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../../components/Header";
import LeftColumn from "../../components/LeftColumn";

import styles from "./page.module.css";
import { saveTokenToCookie, getTokenFromCookie } from "@/app/utils/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

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
        setEmail(data.email);
        setName(data.name);
        setPhone(data.phone);
        setContact(data.contact);
        setWebsite(data.website);
        setPassword(data.password);
        setCity(data.city);
      } catch (error) {
        console.error("Aucun compte trouvé", error);
      }
    };
    fetchData();
  }, []);

  const updateData = async () => {
    try {
      if (!email || !name || !city || !phone || !contact || !password) {
        alert("Les informations inscrites en orange sont obligatoires.");
        return;
      }
      if (!email.includes("@")) {
        alert("L'adresse email renseignée n'est pas correcte.");
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
        "https://site--petitegraine--xj5ljztnmr2k.code.run/host/update",
        {
          email,
          name,
          city,
          phone,
          contact,
          website,
          password,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("data", data);
      setToken(data.token);
      saveTokenToCookie(data.token);
      alert("Vos informations ont bien été mises à jour");
      router.push("/organisateur");
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Une erreur est survenue.");
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
          <div className={styles.right}>
            <button
              className={styles.btn}
              onClick={() => {
                updateData();
              }}
            >
              Modifier les informations
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
