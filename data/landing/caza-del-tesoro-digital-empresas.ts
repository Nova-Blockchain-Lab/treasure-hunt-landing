import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "caza-del-tesoro-digital-empresas",
  locale: "es",
  title: "Caza del Tesoro Digital para Empresas | Treasure Hunt",
  description:
    "Caza del tesoro digital para empresas y eventos: gimcana con NFC y QR, sin descargar app, con analítica en tiempo real e informe posterior.",

  eyebrow: "JUEGO PARA EVENTOS",
  headline: "Caza del tesoro digital",
  headlineHighlight: "para empresas y eventos",
  subhead:
    "Una gimcana moderna con etiquetas NFC y puntos de control QR repartidos por el espacio. Los participantes juegan en el navegador del móvil, sin instalar nada, persiguiendo una clasificación en directo y premios reales.",
  trust: "Ya utilizado en ETHDenver, Future Maker y el Portugal Smart Cities Summit",
  primaryCta: "Planificar mi evento",

  stats: [
    { value: "10.000+", label: "tesoros encontrados" },
    { value: "500+", label: "puntos de control" },
    { value: "500+", label: "jugadores" },
    { value: "8", label: "eventos" },
  ],

  benefitsHeading: "Por qué elegir la",
  benefitsHighlight: "caza del tesoro digital",
  benefitsIntro:
    "Toda la logística de la gimcana de papel desaparece. Las etiquetas NFC y los QR llevan el juego, y el panel te muestra lo que pasa mientras pasa.",
  benefits: [
    {
      icon: "Smartphone",
      title: "Sin descargar app",
      description:
        "Los participantes entran al juego desde el navegador del móvil y empiezan a buscar en unos 30 segundos. No hay nada que instalar antes del primer escaneo.",
    },
    {
      icon: "Nfc",
      title: "NFC y QR juntos",
      description:
        "Cada punto de control funciona acercando el móvil a la etiqueta NFC o leyendo el QR con la cámara. Donde el teléfono no tiene NFC, el QR garantiza que nadie se queda fuera.",
    },
    {
      icon: "BarChart3",
      title: "Analítica en tiempo real",
      description:
        "Sigue los hallazgos, los jugadores y las zonas con más movimiento en directo desde el panel del organizador, y ajusta el juego durante el propio evento.",
    },
    {
      icon: "Target",
      title: "Tráfico donde tú quieras",
      description:
        "Coloca puntos de control en los stands de los patrocinadores o en los rincones olvidados del recinto para llevar gente exactamente a los sitios que importan.",
    },
    {
      icon: "Trophy",
      title: "Clasificación en directo y premios",
      description:
        "Cada hallazgo actualiza la clasificación al instante. Los puntos se cambian por productos reales en una tienda dentro del juego, así que competir vale algo concreto.",
    },
    {
      icon: "CheckCircle2",
      title: "Informe posterior al evento",
      description:
        "Al terminar recibes un informe completo: total de hallazgos, jugadores únicos, puntos de control más visitados y patrones a lo largo del día.",
    },
  ],

  steps: {
    heading: "Cómo funciona",
    items: [
      {
        title: "Escondemos los puntos de control",
        description:
          "Mapeamos el espacio de la empresa o del evento y colocamos etiquetas NFC y QR en stands, salas y en los puntos a los que quieres llevar a la gente.",
      },
      {
        title: "Los equipos juegan",
        description:
          "Cada persona acerca el móvil a una etiqueta o lee un QR, entra desde el teléfono y empieza a encontrar puntos de control. Sin app y sin colas en el mostrador de inscripción.",
      },
      {
        title: "Lo sigues en directo",
        description:
          "Ves los hallazgos y el movimiento en tiempo real, premias en el momento a los primeros de la clasificación y te quedas con el informe completo al final.",
      },
    ],
  },

  faqHeading: "Preguntas frecuentes",
  faq: [
    {
      q: "¿Los participantes tienen que instalar una aplicación?",
      a: "No. La caza del tesoro digital para empresas funciona por completo en el navegador del móvil. Los jugadores entran y empiezan a escanear puntos de control en unos 30 segundos.",
    },
    {
      q: "¿Qué móviles funcionan con NFC?",
      a: "Los iPhone y Android actuales leen etiquetas NFC sin configuración. Cuando un teléfono no tiene NFC, el mismo punto de control funciona como QR, así que todo el mundo juega.",
    },
    {
      q: "¿Sirve para team building y para eventos abiertos?",
      a: "Sí. Hemos llevado el juego a congresos, team building de empresa, jornadas de puertas abiertas de universidades, festivales, ferias, activaciones de marca y hackathons.",
    },
    {
      q: "¿Podemos llevar gente a los stands de los patrocinadores?",
      a: "Sí, es uno de los usos más pedidos. En un evento, un stand en una esquina poco visible tenía un punto de control escondido: la gente iba a escanear, veía los productos y compraba.",
    },
    {
      q: "¿Cuántos puntos de control podemos tener?",
      a: "Desde unos pocos hasta cientos. Hemos hecho eventos con más de 100 puntos de control NFC y QR en un solo recinto, como Future Maker y el Portugal Smart Cities Summit.",
    },
    {
      q: "¿Qué recibimos después del evento?",
      a: "Un informe posterior completo: total de hallazgos, jugadores únicos, puntos de control con más movimiento y patrones por hora, además del panel en directo durante el juego.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Tenemos planes Starter, Pro y Enterprise, con presupuesto ajustado al espacio y a las fechas. Cuéntanos qué necesitas y te enviamos una propuesta.",
    },
  ],

  ctaHeading: "Lleva una caza del tesoro digital a tu empresa",
  ctaSubhead: "Cuéntanos el espacio y las fechas y preparamos un plan y un presupuesto.",
  ctaButton: "Planificar mi evento",
}
