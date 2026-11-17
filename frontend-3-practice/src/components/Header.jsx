export default function Header() {
  return (
    <header className="top">
    <div className="wrap top-row">
      <strong className="logo">ФОРМА</strong>
      <nav className="menu" aria-label="Меню">
        <a className="menu-link" href="#">Услуги</a>
        <a className="menu-link" href="#">Галерея</a>
        <a className="menu-link" href="#">Команда</a>
        <a className="menu-link" href="#">Отзывы</a>
        <a className="menu-link" href="#contacts">Контакты</a>
      </nav>
    </div>
  </header>
  );
}
