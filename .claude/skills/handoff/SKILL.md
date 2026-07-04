---
name: handoff
description: "Generate a self-contained context pass-off / handoff document that summarizes everything done in the CURRENT conversation so the work can be continued in a fresh Claude chat with zero context loss. Use when a chat is getting long or context-heavy and output quality is starting to degrade (context rot), when you want to clear context and continue elsewhere, or when the user says 'hand this off', 'pass this off', 'pass-off', 'continuation prompt', 'summarize where we are so I can continue in a new chat', or 'I'm getting context-heavy'."
argument-hint: "[optional focus note, e.g. 'focus on the billing work']"
allowed-tools: Bash, Read, Write
user-invocable: true
triggers:
  - handoff
  - hand this off
  - pass off
  - pass-off
  - passoff
  - continuation prompt
  - continue in a new chat
  - context handoff
  - context is getting heavy
  - clear context and continue
  - summarize where we are
---

# Handoff — Context Pass-Off Generator

Generate a **self-contained handoff document** from the current conversation so the user can paste it into a brand-new Claude chat and continue the work seamlessly — without the fresh chat needing to re-ask anything already settled.

The core problem this solves: long chats accumulate context and output quality degrades ("context rot"). Rather than waiting for auto-compact, the user runs this to produce a clean, dense pass-off, then starts fresh.

## The one rule that matters most

This is a **summarization-from-transcript task, NOT a generation task.** Build the handoff **only** from what actually happened in this conversation. Walk the transcript from the first user message to now and extract real facts:

- the stated goal, in the user's own words where possible
- every file you actually read or edited — use the **real absolute paths** from your tool calls
- every decision made and the reason given **at the time**, plus anything that was tried and rejected
- everything the user explicitly asked for or vetoed
- anything that failed, surprised you, or had to be worked around

**Do not invent progress, file paths, decisions, or commands.** If something a section asks for never came up, write "Not specified" or "None" — never fabricate a plausible-sounding entry. Ground every "completed" claim in a real tool action from this conversation; if you can't point to the edit/command that produced it, don't claim it's done. Where you're inferring intent rather than being told, prefix it with "(inferred)" so the new chat knows to confirm.

If the user passed a focus note as an argument, weight the document toward that thread of work — but still capture the rest briefly so nothing is silently dropped.

## Workflow

1. **Review the conversation.** Re-read the whole transcript in your context, oldest to newest. Note the goal, the arc of work, every file/path/resource, every decision + rationale, dead ends, gotchas, and the exact current state.

2. **Fill the template** (below) using only grounded facts. Be maximally concrete: absolute paths, real function/command/env-var/branch names, never "the config file." State locked-in decisions as settled ("We are using X"), not as open options.

3. **Print the document to chat as a single fenced code block** so the user can select-all → copy in one move. This is the primary deliverable — put it at the very end of your message so it's the easiest thing to grab.

4. **Silently save a copy to a file** (don't ask permission first — this happens under time pressure). Save to `.handoffs/handoff-<timestamp>.md` under the current project root, falling back to `~/.claude/handoffs/` if there's no clear project. Get the timestamp with `date "+%Y-%m-%d-%H%M"`. Create the directory if needed.

5. **After the code block**, add one short line with the saved file path. Nothing else below the block.

Note on output format: the user's global preference for .docx/PDF deliverables does **not** apply here — a handoff is meant to be pasted into Claude, so markdown is correct. Do not "correct" this to a document file.

## The template

Emit exactly this structure. Front-load the actionable parts (TL;DR + Next Step) because the reader is a fresh Claude that may start acting before it finishes reading. Order is reader-first, not chronological. Drop a section's content to "None" rather than padding it.

````
# CONTEXT HANDOFF — <project/task name> — <date/time>

## TL;DR
<3-5 lines: what we're building, where we are, and the single next action.>

## 1. GOAL & INTENT
- End goal: <the overall objective, in the user's words>
- Why it matters: <motivation / business context, if stated>
- Current sub-task: <the narrower thing in progress right now>

## 2. CURRENT STATE
- Working: <what's done and verified>
- In progress / half-built: <what's partial>
- Broken / untested: <what NOT to trust yet>
- Repo state: <branch, clean/uncommitted, builds?/runs? — only if relevant>

## 3. WORK COMPLETED
- <concrete item tied to a real artifact, e.g. "Created /abs/path/file.ts — does X">
- <...>

## 4. KEY DECISIONS (locked in — do not relitigate)
- Decision: <X>. Why: <reason given at the time>. Rejected: <alternative + why not>.
- <...>

## 5. FILES, PATHS & RESOURCES
| Path / resource | Role |
|---|---|
| /abs/path/... | <one-liner> |
| env: VAR_NAME | <what it's for> |
| <url / deploy / db / branch> | <what it is> |

## 6. IMMEDIATE NEXT STEP
<The exact next action — name the file, the function, the change. If there's a
command to run, write it verbatim in a code block.>

## 7. OPEN QUESTIONS & BLOCKERS
- Needs user input: <question the new chat IS allowed to ask>
- Needs investigation: <genuine unknown>
- (None, if none)

## 8. GOTCHAS, CONSTRAINTS & PREFERENCES
- <tooling quirk / version pin / thing that broke before>
- <standing user preference relevant to this work>

## 9. DO NOT
- Do NOT <forbidden action / rejected path / known trap>.
- <...>

## 10. HOW TO RESUME
You are picking up this work mid-stream with no prior context. Read this whole
document, restate the next step in one sentence to confirm understanding, then
proceed. Do not re-ask anything already answered above — only raise items listed
in section 7.
````

## Why these sections (so you fill them well)

- **TL;DR + Section 6** are the whole point — a vague next step forces the new chat to re-plan and re-ask. Make the next action runnable on the first response.
- **Section 4 (decisions + rejected alternatives)** and **Section 9 (Do NOT)** are the highest-leverage, most-overlooked parts. Without the *why*, a fresh Claude's default helpfulness makes it re-suggest the exact thing you already rejected. Stating prohibitions explicitly is far more reliable than hoping it infers them.
- **Section 7** scopes what the new chat is allowed to ask, which is the inverse of everything settled above. This boundary is what kills redundant questions.
