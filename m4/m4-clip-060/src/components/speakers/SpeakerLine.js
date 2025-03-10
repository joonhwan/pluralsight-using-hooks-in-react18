import { useState } from "react";
import FavoriteSpeakerToggleLine from "./FavoriteSpeakerToggleLine";
import SpeakerImageToggleOnScroll from "./SpeakerImageToggleOnScroll";

const SpeakerLine = ({ speakerRec, speakerService, updating, highlight }) => {
  // console.log("SpeakerLine: ", speakerRec.lastName, speakerRec.favorite);
  return (
    <div className="col-xl-12 col-md-12">
      <div className="card border-0 speaker-list">
        <div className="card-body p-0">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              {speakerRec?.imageUrl ? (
                <SpeakerImageToggleOnScroll
                  imageUrl={speakerRec?.imageUrl}
                  alt={`${speakerRec?.firstName} ${speakerRec?.lastName}`}
                  thumbNail={true}
                />
              ) : (
                <div className="blue-box-background" />
              )}
            </div>
            <div className="flex-grow-1 ms-3 me-5">
              <div className="list-group">
                <div className="d-flex w-100 justify-content-between">
                  <h5
                    className={
                      highlight === true
                        ? "mb-1 background-text-highlight"
                        : "mb-1"
                    }
                  >
                    {speakerRec.firstName} {speakerRec.lastName}
                  </h5>
                  <div className="spinner-bottom">
                    <FavoriteSpeakerToggleLine
                      speakerRec={speakerRec}
                      toggleFavoriteSpeaker={() => {
                        speakerService.update({
                          ...speakerRec,
                          favorite: !speakerRec.favorite,
                        });
                      }}
                    >
                      {updating ? (
                        <i className="spinner-border text-dark" role="status" />
                      ) : null}
                    </FavoriteSpeakerToggleLine>
                  </div>
                </div>
                <small className="text-muted">
                  <strong>Company: </strong> {speakerRec.company}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerLine;
