import { NextResponse } from "next/server";
import { VEHICLES } from "@/app/garage/lib/vehicles";
import type { Vehicle, VehicleCategory } from "@/app/garage/lib/types";

// Category templates used to synthesize a starting estimate when a vehicle is
// not in the curated database. These are deliberately conservative, editable
// starting points — the UI prompts the user to verify them.
const TEMPLATES: Record<VehicleCategory, Omit<Vehicle, "id" | "make" | "model" | "years">> = {
  Minivan: {
    category: "Minivan", rows: 3, cargoWidth: 48, cargoHeight: 35,
    lengthBehindLastRow: 20, lengthThirdFolded: 42, lengthAllRearFolded: 84,
    secondRowWidth: 62, secondRowSeats: 2, secondRowLegroomMax: 40, secondRowLegroomMin: 28,
    estimated: true,
  },
  "3-Row SUV": {
    category: "3-Row SUV", rows: 3, cargoWidth: 44, cargoHeight: 33,
    lengthBehindLastRow: 18, lengthThirdFolded: 37, lengthAllRearFolded: 74,
    secondRowWidth: 59, secondRowSeats: 3, secondRowLegroomMax: 40, secondRowLegroomMin: 28,
    estimated: true,
  },
  "2-Row SUV": {
    category: "2-Row SUV", rows: 2, cargoWidth: 41, cargoHeight: 32,
    lengthBehindLastRow: 37, lengthThirdFolded: 70, lengthAllRearFolded: 70,
    secondRowWidth: 54, secondRowSeats: 3, secondRowLegroomMax: 39, secondRowLegroomMin: 27,
    estimated: true,
  },
  Sedan: {
    category: "Sedan", rows: 2, cargoWidth: 42, cargoHeight: 18,
    lengthBehindLastRow: 42, lengthThirdFolded: 60, lengthAllRearFolded: 60,
    secondRowWidth: 54, secondRowSeats: 3, secondRowLegroomMax: 38, secondRowLegroomMin: 27,
    estimated: true,
  },
  Wagon: {
    category: "Wagon", rows: 2, cargoWidth: 42, cargoHeight: 30,
    lengthBehindLastRow: 38, lengthThirdFolded: 72, lengthAllRearFolded: 72,
    secondRowWidth: 54, secondRowSeats: 3, secondRowLegroomMax: 39, secondRowLegroomMin: 27,
    estimated: true,
  },
};

function guessCategory(q: string): VehicleCategory {
  const s = q.toLowerCase();
  if (/(minivan|sienna|odyssey|pacifica|carnival|sedona|caravan|voyager)/.test(s))
    return "Minivan";
  if (
    /(suburban|tahoe|expedition|explorer|telluride|palisade|pilot|highlander|atlas|ascent|traverse|durango|3.?row|7.?seat|8.?seat|grand|max|l\b)/.test(s)
  )
    return "3-Row SUV";
  if (/(suv|crossover|rav4|cr-?v|cx-?5|forester|escape|tucson|sportage|rogue|equinox)/.test(s))
    return "2-Row SUV";
  if (/(wagon|outback|allroad|avant)/.test(s)) return "Wagon";
  if (/(sedan|camry|accord|civic|corolla|altima|sonata|jetta|3-?series)/.test(s))
    return "Sedan";
  return "2-Row SUV";
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export async function POST(req: Request) {
  let query = "";
  try {
    const body = await req.json();
    query = String(body?.query ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!query) return NextResponse.json({ error: "Empty query" }, { status: 400 });

  // 1) Try to match the curated database first (most accurate).
  const q = slug(query);
  const match = VEHICLES.find((v) => {
    const key = slug(`${v.make}${v.model}`);
    return q.includes(slug(v.model)) && (q.includes(slug(v.make)) || q.includes(key));
  });
  if (match) {
    return NextResponse.json({ vehicle: match, matched: true });
  }

  // 2) Otherwise synthesize an estimate from a category template.
  //    (Extension point: this is where a live AI / web-research call would
  //    refine the numbers for the specific make/model/year.)
  const category = guessCategory(query);
  const tmpl = TEMPLATES[category];
  const yearMatch = query.match(/\b(19|20)\d{2}\b/);
  const words = query.replace(/\b(19|20)\d{2}\b/, "").trim().split(/\s+/);
  const make = words[0] ? cap(words[0]) : "Custom";
  const model = words.slice(1).join(" ") ? words.slice(1).map(cap).join(" ") : "Vehicle";

  const vehicle: Vehicle = {
    id: `custom-${slug(query)}`,
    make,
    model,
    years: yearMatch ? yearMatch[0] : "—",
    ...tmpl,
  };

  return NextResponse.json({ vehicle, matched: false });
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
