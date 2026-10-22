import type { Kit } from '../types';

// Los kits son propios de Peliaringa. Fake Store API solo valida disponibilidad.
export const KITS: Kit[] = [
  {
    id: 1,
    apiId: 1,
    name: 'Kit básico',
    price: 40000,
    tag: 'Para empezar',
    image: '/Imagenes/kit basico.png',
    description: 'Poncho, carioca grande y gafas carnavaleras para vivir la fiesta con comodidad.',
    includes: ['Poncho tradicional', 'Carioca grande', 'Gafas carnavaleras'],
  },
  {
    id: 2,
    apiId: 2,
    name: 'Kit premium',
    price: 65000,
    tag: 'Más color',
    image: '/Imagenes/kit premium.png',
    description: 'Una selección ampliada para quienes desean compartir la experiencia del Carnaval.',
    includes: ['Poncho tradicional', 'Carioca grande', 'Gafas carnavaleras', 'Accesorio sorpresa'],
  },
];
