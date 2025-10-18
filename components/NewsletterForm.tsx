"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [phone, setPhone] = useState(""); // optional: stored nowhere by Mailchimp unless you add a merge field
  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    try {
      const res = await fetch("/.netlify/functions/mc-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fname,
          // lname: "", // add if you add a field
          tags: ["Website", "Footer"], // nice for Mailchimp segmentation
        }),
      });

      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      setMsg("You're in! Check your inbox.");
      setEmail("");
      setFname("");
      setPhone("");
    } catch {
      setStatus("error");
      setMsg("Sorry—something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="First name (optional)"
        value={fname}
        onChange={(e) => setFname(e.target.value)}
        className="w-full px-3 py-2 rounded border text-black"
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-3 py-2 rounded border text-black"
      />
      <input
        type="text"
        placeholder="Phone Number (Optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full px-3 py-2 rounded border text-black"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-white text-cucumber-700 font-semibold py-2 rounded hover:bg-gray-100 disabled:opacity-60"
      >
        {status === "loading" ? "Joining…" : "SIGN UP"}
      </button>

      {msg && (
        <p className={`text-sm ${status === "ok" ? "text-white" : "text-red-200"}`}>
          {msg}
        </p>
      )}
    </form>
  );
}