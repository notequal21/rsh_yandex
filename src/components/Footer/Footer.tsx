import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className='container'>
        <div className={style.footerBody}>
          <a href='' className={style.footerBody__link}>
            Правила акции
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
