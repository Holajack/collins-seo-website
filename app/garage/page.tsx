import type { Metadata } from "next";
import Link from "next/link";
import GarageApp from "./GarageApp";

export const metadata: Metadata = {
  title: "Trunk & Cargo Fit Simulator",
  description:
    "Test whether your car seats, strollers, and gear fit a vehicle before you buy. A to-scale 3D simulator with real cargo dimensions, foldable third rows, and sliding front seats.",
  robots: { index: false, follow: false },
};

export default function GaragePage() {
  return (
    <main className="min-h-screen bg-[var(--slate-50)]">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              🚗 Trunk &amp; Cargo Fit Simulator
            </h1>
            <p className="text-xs text-slate-500">
              Will it fit? Test car seats &amp; strollers in a to-scale 3D
              vehicle before you buy.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-semibold text-[#1a6b8a] hover:underline"
          >
            ← Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] p-4">
        <GarageApp />

        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <h2 className="mb-2 font-bold text-slate-800">How to use it</h2>
          <ol className="list-decimal space-y-1 pl-5">
            <li>Pick a vehicle, or type any make/model/year to get an AI estimate.</li>
            <li>
              Choose <strong>Trunk / cargo</strong> to test strollers &amp; gear, or{" "}
              <strong>Back-seat seats</strong> to test car seats with the front
              seat slid forward or back.
            </li>
            <li>
              Add items, then <strong>drag</strong> them to arrange. Use{" "}
              <strong>Rotate</strong> and <strong>Rear/Forward-facing</strong> to
              pack them in. Green = fits, red = doesn&apos;t.
            </li>
            <li>
              Fold the third row up or down, or slide the front seats, to see how
              the space changes.
            </li>
          </ol>
          <p className="mt-3 text-xs text-amber-700">
            Dimensions are best-effort estimates to get you started. Always verify
            against the manufacturer&apos;s spec sheet — every number is editable.
          </p>
        </section>
      </div>
    </main>
  );
}
