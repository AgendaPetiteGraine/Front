"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "../components/Header";
import LeftColumn from "../components/LeftColumn";

import styles from "./page.module.css";
import { saveTokenToCookie } from "@/app/utils/auth";

export default function Apropos() {
  const router = useRouter();

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
          page="apropos"
          setToken={null}
          token={null}
        />
      </div>
      <div className={styles.rightColumn}>
        <Header />
        <div className={styles.description}>
          <h2>Une graine a été plantée</h2>
          <p>
            Petite Graine est une association loi 1901 créée en 2023 à
            Sarcelles, dans le Val d'Oise.
          </p>
          <br />
          <h3>Sa mission ?</h3>
          <p>
            Créer un agenda culturel dédiés aux plus petits. Ces événements sont
            en plein essor, mais manquent encore beaucoup de visibilité.
            <br />
            Pour les parents, se tenir informés de ces rencontres culturelles
            prend beaucoup de temps car souvent, elles ne sont visibles que sur
            le site de l'organisateur, ou bien elles se retrouvent noyées dans
            des agendas culturels généralistes.
            <br />
            Or quand on est parent, du temps, on n'en a pas des masses !<br />
            Cet agenda est donc là pour simplifier la vie à tous ces parents
            débordés qui ont quand-même envie de nourrir la curiosité et
            l'imaginaire de leurs enfants.
          </p>
          <br />
          <h3>Quels événements peut-on y trouver ?</h3>
          <p>
            Tous les événements culturels, à condition que ceux-ci soient
            destinés à un jeune public (0-5 ans inclus) et qu'il ait lieu dans
            une des communes sur lesquelles le dispositif est déployé.
            <br />
            Un événement culturel, ça peut être un spectacle vivant (de musique,
            de théâtre, de danse, de marionettes,...), une séance de lecture,
            une séance de cinéma d'art et d'essai, une exposition, un salon...
            N'importe quelle rencontre qui vise à développer chez l'enfant la
            curiosité, l'ouverture sur le monde, l'imaginaire...
          </p>
          <br />
          <h3>Quels sont les organisateurs partenaires ?</h3>
          <p>
            À l'heure actuelle, Petite Graine référence les événements qui ont
            lieu dans les communes d'Arnouville, Ecouen, Gonesse, Sarcelles et
            Villiers-le-Bel. Cette zone géographique s'aggrandira dans le futur.
            N'hésitez pas à vous inscrire à la newsletter pour vous tenir
            informés de ces évolutions, ainsi que de tous les événements qui ont
            lieu dans cette zone.
            <br />
            Voici la liste des organisateurs qui référencent déjà leurs
            événements sur Petite Graine, classés par ville :
          </p>

          <br />
          <h3>Mentions légales</h3>
          <p>
            Retrouvez les mentions légales{" "}
            <Link href="/mentionslegales">ici</Link>.
          </p>
        </div>
        <br />
      </div>
    </main>
  );
}
