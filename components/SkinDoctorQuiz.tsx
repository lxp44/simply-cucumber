// components/SkinDoctorQuiz.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "../lib/products";
import AddToCartButton from "./AddToCartButton"; // uses your CartProvider

type Answers = {
  gender: "female" | "male" | "nonbinary" | "prefer-not";
  skinType: "dry" | "normal" | "combination" | "oily";
  concerns: Array<
    | "acne"
    | "dark-spots"
    | "dullness"
    | "redness"
    | "fine-lines"
    | "sensitivity"
  >;
  fragrance: "no" | "light" | "either";
  exfoliate: "rarely" | "weekly" | "often";
  budget: "value" | "balanced" | "premium";
};

const defaultAnswers: Answers = {
  gender: "prefer-not",
  skinType: "normal",
  concerns: [],
  fragrance: "either",
  exfoliate: "weekly",
  budget: "balanced",
};

const steps = ["About you", "Your skin", "Preferences"];

export default function SkinDoctorQuiz() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(defaultAnswers);
  const [submitted, setSubmitted] = useState(false);

  const toggleConcern = (c: Answers["concerns"][number]) =>
    setA((s) => ({
      ...s,
      concerns: s.concerns.includes(c)
        ? s.concerns.filter((x) => x !== c)
        : [...s.concerns, c],
    }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStep(steps.length);
  };

  const recs = useMemo(() => getRecommendations(a), [a]);

  return (
    <div className="rounded-xl bg-white/80 backdrop-blur p-5 md:p-7 border">
      <form onSubmit={onSubmit}>
        {/* Progress */}
        {!submitted && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {steps.map((label, i) => (
                <div key={label} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      i <= step ? "bg-cucumber-600" : "bg-gray-200"
                    }`}
                  />
                  <div className="mt-2 text-center">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 0 — About you */}
        {step === 0 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-cucumber-800">
                How do you describe yourself?
              </legend>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  ["female", "Female"],
                  ["male", "Male"],
                  ["nonbinary", "Non-binary"],
                  ["prefer-not", "Prefer not to say"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                      a.gender === val ? "border-cucumber-600" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={val}
                      className="hidden"
                      checked={a.gender === (val as Answers["gender"])}
                      onChange={() =>
                        setA((s) => ({ ...s, gender: val as any }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-between">
              <span />
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded bg-cucumber-600 text-white px-4 py-2"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 1 — Your skin */}
        {step === 1 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-cucumber-800">
                What’s your skin type?
              </legend>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["dry", "normal", "combination", "oily"].map((val) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm capitalize ${
                      a.skinType === val ? "border-cucumber-600" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="skinType"
                      value={val}
                      className="hidden"
                      checked={a.skinType === (val as Answers["skinType"])}
                      onChange={() =>
                        setA((s) => ({ ...s, skinType: val as any }))
                      }
                    />
                    {val}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-cucumber-800">
                Pick your top concerns (any that apply)
              </legend>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  ["acne", "Breakouts / Acne"],
                  ["dark-spots", "Dark Spots"],
                  ["dullness", "Dullness"],
                  ["redness", "Redness"],
                  ["fine-lines", "Fine Lines"],
                  ["sensitivity", "Sensitivity"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                      a.concerns.includes(val as any)
                        ? "border-cucumber-600"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={a.concerns.includes(val as any)}
                      onChange={() => toggleConcern(val as any)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded border px-4 py-2"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded bg-cucumber-600 text-white px-4 py-2"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — Preferences */}
        {step === 2 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="font-medium text-cucumber-800">
                Fragrance preference
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  ["no", "Fragrance-free"],
                  ["light", "Light fragrance"],
                  ["either", "Either"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                      a.fragrance === val ? "border-cucumber-600" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="fragrance"
                      value={val}
                      className="hidden"
                      checked={a.fragrance === (val as any)}
                      onChange={() =>
                        setA((s) => ({ ...s, fragrance: val as any }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-cucumber-800">
                How often do you exfoliate?
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  ["rarely", "Rarely"],
                  ["weekly", "1× / week"],
                  ["often", "2–3× / week"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                      a.exfoliate === val ? "border-cucumber-600" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="exfoliate"
                      value={val}
                      className="hidden"
                      checked={a.exfoliate === (val as any)}
                      onChange={() =>
                        setA((s) => ({ ...s, exfoliate: val as any }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-medium text-cucumber-800">
                Budget comfort
              </legend>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  ["value", "Value"],
                  ["balanced", "Balanced"],
                  ["premium", "Premium"],
                ].map(([val, label]) => (
                  <label
                    key={val}
                    className={`cursor-pointer rounded border px-3 py-2 text-sm ${
                      a.budget === val ? "border-cucumber-600" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="budget"
                      value={val}
                      className="hidden"
                      checked={a.budget === (val as any)}
                      onChange={() =>
                        setA((s) => ({ ...s, budget: val as any }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded border px-4 py-2"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded bg-cucumber-600 text-white px-5 py-2"
              >
                See my routine
              </button>
            </div>
          </div>
        )}
      </form>

      {/* RESULTS */}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-[var(--font-playfair)] text-cucumber-800">
            Your recommended routine
          </h2>
          <p className="text-gray-600 mt-1">
            Curated from Simply Cucumber based on your answers.
          </p>

          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recs.map((p) => (
              <div
                key={p.sku}
                className="rounded-lg border bg-white/70 p-3 hover:shadow transition"
              >
                <Link href={`/products/${p.slug}`} className="block">
                  <div className="relative h-44 rounded overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <h3 className="mt-3 font-medium">
                  <Link href={`/products/${p.slug}`}>{p.title}</Link>
                </h3>
                <p className="text-gray-600">${p.price.toFixed(2)}</p>
                <div className="mt-3">
                  <AddToCartButton sku={p.sku} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/shop"
              className="inline-block rounded border px-5 py-2 hover:bg-white"
            >
              Browse all products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Simple rules engine ---------- */

function getRecommendations(a: Answers) {
  // prefer face categories we actually sell
  const FACE_CATS = [
    "cleansers",
    "toners",
    "serums",
    "moisturizers",
    "masks",
    "face", // if you grouped some here
  ];

  const pick = (arr: any[], n: number) => arr.slice(0, n);

  // base pool = face products
  let pool = PRODUCTS.filter((p) => FACE_CATS.includes(p.category));

  // filter by skin-type leaning
  if (a.skinType === "oily" || a.concerns.includes("acne")) {
    pool = pool.filter(
      (p) =>
        /clean|soap|toner|mist|mask|powder/i.test(p.title) ||
        ["cleansers", "toners", "masks"].includes(p.category)
    );
  }
  if (a.skinType === "dry") {
    pool = pool.filter(
      (p) =>
        /hydr|moist|serum|cream|mist/i.test(p.title) ||
        ["moisturizers", "serums"].includes(p.category)
    );
  }
  if (a.concerns.includes("dullness") || a.exfoliate !== "rarely") {
    pool = pool.filter(
      (p) => /bright|tone|glow|serum|mask/i.test(p.title)
    );
  }
  if (a.concerns.includes("redness") || a.concerns.includes("sensitivity")) {
    pool = pool.filter(
      (p) => /soothe|calm|gentle|mist|toner/i.test(p.title)
    );
  }

  // budget nudge
  const priceSort =
    a.budget === "value"
      ? (x: any, y: any) => x.price - y.price
      : a.budget === "premium"
      ? (x: any, y: any) => y.price - x.price
      : (x: any, y: any) => x.title.localeCompare(y.title);

  pool.sort(priceSort);

  // ensure a routine shape (cleanser → treatment → moisturize → mask)
  const byCat = (cat: string) => pool.filter((p) => p.category === cat);
  const routine = [
    ...pick(byCat("cleansers"), 1),
    ...pick(byCat("toners"), 1),
    ...pick(byCat("serums"), 1),
    ...pick(byCat("moisturizers"), 1),
    ...pick(byCat("masks"), 1),
  ].filter(Boolean);

  // if we couldn't hit all steps, just fall back to top 6 from pool
  const result = routine.length ? routine : pick(pool, 6);

  // final fallback: take any 3 overall
  return result.length ? result : pick(PRODUCTS, 3);
}