/**
 * Datos estáticos de operación. Editables a mano hasta que migremos a tablas
 * Supabase. Cuando se actualicen, commit + push y Vercel redeploya.
 */

/* ============================================================
 * SOCIAL ACCOUNTS — estado de las 4 cuentas para warmup
 * ============================================================ */

export type AccountStatus = "active" | "warming" | "banned" | "pending";
export type AccountPlatform = "tiktok" | "instagram" | "x" | "threads";

export type SocialAccount = {
  platform: AccountPlatform;
  handle: string;
  status: AccountStatus;
  createdAt: string; // ISO date YYYY-MM-DD
  followers: number;
  posts: number;
  notes?: string;
};

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    platform: "tiktok",
    handle: "@questclubapp",
    status: "warming",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
    notes:
      "Warmup activo 7-10 may. Drop 1 (Banger Paula) programado dom 11 may 17:30 ES.",
  },
  {
    platform: "instagram",
    handle: "@questclubapp",
    status: "warming",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
    notes: "Warmup activo. Reels arrancan dom 11 may junto con TikTok.",
  },
  {
    platform: "x",
    handle: "@questclubapp",
    status: "active",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
  },
  {
    platform: "threads",
    handle: "@questclubapp",
    status: "active",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
    notes:
      "Activada vía IG. Si todavía no la has linkado, hazlo desde la app de Threads para empezar a postear.",
  },
];

/* ============================================================
 * CONTENT VIDEOS — los 12 vídeos del sprint (7 producidos + 5 pendientes)
 * ============================================================ */

export type VideoStatus =
  | "idea"
  | "shooting"
  | "editing"
  | "scheduled"
  | "posted";

export type ContentTier = "fire" | "high" | "mid";

export type Caption = { primary: string; alt?: string };

export type ContentVideo = {
  id: string; // slug
  number: string; // "Banger" | "1.1" | "2.2" etc
  title: string;
  archetype?: string; // personaje central
  tier: ContentTier;
  status: VideoStatus;

  // Production
  videoPath?: string;
  duration?: number; // seconds
  hasAudio?: boolean; // CapCut audio added

  // Schedule
  scheduledDate?: string; // YYYY-MM-DD
  scheduledHour?: string; // HH:MM ES
  postedAt?: string;

  // Copy
  captionTT?: Caption;
  captionIG?: Caption;
  hashtags?: string[];

  // Format
  format?: "POV" | "demo" | "ranking" | "teaser" | "recruitment";

  notes?: string;
};

const HASHTAGS_CORE = [
  "#grupodeamigos",
  "#planesconamigos",
  "#findesemana",
  "#españa",
  "#gen z",
];
const HASHTAGS_RECRUIT = ["#waitlist", "#questclub", "#retosconamigos"];
const HASHTAGS_TEASER = ["#verano2026", "#packverano", "#questclub"];

export const WARMUP_VIDEOS: ContentVideo[] = [
  {
    id: "banger_paula",
    number: "Banger",
    title: "Ya sabíamos cómo iba a acabar",
    archetype: "Paula",
    tier: "fire",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-06/output/quest_banger_paula_v2.mp4",
    duration: 10.6,
    hasAudio: false,
    scheduledDate: "2026-05-11",
    scheduledHour: "17:30",
    captionTT: {
      primary: "paula lleva 3 packs prometiendo que gana 💀",
      alt: "todos tenemos una así. etiquétala",
    },
    captionIG: {
      primary: "cada grupo tiene una paula 🏆🥲 con qué amigos jugarías esto?",
      alt: "spoiler: ganó nadie. otra vez.",
    },
    hashtags: [...HASHTAGS_CORE, "#tiktokes", "#verano2026"],
    format: "POV",
    notes:
      "Best del sprint. ChatGPT lo equipara al 2.2 con MÁS techo viral. Drop primero como apertura del feed nuevo.",
  },
  {
    id: "v_2_2",
    number: "2.2",
    title: "POV: el típico que dice yo gano y acaba último",
    archetype: "Mario",
    tier: "fire",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-04/output/quest_video_2_2_v5.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-12",
    scheduledHour: "20:00",
    captionTT: {
      primary: "el típico que dice fácil y acaba último 😅",
      alt: "spoiler: nadie gana",
    },
    captionIG: {
      primary: "quién es así en tu grupo? 👇",
      alt: "el competitivo tóxico del grupo",
    },
    hashtags: [...HASHTAGS_CORE, "#competitivo"],
    format: "POV",
  },
  {
    id: "v_1_2",
    number: "1.2",
    title: "Los 5 arquetipos de tu grupo de amigos",
    tier: "high",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-05/output/quest_video_1_2_v2.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-13",
    scheduledHour: "20:00",
    captionTT: {
      primary: "los 5 que SIEMPRE están en cada grupo",
      alt: "dime que no tienes alguno 👀",
    },
    captionIG: {
      primary: "etiqueta al que es cada uno 🏆",
    },
    hashtags: [...HASHTAGS_CORE, "#arquetipos"],
    format: "ranking",
  },
  {
    id: "v_2_4",
    number: "2.4",
    title: "Si los 5 arquetipos compitieran en una misión",
    tier: "high",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-05/output/quest_video_2_4_v1.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-14",
    scheduledHour: "20:00",
    captionTT: {
      primary: "y si tu grupo compitiera en una misión?",
      alt: "aquí lo verías clarísimo",
    },
    captionIG: {
      primary: "cuál ganaría en tu grupo?",
    },
    hashtags: [...HASHTAGS_CORE, "#competicion"],
    format: "ranking",
  },
  {
    id: "v_2_5",
    number: "2.5",
    title: "Habla planes pero nunca hace ninguno",
    archetype: "Lucía (Excel)",
    tier: "high",
    status: "idea",
    scheduledDate: "2026-05-15",
    scheduledHour: "20:00",
    captionTT: {
      primary: "la que TODO lo planea en Excel pero nunca pasa nada 📊",
      alt: "4 horas planeando para 1 foto",
    },
    captionIG: { primary: "quién es la lucía de tu grupo?" },
    hashtags: [...HASHTAGS_CORE, "#planificadora"],
    format: "POV",
    notes: "Producir mié 7 may. Aplicar molde Banger Paula con personaje Lucía.",
  },
  {
    id: "v_1_1",
    number: "1.1",
    title: "Top 10 misiones del Pack Verano",
    tier: "mid",
    status: "editing",
    videoPath: "~/Downloads/quest_video_1_v1.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-16",
    scheduledHour: "20:00",
    captionTT: {
      primary: "10 misiones para hacer con la peña este verano 🏖",
      alt: "cuántas haríais sin dudar?",
    },
    captionIG: { primary: "cuál es la primera que probarías?" },
    hashtags: [...HASHTAGS_CORE, ...HASHTAGS_TEASER],
    format: "demo",
  },
  {
    id: "v_2_1",
    number: "2.1",
    title: "POV viaje con 5 inútiles",
    tier: "high",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-04/output/quest_video_2_1_v3.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-17",
    scheduledHour: "17:30",
    captionTT: {
      primary: "organizar un viaje en grupo es esto 💀",
      alt: "quién es el yo en agosto imposible?",
    },
    captionIG: { primary: "con quién no harías nunca un viaje?" },
    hashtags: [...HASHTAGS_CORE, "#viaje"],
    format: "POV",
  },
  {
    id: "v_2_6",
    number: "2.6",
    title: "Yo en agosto imposible (a TODOS los meses)",
    archetype: "Javi (pasota)",
    tier: "high",
    status: "idea",
    scheduledDate: "2026-05-18",
    scheduledHour: "17:30",
    captionTT: {
      primary: "el que dice yo en agosto imposible a TODOS los meses",
      alt: "el plan es no tener plan",
    },
    captionIG: { primary: "quién es el javi del grupo?" },
    hashtags: [...HASHTAGS_CORE, "#pasota"],
    format: "POV",
    notes: "Producir jue 8 may. Personaje Javi, pasota crónico.",
  },
  {
    id: "v_1_4",
    number: "1.4",
    title: "Top 3 grupos del año en la waitlist",
    tier: "mid",
    status: "idea",
    scheduledDate: "2026-05-19",
    scheduledHour: "20:00",
    captionTT: {
      primary: "los 3 grupos más caóticos de la waitlist 🏆",
      alt: "dónde está el tuyo?",
    },
    captionIG: { primary: "tu grupo entraría en el top 3?" },
    hashtags: [...HASHTAGS_CORE, ...HASHTAGS_RECRUIT],
    format: "ranking",
    notes: "Producir vie 9 may. Mockup tipo leaderboard de grupos.",
  },
  {
    id: "v_4_1",
    number: "4.1",
    title: "Buscamos los 100 grupos más caóticos",
    tier: "mid",
    status: "idea",
    scheduledDate: "2026-05-20",
    scheduledHour: "20:00",
    captionTT: {
      primary:
        "buscamos los 100 grupos más caóticos para el lanzamiento",
      alt: "link en bio si vas con la peña",
    },
    captionIG: { primary: "apúntate con tu grupo 👉 link en bio" },
    hashtags: [...HASHTAGS_CORE, ...HASHTAGS_RECRUIT],
    format: "recruitment",
    notes: "Producir sáb 10 may. Recruitment hardpush — link bio destacado.",
  },
  {
    id: "v_3_1",
    number: "3.1",
    title: "Pack Verano teaser cinematic",
    tier: "high",
    status: "idea",
    scheduledDate: "2026-05-21",
    scheduledHour: "20:00",
    captionTT: {
      primary: "pack verano. 1 julio.",
      alt: "tu grupo en 30 misiones",
    },
    captionIG: { primary: "1 julio. tu grupo. 30 misiones. 🏖" },
    hashtags: [...HASHTAGS_CORE, ...HASHTAGS_TEASER],
    format: "teaser",
    notes:
      "Producir dom 11 may después del drop del Banger. Footage Higgsfield Seedance + ffmpeg cinematic.",
  },
  {
    id: "v_2_3",
    number: "2.3",
    title: "Amigo que llega 30 min tarde a todo",
    tier: "mid",
    status: "editing",
    videoPath:
      "~/Downloads/quest_videos/2026-05-04/output/quest_video_2_3_v1.mp4",
    hasAudio: false,
    scheduledDate: "2026-05-22",
    scheduledHour: "20:00",
    captionTT: {
      primary: "que llega 30 min tarde a TODO ⏰",
      alt: "spoiler: llega siempre 30 min tarde",
    },
    captionIG: { primary: "etiqueta al impuntual del grupo" },
    hashtags: [...HASHTAGS_CORE, "#impuntual"],
    format: "POV",
  },
];

/* ============================================================
 * CONTENT CAROUSELS — 5 carruseles IG feed (drop dom 11 - dom 25)
 * ============================================================ */

export type CarouselFormat = "narrative-coral" | "time-based" | "taxonomy-meme" | "scenario-pov" | "single-character";
export type CarouselCTA = "pack-verano" | "emocional" | "no-cta" | "soft";

export type ContentCarousel = {
  id: string;
  title: string;
  archetype?: string;
  tier: ContentTier;
  status: VideoStatus; // reusa estados de video

  shape: CarouselFormat;
  ctaType: CarouselCTA;
  slidesCount: number;

  scheduledDate?: string;
  scheduledHour?: string;
  postedAt?: string;

  captionIG?: Caption;
  hashtags?: string[];

  folderPath?: string; // path al folder en content_calendar
  notes?: string;
};

export const CONTENT_CAROUSELS: ContentCarousel[] = [
  {
    id: "c1_como_muere",
    title: "Cómo muere un grupo de amigos",
    tier: "fire",
    status: "editing",
    shape: "narrative-coral",
    ctaType: "pack-verano",
    slidesCount: 7,
    scheduledDate: "2026-05-11",
    scheduledHour: "21:00",
    captionIG: {
      primary:
        "Cómo muere un grupo de amigos: 147 mensajes. 0 planes. 'vamos viendo.' 'decidid vosotros.' 3 semanas después · nadie hizo nada. el problema nunca fue el grupo. era que faltaba algo que os pusiera a competir. Pack Verano · 1 julio · Comenta MISIÓN.",
    },
    hashtags: [
      "#grupodeamigos",
      "#planesconamigos",
      "#verano2026",
      "#questclub",
      "#peñadelverano",
    ],
    folderPath:
      "05_marketing/content_calendar/2026-05-11_como_muere_un_grupo_carousel_ig",
    notes:
      "Drop 1 carruseles. Validado por ChatGPT como nivel marca cultural. Drop simultáneo con Banger Paula video (17:30 video / 21:00 carrusel).",
  },
  {
    id: "c2_planes_verano",
    title: "El grupo que prometió hacer planes este verano",
    archetype: "Lucía + Mario + Paula",
    tier: "fire",
    status: "editing",
    shape: "time-based",
    ctaType: "emocional",
    slidesCount: 7,
    scheduledDate: "2026-05-14",
    scheduledHour: "21:00",
    captionIG: {
      primary:
        "Diciembre 2025: 'este verano sí nos liamos seguro.' Julio 2026: tu mejor amigo ya está con sus suegros en Asturias. el problema nunca fue las ganas. era que faltaba algo que os obligara. Pack Verano · 1 julio · 100 grupos · Comenta MISIÓN.",
    },
    hashtags: [
      "#grupodeamigos",
      "#planesconamigos",
      "#verano2026",
      "#questclub",
      "#peñadelverano",
    ],
    folderPath:
      "05_marketing/content_calendar/2026-05-14_carrusel_planes_verano",
    notes:
      "Time-based decadencia dic→jul. v1 generado, pendiente 4 fixes (cronología enero 2026, miembros consistentes, branding sutil).",
  },
  {
    id: "c3_5_frases",
    title: "Las 5 frases que matan cualquier plan",
    tier: "fire",
    status: "editing",
    shape: "taxonomy-meme",
    ctaType: "no-cta",
    slidesCount: 8,
    scheduledDate: "2026-05-18",
    scheduledHour: "21:00",
    captionIG: {
      primary:
        "las 5 frases que has dicho. yo también. todos. y todos sabemos lo que pasa después. 😴",
    },
    hashtags: [
      "#grupodeamigos",
      "#planesconamigos",
      "#frases",
      "#wsp",
      "#grupoWhatsApp",
    ],
    folderPath:
      "05_marketing/content_calendar/2026-05-18_carrusel_5_frases_que_matan",
    notes:
      "El primer NO-CTA del feed. Validado por ChatGPT como mejor del set. Cultural pure, sin Pack Verano. Wordmark esquina mínimo en slide 8.",
  },
  {
    id: "c4_cumpleanos",
    title: "Cómo se organiza un cumpleaños en 2026",
    archetype: "Mario + Marta",
    tier: "fire",
    status: "idea",
    shape: "scenario-pov",
    ctaType: "soft",
    slidesCount: 8,
    scheduledDate: "2026-05-22",
    scheduledHour: "21:00",
    captionIG: {
      primary:
        "historia real. todos los grupos. todos los cumpleaños. 'yo me encargo' → 47 mensajes → 0 fechas → marta sola. el problema nunca fue Mario. el problema es que el grupo no tiene reglas. (y sí, Marta se enteró por Stories) Pack Verano · 1 julio · Comenta MISIÓN.",
    },
    hashtags: [
      "#grupodeamigos",
      "#cumpleaños",
      "#planesconamigos",
      "#questclub",
    ],
    folderPath:
      "05_marketing/content_calendar/2026-05-22_carrusel_cumpleanos_2026",
    notes:
      "Cinematográfico/emocional. 10-15% humor absurdo obligatorio (el viernes me caso, propuesta David Mercadona). Marta como cameo nuevo del universo.",
  },
  {
    id: "c5_mario_solo",
    title: "Cuando UNO solo del grupo se lo toma en serio",
    archetype: "Mario",
    tier: "fire",
    status: "idea",
    shape: "single-character",
    ctaType: "emocional",
    slidesCount: 8,
    scheduledDate: "2026-05-25",
    scheduledHour: "21:00",
    captionIG: {
      primary:
        "Mario lleva 4 meses subiendo puntos él solo. El grupo le dijo que se relajara. 3 semanas después, el chat sigue muerto. Mario tenía razón. El problema nunca fue Mario. mándaselo al organizador del grupo. al amigo que carga con todo. Pack Verano · 1 julio · Comenta MISIÓN.",
    },
    hashtags: [
      "#grupodeamigos",
      "#organizador",
      "#planesconamigos",
      "#questclub",
    ],
    folderPath: "05_marketing/content_calendar/2026-05-25_carrusel_mario_solo",
    notes:
      "Mario protagonist emocional. Activa user core (organizador del grupo). Cierre con callbacks al primer carrusel (Visto por nadie, audio 0 plays). Continuidad serial.",
  },
];

/* ============================================================
 * WARMUP CHECKLIST — acciones diarias 4 días pre-launch
 * ============================================================ */

export type WarmupDay = {
  date: string; // YYYY-MM-DD
  label: string; // "Mié 7 may"
  production: string; // qué producir / editar
  tiktok: string[];
  instagram: string[];
};

export const WARMUP_CHECKLIST: WarmupDay[] = [
  {
    date: "2026-05-07",
    label: "Mié 7 may",
    production:
      "Audio CapCut Banger + 2.2 + producir 2.5 (Lucía Excel) con molde banger",
    tiktok: [
      "Crear cuenta business si no está",
      "Bio: 'retos entre amigos · packs estacionales · 1 julio 🏖' + link",
      "Profile pic logo lime QC",
      "Follow 20 cuentas del nicho (apps social, creators planes/grupos)",
      "Watch+complete 20 vídeos del nicho (señal MUY fuerte algoritmo)",
      "Like 30 vídeos relevantes",
      "NO publicar nada todavía",
    ],
    instagram: [
      "Cuenta business, conectar FB",
      "Bio + link Linktree",
      "Follow 30 cuentas similar",
      "3 stories 'creating something' BTS",
      "Save 5 reels del nicho",
    ],
  },
  {
    date: "2026-05-08",
    label: "Jue 8 may",
    production:
      "Audio CapCut 1.2 + producir 2.6 (Javi pasota)",
    tiktok: [
      "30 min scroll natural FYP — dejar que TT aprenda",
      "Like 30-40 nicho",
      "Watch+complete 15 más",
      "Comentarios reales 2-5 (tipo 'literal mi grupo')",
      "Save 5-10 más",
      "Follow 10-20 más",
    ],
    instagram: [
      "3 stories BTS — producción de vídeo, mockup, día con la peña",
      "Save 10 reels",
      "Comment en 3 reels grandes nicho",
      "Follow 30-40 más",
    ],
  },
  {
    date: "2026-05-09",
    label: "Vie 9 may",
    production: "Audio CapCut 2.4 + 2.1 + producir 1.4 (Top 3 grupos)",
    tiktok: [
      "Like 50, save 10, comment 5",
      "Watch+complete 20 vídeos",
      "Share a stories 1-2 vídeos relevantes",
      "Follow 20 más",
    ],
    instagram: [
      "Story sneak peek de 1 frame del banger blurred",
      "Comment en 5 reels grandes",
      "Follow 30 más",
    ],
  },
  {
    date: "2026-05-10",
    label: "Sáb 10 may",
    production: "Audio CapCut 1.1 + 2.3 + producir 4.1 (100 grupos caóticos)",
    tiktok: [
      "Like 50, save 10, comment 5, follow 10",
      "Watch+complete 25 vídeos",
      "Story countdown 'mañana algo'",
    ],
    instagram: [
      "Story countdown 'mañana algo'",
      "Stories adicionales con BTS",
      "Comment + follow",
    ],
  },
];

/* ============================================================
 * ISSUES — log de incidencias
 * ============================================================ */

export type IssueSeverity = "low" | "medium" | "high" | "critical";
export type IssueStatus = "open" | "investigating" | "resolved" | "wont-fix";

export type Issue = {
  id: number;
  title: string;
  description: string;
  severity: IssueSeverity;
  status: IssueStatus;
  createdAt: string;
  resolvedAt?: string;
};

export const ISSUES: Issue[] = [
  {
    id: 1,
    title: "Instagram bloqueó @questclubapp al crearla",
    description:
      "Al crear la cuenta de Instagram con email hola@questclub.app, IG la marcó como spam y la bloqueó de primeras antes de poder publicar nada. Posibles causas: email forwardeado detectado como sospechoso, IP nueva sin actividad previa, o automated account creation patterns. Pendiente de apelar desde la app o crear con otro email/dispositivo.",
    severity: "high",
    status: "resolved",
    createdAt: "2026-05-01",
    resolvedAt: "2026-05-01",
  },
];

/* ============================================================
 * Helpers
 * ============================================================ */

export const PLATFORM_LABEL: Record<AccountPlatform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  x: "X / Twitter",
  threads: "Threads",
};

export const STATUS_LABEL: Record<AccountStatus, string> = {
  active: "Activa",
  warming: "En warmup",
  banned: "Banneada",
  pending: "Pendiente",
};

export const VIDEO_STATUS_LABEL: Record<VideoStatus, string> = {
  idea: "Idea",
  shooting: "Grabando",
  editing: "Editando",
  scheduled: "Programado",
  posted: "Publicado",
};

export const TIER_LABEL: Record<ContentTier, string> = {
  fire: "🔥 Top",
  high: "🟢 Alto",
  mid: "🟡 Medio",
};

export const CAROUSEL_CTA_LABEL: Record<CarouselCTA, string> = {
  "pack-verano": "CTA Pack Verano",
  emocional: "CTA emocional",
  "no-cta": "Cultural pure",
  soft: "CTA suave",
};

export const CAROUSEL_SHAPE_LABEL: Record<CarouselFormat, string> = {
  "narrative-coral": "Coral narrativo",
  "time-based": "Cronológico",
  "taxonomy-meme": "Taxonomía meme",
  "scenario-pov": "POV escenario",
  "single-character": "Personaje POV",
};

export const SEVERITY_LABEL: Record<IssueSeverity, string> = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
  critical: "Crítico",
};

export const ISSUE_STATUS_LABEL: Record<IssueStatus, string> = {
  open: "Abierto",
  investigating: "Investigando",
  resolved: "Resuelto",
  "wont-fix": "No se arregla",
};

// Backwards compat: alias for old code that referenced WarmupVideo type
export type WarmupVideo = ContentVideo & {
  phase?: 1 | 2 | 3;
  scheduledFor?: string;
};
