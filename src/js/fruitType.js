import cherries from '../images/cherries.png';

export const fruitType = [
    {
      name: 'cherry',
      color: 'rgba(0, 0, 255, 0.5)',
      size: {
        width: 20,
        height: 20
      },
      speed: 3,
      points: 1,
      probability: 0.3,
      damage: 0,
      image: cherries
    },
    {
      name: 'apple',
      color: 'yellow',
      size: {
        width: 30,
        height: 30
      },
      speed: 4,
      points: 2,
      probability: 0.1,
      damage: 0,
      image: cherries
    },
    {
      name: 'orange',
      color: 'orange',
      size: {
        width: 30,
        height: 30
      },
      speed: 4,
      points: 3,
      probability: 0.20,
      damage: 0,
      image: cherries
    },
    {
      name: 'pinapple',
      color: 'yellow',
      size: {
        width: 50,
        height: 50
      },
      speed: 5,
      points: 5,
      probability: 0.15,
      damage: 0,
      image: cherries
    },
    {
      name: 'bomb',
      color: 'black',
      size: {
        width: 50,
        height: 50
      },
      speed: 3,
      points: 0,
      probability: 0.2,
      damage: 4,
      image: cherries
    }
  ];