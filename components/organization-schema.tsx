import { PHONE_HREF } from "@/lib/contact";
import { BRAND, SAME_AS, SITE_URL } from "@/lib/site";

/* Services mirror the Abilities section; keep the two in step. */
const SERVICE_NAMES = [
  "Brand Strategy",
  "Brand Identity",
  "Naming & Nomenclature",
  "Logo Design",
  "Website Development",
  "Application Development",
  "AI & Automation",
] as const;

/**
 * Organization + WebSite JSON-LD.
 *
 * "Hypeman" competes with a dictionary word, so this is the machine-readable
 * statement that the name belongs to a business: an @id other pages can point
 * at, plus `sameAs` profiles for Google to corroborate against.
 */
export function OrganizationSchema() {
  const graph = [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      alternateName: BRAND.shortName,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Hypeman Labs is a startup studio for brand strategy, identity and naming, plus websites, mobile apps and AI automation.",
      email: BRAND.email,
      telephone: PHONE_HREF.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      areaServed: "Worldwide",
      knowsAbout: [...SERVICE_NAMES],
      ...(SAME_AS.length > 0 && { sameAs: SAME_AS }),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BRAND.email,
        telephone: PHONE_HREF.replace("tel:", ""),
        availableLanguage: ["en", "hi"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: SERVICE_NAMES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, provider: { "@id": `${SITE_URL}/#organization` } },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BRAND.name,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Static, author-controlled JSON with no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
