import useModelRepository from "./useModelRepository";

function useSpeakerRepository() {
  const url = "/api/speakers";
  const errorNotificationFn = (error) => {
    console.log("Error From useSpeakersData", error);
  };

  return useModelRepository(url, errorNotificationFn);
}

export default useSpeakerRepository;
