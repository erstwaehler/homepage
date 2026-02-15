export interface TeamMember {
  vorname: string;
  rolle: string;
  schule: string;
  bio: string;
  mastodon: string;
  profile_image: string;
  banner_image: string;
}

export const teamMembers: TeamMember[] = [
  {
    vorname: "jack",
    rolle: "Projektleitung & Organisation",
    schule: "Vincent-Lübeck-Gymnasium",
    bio: "Jack koordiniert das gesamte Projekt und sorgt dafür, dass alle Fäden zusammenlaufen. Als Projektleiter verantwortet er die strategische Ausrichtung und ist Ansprechpartner für externe Partner.",
    mastodon: "https://mastodon.social/@jack",
    profile_image: "/team/jack_profile.png",
    banner_image: "/team/jack_banner.png",
  },
  {
    vorname: "maite",
    rolle: "Co-Projektleitung",
    schule: "Vincent-Lübeck-Gymnasium",
    bio: "Maite unterstützt die Projektleitung und koordiniert die Zusammenarbeit zwischen den teilnehmenden Schulen. Sie ist zuständig für die inhaltliche Planung der Veranstaltung.",
    mastodon: "https://mastodon.social/@maite",
    profile_image: "/team/maite_profile.png",
    banner_image: "/team/maite_banner.png",
  },
  {
    vorname: "oskar",
    rolle: "Schulkoordination IGS",
    schule: "IGS Stade",
    bio: "Oskar vertritt die IGS Stade im Planungsteam und koordiniert die Zusammenarbeit mit Schülerinnen und Schülern seiner Schule.",
    mastodon: "",
    profile_image: "/team/oskar_profile.png",
    banner_image: "/team/oskar_banner.png",
  },
  {
    vorname: "mira",
    rolle: "Kommunikation & Öffentlichkeitsarbeit",
    schule: "IGS Stade",
    bio: "Mira ist verantwortlich für die Kommunikation nach außen und kümmert sich um Social Media sowie Pressearbeit.",
    mastodon: "",
    profile_image: "/team/mira_profile.png",
    banner_image: "/team/mira_banner.png",
  },
  {
    vorname: "joshua",
    rolle: "Schulkoordination Athenaeum",
    schule: "Gymnasium Athenaeum Stade",
    bio: "Joshua koordiniert die Teilnahme des Gymnasium Athenaeum und arbeitet eng mit der Schulleitung zusammen.",
    mastodon: "https://mastodon.social/@joshua",
    profile_image: "/team/joshua_profile.png",
    banner_image: "/team/joshua_banner.png",
  },
  {
    vorname: "antonia",
    rolle: "Programmplanung",
    schule: "Gymnasium Athenaeum Stade",
    bio: "Antonia plant das inhaltliche Programm und koordiniert die Podiumsdiskussionen sowie Workshop-Formate.",
    mastodon: "",
    profile_image: "/team/antonia_profile.png",
    banner_image: "/team/antonia_banner.png",
  },
  {
    vorname: "sientje",
    rolle: "Logistik & Veranstaltungsmanagement",
    schule: "Gymnasium Athenaeum Stade",
    bio: "Sientje kümmert sich um die Organisation vor Ort, Raumplanung und alle logistischen Aspekte der Veranstaltung.",
    mastodon: "",
    profile_image: "/team/sientje_profile.png",
    banner_image: "/team/sientje_banner.png",
  },
];
