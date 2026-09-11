import { useState } from "react";
import "./news.css";

import trendingImage from "../img/trending.png";
import allManagerImage from "../img/all manager.png";
import resultImage from "../img/result.png";
import joinImage from "../img/join.png";
import premierImage from "../img/premoer.png";
import leagueImage from "../img/legue.png";

/* Главная новость */

const trendingNews = {
  id: "trending",
  image: trendingImage,
  title: "Results and scores from the Premier League....!!",
  date: "5 hours ago",
};

/* Список новостей */

const newsItems = [
  {
    id: "all-manager",
    image: allManagerImage,
    title: "Here are the top 100 players and managers",
    date: "11 oct 2023, 06:00 aM",
  },

  {
    id: "result",
    image: resultImage,
    title: "Results and scores from the Premier League....!!",
    date: "10 oct 2023, 09:00 PM",
  },

  {
    id: "join",
    image: joinImage,
    title: "Join or start a competition now!",
    date: "10 oct 2023, 02:40 PM",
  },

  {
    id: "premier",
    image: premierImage,
    title: "Results and scores from the Premier League....!!",
    date: "09 oct 2023, 08:12 aM",
  },

  {
    id: "league",
    image: leagueImage,
    title: "Results and scores from the Premier League....!!",
    date: "09 oct 2023, 02:00 PM",
  },
];

/* Компонент новостей */

function News() {
  const [selectedNewsId, setSelectedNewsId] = useState(null);

  /* Выбираем новость */

  const handleNewsClick = (newsId) => {
    setSelectedNewsId(newsId);
  };

  return (
    <aside className="news">
      {/* Заголовок */}

      <div className="news__header">
        <h2 className="news__title">Trending News</h2>

        <i className="news-icon--right fas fa-angle-right"></i>
      </div>

      {/* Главная новость */}

      <div
        className={`news__trending ${
          selectedNewsId === trendingNews.id
            ? "news__trending--active"
            : ""
        }`}
        onClick={() => handleNewsClick(trendingNews.id)}
      >
        <img
          src={trendingNews.image}
          alt={trendingNews.title}
          className="trending__image"
        />

        <h3 className="newsTrend__title">
          {trendingNews.title}
        </h3>

        <p className="newsTrend__text">
          {trendingNews.date}
        </p>
      </div>

      {/* Список новостей */}

      <ul className="news__list">
        {newsItems.map((news) => (
          <li
            key={news.id}
            className={`news__item ${
              selectedNewsId === news.id
                ? "news__item--active"
                : ""
            }`}
            onClick={() => handleNewsClick(news.id)}
          >
            <img
              src={news.image}
              alt={news.title}
              className="news__image"
            />

            <div className="news__content">
              <h3 className="newsTrend__title noMarker">
                {news.title}
              </h3>

              <p className="newsTrend__text">
                {news.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default News;