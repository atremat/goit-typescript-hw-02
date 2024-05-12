import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchImages from "./services/api";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { animateScroll } from "react-scroll";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const searchImagesWithQuery = async (value) => {
    try {
      setLoading(true);
      setTotalPages(null);
      const resData = await fetchImages(value, page);
      setTotalPages(resData["total_pages"]);
      setImages((prev) => [...prev, ...resData.results]);
    } catch (err) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue !== "") {
      searchImagesWithQuery(searchValue);
      //making scroll if load more button pressed
      if (page > 1) animateScroll.scrollMore(224, scrollOptions);
    }
  }, [searchValue, page]);

  const handleSearchPressed = (query) => {
    setSearchValue(query);
    setImages([]);
    setPage(1);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (img) => {
    setIsModalOpen(true);
    setModalImage(img);
  };

  const scrollOptions = {
    duration: 500,
    smooth: true,
  };

  const handleMoreClick = async () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchPressed} />
      {images.length > 0 && (
        <ImageGallery images={images} onModalOpen={handleModalOpen} />
      )}
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          onModalClose={handleModalClose}
          modalImage={modalImage}
        />
      )}
      {totalPages && page < totalPages && (
        <LoadMoreBtn onMoreClick={handleMoreClick} />
      )}
    </>
  );
};

export default App;
