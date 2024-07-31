"use client";

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import LeftColumn from "../components/LeftColumn";

import styles from "./page.module.css";
import { saveTokenToCookie } from "@/app/utils/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const signup = async () => {
    try {
      if (!email || !name || !object || !message) {
        alert("Les informations inscrites en orange sont obligatoires.");
        return;
      }
      if (!email.includes("@")) {
        alert("L'adresse email renseignée n'est pas correcte.");
        return;
      }
      const { data } = await axios.post(
        "https://site--petitegraine--xj5ljztnmr2k.code.run/sendEmail",
        {
          email,
          name,
          object,
          message,
        }
      );
      alert("Votre message a bien été envoyé");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      alert("Un problème est survenu.");
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
          page="contact"
          setToken={null}
          token={null}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <div className={styles.intro}>
          <h2>Contacter l'administrateur du site</h2>
          <br />
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
              placeholder="Votre email"
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
              placeholder="Votre nom"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={object ? styles.checked : styles.required}>
              Objet du message :
            </span>
            <input
              type="text"
              value={object}
              placeholder="Demande de renseignements"
              onChange={(event) => {
                setObject(event.target.value);
              }}
            />
          </label>
          <label>
            <span className={message ? styles.checked : styles.required}>
              Message{" "}
            </span>
            <textarea
              cols={100}
              rows={6}
              value={message}
              placeholder="Écrivez ici votre message."
              onChange={(event) => {
                setMessage(event.target.value);
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
              Envoyer le message
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
