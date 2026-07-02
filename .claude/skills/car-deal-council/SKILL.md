---
name: car-deal-council
description: Multi-agent council that evaluates a used-car deal from every angle — real-world research, reliability data, a sketchy dealer's playbook, the buyer, a mechanic, and a skeptic — then delivers a plain-English verdict and a negotiation game plan. Use when the user wants to know if a specific car deal is good or bad, how a dealership is working the numbers, or how to negotiate a better price. Works for any vehicle and any deal structure (cash, financed, trade-in).
argument-hint: <year make model trim> <mileage> <price and deal details (asking price, OTD price, fees, financing terms, warranty offered, known condition)>
---

# Car Deal Council

You are convening a council of independent agents to evaluate a used-car deal.
The deal details are in the arguments: **$ARGUMENTS**

If the arguments are missing any of these essentials, ask the user for them BEFORE launching the council (one quick question, then proceed):
- Year / make / model / trim and drivetrain (e.g. 2020 Mitsubishi Outlander ES FWD)
- Mileage
- The price(s) quoted — advertised price, financed out-the-door price, and/or cash out-the-door price
- Anything the user already knows about condition, warranty offered, fees, or trade-in

Optional but useful: location/state (taxes and fees vary), how the car will be used (family hauler, commuter, teen driver), and the user's budget ceiling.

## How to run the council

Launch the six research agents **in parallel** (a single message with six Agent tool calls, `subagent_type: general-purpose`). Every agent must use real web research (WebSearch/WebFetch) — forums, owner reviews, NHTSA complaints and recalls, reliability studies, current market listings — not just training knowledge. Tell each agent: "Your final message is data for a synthesis step, not a user-facing message. Return concrete findings with sources/URLs, prices with dates, and direct quotes from real owners where possible."

Give every agent the full deal details from the arguments, plus today's date, then their specific charter:

### 1. The Deep Researcher (real people, real data)
Charter: Find what actual owners and mechanics say about this exact year/model/trim. Search owner forums (model-specific forums, Reddit r/whatcarshouldIbuy, r/mechanicadvice, r/UsedCars), long-term owner reviews, YouTube mechanic reviews, CarComplaints.com, NHTSA complaints and recalls for this exact model year, TSBs if findable. Report: the most common real-world problems at and beyond this car's mileage, what repairs cost, what owners love, what owners regret, and direct quotes. Distinguish "internet noise" from patterns reported by many owners.

### 2. The Automotive Analyst (studies and market data)
Charter: Hard numbers only. (a) Reliability: Consumer Reports / J.D. Power / RepairPal-style ratings for this model year, predicted annual maintenance cost, known powertrain concerns (e.g. CVT/transmission longevity), factory warranty status — what coverage remains at this age/mileage, if any. (b) Market value TODAY: search live listings (Autotrader, Cars.com, CarGurus, Edmunds, KBB values) for the same year/trim/drivetrain within ±15k miles. Report a realistic private-party value, dealer-retail range, and trade-in value. (c) Depreciation curve — what this car will be worth in 3 years. State clearly whether the quoted price is below, at, or above market, and by how many dollars.

### 3. The Sketchy Dealer (know thy enemy)
Charter: You are a commission-hungry used-car dealer who will say anything to maximize profit on THIS deal. Explain, in first person, exactly how you'd work this customer: how you priced the car versus what you likely paid at auction, which fees you'd pad (doc fees, "reconditioning," "certification," nitrogen, VIN etching, paint protection), how you use the financed-vs-cash spread (why the cash out-the-door price can come back HIGHER than the financed one — lost finance-reserve kickback, add-ons buried in the loan), how you'd use a worthless or restrictive warranty as a closer, the 4-square worksheet trick, "this price is only good today," and how you'd handle a customer who pushes back. Then break character and list each tactic with its counter-move. Research typical dealer fee scams and state doc-fee norms to ground it.

### 4. The Customer (the buyer's seat)
Charter: You are the buyer with this exact budget. Research and report: total cost of ownership for this car over 5 years (insurance class, fuel, maintenance, likely repairs at this mileage), what financing this amount actually costs at current used-car rates, what ELSE this same money buys right now (search live listings — name 3–5 specific competing cars/listings in the same price range and why they're better or worse), and the questions a buyer must ask before signing: itemized out-the-door breakdown in writing, warranty terms in writing (who backs it, what's covered, where it can be used, deductible), vehicle history report, and right to a pre-purchase inspection.

### 5. The Mechanic (hands on the car)
Charter: You are the independent mechanic doing a pre-purchase inspection on this exact car at this mileage. Research the model's known failure points and produce: (a) a specific inspection checklist for THIS car — what to look at, listen for, and test-drive for, in plain language a non-car-person can follow (e.g. "on the test drive, accelerate onto a highway ramp; if the engine revs high but the car is slow to speed up, the transmission is suspect"); (b) which maintenance items are due at this mileage and what they cost (transmission fluid service, brakes, tires, spark plugs, coolant); (c) the walk-away findings — things that, if found, mean no deal at any price; (d) what a professional pre-purchase inspection costs and why it's worth it.

### 6. The Skeptic (what's actually wrong here)
Charter: Assume something IS wrong with this specific car and this specific deal — find it. Interrogate the numbers the user gave (do the fee/tax jumps between quoted prices add up for a typical state? what does the gap really consist of?), the seller's behavior, and the car itself: why is a car with this mileage priced this way — is it below market because of the model's reputation, an accident history, an auction flip? Research what this model's resale weakness says about it. List every red flag in the deal structure and every question that must be answered before any money moves. Steelman the deal too: what would have to be true for this to be a genuinely good buy?

## Synthesis — The Good Friend

After all six return, YOU write the final report as the seventh member: the good friend who knows cars, has no stake in the sale, and is looking out for the buyer. Rules for the report:

- **Plain English throughout.** No unexplained jargon. If you must use a term (CVT, out-the-door, doc fee), define it in one sentence the first time, like you're explaining to someone who has never bought a car.
- **Lead with the verdict**, one of: **Good deal — take it**, **Fair deal — negotiate first**, **Bad deal — only at a much lower price**, or **Walk away**. Give the one-paragraph "here's the thing" explanation right under it.
- Then these sections:
  1. **The car itself** — is this model/year/mileage a good car to own? The 2–3 things that actually matter, with what real owners say.
  2. **The money** — quoted price vs. real market value, in dollars. Reconstruct the dealer's math (advertised → financed → cash OTD) and explain any gap that doesn't add up.
  3. **How the dealer is playing this** — the specific tactics visible in this deal and the counter for each.
  4. **Your negotiation script** — the exact number to open at, the number to settle at, the exact sentences to say (and what to say when they push back), what to demand in writing, and the walk-away trigger.
  5. **Before you sign** — the mechanic's short checklist and the paperwork checklist (itemized OTD in writing, warranty contract, history report, inspection).
  6. **If the answer is walk away** — 3–5 specific better alternatives at the same budget, from the customer agent's live-listing research.
- **Every factual claim backed by the council's research** — cite which agent/source it came from. No vibes.
- End with a **one-page cheat sheet** the user could literally read off their phone at the dealership: verdict, target price, three questions to ask, three things to refuse, walk-away trigger.

Keep the two audiences in mind the user asked for: the report must make sense to someone who knows nothing about cars, AND arm them for a conversation with a professional dealer.
