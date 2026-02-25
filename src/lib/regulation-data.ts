export type Status = "Compliant" | "At Risk" | "Action Needed";

export type Priority = "Critical" | "High" | "Medium";
export type OwnerRole = "Legal" | "Compliance Ops" | "Product" | "Engineering" | "CRM";

export type ChecklistItem = {
  id: string;
  rule: string;
  owner: OwnerRole;
  priority: Priority;
  status: Status;
  evidence: string;
};

export type DomainBlock = {
  domain: string;
  status: Status;
  checklist: ChecklistItem[];
};

export type CountryRegulation = {
  slug: string;
  name: string;
  regulator: string;
  legalBasis: string;
  summary: string;
  lastReviewed: string;
  topRisks: string[];
  domains: DomainBlock[];
  recentChanges: {
    date: string;
    change: string;
  }[];
  sources: {
    label: string;
    url: string;
  }[];
};

export type ActionRow = {
  id: string;
  countryName: string;
  countrySlug: string;
  domain: string;
  rule: string;
  owner: OwnerRole;
  priority: Priority;
  status: Status;
  evidence: string;
};

export const countries: CountryRegulation[] = [
  {
    slug: "uk",
    name: "United Kingdom",
    regulator: "UK Gambling Commission (UKGC)",
    legalBasis: "Gambling Act 2005, LCCP, RTS",
    summary:
      "Priority areas are customer protection, AML controls, and tighter rules on incentives and promotional design.",
    lastReviewed: "2026-02-25",
    topRisks: [
      "Incentive/bonus non-compliance under updated LCCP expectations",
      "Weak customer interaction triggers for harm detection",
      "Insufficient AML source-of-funds evidence for high-risk players",
    ],
    domains: [
      {
        domain: "Licensing and Scope",
        status: "Compliant",
        checklist: [
          {
            id: "uk-ls-1",
            rule: "Maintain remote casino operating licence scope and product mapping against current permissions.",
            owner: "Legal",
            priority: "Critical",
            status: "Compliant",
            evidence: "Licence register snapshot, internal product-to-licence matrix",
          },
        ],
      },
      {
        domain: "Player Protection",
        status: "At Risk",
        checklist: [
          {
            id: "uk-pp-1",
            rule: "Operate and test customer interaction framework with documented harm indicators and interventions.",
            owner: "Compliance Ops",
            priority: "Critical",
            status: "At Risk",
            evidence: "Interaction policy, case logs, escalation samples",
          },
          {
            id: "uk-pp-2",
            rule: "Apply financial vulnerability checks and frictionless monitoring thresholds where required.",
            owner: "Compliance Ops",
            priority: "High",
            status: "At Risk",
            evidence: "Threshold config, monitoring outcomes, QA review",
          },
        ],
      },
      {
        domain: "Marketing and Bonuses",
        status: "Action Needed",
        checklist: [
          {
            id: "uk-mb-1",
            rule: "Ensure incentives do not mix multiple products in prohibited ways and remain transparent to players.",
            owner: "CRM",
            priority: "Critical",
            status: "Action Needed",
            evidence: "Promo terms archive, campaign approval sign-off",
          },
        ],
      },
      {
        domain: "AML and Fraud",
        status: "At Risk",
        checklist: [
          {
            id: "uk-af-1",
            rule: "Apply risk-based CDD/EDD controls, including source-of-funds checks for higher-risk scenarios.",
            owner: "Compliance Ops",
            priority: "Critical",
            status: "At Risk",
            evidence: "AML policy, EDD cases, SAR process records",
          },
        ],
      },
    ],
    recentChanges: [
      {
        date: "2026-01-19",
        change: "LCCP changes took effect on mixed-product promotional incentives and bonus structures.",
      },
      {
        date: "2026-04-30",
        change: "Further LCCP social responsibility updates are scheduled, including direct-marketing consent controls.",
      },
    ],
    sources: [
      {
        label: "UKGC LCCP change log",
        url: "https://www.gamblingcommission.gov.uk/licensees-and-businesses/page/lccp-previous-changes",
      },
      {
        label: "UKGC Remote Technical Standards",
        url: "https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/remote-gambling-and-software-technical-standards",
      },
      {
        label: "UKGC AML responsibilities",
        url: "https://www.gamblingcommission.gov.uk/licensees-and-businesses/page/remote-and-non-remote-casinos-aml-responsibilities",
      },
    ],
  },
  {
    slug: "sweden",
    name: "Sweden",
    regulator: "Spelinspektionen",
    legalBasis: "Spellag (2018:1138)",
    summary:
      "Duty of care, self-exclusion, and bonus/credit restrictions remain core, with stricter credit-ban scope effective in 2026.",
    lastReviewed: "2026-02-25",
    topRisks: [
      "Duty-of-care controls not consistently escalated",
      "Improper bonus handling beyond first gambling occasion",
      "Weak AML evidence for higher-risk player profiles",
    ],
    domains: [
      {
        domain: "Licensing and Scope",
        status: "Compliant",
        checklist: [
          {
            id: "se-ls-1",
            rule: "Keep Swedish licence scope mapped to all offered verticals and domains.",
            owner: "Legal",
            priority: "Critical",
            status: "Compliant",
            evidence: "Licence docs, product register, domain inventory",
          },
        ],
      },
      {
        domain: "Player Protection",
        status: "At Risk",
        checklist: [
          {
            id: "se-pp-1",
            rule: "Apply omsorgsplikt (duty of care) interventions with timing and outcome tracking.",
            owner: "Compliance Ops",
            priority: "Critical",
            status: "At Risk",
            evidence: "Intervention protocol, logs, management review",
          },
          {
            id: "se-pp-2",
            rule: "Integrate and continuously verify Spelpaus/self-limitation flows.",
            owner: "Engineering",
            priority: "Critical",
            status: "Compliant",
            evidence: "Integration test logs, API availability monitoring",
          },
        ],
      },
      {
        domain: "Marketing and Bonuses",
        status: "Action Needed",
        checklist: [
          {
            id: "se-mb-1",
            rule: "Allow bonus only at first gambling occasion and block repeat issuance scenarios.",
            owner: "CRM",
            priority: "Critical",
            status: "Action Needed",
            evidence: "Bonus rule engine config, campaign QA output",
          },
          {
            id: "se-mb-2",
            rule: "Block any credit-funded gambling flow, including indirect/agent-backed credit arrangements from 1 May 2026.",
            owner: "Product",
            priority: "Critical",
            status: "Action Needed",
            evidence: "Payments rulebook, blocked-flow test evidence",
          },
        ],
      },
      {
        domain: "AML and Fraud",
        status: "At Risk",
        checklist: [
          {
            id: "se-af-1",
            rule: "Apply risk scoring, CDD/EDD, monitoring, and suspicious transaction escalation.",
            owner: "Compliance Ops",
            priority: "High",
            status: "At Risk",
            evidence: "AML risk model, case studies, reporting records",
          },
        ],
      },
    ],
    recentChanges: [
      {
        date: "2026-05-01",
        change: "Swedish law expands the gambling credit ban to include play financed by representatives/agents.",
      },
      {
        date: "2024-07-01",
        change: "Sanctions and supervisory measures for licensed gambling operators were reinforced.",
      },
    ],
    sources: [
      {
        label: "Spellag (2018:1138)",
        url: "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/spellag-20181138_sfs-2018-1138/",
      },
      {
        label: "Spelinspektionen - Responsible Gambling",
        url: "https://www.spelinspektionen.se/en/rules-and-regulation/eng-spelansvar-omsorgsplikt/",
      },
      {
        label: "Spelinspektionen - AML",
        url: "https://www.spelinspektionen.se/en/rules-and-regulation/money-laundering/",
      },
      {
        label: "Government Offices of Sweden - Extended credit ban from 1 May 2026",
        url: "https://www.government.se/press-releases/2024/09/extended-ban-on-gambling-on-credit/",
      },
    ],
  },
  {
    slug: "italy",
    name: "Italy",
    regulator: "ADM (Agenzia delle Dogane e dei Monopoli)",
    legalBasis: "Decreto Legislativo 41/2024 and ADM framework",
    summary:
      "Concession-based model with strict advertising limits, centralized self-exclusion, and ongoing fiscal/legal updates.",
    lastReviewed: "2026-02-25",
    topRisks: [
      "Misalignment with concession-specific obligations",
      "Marketing content violating broad advertising restrictions",
      "RUA self-exclusion controls not consistently enforced",
    ],
    domains: [
      {
        domain: "Licensing and Scope",
        status: "At Risk",
        checklist: [
          {
            id: "it-ls-1",
            rule: "Track concession obligations and update internal controls when ADM communications change.",
            owner: "Legal",
            priority: "Critical",
            status: "At Risk",
            evidence: "Concession clauses matrix, legal review log",
          },
        ],
      },
      {
        domain: "Player Protection",
        status: "Compliant",
        checklist: [
          {
            id: "it-pp-1",
            rule: "Enforce self-exclusion requests via RUA and prevent betting during exclusion periods.",
            owner: "Engineering",
            priority: "Critical",
            status: "Compliant",
            evidence: "RUA sync logs, block event samples",
          },
        ],
      },
      {
        domain: "Marketing and Bonuses",
        status: "Action Needed",
        checklist: [
          {
            id: "it-mb-1",
            rule: "Review all commercial communications against Dignity Decree advertising prohibitions.",
            owner: "CRM",
            priority: "Critical",
            status: "Action Needed",
            evidence: "Creative approval workflow, legal signoff archive",
          },
        ],
      },
      {
        domain: "AML and Fraud",
        status: "At Risk",
        checklist: [
          {
            id: "it-af-1",
            rule: "Maintain AML controls proportional to remote gaming risk and preserve reporting audit trail.",
            owner: "Compliance Ops",
            priority: "High",
            status: "At Risk",
            evidence: "AML manual, escalations register, internal audit checks",
          },
        ],
      },
    ],
    recentChanges: [
      {
        date: "2025-09-16",
        change: "New legislative decree updates aspects of the public games framework and related fiscal rules.",
      },
      {
        date: "2025-05-17",
        change: "Urgent fiscal provisions published with implications for public gaming taxation and compliance operations.",
      },
      {
        date: "2024-04-03",
        change: "Decreto Legislativo 41/2024 established the broader remote gaming reorganization framework.",
      },
    ],
    sources: [
      {
        label: "Gazzetta Ufficiale - D.Lgs 41/2024",
        url: "https://www.gazzettaufficiale.it/atto/serie_generale/caricaDettaglioAtto/originario?atto.codiceRedazionale=24G00060&atto.dataPubblicazioneGazzetta=2024-04-03&elenco30giorni=false",
      },
      {
        label: "Normattiva - D.L. 87/2018 Art.9",
        url: "https://www.normattiva.it/uri-res/N2Ls?urn%3Anir%3Astato%3Adecreto.legge%3A2018%3B87~art9%21vig=",
      },
      {
        label: "ADM - RUA self exclusion service",
        url: "https://arserviziam.adm.gov.it/static/ar_rua_static/index.html",
      },
      {
        label: "Gazzetta Ufficiale - 25G00065",
        url: "https://www.gazzettaufficiale.it/eli/id/2025/05/17/25G00065/sg",
      },
      {
        label: "Gazzetta Ufficiale - 25G00205",
        url: "https://www.gazzettaufficiale.it/eli/id/2025/09/16/25G00205/sg",
      },
    ],
  },
  {
    slug: "spain",
    name: "Spain",
    regulator: "DGOJ",
    legalBasis: "Ley 13/2011 and RD 958/2020",
    summary:
      "National licensing model with strict commercial communications controls and active illegal gambling enforcement.",
    lastReviewed: "2026-02-25",
    topRisks: [
      "Marketing communications outside allowed limits",
      "Inadequate controls against unlicensed offering scope",
      "Incomplete recordkeeping for regulatory inspection",
    ],
    domains: [
      {
        domain: "Licensing and Scope",
        status: "At Risk",
        checklist: [
          {
            id: "es-ls-1",
            rule: "Validate every active product against title-habilitante and licence conditions.",
            owner: "Legal",
            priority: "Critical",
            status: "At Risk",
            evidence: "Licence annex mapping, go-live legal checklist",
          },
        ],
      },
      {
        domain: "Player Protection",
        status: "Compliant",
        checklist: [
          {
            id: "es-pp-1",
            rule: "Maintain age/identity checks and responsible gambling messaging in player journey.",
            owner: "Compliance Ops",
            priority: "High",
            status: "Compliant",
            evidence: "KYC samples, UX snapshots, QA scripts",
          },
        ],
      },
      {
        domain: "Marketing and Bonuses",
        status: "Action Needed",
        checklist: [
          {
            id: "es-mb-1",
            rule: "Apply RD 958/2020 constraints to all advertising channels and affiliate activity.",
            owner: "CRM",
            priority: "Critical",
            status: "Action Needed",
            evidence: "Channel policy, affiliate controls, campaign approvals",
          },
        ],
      },
      {
        domain: "AML and Fraud",
        status: "At Risk",
        checklist: [
          {
            id: "es-af-1",
            rule: "Ensure AML controls, transaction monitoring, and reporting remain inspection-ready.",
            owner: "Compliance Ops",
            priority: "High",
            status: "At Risk",
            evidence: "AML monitoring dashboards, escalation log",
          },
        ],
      },
    ],
    recentChanges: [
      {
        date: "2026-01-20",
        change: "DGOJ presented 2026 supervisory priorities including joint deposit limits and risk-detection alerts.",
      },
      {
        date: "2025-05-06",
        change: "DGOJ reported firm sanctions and blocking actions against unlicensed operators.",
      },
      {
        date: "2020-11-04",
        change: "RD 958/2020 remains the baseline framework for gambling commercial communications.",
      },
    ],
    sources: [
      {
        label: "BOE - Ley 13/2011",
        url: "https://www.boe.es/buscar/act.php?id=BOE-A-2011-9280",
      },
      {
        label: "DGOJ - RD 958/2020 notice",
        url: "https://www.ordenacionjuego.es/novedades/real-decreto-9582020-3-noviembre-comunicaciones-comerciales-actividades-juego",
      },
      {
        label: "DGOJ - Illegal gambling portal",
        url: "https://www.ordenacionjuego.es/participantes-juego/juego-ilegal",
      },
      {
        label: "DGOJ - 2026 regulatory priorities",
        url: "https://www.ordenacionjuego.es/novedades",
      },
    ],
  },
];

export const statusOrder: Status[] = ["Action Needed", "At Risk", "Compliant"];

export function statusCount(country: CountryRegulation): Record<Status, number> {
  return country.domains.reduce(
    (acc, domain) => {
      acc[domain.status] += 1;
      return acc;
    },
    {
      "Compliant": 0,
      "At Risk": 0,
      "Action Needed": 0,
    } as Record<Status, number>,
  );
}

export function overallStatus(country: CountryRegulation): Status {
  const counts = statusCount(country);

  if (counts["Action Needed"] > 0) {
    return "Action Needed";
  }

  if (counts["At Risk"] > 0) {
    return "At Risk";
  }

  return "Compliant";
}

export const controlDomains = [
  "Licensing and Scope",
  "Player Protection",
  "Marketing and Bonuses",
  "AML and Fraud",
] as const;

export function domainAnchor(domain: string): string {
  return `domain-${domain.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function flattenRows(): ActionRow[] {
  return countries.flatMap((country) =>
    country.domains.flatMap((domain) =>
      domain.checklist.map((item) => ({
        id: item.id,
        countryName: country.name,
        countrySlug: country.slug,
        domain: domain.domain,
        rule: item.rule,
        owner: item.owner,
        priority: item.priority,
        status: item.status,
        evidence: item.evidence,
      })),
    ),
  );
}
