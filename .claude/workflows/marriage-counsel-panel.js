export const meta = {
  name: 'marriage-counsel-panel',
  description: 'Multi-voice biblical + psychological counsel on a marriage frustration the user shares',
  whenToUse: 'When a spouse pastes a frustration/situation and wants honest, multi-sided, scripturally-grounded counsel — not one-sided positivity.',
  phases: [
    { title: 'Reflect' },
    { title: 'Perspectives' },
    { title: 'Synthesize' },
  ],
}

// The situation is passed in as `args` (a plain string). Fallback keeps the
// script runnable for testing.
const SITUATION = (typeof args === 'string' && args.trim())
  ? args.trim()
  : (args && args.situation ? String(args.situation) : '(no situation provided)')

const SPEAKER = (args && args.speaker) ? String(args.speaker) : 'the person sharing'

const FRAME = `You are part of a private marriage-counseling panel. A real married person (${SPEAKER}) has
shared a real, raw frustration about their spouse. This is genuine, not a hypothetical. Treat them and their
spouse with dignity. Be honest and substantive — they explicitly asked NOT to receive shallow, one-sided
positivity. Do not flatter and do not pile on. Aim for the depth of a seasoned counselor who has heard
thousands of these. Stay concrete to what they actually said.

Here is exactly what they shared:
"""
${SITUATION}
"""
`

phase('Reflect')
const reflection = await agent(
  FRAME + `
YOUR ROLE — "The Mirror": Do not give advice yet. Reflect back what this person is carrying, in warm,
specific language, so they feel truly heard. Name the underlying feelings (exhaustion, resentment, feeling
unseen, fear, longing to be a good husband, loneliness, the weight of provision). Name the legitimate parts
of their frustration without endorsing every conclusion. 200-300 words. Speak TO them ("you").`,
  { label: 'mirror', phase: 'Reflect' }
)

phase('Perspectives')
const VOICES = [
  {
    key: 'brother',
    label: 'male-voice',
    prompt: `YOUR ROLE — "The Brother / Male Voice": You are a wise, godly older man who has been married 25+
years and raised kids. Speak man-to-man, plainly and with respect. Validate the real weight he carries
(provision, feeling like he has 'two jobs', wanting order, wanting to be wanted). THEN give him the honest
brother talk: about leadership that serves rather than scorekeeps, about what it means to cover and cherish a
wife who is depleted, about laying down the ledger. Be direct but for him, not against his wife. 250-350 words.`,
  },
  {
    key: 'psych',
    label: 'female-psych',
    prompt: `YOUR ROLE — "The Female Psychological Lens": You are a licensed clinical psychologist specializing
in perinatal/postpartum mental health and couples. Explain what is very likely happening for BOTH parties.
For her: 10 months postpartum from back-to-back pregnancies, caring for a toddler and an infant, an immigrant
still acquiring English far from her support network — cover postpartum depletion, possible postpartum
depression/anxiety, matrescence, the invisible "mental load," sleep deprivation, executive-function overload
(why she starts tasks but can't finish — this is depletion, not character), and why second-language speakers
process criticism more harshly emotionally. For him: feeling unseen, mental-load asymmetry he can't see,
the touch/feedback loop. Be clinical, fair, and compassionate to both. 300-400 words.`,
  },
  {
    key: 'biblical',
    label: 'biblical-counselor',
    prompt: `YOUR ROLE — "The Biblical Counselor": You are a seasoned biblical counselor (20+ years) with real
exegetical care. Quote Scripture ACCURATELY (ESV) with references; never invent or paraphrase as if quoting.
Speak in a grace-based register (the questioner mentioned Dan Mohler) — sonship and love, not law and shame.
Center: Ephesians 5:25-29 (husbands love as Christ loved the church, sacrificially, nourishing and cherishing),
Philippians 2:3-4 (count others more significant), 1 Corinthians 13:4-7 (love is patient, keeps no record of
wrongs), 1 Peter 3:7 (live with your wife in an understanding way), Galatians 6:2 (bear one another's burdens).
Gently confront the record-keeping and the 'her job vs my job' framing, while honoring his real exhaustion.
Point him toward Christ as the source, not white-knuckled effort. 300-400 words.`,
  },
  {
    key: 'research',
    label: 'deep-study',
    prompt: `YOUR ROLE — "Deep Study": Provide an evidence-based briefing on the relevant realities. Cover:
postpartum physical recovery timelines and the real depletion of back-to-back pregnancies (nutrient/iron
depletion, the ~18-24 month recovery); chronic sleep deprivation's documented effects on motivation,
emotional regulation, and task initiation; the research on maternal "mental load" / cognitive labor
asymmetry; task-initiation and follow-through under stress (and how it mimics but isn't laziness); the
emotional toll of parenting in a second language and social isolation for immigrant mothers; and Gottman's
research on contempt/criticism vs. fondness. Keep it factual and cite the kind of evidence. 300-400 words.`,
  },
  {
    key: 'blunt',
    label: 'blunt-critic',
    prompt: `YOUR ROLE — "The Blunt Friend / Critic": Your job is the loving gut-check he asked for — the one
that says "you're whining too much." Be blunt but not cruel, and aim it at HIM, never at his wife. Call out:
the scorekeeping ledger, the "I don't need a break / she does" framing, the contempt creeping into how he
describes her ("she's absolutely terrible at that"), the way he measures her against his mom and sister, the
entitlement in "I have two jobs and she has none," and treating her exhaustion as a performance problem. Name
where he is right too — briefly. Then tell him the hard truth about where this road leads if he keeps it up.
200-300 words.`,
  },
  {
    key: 'beneath',
    label: 'beneath-the-surface',
    prompt: `YOUR ROLE — "Beneath the Surface": Go past the dishes and the laundry to what this conflict is
ACTUALLY about for each of them. What is the real need underneath his frustration (to feel respected, that his
labor is seen, that he isn't alone, that someone partners with him)? What is the real need underneath her
behavior (to feel safe, cherished, not failing, allowed to be human, rescued rather than managed)? Surface the
core dynamic — e.g. a man who copes by doing/fixing married to a woman who is drowning and needs to be held,
each reading the other's coping as rejection. Show him the pattern he can't see from inside it. 250-350 words.`,
  },
]

const perspectives = await parallel(
  VOICES.map(v => () =>
    agent(FRAME + '\n' + v.prompt, { label: v.label, phase: 'Perspectives' })
      .then(text => ({ key: v.key, label: v.label, text }))
  )
)

const valid = perspectives.filter(Boolean)
const panelText = valid.map(p => `### ${p.label}\n${p.text}`).join('\n\n')

phase('Synthesize')
const synthesis = await agent(
  FRAME + `
You are the lead counselor (20+ years, biblical and psychologically wise) closing this session. Below are the
reflections of your panel. Integrate them into ONE warm, honest, human response spoken directly to him.

PANEL — The Mirror:
${reflection}

PANEL — Perspectives:
${panelText}

Write the synthesis with this shape (use light headers, not robotic ones):
1. "What I hear you saying" — 2-3 sentences that make him feel genuinely heard.
2. "Where you're right" — name the legitimate parts of his frustration honestly.
3. "What you're getting wrong / can't see" — the hard, loving truth (mental load, her postpartum reality,
   the scorekeeping, contempt). Be direct; he asked for it.
4. "What's realistic to expect right now" — answer his literal question about a woman 10 months postpartum
   from back-to-back pregnancies, parenting two littles in her second language.
5. "About tomorrow" — concrete guidance on her request for Saturday + Sunday fully off, and how to actually
   show up.
6. "Direction — 3 to 5 things to actually do this week" — concrete, doable steps (systems + heart), including
   one or two things to literally say to her.
7. "An anchor" — one or two accurately-quoted Scriptures (ESV, with reference) to carry, framed in grace.

Be the counselor with 20 years of experience who says "I hear you" AND tells him the truth. ~700-900 words.`,
  { label: 'synthesis', phase: 'Synthesize', effort: 'high' }
)

return { reflection, perspectives: valid, synthesis }
