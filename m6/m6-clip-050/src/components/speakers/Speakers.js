import React, { useContext } from "react";
import SpeakerMenu from "./SpeakerMenu";
import SpeakersList from "./SpeakersList";
import { ThemeContext } from "../contexts/ThemeContext";
import { SpeakersFilterProvider } from "../contexts/SpeakersFilterContext";

function Speakers() {
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <SpeakersFilterProvider>
        <SpeakerMenu />
        <div className="container">
          <div className="row g-4">
            <SpeakersList />
          </div>
        </div>
      </SpeakersFilterProvider>
    </div>
  );
}

export default Speakers;
