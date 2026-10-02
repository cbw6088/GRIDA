"use client";

import { useState } from "react";

export type ContactFaq = {
  question: string;
  answer: string;
};

export function ContactFaqList({ faqs }: { faqs: ContactFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 border-t border-line">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `contact-faq-${index}`;

        return (
          <div key={faq.question} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-start justify-between gap-4 py-5 text-left text-lg font-medium tracking-tight text-foreground"
              >
                <span className="text-pretty break-keep">{faq.question}</span>
                <span
                  className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center text-muted transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    open ? "rotate-45" : ""
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 max-w-2xl text-pretty break-keep text-sm leading-7 text-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
