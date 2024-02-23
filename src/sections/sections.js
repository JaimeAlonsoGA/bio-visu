import { rocas } from './rocas/rocas';
import { gimnospermas } from './gimnospermas/gimnospermas';
import { fosiles } from './fosiles/fosiles'; 
import { mamiferos } from './mamiferos/mamiferos';


export const sections = [
  {
    source: "ROCAS",
    list: rocas,
  },
  {
    source: "FÓSILES",
    list: fosiles,
  },
  {
    source: "MAMÍFEROS",
    list: mamiferos
  },
  {
    source: "GIMNOSPERMAS",
    list: gimnospermas
  },
  {
    source: "ARTRÓPODOS",
  },
  {
    source: "EQUINODERMOS",
  },
];
