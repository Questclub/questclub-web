# Quest Club · Web

Landing + waitlist con sistema de referral para [Quest Club](https://questclub.app), app de retos por temporadas para grupos de amigos. Lanzamiento iOS + Android **1 julio 2026**.

## Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **UI**: Tailwind CSS v4 + Sonner (toasts)
- **Tipografía**: Space Grotesk (headings) + Geist (body)
- **Backend**: Supabase (eu-west-2 London)
- **Email**: Resend + React Email
- **Anti-spam**: Cloudflare Turnstile
- **Rate limit**: Upstash Redis
- **Validación**: Zod + React Hook Form
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel
- **Package manager**: yarn

## Getting started

```bash
# 1. Clona e instala
git clone https://github.com/Questclub/questclub-web.git
cd questclub-web
yarn install

# 2. Configura entorno
cp .env.local.example .env.local
# Rellena las variables (instrucciones dentro del archivo)

# 3. Aplica el schema en Supabase
# SQL Editor → pega `06_tech/schema_waitlist.sql` (repo de planning) → Run

# 4. Arranca el dev server
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
app/
  layout.tsx          Root layout: fonts + Analytics + Toaster
  page.tsx            Landing principal
  globals.css         Tokens de marca (lime/black) + Tailwind v4 @theme
  api/
    waitlist/
      join/           POST  /api/waitlist/join — alta en lista
      confirm/        GET   /api/waitlist/confirm — doble opt-in
  r/[code]/           Landing con referral code pre-rellenado
  confirm/            Página tras click en email de confirmación
  thanks/[token]/     Página post-signup con ranking + link de referral

components/           Componentes UI compartidos
lib/                  supabase, resend, turnstile, ratelimit, validation
emails/               Templates React Email
public/               Assets estáticos
```

## Deploy

- Cada push a `main` → preview deploy en Vercel
- Branch `main` → producción (questclub.app)

## Roadmap landing v1

- [x] Bootstrap Next.js + stack base
- [ ] Schema waitlist aplicado en Supabase
- [ ] Hero + form de captura email
- [ ] API `/api/waitlist/join` + Turnstile + rate limit
- [ ] Email de confirmación (doble opt-in) vía Resend
- [ ] Página `/thanks/[token]` con ranking + referral
- [ ] Página `/r/[code]` con form pre-rellenado
- [ ] Sticky CTA mobile
- [ ] Countdown a 1 julio 2026
- [ ] Privacy + Terms páginas
- [ ] Conexión a dominio `questclub.app`
- [ ] OG image
- [ ] Lighthouse 95+

## Licencia

Privado · © 2026 Quest Club
