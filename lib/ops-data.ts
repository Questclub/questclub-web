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
    status: "active",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
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
    platform: "instagram",
    handle: "@questclubapp",
    status: "banned",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
    notes:
      "Bloqueada de primeras al crearla. Posibles causas: email forwardeado detectado como sospechoso, IP nueva sin actividad, account creation patterns. Pendiente: apelar o crear con email/dispositivo distinto.",
  },
  {
    platform: "threads",
    handle: "@questclubapp",
    status: "pending",
    createdAt: "2026-05-01",
    followers: 0,
    posts: 0,
    notes: "Hereda de IG. Bloqueado mientras IG esté banneada.",
  },
];

/* ============================================================
 * WARMUP VIDEOS — los 12 guiones planificados
 * ============================================================ */

export type VideoStatus =
  | "idea"
  | "shooting"
  | "editing"
  | "scheduled"
  | "posted";

export type WarmupVideo = {
  id: number;
  title: string;
  phase: 1 | 2 | 3;
  hasVoice: boolean;
  status: VideoStatus;
  scheduledFor?: string;
  postedAt?: string;
  notes?: string;
};

export const WARMUP_VIDEOS: WarmupVideo[] = [
  { id: 1, title: "Los 3 tipos de amigo", phase: 1, hasVoice: false, status: "idea" },
  { id: 2, title: "POV el finde termina igual", phase: 1, hasVoice: false, status: "idea" },
  { id: 3, title: "Cosas que solo pasan en una despedida", phase: 1, hasVoice: false, status: "idea" },
  { id: 4, title: "Tipos de grupo de WhatsApp", phase: 1, hasVoice: false, status: "idea" },
  { id: 5, title: "Me acaban de retar a algo", phase: 2, hasVoice: false, status: "idea" },
  { id: 6, title: "Los 5 retos más random del finde", phase: 2, hasVoice: false, status: "idea" },
  { id: 7, title: "Mi grupo tiene ranking desde 2019", phase: 2, hasVoice: false, status: "idea" },
  { id: 8, title: "Cuando tu grupo tiene REGLAS", phase: 2, hasVoice: false, status: "idea" },
  { id: 9, title: "Necesito contaros esto", phase: 3, hasVoice: true, status: "idea" },
  { id: 10, title: "Los 3 amigos que van a perder la cabeza", phase: 3, hasVoice: false, status: "idea" },
  { id: 11, title: "Este verano con mi grupo", phase: 3, hasVoice: true, status: "idea" },
  { id: 12, title: "Quedan 7 días", phase: 3, hasVoice: true, status: "idea" },
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
    status: "open",
    createdAt: "2026-05-01",
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
