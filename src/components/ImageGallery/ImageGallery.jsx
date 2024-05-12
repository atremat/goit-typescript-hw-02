import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images, onModalOpen }) => {
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
