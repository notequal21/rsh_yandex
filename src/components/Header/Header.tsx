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
          <div
            className={`${style.headerBody__logo} ${
              isFinalScreen && 'isFinal'
            }`}
          >
            {isMobile ? LogoYandexMobile : YandexLogo}
          </div>
          <div className={style.headerBody__logo}>{RisfinestLogo}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
