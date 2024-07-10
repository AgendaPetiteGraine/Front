import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const About = () => {
  useEffect(() => {}, []);

  return (
    <div className="about">
      <style jsx>{`
        .about {
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          flex-direction: column;
          gap: 20px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default About;
