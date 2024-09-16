import { useModalContext } from "../providers/ModalProvider";
export const Modal = () => {
  const { isModalOpen, closeModal, content } = useModalContext();
  if (!isModalOpen) return null;

  return (
    <div className="fixed z-[999] inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white p-6 rounded shadow-lg">
        <button onClick={closeModal} className="absolute top-2 right-2">
          ✖
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};
