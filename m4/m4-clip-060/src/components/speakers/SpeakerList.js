import SpeakerLine from "./SpeakerLine";
import { useEffect } from "react";
// import useSpeakersDataService from "../../hooks/useSpeakers";
import useSpeakersDataService from "../../hooks/useImmerSpeakers";

function List({ speakersState, speakersService }) {
  const isPending = false;
  const speakers = speakersState.speakers;

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
        {speakers.map(function (speaker) {
          const highlight = false;
          return (
            <SpeakerLine
              key={speaker.id}
              speakerRec={speaker}
              speakerService={speakersService}
              updating={speaker.isUpdating}
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

  const [state, service] = useSpeakersDataService();

  useEffect(() => {
    service.load();
  }, []);

  if (state.isLoading) return <div>Loading...</div>;

  return (
    <div className={darkTheme ? "theme-dark" : "theme-light"}>
      {/* <List speakers={state.speakers} updateSpeaker={service.update} /> */}
      <List speakersState={state} speakersService={service} />
    </div>
  );
};

export default SpeakerList;
