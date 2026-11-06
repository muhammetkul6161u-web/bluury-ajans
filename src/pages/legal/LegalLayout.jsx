import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { LEGAL, LEGAL_PAGES } from "@/pages/legal/legalInfo";

const LegalLayout = ({ path, title, metaTitle, description, children }) => {
  const url = `https://blurryajans.com${path}`;
  return (
    <PageTransition>
      <Helmet>
        <title>{metaTitle || `${title} — Bluury Ajans`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${title} — Bluury Ajans`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
      </Helmet>

      <div className="bg-[#D6D6D6] pt-28 md:pt-36 pb-16 md:pb-24">
        <article className="legal-prose max-w-3xl mx-4 sm:mx-auto bg-[#FAFAF8] border border-[#C8A45A]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] px-5 py-8 sm:px-10 md:px-14 md:py-12 select-text">
          <header className="mb-8 border-b border-black/10 pb-6">
            <h1 className="font-heading text-2xl md:text-4xl text-[#1A1A1A] leading-tight mb-3">{title}</h1>
            <p className="text-xs tracking-wider uppercase text-[#6B6B6B] font-semibold">
              Son güncelleme: {LEGAL.lastUpdated}
            </p>
          </header>
          {children}
          <nav aria-label="Yasal metinler" className="mt-12 pt-6 border-t border-black/10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B] mb-3">Diğer yasal metinler</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 list-none p-0 m-0">
              {LEGAL_PAGES.filter((p) => p.to !== path).map((p) => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </article>
      </div>
    </PageTransition>
  );
};

export default LegalLayout;
