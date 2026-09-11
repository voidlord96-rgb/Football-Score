import { useEffect, useState } from "react";
import "./footballnav.css";

const mainMenu = [
  {
    name: "Home",
    icon: "fas fa-home",
  },
  {
    name: "Leader Board",
    icon: "fas fa-user-friends",
  },
  {
    name: "Ground",
    icon: "fas fa-columns",
  },
  {
    name: "Chat",
    icon: "fas fa-comments fa-1x",
  },
  {
    name: "Notification",
    icon: "fas fa-bell",
  },
];

const followedMenu = [
  {
    name: "Followed Team",
    icon: "fas fa-shield",
  },
  {
    name: "Followed Players",
    icon: "fas fa-user-friends",
  },
  {
    name: "Followed Ground",
    icon: "fas fa-columns",
  },
];

const secondaryMenu = [
  {
    name: "Settings",
    icon: "fas fa-cog",
  },
  {
    name: "Download The App",
    icon: "fas fa-download",
  },
];

const user = {
  name: "Varun_kubal",
  email: "varun_kubal@gmail.com",
};

function FootballNav() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [search, setSearch] = useState("");
  const [notificationCount, setNotificationCount] = useState(3);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  useEffect(() => {
    const notificationTimer = setInterval(
      () => {
        setNotificationCount((count) => count + 1);
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(notificationTimer);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light-theme", !isDarkTheme);

    return () => {
      document.body.classList.remove("light-theme");
    };
  }, [isDarkTheme]);

  const handleMenuClick = (itemName) => {
    setActiveMenu(itemName);

    if (itemName === "Notification") {
      setNotificationCount((count) => Math.max(0, count - 1));
    }
  };

  const handleThemeChange = (isDark) => {
    setIsDarkTheme(isDark);
  };

  const handleLogoutClick = () => {
    setShowLogoutMenu((isOpen) => !isOpen);
  };

  const handleLogout = () => {
    console.log("Выход из аккаунта");
    setShowLogoutMenu(false);
  };

  const handleCancelLogout = () => {
    setShowLogoutMenu(false);
  };

  return (
    <nav className="footballnav">
      <h1 className="fn__title">
        football<span className="fn__highlight">shuru</span>
      </h1>

      <i className="fa-solid fa-magnifying-glass fn__search-icon"></i>

      <input
        type="text"
        className="fn__search"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <ul className="sidebar-menu menu1">
        {mainMenu.map((item) => (
          <li
            key={item.name}
            className={activeMenu === item.name ? "active" : ""}
            onClick={() => handleMenuClick(item.name)}
          >
            <i className={`menu-icon ${item.icon}`}></i>

            <span className="menu-text">{item.name}</span>

            {item.name === "Notification" && notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </li>
        ))}
      </ul>

      <hr className="fn__line1" />

      <ul className="sidebar-menu menu2">
        {followedMenu.map((item) => (
          <li
            key={item.name}
            className={activeMenu === item.name ? "active" : ""}
            onClick={() => handleMenuClick(item.name)}
          >
            <div className="menu-item-content">
              <i className={`menu-icon--follow ${item.icon}`}></i>

              <span className="menu-text">{item.name}</span>
            </div>

            <i className="menu-icon--right fas fa-angle-right"></i>
          </li>
        ))}
      </ul>

      <hr className="fn__line2" />

      <ul className="sidebar-menu menu3">
        {secondaryMenu.map((item) => (
          <li
            key={item.name}
            className={activeMenu === item.name ? "active" : ""}
            onClick={() => handleMenuClick(item.name)}
          >
            <i className={`menu-icon ${item.icon}`}></i>

            <span className="menu-text">{item.name}</span>
          </li>
        ))}

        <li className="theme">
          <div
            className={`light__theme ${!isDarkTheme ? "theme-active" : ""}`}
            onClick={() => handleThemeChange(false)}
          >
            <i className="menu-icon fas fa-sun sun"></i>
            Light
          </div>

          <div
            className={`dark__theme ${isDarkTheme ? "theme-active" : ""}`}
            onClick={() => handleThemeChange(true)}
          >
            <i className="menu-icon far fa-moon moon"></i>
            Dark
          </div>
        </li>
      </ul>

      <div className="user-card">
        <div className="user-main">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>

          <div className="user-info">
            <h3 className="user-name">{user.name}</h3>

            <h3 className="user-email">{user.email}</h3>
          </div>
        </div>

        <div className="user-logout-container">
          <div className="user-logout" onClick={handleLogoutClick}>
            <i className="fas fa-sign-out-alt"></i>
          </div>

          {showLogoutMenu && (
            <div className="logout-menu">
              <p className="logout-title">Вы хотите выйти?</p>

              <div className="logout-actions">
                <button className="logout-confirm" onClick={handleLogout}>
                  Выйти
                </button>

                <button className="logout-cancel" onClick={handleCancelLogout}>
                  Отмена
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default FootballNav;
