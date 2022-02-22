import { createPortal } from "react-dom";

const ModalError = () => {
  return <div>hi!</div>;
};

export const Modal = () => {
  return createPortal(
    <ModalError />,
    document.querySelector("#modal") as Element
  );
};
