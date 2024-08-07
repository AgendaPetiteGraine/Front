import { init } from "@amplitude/analytics-browser";
import React, { useEffect } from "react";

export const initializeAmplitude = () => {
  const fetchApiKey = async () => {
    try {
      const { data } = await axios.get(
        `https://site--petitegraine--xj5ljztnmr2k.code.run/g3tAmp!APIk3y`,
        {}
      );
      console.log("API key", data);
      init(data);
    } catch (error) {
      console.error("Error fetching Api key:", error);
    }
  };
  fetchApiKey();
};
