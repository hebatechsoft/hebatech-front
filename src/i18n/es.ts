/**
 * Español. Es la FUENTE DE VERDAD del contenido: su forma define el tipo
 * `Dictionary`, y TypeScript obliga a que cualquier otro idioma tenga
 * exactamente las mismas claves. Si alguien agrega una frase acá y olvida
 * traducirla, el build falla. No hace falta un proceso aparte para
 * detectar traducciones faltantes.
 *
 * Los titulares que llevan serif italica se parten en piezas (`pre`,
 * `hand`, `post`) en vez de guardarse como una cadena con marcado adentro.
 * El registro MANUAL es lo que va en `hand`, y esa decision es de idioma:
 * "a mano" y "by hand" no caen en la misma posicion de la frase.
 */

export type Split = {
  pre?: string;
  hand: string;
  post?: string;
};

export const es = {
  meta: {
    /** Se usa en <html lang> y en og:locale. */
    htmlLang: 'es',
    ogLocale: 'es_CO',
    title: 'HEBA. Software a medida y automatización en Colombia.',
    description:
      'Estudio de software en Colombia. Sistemas a medida, IA aplicada y productos propios para empresas que crecieron más rápido que sus procesos.',
    switchTo: 'Ver en inglés',
  },

  nav: {
    links: [
      { href: '#productos', label: 'Productos' },
      { href: '#enfoque', label: 'Enfoque' },
      { href: '#servicios', label: 'Servicios' },
      { href: '#trabajo', label: 'Trabajo' },
    ],
    cta: 'Hablemos',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    home: 'HEBA, inicio',
  },

  hero: {
    eyebrow: 'Estudio de software',
    line1: 'Lo que hoy haces',
    line2: 'a mano,',
    line3: 'automatizado.',
    lead: 'Construimos sistemas a medida y desarrollamos productos propios para empresas que crecieron más rápido que sus procesos.',
    ctaPrimary: 'Hablemos',
    ctaSecondary: 'Ver productos',
  },

  products: {
    eyebrow: 'Productos propios',
    title: 'No solo construimos para clientes. También operamos lo nuestro.',
    rave: {
      state: 'En producción',
      blurb:
        'Inventario, ventas, cotizaciones y reportes en tiempo real. Ya está en producción, con nueve módulos, desde $10.000 COP al mes y tres días de prueba.',
      specs: ['Inventario inteligente', 'Cuentas por cobrar', 'Cotizaciones y remisiones', 'POS y CRM'],
      cta: 'Ver Rave',
    },
    barber: {
      state: 'En construcción',
      blurb:
        'Turnos, clientes y caja para barberías. Pensado para el mostrador y para el celular, entre corte y corte.',
      specs: ['Agenda con recordatorios', 'Historial por cliente', 'Comisiones por barbero', 'Cierre de caja'],
      cta: 'Quiero probarlo primero',
    },
  },

  focus: {
    title: {
      pre: 'El problema nunca es el software. Es ',
      hand: 'el proceso que nadie escribió.',
    } as Split,
    body1:
      'Casi todas las empresas con las que trabajamos ya tienen un sistema: está repartido entre tres hojas de cálculo, un cuaderno y la cabeza de la persona que lleva quince años ahí.',
    body2: 'Empezamos por entender ese sistema antes de reemplazarlo. Después escribimos software.',
    steps: [
      {
        title: 'Diagnosticamos',
        body: 'Nos sentamos con quien hace el trabajo hoy y miramos el proceso real. Sales de ahí con un alcance escrito y un precio cerrado.',
        when: '1 semana, sin costo',
      },
      {
        title: 'Construimos',
        body: 'Entregas cada dos semanas, funcionando y en tus manos. Nada de desaparecer tres meses y volver con una sorpresa.',
        when: 'Primera versión usable en 4 a 6 semanas',
      },
      {
        title: 'Acompañamos',
        body: 'Capacitamos al equipo, ajustamos lo que la realidad desmienta y seguimos disponibles después del lanzamiento.',
        when: 'Soporte continuo',
      },
    ],
  },

  services: {
    title: 'Cuando ningún producto resuelve lo tuyo.',
    lead: 'Tres formas de trabajar juntos. No hay una cuarta.',
    items: [
      {
        title: 'Desarrollo a medida',
        body: 'Nos sentamos con quien hace el trabajo hoy, no con quien lo aprueba desde arriba. Ahí sale el alcance, no de una plantilla.',
        note: 'Inventarios, trazabilidad, gestión comercial, integraciones con lo que ya usas.',
      },
      {
        title: 'IA aplicada',
        body: 'Inteligencia artificial donde resuelve algo concreto: clasificar documentos, responder consultas repetidas, extraer datos de facturas.',
        note: 'No hacemos IA para poder decir que hacemos IA.',
      },
      {
        title: 'Automatización',
        body: 'Esa tarea que alguien de tu equipo repite todos los martes durante tres horas. La identificamos, la medimos y la convertimos en un flujo automático.',
        note: 'Empezamos por la que más tiempo te come.',
      },
    ],
  },

  voices: {
    title: 'Así arranca casi toda primera reunión.',
    note: 'No son testimonios. Son las frases que más escuchamos cuando alguien nos cuenta cómo trabaja hoy.',
    phrases: [
      'Tengo el inventario en tres Excel y ninguno coincide.',
      'Los pedidos entran por WhatsApp y alguno siempre se pierde.',
      'Cierro el mes con una semana de atraso. Todos los meses.',
      'Si falta la persona que lleva la caja, nadie sabe dónde quedó nada.',
      'Para saber cuánto stock hay tengo que preguntarle a alguien.',
    ],
  },

  work: {
    eyebrow: 'Trabajo',
    title: 'De cuatro días a minutos.',
    caseTag: 'Medellín · Enero 2026',
    before: '4 días',
    after: 'Minutos',
    caption: 'Cierre de mes, antes y después.',
    lead: 'Acabados y Estilos en Madera, de Medellín, llevaba ventas, inventario, clientes y pagos pendientes a mano, todo en Excel. Les construimos un sistema a medida para manejarlo desde un solo lugar, entregado en el tiempo estimado. Se implementó en enero de 2026: el cierre de mes que antes tomaba casi cuatro días ahora se hace en minutos, todo a un clic.',
    tag: 'Caso real, publicado con permiso del cliente',
  },

  contact: {
    title: {
      pre: 'Cuéntanos qué estás ',
      hand: 'resolviendo a mano.',
    } as Split,
    lead: 'Respondemos en menos de 24 horas hábiles. Hablas directo con quien va a construir tu sistema, no con un vendedor.',
    place: 'Medellín, Colombia',
    nextTitle: 'Qué pasa después',
    nextSteps: [
      'Te respondemos en menos de 24 horas hábiles. Siempre una persona, nunca un formulario automático.',
      'Media hora de llamada para entender qué se hace hoy a mano y cuánto tiempo cuesta.',
      'Si podemos ayudarte, te pasamos alcance y precio cerrado.',
    ],
    topics: [
      'Rave, quiero implementarlo en mi empresa',
      'Heba Barber, quiero probarlo',
      'Un sistema a medida',
      'Automatizar un proceso',
      'Todavía no sé, quiero conversarlo',
    ],
    form: {
      name: 'Nombre',
      namePlaceholder: 'Cómo te llamas',
      nameError: 'Necesitamos un nombre para responderte.',
      email: 'Email',
      emailPlaceholder: 'correo@empresa.com',
      emailError: 'Déjanos un email válido para contactarte.',
      whatsapp: 'WhatsApp (opcional)',
      whatsappHelp: 'Si prefieres que te escribamos por ahí.',
      whatsappError: 'Ese número no parece válido.',
      topic: 'Qué necesitas',
      message: 'Cuéntanos un poco',
      messageHelp: 'Qué se hace hoy a mano en tu empresa.',
      messagePlaceholder: 'Por ejemplo: cada semana alguien copia los pedidos del WhatsApp a un Excel.',
      messageError: 'Cuéntanos al menos un par de líneas.',
      submit: 'Enviar',
      sending: 'Enviando',
      checkFields: 'Revisa los campos marcados.',
      sendingStatus: 'Enviando.',
      ok: 'Listo. Te respondemos en menos de 24 horas hábiles.',
      fail: 'No pudimos enviarlo. Escríbenos directo a {email} o por WhatsApp.',
    },
  },

  footer: {
    tagline: 'Software con oficio',
    blurb:
      'Sistemas a medida y productos propios para empresas que crecieron más rápido que sus procesos.',
    columns: {
      products: 'Productos',
      studio: 'Estudio',
      contact: 'Contacto',
    },
    links: {
      focus: 'Enfoque',
      services: 'Servicios',
      work: 'Trabajo',
    },
    rights: 'HEBA Studio, antes HebaTech. Medellín, Colombia.',
  },

  loader: {
    label: 'Estudio de software',
  },

  fab: {
    label: 'Escríbenos por WhatsApp',
    message: 'Hola, quiero más información sobre Heba.',
  },
};

/** El español define la forma; cualquier otro idioma debe calzar exacto. */
export type Dictionary = typeof es;
