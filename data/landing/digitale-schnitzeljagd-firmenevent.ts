import type { LandingContent } from "@/lib/landing/types"

export const content: LandingContent = {
  slug: "digitale-schnitzeljagd-firmenevent",
  locale: "de",
  title: "Digitale Schnitzeljagd für Firmenevents | Treasure Hunt",
  description:
    "Digitale Schnitzeljagd für Firmenevents und Teambuilding: NFC- und QR-Checkpoints, ohne App-Download, mit Analytics in Echtzeit und Report danach.",

  eyebrow: "SPIEL FÜR EVENTS",
  headline: "Digitale Schnitzeljagd",
  headlineHighlight: "für Firmenevents und Teambuilding",
  subhead:
    "Eine moderne Schnitzeljagd mit NFC-Tags und QR-Checkpoints, verteilt über Ihr Gelände. Teilnehmende spielen im Handy-Browser, ohne etwas zu installieren, und jagen einer Live-Rangliste und echten Preisen nach.",
  trust: "Bereits eingesetzt bei ETHDenver, Future Maker und dem Portugal Smart Cities Summit",
  primaryCta: "Mein Event planen",

  stats: [
    { value: "10.000+", label: "gefundene Schätze" },
    { value: "500+", label: "Checkpoints" },
    { value: "500+", label: "Spielende" },
    { value: "8", label: "Events" },
  ],

  benefitsHeading: "Warum eine",
  benefitsHighlight: "digitale Schnitzeljagd",
  benefitsIntro:
    "Die ganze Logistik der Papier-Schnitzeljagd fällt weg. NFC-Tags und QR-Codes tragen das Spiel, und das Dashboard zeigt Ihnen, was passiert, während es passiert.",
  benefits: [
    {
      icon: "Smartphone",
      title: "Kein App-Download",
      description:
        "Teilnehmende steigen über den Handy-Browser ins Spiel ein und suchen nach etwa 30 Sekunden. Vor dem ersten Scan muss nichts installiert werden.",
    },
    {
      icon: "Nfc",
      title: "NFC und QR zusammen",
      description:
        "Jeder Checkpoint funktioniert per Tipp auf den NFC-Tag oder per Kamera-Scan des QR-Codes. Wo ein Handy kein NFC hat, sorgt der QR-Code dafür, dass niemand außen vor bleibt.",
    },
    {
      icon: "BarChart3",
      title: "Analytics in Echtzeit",
      description:
        "Verfolgen Sie Funde, Teilnehmende und die am meisten besuchten Bereiche live im Organisator-Dashboard und justieren Sie das Spiel noch während des Events.",
    },
    {
      icon: "Target",
      title: "Besucherströme, wohin Sie wollen",
      description:
        "Setzen Sie Checkpoints auf Sponsorenstände oder in vergessene Ecken des Geländes und bringen Sie Menschen genau dorthin, wo es zählt.",
    },
    {
      icon: "Trophy",
      title: "Live-Rangliste und Preise",
      description:
        "Jeder Fund aktualisiert die Rangliste sofort. Punkte werden in einem Shop im Spiel gegen echte Produkte eingelöst, der Wettbewerb ist also etwas Konkretes wert.",
    },
    {
      icon: "CheckCircle2",
      title: "Report nach dem Event",
      description:
        "Am Ende erhalten Sie einen vollständigen Report: Funde insgesamt, einzelne Teilnehmende, die am häufigsten besuchten Checkpoints und der Verlauf über den Tag.",
    },
  ],

  steps: {
    heading: "So läuft es ab",
    items: [
      {
        title: "Wir verstecken die Checkpoints",
        description:
          "Wir nehmen das Firmen- oder Veranstaltungsgelände auf und platzieren NFC-Tags und QR-Codes an Ständen, in Räumen und an den Punkten, zu denen Sie Menschen lenken wollen.",
      },
      {
        title: "Die Teams spielen",
        description:
          "Jede Person tippt auf einen Tag oder scannt einen QR-Code, steigt per Handy ein und findet Checkpoints. Keine App und keine Schlange am Anmeldetisch.",
      },
      {
        title: "Sie verfolgen es live",
        description:
          "Sie sehen Funde und Bewegung in Echtzeit, prämieren die Ranglistenspitze direkt vor Ort und behalten am Ende den vollständigen Report.",
      },
    ],
  },

  faqHeading: "Häufige Fragen",
  faq: [
    {
      q: "Müssen Teilnehmende eine App installieren?",
      a: "Nein. Die digitale Schnitzeljagd läuft vollständig im Handy-Browser. Die Spielenden steigen ein und scannen nach etwa 30 Sekunden die ersten Checkpoints.",
    },
    {
      q: "Welche Handys funktionieren mit NFC?",
      a: "Aktuelle iPhones und Android-Geräte lesen NFC-Tags ohne Einrichtung. Hat ein Handy kein NFC, funktioniert derselbe Checkpoint als QR-Code, sodass alle mitspielen.",
    },
    {
      q: "Eignet es sich für Teambuilding und für offene Events?",
      a: "Ja. Wir haben das Spiel auf Konferenzen, bei Firmen-Teambuildings, an Hochschul-Open-Days, auf Festivals, Messen, bei Markenaktivierungen und Hackathons durchgeführt.",
    },
    {
      q: "Können wir Menschen zu Sponsorenständen lenken?",
      a: "Ja, das ist einer der häufigsten Wünsche. Auf einem Event hatte ein Stand in einer schlecht sichtbaren Ecke einen versteckten Checkpoint: Leute kamen zum Scannen, sahen die Produkte und kauften.",
    },
    {
      q: "Wie viele Checkpoints sind möglich?",
      a: "Von einer Handvoll bis zu Hunderten. Wir haben Events mit über 100 NFC- und QR-Checkpoints auf einem Gelände umgesetzt, etwa Future Maker und den Portugal Smart Cities Summit.",
    },
    {
      q: "Was erhalten wir nach dem Event?",
      a: "Einen vollständigen Report: Funde insgesamt, einzelne Teilnehmende, die am stärksten frequentierten Checkpoints und den Verlauf pro Stunde, dazu das Live-Dashboard während des Spiels.",
    },
    {
      q: "Was kostet das?",
      a: "Es gibt die Pakete Starter, Pro und Enterprise, mit einem Angebot passend zu Gelände und Terminen. Sagen Sie uns, was Sie brauchen, und wir schicken einen Vorschlag.",
    },
  ],

  ctaHeading: "Bringen Sie eine digitale Schnitzeljagd in Ihr Unternehmen",
  ctaSubhead: "Nennen Sie uns Gelände und Termine, wir erstellen Plan und Angebot.",
  ctaButton: "Mein Event planen",
}
