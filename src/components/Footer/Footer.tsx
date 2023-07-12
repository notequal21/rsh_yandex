import style from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className='container'>
        <div className={style.footerBody}>
          <a
            href='/rules/'
            target='_blank'
            onClick={() => window.yarshGoal('rules')}
            className={style.footerBody__link}
          >
            Правила акции
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
