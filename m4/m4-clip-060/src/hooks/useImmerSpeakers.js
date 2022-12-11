import axios from "axios";
import { useImmerReducer } from "use-immer";

const initialState = {
  speakers: [],
  isLoading: false,
};

function reducer(draft, action) {
  switch (action.type) {
    case "load":
      // return { ...draft, isLoading: true, speakers: [] };
      draft.isLoading = true;
      draft.speakers = [];
      break;
    case "loaded":
      draft.isLoading = false;
      draft.speakers = action.data;
      break;
    case "update":
      const speakerToUpdate = draft.speakers.find(
        (_) => _.id == action.data.id
      );
      speakerToUpdate.isUpdating = true;
      break;
    case "updated":
      // return {
      //   ...draft,
      //   speakers: draft.speakers.map((e) => {
      //     if (e.id === action.data.id) {
      //       return { ...action.data, isUpdating: false };
      //     } else {
      //       return e;
      //     }
      //   }),
      // };
      const speakerUpdated = draft.speakers.find((_) => _.id == action.data.id);
      Object.assign(speakerUpdated, { ...action.data, isUpdating: false });
      break;
  }
}

function useSpeakersDataService(initalSpeakers) {
  const [speakersData, dispatch] = useImmerReducer(reducer, {
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
