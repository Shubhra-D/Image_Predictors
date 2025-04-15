import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.jpg";
import  '../App.css'
const ImageSlider = () => {
  return (
    <div
      id="carouselEx"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="hover"
      style={{padding:"20px"}}
    >
      <div className="carousel-inner carousel-zoom">
        <div className="carousel-item active">
          <img src={slide1} className="d-block w-100" alt="first-image" />
        </div>
        <div className="carousel-item">
          <img src={slide2} className="d-block w-100" alt="second-image" />
        </div>
        <div className="carousel-item">
          <img src={slide3} className="d-block w-100" alt="second-image" />
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselEx"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselEx"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
