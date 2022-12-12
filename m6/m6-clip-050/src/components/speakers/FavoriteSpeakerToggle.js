import { useState } from "react";
import { useSpeakersRepositoryContext } from "../contexts/SpeakersRepositoryContext";

export default function FavoriteSpeakerToggle({ speakerRec }) {
  const repository = useSpeakersRepositoryContext();
  const [updating, setUpdating] = useState(false);

  return (
    <button
      className={
        speakerRec.favorite ? "heartredbutton btn" : "heartdarkbutton btn"
      }
      onClick={(e) => {
        e.preventDefault();
        const updated = {
          ...speakerRec,
          favorite: !speakerRec.favorite,
        };
        setUpdating(true);
        repository.updateItem(updated, () => {
          console.log("update speaker done!");
          setUpdating(false);
        });
      }}
    >
      {updating ? (
        <i className="spinner-border text-dark" role="status" />
      ) : null}
    </button>
  );
}
