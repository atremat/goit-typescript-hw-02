import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";
import { IImage, IModalImage } from "../../commonTypes";

type Props = {
  images: IImage[];
  onModalOpen: (img: IModalImage) => void;
};

const ImageGallery: React.FC<Props> = ({ images, onModalOpen }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {images.map((image) => {
          return (
            <li key={image.id} className={css.item}>
              <ImageCard imageInfo={image} onModalOpen={onModalOpen} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
