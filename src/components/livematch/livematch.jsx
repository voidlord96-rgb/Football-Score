import { useState } from "react";
import "./livematch.css";

import joinImage from "../img/Foman.png";
import resultImage from "../img/spain.png";

/* Даты матчей */

const dates = [
  {
    day: "Wednesday",
    date: "09 Aug",
  },
  {
    day: "Yesterday",
    date: "10 Aug",
  },
  {
    day: "Today",
    date: "11 Aug",
  },
  {
    day: "Tomorrow",
    date: "12 Aug",
  },
  {
    day: "Sunday",
    date: "13 Aug",
  },
  {
    day: "Monday",
    date: "14 Aug",
  },
];

/* Данные о лигах и матчах */

const leagues = [
  {
    country: "World",
    icon: joinImage,
    name: "FIFA Women's World Cup",
    stage: "Quarter Finals",

    matches: [
      {
        time: "Live",
        home: "Spain",
        homeFlag: "flag--spain",
        score: "2 - 1",
        away: "Netherlands",
        awayFlag: "flag--netherlands",
        live: true,
      },
      {
        time: "13:40",
        home: "Japan",
        homeFlag: "flag--japan",
        score: "-",
        away: "Sweden",
        awayFlag: "flag--sweden",
        live: false,
      },
      {
        time: "18:20",
        home: "Olympiakos",
        homeFlag: "flag--olympiakos",
        score: "-",
        away: "Genk",
        awayFlag: "flag--genk",
        live: false,
      },
    ],
  },

  {
    country: "Spain",
    icon: resultImage,
    name: "La Liga",
    stage: "Quarter Finals",

    matches: [
      {
        time: "01:43",
        home: "Spain",
        homeFlag: "flag--spain",
        score: "-",
        away: "Netherlands",
        awayFlag: "flag--netherlands",
        live: false,
      },
      {
        time: "13:40",
        home: "Japan",
        homeFlag: "flag--japan",
        score: "-",
        away: "Sweden",
        awayFlag: "flag--sweden",
        live: false,
      },
      {
        time: "18:20",
        home: "Olympiakos",
        homeFlag: "flag--olympiakos",
        score: "-",
        away: "Genk",
        awayFlag: "flag--genk",
        live: false,
      },
    ],
  },
];

/* Верхняя панель */

function MatchTop({ search, setSearch, filter, setFilter, liveCount }) {
  const handleFilterChange = () => {
    setFilter((currentFilter) =>
      currentFilter === "All Matches" ? "Live" : "All Matches",
    );
  };

  return (
    <ul className="livematch__top">
      <li className="livematch__live">
        <div className="livematch__live-dot"></div>

        <p className="livematch__live-text">
          Live <span>({liveCount})</span>
        </p>
      </li>

      <li className="livematch__search">
        <i className="livematch__search-icon fas fa-search"></i>

        <input
          className="livematch__search-input"
          type="text"
          placeholder="Search For Matches"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </li>

      <li className="livematch__filter" onClick={handleFilterChange}>
        <span className="livematch__filter-text">{filter}</span>

        <i className="livematch__filter-icon fas fa-chevron-down"></i>
      </li>
    </ul>
  );
}

/* Панель с датами */

function MatchDates({ dates, activeDate, setActiveDate }) {
  return (
    <ul className="livematch__dates">
      {dates.map((date) => (
        <li
          key={date.date}
          className={`livematch__date ${
            activeDate === date.day ? "livematch__date--active" : ""
          }`}
          onClick={() => setActiveDate(date.day)}
        >
          <span className="livematch__date-day">{date.day}</span>

          <br />

          <span className="livematch__date-num">{date.date}</span>
        </li>
      ))}

      <li className="livematch__calendar">
        <i className="livematch__calendar-icon fas fa-calendar-alt"></i>

        <span className="livematch__calendar-text">View Calendar</span>
      </li>
    </ul>
  );
}

/* Отдельный матч */

function MatchRow({ match, index }) {
  return (
    <div
      className={`livematch__row ${match.live ? "livematch__row--live" : ""} ${
        index % 2 === 1 ? "dark__row" : ""
      }`}
    >
      <p
        className={`livematch__time ${
          match.live ? "livematch__time--live" : ""
        }`}
      >
        {match.time}
      </p>

      <ul className="livematch__teams">
        <li className={`livematch__team icon__left ${match.homeFlag}`}>
          {match.home}
        </li>

        <li className="livematch__score">{match.score}</li>

        <li className={`livematch__team icon__right ${match.awayFlag}`}>
          {match.away}
        </li>
      </ul>
    </div>
  );
}

/* Блок отдельной лиги */

function LeagueBlock({ league }) {
  return (
    <div className="livematch__block">
      <div className="livematch__league">
        <div className="livematch__league-title">
          <img
            src={league.icon}
            alt={league.country}
            className="livematch__league-icon-img"
          />

          <p className="livematch__league-name">
            {league.country} - {league.name}
          </p>
        </div>

        <p className="livematch__league-stage">( {league.stage} )</p>
      </div>

      {league.matches.map((match, index) => (
        <MatchRow
          key={`${match.home}-${match.away}-${match.time}`}
          match={match}
          index={index}
        />
      ))}
    </div>
  );
}

/* Главный компонент */

function LiveMatch() {
  const [activeDate, setActiveDate] = useState("Today");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All Matches");

  /* Количество матчей в прямом эфире */

  const liveCount = leagues.reduce(
    (count, league) =>
      count + league.matches.filter((match) => match.live).length,
    0,
  );

  /* Фильтрация матчей */

  const filteredLeagues = leagues
    .map((league) => ({
      ...league,

      matches: league.matches.filter((match) => {
        const searchValue = search.toLowerCase();

        const matchesSearch =
          match.home.toLowerCase().includes(searchValue) ||
          match.away.toLowerCase().includes(searchValue);

        const matchesFilter = filter === "All Matches" || match.live;

        return matchesSearch && matchesFilter;
      }),
    }))
    .filter((league) => league.matches.length > 0);

  return (
    <section className="livematch">
      <MatchTop
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        liveCount={liveCount}
      />

      <MatchDates
        dates={dates}
        activeDate={activeDate}
        setActiveDate={setActiveDate}
      />

      {filteredLeagues.map((league) => (
        <LeagueBlock key={`${league.country}-${league.name}`} league={league} />
      ))}
    </section>
  );
}

export default LiveMatch;
