import { okSvg } from './assets/okSvg';
import { tgSvg } from './assets/tgSvg';
import { vkSsvg } from './assets/vkSvg';
import { wuSvg } from './assets/wuSvg';

const currentUrl = window.location.origin + window.location.pathname;

const socialLinks = [
  {
    link: `https://vk.com/share.php?url=${currentUrl}?sn=VK`,
    icon: vkSsvg,
    sn: 'VK',
  },
  { link: `tg://share?url=${currentUrl}?sn=TG`, icon: tgSvg, sn: 'TG' },
  { link: `https://wa.me/?text=${currentUrl}?sn=WA`, icon: wuSvg, sn: 'WA' },
  {
    link: `https://connect.ok.ru/offer?url=${currentUrl}?sn=OK`,
    icon: okSvg,
    sn: 'OK',
  },
];

export default socialLinks;
