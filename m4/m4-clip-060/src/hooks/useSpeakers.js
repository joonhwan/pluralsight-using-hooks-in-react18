import axios from "axios";
import { useReducer } from "react";

const initialState = {
  speakers: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "load":
      return { ...state, isLoading: true, speakers: [] };
    case "loaded":
      return { ...state, isLoading: false, speakers: action.data };
    case "update":
      return {
        ...state,
        speakers: state.speakers.map((e) =>
          e.id === action.data.id ? { ...e, isUpdating: true } : e
        ),
      };
    case "updated":
      return {
        ...state,
        speakers: state.speakers.map((e) => {
          if (e.id === action.data.id) {
            return { ...action.data, isUpdating: false };
          } else {
            return e;
          }
        }),
      };
  }
}

function useSpeakersDataService(initalSpeakers) {
  const [speakersData, dispatch] = useReducer(reducer, {
    ...initialState,
    speakers: initalSpeakers ?? [],
  });

  return [
    speakersData,
    {
      load: async () => {
        dispatch({ type: "load" });
        const results = await axios.get("/api/speakers");
        results.data.forEach((e) => {
          e.isUpdating = false;
        });
        dispatch({ type: "loaded", data: results.data });
      },
      update: async (speaker) => {
        dispatch({ type: "update", data: speaker });
        await axios.put(`/api/speakers/${speaker.id}`, speaker);
        dispatch({ type: "updated", data: speaker });
      },
    },
  ];
}

export default useSpeakersDataService;
