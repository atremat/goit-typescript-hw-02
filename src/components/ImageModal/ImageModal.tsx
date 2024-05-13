import ReactModal from "react-modal";
import css from "./ImageModal.module.css";
import { IModalImage } from "../../commonTypes";

ReactModal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  modalImage: IModalImage | null;
};

const ImageModal: React.FC<Props> = ({ isOpen, onModalClose, modalImage }) => {
  if (!modalImage) return;
  const { urlRegular, alt } = modalImage;
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onModalClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className={css.modal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <img src={urlRegular} alt={alt} className={css.img}></img>
      </ReactModal>
    </>
  );
};

export default ImageModal;
