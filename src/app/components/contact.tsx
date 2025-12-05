"use client";

import { useState } from "react";
import { Input } from "@/ui/Input";
import { TextArea } from "@/ui/TextArea";
import { Button } from "@/ui/Button";
import { trackEvent } from "./meta-pixel";

interface ContactProps {
  /** Override the default heading */
  heading?: string;
  /** Override the default subheading */
  subheading?: string;
  /** Override the default placeholder for the message field */
  messagePlaceholder?: string;
}

/**
 * Shared contact form used across all marketing pages.
 * Posts to /api/contact with honeypot spam protection.
 *
 * @example
 * <Contact />
 * <Contact heading="Let's talk" subheading="We reply within 24 hours." />
 */
export default function Contact({
  heading = "Got a project in mind?",
  subheading = "Tell us what you're working on and we'll get back to you within a day.",
  messagePlaceholder = "Tell us about your brand and what you're looking to achieve...",
}: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();
    const messageTrimmed = message.trim();

    if (nameTrimmed.length < 1 || nameTrimmed.length > 80) {
      setError("Please enter a valid name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed) || emailTrimmed.length > 254) {
      setError("Please enter a valid email address");
      return false;
    }

    if (messageTrimmed.length < 10 || messageTrimmed.length > 2000) {
      setError("Message must be between 10 and 2000 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          website: website, // Honeypot
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send message. Please try again.");
        return;
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");

      // Fire Meta Pixel Lead event for conversion tracking
      trackEvent("Lead", {
        content_name: "Contact Form",
        content_category: "Lead Generation",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-background-alt">
      <div className="max-w-[560px] mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-medium mb-4 text-center tracking-tight">
          {heading}
        </h2>
        <p className="text-lg text-muted mb-12 text-center">
          {subheading}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium mb-2"
              >
                Name
              </label>
              <Input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium mb-2"
              >
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium mb-2"
            >
              What are you working on?
            </label>
            <TextArea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messagePlaceholder}
              required
              disabled={loading}
              rows={5}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-800">
                Message sent! We&apos;ll get back to you soon.
              </p>
            </div>
          )}

          <div>
            <Button type="submit" size="lg" disabled={loading} fullWidth>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}


