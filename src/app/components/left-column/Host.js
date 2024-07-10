import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { removeTokenFromCookie } from "@/app/utils/auth";

const Host = ({ data, setToken }) => {
  const router = useRouter();
  const create = () => {
    router.push("/organisateur/nouveau");
  };
  return (
    <div className="host">
      <h3>Vos informations</h3>
      <ul className="list">
        <li>Nom : {data.name}</li>
        <li>Email : {data.email}</li>
        <li>Contact : {data.contact}</li>
        <li>Téléphone : {data.phone}</li>
        <li>website : {data.website}</li>
        <li>statut : {data.status}</li>
      </ul>
      {data.status === "validé" && (
        <button
          onClick={() => {
            create();
          }}
        >
          Créer un nouvel événement
        </button>
      )}
      <button
        onClick={() => {
          router.push("/organisateur/infos");
        }}
      >
        {" "}
        Modifier vos informations
      </button>
      <div>
        <h3>Contacter l'administrateur</h3>
        <br />
        <ul className="list">
          <li>☎️ 06.43.78.57.20</li>
          <li
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/contact/`);
            }}
            className="contact"
          >
            Envoyer un message
          </li>
        </ul>
      </div>

      <button
        onClick={() => {
          removeTokenFromCookie();
          setToken("");
        }}
      >
        Se déconnecter
      </button>

      <style jsx>{`
        .host {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          flex-direction: column;
          gap: 20px;
          color: #ffffff;
        }
        .list {
          font-size: 13px;
          line-height: 18px;
        }
        .contact {
          transition: 0.5s;
        }
        .contact:hover {
          text-transform: uppercase;
          background-color: #2a4160;
        }
      `}</style>
    </div>
  );
};

export default Host;
