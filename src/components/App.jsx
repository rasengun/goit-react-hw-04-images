import '../styles.css';

import { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

import ImageSearchForm from './ImageSearchForm/ImageSearchForm';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { searchImageAPI } from 'services/api';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await searchImageAPI(search, page);
        setImages(prevImage => [...prevImage, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search, page]);

  useEffect(() => {
    if (!loading && page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [loading, page]);

  const searchImages = ({ search }) => {
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showImage = data => {
    setLargeImageURL(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImageURL('');
    setShowModal(false);
  };

  return (
    <>
      <ImageSearchForm onSubmit={searchImages} />

      <ImageGallery images={images} showImage={showImage} />

      {loading && (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
      {error && <p>Error</p>}

      {Boolean(images.length) && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

/*
export class App extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.fetchPosts();
    }

    if (page > 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  async fetchPosts() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImageAPI(search, page);
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  searchImages = ({ search }) => {
    this.setState({ search, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showImage = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  render() {
    const { images, loading, error, showModal, largeImageURL } = this.state;
    const { searchImages, loadMore, showImage, closeModal } = this;

    return (
      <>
        <ImageSearchForm onSubmit={searchImages} />

        <ImageGallery images={images} showImage={showImage} />

        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        )}
        {error && <p>Error</p>}

        {Boolean(images.length) && <Button loadMore={loadMore} />}
        {showModal && (
          <Modal close={closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
*/
