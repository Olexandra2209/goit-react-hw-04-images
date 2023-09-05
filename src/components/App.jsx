import React, { useState, useEffect } from 'react';
import { fetchImages } from './PixabayAPI';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import CustomLoader from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (query === '') return;

    setIsLoading(true);

    fetchImages(query, page)
      .then(response => {
        setImages(prevImages => [...prevImages, ...response.data.hits]);
      })
      .catch(error => console.error('Error fetching images', error))
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} onItemClick={openModal} />
      {isLoading && <CustomLoader />}
      {images.length > 0 && images.length % 12 === 0 && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          imageUrl={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
