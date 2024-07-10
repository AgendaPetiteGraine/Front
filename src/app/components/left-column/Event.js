import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Event = ({ data }) => {
  useEffect(() => {}, []);

  return (
    <div className="event">
      <h3>À propos de l'organisateur</h3>
      <div>{data.name}</div>
      <div className="infos">
        {data.website && (
          <div
            className="link"
            onClick={() => {
              window.open(`https://${data.website}`, "_blank");
            }}
          >
            <div className="inverted">
              <Image
                src="/website.png"
                alt="Site internet"
                width={30}
                height={30}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://${data.facebook}`, "_blank");
                }}
              />
            </div>
            <div className="uppercase">Site Internet</div>
          </div>
        )}
        {data.facebook && (
          <div
            className="link"
            onClick={() => {
              window.open(`https://${data.facebook}`, "_blank");
            }}
          >
            <Image src="/facebook.png" alt="Facebook" width={30} height={30} />{" "}
            <div className="uppercase">Facebook</div>
          </div>
        )}
      </div>
      <style jsx>{`
        .event {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          flex-direction: column;
          gap: 20px;
          color: #ffffff;
        }
        .infos {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
        }
        .link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: transform 0.3s;
          background-color: #333333;
          border-radius: 25px;
        }
        .link: hover {
          scale: 105%;
          background-color: #fff;
        }
        .inverted {
          filter: invert(1);
        }
        .uppercase {
          transition: transform 0.3s;
        }
        .uppercase:hover {
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

export default Event;
