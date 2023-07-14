import style from './Header.module.scss';
import RisfinestLogo from './assets/logo_rosfines';
import YandexLogo from './assets/logo_yandex';
import { useMediaQuery } from 'usehooks-ts';
import LogoYandexMobile from './assets/logo_yandex-mobile';

interface IHeader {
  isFinalScreen?: boolean;
}

const Header = ({ isFinalScreen }: IHeader) => {
  const isMobile = useMediaQuery('(max-width: 720px)');

  return (
    <header className={style.header}>
      <div className='container'>
        <div className={style.headerBody}>
          <a
            target='_blank'
            rel='noreferrer'
            href={`${
              isMobile
                ? 'https://redirect.appmetrica.yandex.com/serve/604797553023702938'
                : 'https://zapravki.yandex.ru/?utm_source=rosfines&utm_medium=partner'
            }`}
            className={`${style.headerBody__logo} ${
              isFinalScreen && 'isFinal'
            }`}
            onClick={() => window.yarshGoal('logo_yandex')}
          >
            {isMobile ? LogoYandexMobile : YandexLogo}
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://rosfines.ru/?utm_source=Zapravki_landing&utm_medium=logo&utm_campaign=yandex_zapravki'
            className={style.headerBody__logo}
            onClick={() => window.yarshGoal('logo_rs')}
          >
            {RisfinestLogo}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
