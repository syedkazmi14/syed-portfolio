"use client";

import { useState } from "react";

/**
 * The name in the hero, which flips between Latin and Urdu on click.
 *
 * The Urdu is set in Amiri rather than a Nastaliq face. Nastaliq is the
 * traditional hand for Urdu, but it is written down a steep diagonal — letters
 * climb onto the shoulder of the one before — so it sets about half the width
 * of the Latin and wants twice the line-height. Beside Young Serif it reads as
 * compressed. Amiri is Naskh: horizontal, flat-baselined, and close enough in
 * colour to sit in the same headline. This was a deliberate trade, not a
 * default — see AGENTS.md.
 *
 * Amiri ships as a 9KB subset carrying only the eight characters this string
 * needs, so the fourth typeface costs almost nothing.
 *
 * The parent pins the line height, so flipping never moves the line below.
 */
export function NameToggle({ name, urdu }: { name: string; urdu: string }) {
  const [showUrdu, setShowUrdu] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setShowUrdu((v) => !v)}
      aria-pressed={showUrdu}
      className="rounded-sm text-green transition-colors hover:text-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green"
    >
      {showUrdu ? (
        <span lang="ur" dir="rtl" className="font-urdu text-[1.3em] leading-[1.1]">
          {urdu}
        </span>
      ) : (
        name
      )}
      {/*
        The visible text is the accessible name, which is what it should be —
        and in the Urdu state `lang="ur"` lets a screen reader that speaks Urdu
        pronounce it properly. But that leaves an English-only reader on a
        button labelled in a script they cannot read, with no idea what
        pressing it does, so the action is spelled out here.
      */}
      <span className="sr-only">
        {showUrdu ? ". Show my name in English." : ". Show my name in Urdu."}
      </span>
    </button>
  );
}
