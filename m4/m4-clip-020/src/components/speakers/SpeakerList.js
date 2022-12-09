import { useEffect, useState } from "react";
import axios from "axios";
import SpeakerLine from "./SpeakerLine";
// import { speakerList } from "../../../speakersData";

function List({ isPending, speakers, updateSpeaker }) {
  const [updatingId, setUpdatingId] = useState(-1);
  // const isPending = false;

  function toggleFavoriteSpeaker(speakerRec) {
    const speakerUpdated = { ...speakerRec, favorite: !speakerRec.favorite };
    updateSpeaker(speakerUpdated);

    async function updaetAsync(speaker) {
      setUpdatingId(speaker.id);
      await axios.put(`/api/speakers/${speaker.id}`, speaker);
      setUpdatingId(-1);
    }
    updaetAsync(speakerUpdated);
  }

  return (
    <div className="container">
      <div className="border-0">
        <div
          className="btn-toolbar"
          role="toolbar"
          aria-label="Speaker toolbar filter"
        >
          <div className="toolbar-trigger mb-3 flex-grow-04">
            <div className="toolbar-search w-100">
              <input
                value=""
                onChange={(event) => {}}
                type="text"
                className="form-control"
                placeholder="Highlight Names"
              />
            </div>
            <div className="spinner-height">
              {isPending && (
                <i className="spinner-border text-dark" role="status" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {speakers &&
          speakers.map(function (speakerRec) {
            const highlight = false;
            return (
              <SpeakerLine
                key={speakerRec.id}
                speakerRec={speakerRec}
                updating={updatingId === speakerRec.id ? updatingId : 0}
                toggleFavoriteSpeaker={() => toggleFavoriteSpeaker(speakerRec)}
                highlight={highlight}
              />
            );
          })}
      </div>
    </div>
  );
}

const SpeakerList = () => {
  const darkTheme = false;

  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getDataAsync() {
      setLoading(true);
      const response = await axios.get("/api/speakers");
      setSpeakers(response.data);
      setLoading(false);
    }
    getDataAsync();
  }, []);

  const updateSpeaker = (speaker) => {
    setSpeakers(
      speakers.map((item) => (item.id === speaker.id ? speaker : item))
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <List
        isPending={loading}
        speakers={speakers}
        updateSpeaker={updateSpeaker}
      />
    </div>
  );
};

export default SpeakerList;
