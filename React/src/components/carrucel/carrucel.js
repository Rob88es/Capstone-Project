import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://tu-api-de-imagenes/imagenes');
        setImages(response.data.slice(0, 10));
        setError(false); // Restablecer el estado de error si la solicitud es exitosa
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        setError(true); // Establecer el estado de error
      }
    };

    fetchImages();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };


  return (
    <div>
      <Slider {...settings}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index}>
              <img src={image.url} alt={`Imagen ${index + 1}`} />
            </div>
          ))
        ) : error ? (
          <div>
            {/* Mensaje de error personalizado */}
            <p>Hubo un error al cargar las imágenes. Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        ) : (
          <div>
            {/* Mensaje de carga o placeholder */}
            <p>Cargando imágenes...</p>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default ImageCarousel;

