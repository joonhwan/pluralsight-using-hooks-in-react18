import React from "react";
import SpeakerDetail from "./SpeakerDetail";
import { useSpeakersRepositoryContext } from "../contexts/SpeakersRepositoryContext";
import { useSpeakersFilterContext } from "../contexts/SpeakersFilterContext";

export default function SpeakersList() {
  const repository = useSpeakersRepositoryContext();
  const { applySortFilter } = useSpeakersFilterContext();
  return (
    <>
      {applySortFilter(repository.items).map(function (speakerRec) {
        return (
          <SpeakerDetail
            key={speakerRec.id}
            speakerRec={speakerRec}
            showDetails={false}
          />
        );
      })}
    </>
  );
}
