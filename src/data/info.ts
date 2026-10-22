import type { PaginaInfo } from '../types';

// Contenido de las páginas educativas. Se renderiza con un solo componente (Info.tsx).
export const PAGINAS_INFO: Record<'cultura' | 'recomendaciones' | 'uso-kit', PaginaInfo> = {
  cultura: {
    imagen: '/Imagenes/iformacionculturarl.png',
    alt: 'Representación cultural del Carnaval',
    etiqueta: 'Origen y tradición',
    titulo: 'Información cultural',
    texto:
      'El Carnaval de Negros y Blancos reúne música, artesanía, comparsas y juego. Participar con respeto ayuda a cuidar a artistas, visitantes y habitantes de la ciudad.',
    botonTexto: 'Ver recomendaciones',
    botonDestino: 'recomendaciones',
  },
  recomendaciones: {
    imagen: '/Imagenes/recomedaciones.png',
    alt: 'Participante del Carnaval',
    etiqueta: '¿Cómo jugar?',
    titulo: 'Recomendaciones',
    lista: [
      'Respeta el trabajo de artistas y cultores.',
      'Cuida los ojos: no lances cosméticos a la cara.',
      'Pide consentimiento antes de pintar a otra persona.',
      'Respeta las vallas, recorridos y zonas de seguridad.',
      'No dejes basura en las calles.',
    ],
    botonTexto: 'Aprender a usar el kit',
    botonDestino: 'uso-kit',
  },
  'uso-kit': {
    imagen: '/Imagenes/uso de kits.png',
    alt: 'Elementos para usar en el Carnaval',
    etiqueta: 'Celebra con cuidado',
    titulo: 'Uso del kit',
    texto:
      'Usa el poncho y las gafas para protegerte. Antes de aplicar pintura o cosméticos, pregunta siempre a la persona. Evita ojos y rostro, y conserva los empaques hasta poder desecharlos correctamente.',
    botonTexto: 'Elegir un kit',
    botonDestino: 'kits',
  },
};
