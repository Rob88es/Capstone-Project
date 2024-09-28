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
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear"
    };


  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
}


export default ImageCarousel;

