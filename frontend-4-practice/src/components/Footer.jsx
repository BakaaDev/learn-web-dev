export default function Footer() {
  return (
    <footer className="bottom">
    <div className="wrap">
      <div className="bottom-columns">
        <div className="bottom-brand">
          <strong className="logo">ФОРМА</strong>
          <p className="brand-text">Стрижки, цвет и уход с характером.</p>
        </div>
        <section className="bottom-col" id="contacts">
          <h2 className="label">Контакты</h2>
          <p className="contact-text"><span className="contact-icon location-icon" aria-hidden="true"></span>ул. Садовая, 15, Москва</p>
          <p className="contact-text"><span className="contact-icon" aria-hidden="true">☎</span><a className="phone" href="tel:+74951234567">+7 (495) 123-45-67</a></p>
        </section>
        <section className="bottom-col">
          <h2 className="label">Режим работы</h2>
          <p className="hours">Пн–Пт: 9:00 – 21:00</p>
          <p className="hours">Сб–Вс: 10:00 – 19:00</p>
        </section>
      </div>
      <div className="bottom-note">
        <small className="copyright">© 2026. Все права защищены.</small>
        <a className="legal" href="#">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
  );
}
