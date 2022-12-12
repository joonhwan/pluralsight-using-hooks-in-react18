import { useContext } from "react";
import { useSpeakersRepositoryContext } from "../contexts/SpeakersRepositoryContext";
import { ThemeContext } from "../contexts/ThemeContext";
import SpeakerDetail from "./SpeakerDetail";

export default function Speaker({ id }) {
  const { darkTheme } = useContext(ThemeContext);
  const repository = useSpeakersRepositoryContext();

  if (repository.isLoading()) {
    return <div>loading..</div>;
  }
  const speakerRec = repository.items.find((_) => _.id === id);

  return speakerRec ? (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      <SpeakerDetail speakerRec={speakerRec} showDetails={true} />
    </div>
  ) : (
    <h2 className="text-danger">Speaker {id} not found</h2>
  );
}
