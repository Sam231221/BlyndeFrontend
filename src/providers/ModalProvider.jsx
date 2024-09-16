import { createContext, useContext, useState } from "react";

export const ModalContext = createContext(null);
export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be defined within the provider.");
  }
  return context;
}

export default function ModalContextProvider({ children }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState(null);
  const openModal = (content) => {
    setContent(content);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{ isModalOpen, content, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
