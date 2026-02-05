export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Chiropractor",
    name: "Dr. Collins, DC - Chiropractic Care & Acupuncture",
    description:
      "Dr. Collins provides expert chiropractic care and acupuncture in Port Orange, FL. Palmer College graduate offering spinal adjustments, acupuncture, spinal decompression, and more. Most insurances accepted.",
    url: "https://drcollinschiropractor.com",
    telephone: "(386) 308-9076",
    email: "askradianthealth@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "209 Dunlawton Ave, Suite 18",
      addressLocality: "Port Orange",
      addressRegion: "FL",
      postalCode: "32127",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.1083,
      longitude: -81.0059,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Insurance",
    currenciesAccepted: "USD",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 29.1083,
        longitude: -81.0059,
      },
      geoRadius: "30",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Chiropractic and Acupuncture Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Chiropractic Adjustment",
            description:
              "Spinal adjustments to correct misalignments and restore proper function to the nervous system.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Acupuncture",
            description:
              "Traditional acupuncture therapy for pain management, stress relief, and whole-body wellness.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "MedicalProcedure",
            name: "Spinal Decompression Therapy",
            description:
              "Non-surgical spinal decompression for herniated discs, sciatica, and chronic back pain.",
          },
        },
      ],
    },
    sameAs: [],
    image: "https://drcollinschiropractor.com/og-image.jpg",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Collins",
    jobTitle: "Doctor of Chiropractic",
    description:
      "Dr. Collins is a Doctor of Chiropractic and licensed acupuncturist in Port Orange, FL. Graduate of Palmer College of Chiropractic Florida campus.",
    worksFor: {
      "@type": "Chiropractor",
      name: "Dr. Collins, DC - Chiropractic Care & Acupuncture",
      address: {
        "@type": "PostalAddress",
        streetAddress: "209 Dunlawton Ave, Suite 18",
        addressLocality: "Port Orange",
        addressRegion: "FL",
        postalCode: "32127",
      },
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Palmer College of Chiropractic",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Port Orange",
        addressRegion: "FL",
      },
    },
    knowsAbout: [
      "Chiropractic Care",
      "Acupuncture",
      "Spinal Decompression",
      "Pain Management",
      "Wellness Care",
    ],
    medicalSpecialty: "Chiropractic",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostSchema({
  title,
  description,
  datePublished,
  slug,
}: {
  title: string;
  description: string;
  datePublished: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Person",
      name: "Dr. Collins, DC",
      jobTitle: "Doctor of Chiropractic",
    },
    publisher: {
      "@type": "Organization",
      name: "Dr. Collins, DC - Chiropractic Care & Acupuncture",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://drcollinschiropractor.com/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function MedicalWebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    description: description,
    url: url,
    specialty: {
      "@type": "MedicalSpecialty",
      name: "Chiropractic",
    },
    about: {
      "@type": "MedicalCondition",
      name: "Musculoskeletal Disorders",
    },
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
