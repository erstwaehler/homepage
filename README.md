# Erstwähler Forum 2026 - Homepage

Die offizielle Website für das Erstwähler Forum 2026, eine schulübergreifende Großveranstaltung zur politischen Bildung in Stade.

## Über das Projekt

Das Erstwähler Forum 2026 ist eine einzigartige Initiative, die Schülerinnen und Schüler aus drei Stader Gymnasien zusammenbringt:

- Gymnasium Athenaeum Stade (ATHE)
- IGS Stade
- Vincent-Lübeck-Gymnasium (VLG)

**Veranstaltungsdatum:** 02. Juni 2026  
**Ort:** Stadeum, Stade  
**Zeit:** 8:00 - 14:00 Uhr

## Tech Stack

- **Framework:** TanStack Start (React)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Internationalisierung:** Paraglide JS (Deutsch/Englisch)
- **Analytics:** PostHog (optional)
- **Deployment:** Vercel (empfohlen) oder jeder statische Host

## Installation

```bash
# Dependencies installieren
pnpm install

# Development Server starten
pnpm dev

# Production Build erstellen
pnpm build

# Preview des Production Builds
pnpm preview
```

## Projekt-Struktur

```
├── content/                 # Markdown Content
│   ├── blog/               # Blog-Beiträge
│   └── pages/              # Statische Seiten (Konzept, Impressum)
├── messages/               # i18n Übersetzungen
│   ├── de.json            # Deutsch
│   └── en.json            # Englisch
├── public/                 # Statische Assets
│   ├── hero/              # Hero-Bilder
│   ├── team/              # Team-Fotos
│   └── schulen/           # Schul-Bilder
├── src/
│   ├── components/        # React Komponenten
│   ├── data/              # Team-Daten (JSONL)
│   ├── lib/               # Utility-Funktionen
│   └── routes/            # TanStack Router Routes
└── package.json
```

## Features

### Implementiert

✅ Moderne, professionelle Designsprache  
✅ Mehrsprachigkeit (DE/EN)  
✅ Responsive Design für alle Geräte  
✅ SEO-optimiert  
✅ Statically Generated (SSG)  
✅ Team-Vorstellung mit individuellen Profilen  
✅ Blog-System mit Markdown  
✅ Countdown bis zur Veranstaltung  
✅ FAQ-Bereich  
✅ Partner & Unterstützer Sektion  

### Routen

- `/` - Homepage mit Hero, Countdown, Features
- `/konzept` - Detailliertes Konzept (aus Markdown)
- `/team` - Team-Übersicht
- `/team/[vorname]` - Individuelle Team-Profile
- `/traeger` - Träger & Unterstützer
- `/blog` - Blog-Übersicht
- `/blog/[slug]` - Einzelne Blog-Posts
- `/impressum` - Impressum (aus Markdown)

## Content Management

### Team-Mitglieder

Team-Daten werden in `src/data/team.jsonl` gespeichert (JSONL-Format):

```jsonl
{"vorname":"Name","nachname":"Nachname","schule":"VLG","rolle":"Leitung","email":"name@ewf-stade.de","bio":"Bio Text...","social":{"instagram":"","linkedin":""},"picture_profile":"/team/name_profile.png","picture_banner":"/team/name_banner.png"}
```

### Blog-Posts

Blog-Posts werden als Markdown-Dateien in `content/blog/` gespeichert:

```markdown
---
title: Titel des Beitrags
description: Kurzbeschreibung
date: 2026-02-15
author: Autor Name
---

# Inhalt

Markdown-Content hier...
```

### Statische Seiten

Seiten wie Konzept und Impressum werden in `content/pages/` als Markdown gespeichert.

## Bilder

Siehe `public/README.md` für Details zu benötigten Bildern und deren Formaten.

## Analytics (Optional)

PostHog Analytics kann optional aktiviert werden:

1. `.env.example` zu `.env` kopieren
2. PostHog API Key eintragen
3. Die Website trackt automatisch Pageviews

## Deployment

### Vercel (Empfohlen)

```bash
# Mit Vercel CLI
vercel

# Oder über GitHub Integration
# Push to main branch → automatisches Deployment
```

### Andere Static Hosts

```bash
# Build erstellen
pnpm build

# Output Ordner (.output/public) hochladen
```

## Entwicklung

### Lokale Entwicklung

```bash
pnpm dev
```

Server läuft auf `http://localhost:3000`

### Neue Seiten hinzufügen

TanStack Start nutzt file-based routing. Neue Dateien in `src/routes/` werden automatisch zu Routes.

### Neue Übersetzungen

Strings in `messages/de.json` und `messages/en.json` hinzufügen, dann mit `m.key()` importieren.

## Kontakt

**E-Mail:** info@ewf-stade.de  
**Team:** team@ewf-stade.de

**Postanschrift:**  
Erstwähler Forum'26  
z. Hd. Jack Ruder  
Harsefelder Straße 40  
21680 Stade

## Lizenz

Dieses Projekt wurde für das Erstwähler Forum 2026 entwickelt.

---

**Ein Projekt von Schülerinnen und Schülern für Schülerinnen und Schüler.**
