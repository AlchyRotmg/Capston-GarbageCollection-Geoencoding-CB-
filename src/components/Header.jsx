function Header() {
  return (
    <header className="header-bar">
      <div>
        <p className="header-kicker">RYDE Program</p>
        <h1>Corner Brook Garbage Collection</h1>
      </div>

      <div className="header-actions">
        <a href="#calendar-view">Calendar View</a>
        <a href="https://www.cornerbrook.com/city-services-bak/garbage-and-recycling/" target="_blank" rel="noreferrer">
          Official Corner Brook Website
        </a>
      </div>
    </header>
  );
}

export default Header;
