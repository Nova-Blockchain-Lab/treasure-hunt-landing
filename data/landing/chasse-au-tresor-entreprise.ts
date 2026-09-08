import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "chasse-au-tresor-entreprise",
  locale: "fr",
  title: "Chasse au Trésor d'Entreprise Digitale | Treasure Hunt",
  description:
    "Chasse au trésor d'entreprise digitale pour événements et team building : checkpoints NFC et QR, sans application, analytique en direct et rapport final.",

  eyebrow: "JEU POUR ÉVÉNEMENTS",
  headline: "Chasse au trésor d'entreprise",
  headlineHighlight: "pour événements et team building",
  subhead:
    "Une chasse au trésor moderne avec des tags NFC et des checkpoints QR répartis dans votre espace. Les participants jouent depuis le navigateur de leur téléphone, sans rien installer, à la poursuite d'un classement en direct et de vraies récompenses.",
  trust: "Déjà utilisé à ETHDenver, Future Maker et au Portugal Smart Cities Summit",
  primaryCta: "Planifier mon événement",

  stats: [
    { value: "10 000+", label: "trésors trouvés" },
    { value: "500+", label: "checkpoints" },
    { value: "500+", label: "joueurs" },
    { value: "8", label: "événements" },
  ],

  benefitsHeading: "Pourquoi choisir la",
  benefitsHighlight: "chasse au trésor digitale",
  benefitsIntro:
    "Toute la logistique de la chasse au trésor sur papier disparaît. Les tags NFC et les QR portent le jeu, et le tableau de bord vous montre ce qui se passe pendant que ça se passe.",
  benefits: [
    {
      icon: "Smartphone",
      title: "Aucune application à télécharger",
      description:
        "Les participants entrent dans le jeu depuis le navigateur de leur téléphone et cherchent au bout d'une trentaine de secondes. Rien à installer avant le premier scan.",
    },
    {
      icon: "Nfc",
      title: "NFC et QR ensemble",
      description:
        "Chaque checkpoint s'active en approchant le téléphone du tag NFC ou en scannant le QR avec l'appareil photo. Là où le téléphone n'a pas de NFC, le QR fait que personne n'est laissé de côté.",
    },
    {
      icon: "BarChart3",
      title: "Analytique en temps réel",
      description:
        "Suivez les découvertes, les joueurs et les zones les plus fréquentées en direct depuis le tableau de bord organisateur, et ajustez le jeu pendant l'événement.",
    },
    {
      icon: "Target",
      title: "Du passage là où vous voulez",
      description:
        "Placez des checkpoints sur les stands des sponsors ou dans les recoins oubliés du site pour amener les gens exactement là où cela compte.",
    },
    {
      icon: "Trophy",
      title: "Classement en direct et récompenses",
      description:
        "Chaque découverte met le classement à jour instantanément. Les points s'échangent contre de vrais produits dans une boutique intégrée, la compétition vaut donc quelque chose de concret.",
    },
    {
      icon: "CheckCircle2",
      title: "Rapport après l'événement",
      description:
        "À la fin, vous recevez un rapport complet : total des découvertes, joueurs uniques, checkpoints les plus visités et évolution au fil de la journée.",
    },
  ],

  steps: {
    heading: "Comment ça se passe",
    items: [
      {
        title: "Nous cachons les checkpoints",
        description:
          "Nous relevons l'espace de l'entreprise ou du site et plaçons des tags NFC et des QR sur les stands, dans les salles et aux endroits où vous voulez amener les gens.",
      },
      {
        title: "Les équipes jouent",
        description:
          "Chacun approche son téléphone d'un tag ou scanne un QR, entre depuis son mobile et se met à trouver des checkpoints. Sans application et sans file au comptoir d'inscription.",
      },
      {
        title: "Vous suivez en direct",
        description:
          "Vous voyez les découvertes et les déplacements en temps réel, récompensez la tête du classement sur place, et gardez le rapport complet à la fin.",
      },
    ],
  },

  faqHeading: "Questions fréquentes",
  faq: [
    {
      q: "Les participants doivent-ils installer une application ?",
      a: "Non. La chasse au trésor d'entreprise digitale fonctionne entièrement dans le navigateur du téléphone. Les joueurs entrent et scannent leurs premiers checkpoints en une trentaine de secondes.",
    },
    {
      q: "Quels téléphones fonctionnent avec le NFC ?",
      a: "Les iPhone et Android actuels lisent les tags NFC sans configuration. Quand un téléphone n'a pas de NFC, le même checkpoint fonctionne en QR, donc tout le monde joue.",
    },
    {
      q: "Est-ce adapté au team building et aux événements ouverts ?",
      a: "Oui. Nous avons déployé le jeu sur des congrès, des team buildings d'entreprise, des journées portes ouvertes universitaires, des festivals, des salons, des activations de marque et des hackathons.",
    },
    {
      q: "Peut-on amener des visiteurs aux stands des sponsors ?",
      a: "Oui, c'est l'un des usages les plus demandés. Sur un événement, un stand dans un coin peu visible avait un checkpoint caché : les gens venaient scanner, voyaient les produits et achetaient.",
    },
    {
      q: "Combien de checkpoints peut-on avoir ?",
      a: "De quelques-uns à plusieurs centaines. Nous avons géré des événements avec plus de 100 checkpoints NFC et QR sur un seul site, comme Future Maker et le Portugal Smart Cities Summit.",
    },
    {
      q: "Que recevons-nous après l'événement ?",
      a: "Un rapport complet : total des découvertes, joueurs uniques, checkpoints les plus fréquentés et évolution par heure, en plus du tableau de bord en direct pendant le jeu.",
    },
    {
      q: "Quel est le prix ?",
      a: "Nous proposons les formules Starter, Pro et Enterprise, avec un devis calibré sur le site et les dates. Dites-nous ce qu'il vous faut et nous envoyons une proposition.",
    },
  ],

  ctaHeading: "Organisez une chasse au trésor digitale dans votre entreprise",
  ctaSubhead: "Indiquez-nous le site et les dates, nous préparons un plan et un devis.",
  ctaButton: "Planifier mon événement",
}
