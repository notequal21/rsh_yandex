// import img1 from './assets/quest-image-1.png';
// import img2 from './assets/quest-image-2.png';
// import img3 from './assets/quest-image-3.png';
// import img4 from './assets/quest-image-4.png';

export const questions = [
  {
    // img: img1,
    title: 'Сколько раз в месяц вы заправляетесь?',
    answers: [
      {
        title: '1 и реже',
        value: 1,
      },
      {
        title: '2-4',
        value: 2,
      },
      {
        title: '5 и чаще',
        value: 3,
      },
    ],
  },
  {
    // img: img2,
    title: 'Сколько вы обычно заправляете?',
    answers: [
      {
        title: 'Четверть бака',
        value: 0,
      },
      {
        title: 'Где-то половину',
        value: -2,
      },
      {
        title: 'Полный бак',
        value: -4,
      },
    ],
  },
  {
    // img: img3,
    title: 'А на заправке что-то покупаете?',
    answers: [
      {
        title: 'Да, всегда что-то покупаю',
        value: -7,
      },
      {
        title: 'Иногда',
        value: -4,
      },
      {
        title: 'Нет, ничего не надо',
        value: 0,
      },
    ],
  },
  {
    // img: img4,
    title: 'Часто попадаете в час-пик? ',
    answers: [
      {
        title: 'Да, постоянно заправляюсь в одно время со всеми',
        value: 3,
      },
      {
        title: 'Иногда попадаю, что поделать ',
        value: 2,
      },
      {
        title: 'Стараюсь не попадать в часы пик',
        value: 1,
      },
    ],
  },
];
