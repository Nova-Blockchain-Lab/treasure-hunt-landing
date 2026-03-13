# CRO Roadmap — Treasure Hunt Landing Page

> Data da auditoria: 2026-03-12
> Pagina: treasurehunt.pt
> Objetivo: Book a Demo (B2B event organizers)

---

## Estado Atual

A landing page esta bem construida visualmente — dark SaaS design, boa hierarquia de seccoes, i18n, responsive. O problema nao e estetico, e **estrutural para conversao**: o hero nao comunica o produto, o CTA principal abre mailto, e falta prova social no topo do funil.

---

## Fase 1 — Quick Wins (1-2 dias)

Mudancas simples, alto impacto, sem reestruturacao.

### 1.1 Headline real no Hero

**Problema:** O hero mostra apenas o logo (imagem). O `<h1>` esta `sr-only`. Um visitante novo nao percebe o que o produto faz em 5 segundos.

**Solucao:** Adicionar uma headline visivel abaixo do logo.

```
Ficheiros: components/hero-section.tsx, dictionaries/en.json, dictionaries/pt.json
```

Opcoes de headline (testar):
- **A** — "Turn Any Event Into a Game Attendees Can't Stop Playing"
- **B** — "207 Players. 59 Checkpoints. Zero App Downloads."
- **C** — "The Engagement Platform for Physical Events"

Implementacao:
1. Adicionar campo `headline` e `headlineHighlight` ao `HeroDict`
2. Renderizar um `<h1>` visivel com o mesmo estilo dos outros section headings
3. Mover o `sr-only` title para um `<span>` dentro do novo h1

### 1.2 Trust badge no Hero

**Problema:** A prova social (stats, logos) so aparece depois da Demo section — demasiado tarde.

**Solucao:** Adicionar uma linha compacta de social proof abaixo do tagline no hero.

```
Ficheiros: components/hero-section.tsx, dictionaries/en.json, dictionaries/pt.json
```

Exemplo:
```
Deployed at ETHDenver 2026 — 207 players · 59 checkpoints · 4 days
```

Implementacao:
1. Adicionar campo `trustBadge` ao `HeroDict`
2. Renderizar como `<p>` mono font, cor `#484F58`, entre tagline e CTAs

### 1.3 CTA copy mais orientado a valor

**Problema:** "Book a Demo" e generico. "See It Live at ETHDenver" confunde — envia para a app, nao uma demo.

**Solucao:**
- Primario: "Plan Your Event" ou "See How It Works for You"
- Secundario: "Try the Live Demo" (mais claro sobre o que vao encontrar)

```
Ficheiros: dictionaries/en.json, dictionaries/pt.json
```

---

## Fase 2 — High Impact (3-5 dias)

Mudancas que requerem mais trabalho mas transformam a conversao.

### 2.1 Substituir mailto por formulario/Calendly

**Problema:** `mailto:` e a maior fonte de friccao. Muitos utilizadores nao tem email client configurado no browser. Em mobile, abre a app de email e perde-se o contexto.

**Solucao elegante (por ordem de preferencia):**

**Opcao A — Calendly embed (recomendado)**
- Menor esforco, melhor UX
- Inline embed ou popup via Calendly JS SDK
- Nao precisa de backend

```
Ficheiros: components/calendly-modal.tsx (novo), components/hero-section.tsx, components/cta-section.tsx
Dependencias: nenhuma (script tag do Calendly)
```

**Opcao B — Formulario simples com Formspree/Resend**
- 3 campos: Nome, Email, Tamanho do evento (dropdown)
- Submit envia para webhook/email
- Confirma inline com mensagem de sucesso

```
Ficheiros: components/contact-form.tsx (novo), app/api/contact/route.ts (novo)
Dependencias: resend ou formspree
```

**Opcao C — Google Forms embed (minimo esforco)**
- Embed um Google Form num modal
- Menos elegante mas funcional

### 2.2 Reordenar seccoes

**Problema:** A Demo (screenshots) aparece antes de explicar o que o produto faz. Visitantes frios veem screenshots sem contexto.

**Ordem atual:**
```
Hero > Marquee > Demo > Social Proof > Features > How It Works > Use Cases > Testimonials > Packages > CTA
```

**Ordem proposta:**
```
Hero > Social Proof > Features > Demo > How It Works > Testimonials > Use Cases > Packages > CTA
```

Logica:
1. **Hero** — O que e + CTA
2. **Social Proof** — Quem ja usa (credibilidade imediata)
3. **Features** — O que faz por ti
4. **Demo** — Prova visual (agora com contexto)
5. **How It Works** — Como funciona
6. **Testimonials** — O que dizem (reforco apos ver o produto)
7. **Use Cases** — Para quem e
8. **Packages** — Quanto custa
9. **CTA** — Decisao final

```
Ficheiro: app/[lang]/page.tsx
```

Impacto: Apenas reordenar componentes no JSX. Zero mudancas em componentes individuais.

### 2.3 Adicionar FAQ section

**Problema:** Objeccoes comuns ficam sem resposta — preco, tempo de setup, requisitos tecnicos.

**Solucao:** Nova seccao FAQ com accordion, entre Packages e CTA.

```
Ficheiros: components/faq-section.tsx (novo), dictionaries/en.json, dictionaries/pt.json, app/[lang]/page.tsx
```

Perguntas sugeridas:
1. "How long does it take to set up?" — Deploys in 1-3 days depending on package
2. "Do attendees need to download an app?" — No, works in any phone browser
3. "What if our venue doesn't have NFC?" — QR codes work as fallback everywhere
4. "Can we customize the branding?" — Yes, Pro and Enterprise include full white-label
5. "What data do organizers get?" — Real-time dashboard with checkpoint visits, engagement metrics, heatmaps
6. "Is there a minimum event size?" — Starter works from 50 attendees

---

## Fase 3 — Refinamentos (1-2 semanas)

### 3.1 Packages com indicacao de preco

Adicionar pelo menos ranges ou ancoras de preco:
- Starter: "Free" ou "From $X/event"
- Pro: "From $X/event"
- Enterprise: "Custom pricing"

### 3.2 Mais testimonials

O testimonial da NOVA Blockchain Lab (propria equipa) enfraquece a seccao. Substituir por:
- Outro organizador de evento
- Um sponsor que beneficiou do foot traffic
- Um participante com quote memoravel

### 3.3 Video/GIF no hero ou Demo

Um video de 15-30s mostrando a experiencia do jogador (scan > reward > leaderboard) vale mais que screenshots estaticos.

### 3.4 Packages alinhamento

A seccao Packages usa `text-center` + `justify-center` enquanto todas as outras seccoes usam left-aligned. Alinhar para consistencia visual.

```
Ficheiro: components/packages-section.tsx
```

---

## Metricas a Monitorizar

| Metrica | Baseline | Target |
|---------|----------|--------|
| Bounce rate (hero) | Medir | -20% |
| Scroll depth (% que chega a CTA) | Medir | +30% |
| CTA click rate (Book a Demo) | Medir | +50% |
| Demo requests/semana | Medir | 2x |

**Setup recomendado:** Vercel Analytics (ja instalado) + PostHog ou Plausible para eventos custom.

---

## Ordem de Execucao Recomendada

```
1. [Fase 1.1] Headline no hero          — 30 min
2. [Fase 1.2] Trust badge no hero       — 15 min
3. [Fase 1.3] CTA copy                  — 10 min
4. [Fase 2.2] Reordenar seccoes         — 10 min
5. [Fase 2.1] Calendly/formulario       — 2-3 horas
6. [Fase 2.3] FAQ section               — 1-2 horas
7. [Fase 3.4] Packages alinhamento      — 15 min
8. [Fase 3.1] Precos nos packages       — 30 min
9. [Fase 3.2] Mais testimonials         — depende de conteudo
10. [Fase 3.3] Video                    — depende de producao
```

Total estimado para Fase 1+2: **~1 dia de trabalho**
