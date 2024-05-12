import css from "./ImageCard.module.css";
import { FaInstagram } from "react-icons/fa";
import clsx from "clsx";

const ImageCard = ({ imageInfo, onModalOpen }) => {
  const {
    alt_description: alt,
    urls: { small: urlSmall, regular: urlRegular },
    likes,
    user: {
      name,
      social: { instagram_username: instagram },
    },
  } = imageInfo;

  const handleImgClick = () => {
    onModalOpen({ urlRegular, alt });
  };

  return (
    <div className={css.div}>
      <img
        src={urlSmall}
        alt={alt}
        className={css.img}
        onClick={handleImgClick}
      />
      <ul className={css.infoList}>
        <li className={css.infoItem}>
          <h3 className={css.infoHeader}>Likes</h3>
          <p className={css.text}>{likes}</p>
        </li>
        <li className={css.infoItem}>
          <h3 className={css.infoHeader}>Photographer</h3>
          {instagram ? (
            <a
              className={clsx(css.text, css.link)}
              href={"https://www.instagram.com/" + instagram}
              target="_blank"
            >
              <FaInstagram className={css.icon} />
              {name}
            </a>
          ) : (
            <p className={css.text}>{name}</p>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ImageCard;
