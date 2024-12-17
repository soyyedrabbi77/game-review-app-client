import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "./Styles.css";
import DBcard from "./DBcard"; // Import your DBcard component for displaying games.

const Home = () => {
  const [games, setGames] = useState([]); // State to store the fetched games

  useEffect(() => {
    fetch("https://game-review-app-server.vercel.app/top-rated-games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const slides = [
    {
      image:
        "https://www.nintendo.com/eu/media/images/10_share_images/games_15/wiiu_14/SI_WiiU_TheLegendOfZeldaBreathOfTheWild.jpg",
      title: "The Legend of Zelda: Breath of the Wild",
      description:
        "An open-world adventure that redefines exploration and combat in the legendary Zelda series.",
    },
    {
      image:
        "https://m.media-amazon.com/images/I/81dKP+iFloL._AC_UF894,1000_QL80_.jpg",
      title: "Red Dead Redemption 2",
      description:
        "Experience an epic tale of life in America’s unforgiving heartland.",
    },
    {
      image:
        "https://m.media-amazon.com/images/M/MV5BMTQ5YTA1ZmUtYzVlNC00YjI2LWJhYjgtNWE4MjY2OWEzMGQwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      title: "The Witcher 3: Wild Hunt",
      description:
        "Step into the shoes of Geralt of Rivia in this fantasy open-world RPG masterpiece.",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 rounded-lg shadow-md">
      {/* Swiper Slider */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper mb-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <img
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-fit rounded-md"
              src={slide.image}
              alt={slide.title}
            />
            {/* Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-md flex flex-col justify-end p-6 text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-sm">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}

        {/* Autoplay Progress Indicator */}
        <div
          className="autoplay-progress hidden lg:flex items-center"
          slot="container-end"
        >
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle
              cx="24"
              cy="24"
              r="20"
              style={{
                fill: "none",
                stroke: "#000",
                strokeWidth: "4",
                strokeDasharray: "126",
                strokeDashoffset: "calc(var(--progress, 1) * 126)",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            ></circle>
          </svg>
          <span
            ref={progressContent}
            className="text-black text-lg ml-2 font-semibold"
          ></span>
        </div>
      </Swiper>

      {/* Game Reviews Section */}
      <h1 className="text-4xl font-bold mb-6 text-center underline text-purple-600">
        Highest Rated Games: (Limit up to: {games.length})
      </h1>

      {/* Game Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {games.map((game) => (
          <DBcard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;
