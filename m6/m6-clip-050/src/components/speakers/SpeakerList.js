import SpeakerLine from "./SpeakerLine";
import { useContext, useEffect, useReducer, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import useSpeakerRepository from "../hooks/useSpeakersRepository";
import { useSpeakersRepositoryContext } from "../contexts/SpeakersRepositoryContext";

function List({ repository }) {
  const [updatingId, setUpdatingId] = useState(0);
  const isPending = false;
  const speakers = repository.items;

  function toggleFavoriteSpeaker(speakerRec) {
    const speakerRecUpdated = {
      ...speakerRec,
      favorite: !speakerRec.favorite,
    };
    setUpdatingId(speakerRec.id);
    repository.updateItem(speakerRecUpdated, () => {
      setUpdatingId(0);
    });
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
  const { darkTheme } = useContext(ThemeContext);
  const repository = useSpeakersRepositoryContext();

  if (repository.isLoading()) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <List repository={repository} />
    </div>
  );
};

export default SpeakerList;
