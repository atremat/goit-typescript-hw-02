import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import fetchImages from "./services/api";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { animateScroll } from "react-scroll";
import { IFetchImages, IImage, IModalImage } from "./commonTypes";

interface IScrollOptions {
  duration: number;
  smooth: boolean;
}

const App = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [images, setImages] = useState<Array<IImage>>([]); //!
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<IModalImage | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const searchImagesWithQuery = async (value: string): Promise<void> => {
    try {
      setLoading(true);
      setTotalPages(null);
      const resData: IFetchImages = await fetchImages(value, page);
      setTotalPages(resData["total_pages"]);
      const newImages: Array<IImage> = resData.results;
      setImages((prev) => [...prev, ...newImages]);
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

  const handleSearchPressed = (query: string): void => {
    setSearchValue(query);
    setImages([]);
    setPage(1);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (img: IModalImage): void => {
    setIsModalOpen(true);
    setModalImage(img);
  };

  const scrollOptions: IScrollOptions = {
    duration: 500,
    smooth: true,
  };

  const handleMoreClick = async (): Promise<void> => {
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
