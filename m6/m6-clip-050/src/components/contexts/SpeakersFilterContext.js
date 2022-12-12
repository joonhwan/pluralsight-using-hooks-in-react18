import { createContext, useContext, useState } from "react";

const SpeakersFilterContext = createContext({});

export const SpeakersFilterProvider = ({ children }) => {
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [searchText, setSearchText] = useState("");

  const applySortFilter = (speakers) => {
    console.log("applySortFilter : ", speakers);
    if (!speakers) return [];
    return speakers
      .filter(
        (speaker) =>
          (speakingSaturday && speaker.sat) || (speakingSunday && speaker.sun)
      )
      .filter(
        (speaker) =>
          searchText.length === 0 ||
          (
            speaker.firstName?.toLowerCase() +
            " " +
            speaker.lastName?.toLowerCase()
          ).includes(searchText.toLowerCase())
      )
      .sort((a, b) => {
        if (a.firstName < b.firstName) return 1;
        if (a.lastName < b.lastName) return 1;
        return 0;
      });
  };

  const context = {
    speakingSaturday,
    setSpeakingSaturday,
    speakingSunday,
    setSpeakingSunday,
    searchText,
    setSearchText,
    applySortFilter,
  };

  return (
    <SpeakersFilterContext.Provider value={context}>
      {children}
    </SpeakersFilterContext.Provider>
  );
};

export const useSpeakersFilterContext = () => {
  return useContext(SpeakersFilterContext);
};
