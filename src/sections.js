import { rocas } from './sections/rocas/rocas';
import { gimnospermas } from './sections/gimnospermas/gimnospermas';
import { fosiles } from './sections/fosiles/fosiles'; 
import { mamiferos } from './sections/mamiferos/mamiferos';


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
