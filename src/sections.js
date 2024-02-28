import { rocas } from './sections/rocas/rocas';
import { gimnospermas } from './sections/gimnospermas/gimnospermas';
import { fosiles } from './sections/fosiles/fosiles'; 
import { mamiferos } from './sections/mamiferos/mamiferos';
import { artropodos } from './sections/artropodos/artropodos';
import { equinodermos } from './sections/equinodermos/equinodermos';


export const sections = [
  {
    title: "ROCAS",
    list: rocas,
  },
  {
    title: "FÓSILES",
    list: fosiles,
  },
  {
    title: "MAMÍFEROS",
    list: mamiferos
  },
  {
    title: "GIMNOSPERMAS",
    list: gimnospermas
  },
  {
    title: "ARTRÓPODOS",
    list: artropodos
  },
  {
    title: "EQUINODERMOS",
    list: equinodermos
  },
];
