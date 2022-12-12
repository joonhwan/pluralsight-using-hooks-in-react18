import { createContext, useContext } from "react";
import useSpeakersRepository from "../hooks/useSpeakersRepository";

export const SpeakersRepositoryContext = createContext({});

export const SpeakersRepositoryProvider = ({ children }) => {
  const repository = useSpeakersRepository();

  return (
    <SpeakersRepositoryContext.Provider value={repository}>
      {children}
    </SpeakersRepositoryContext.Provider>
  );
};

export const useSpeakersRepositoryContext = () => {
  return useContext(SpeakersRepositoryContext);
};
