/**
 * The original design's content. Used by:
 *  - the seed script (to fill the CMS), and
 *  - the site as a fallback when the CMS is empty, so nothing ever renders blank.
 * Images are given as /images/... paths; the seed swaps them for uploaded media.
 */

export type Link = { label: string; href: string }

export const IMG = {
  fire: '/images/fire.jpg',
  work: '/images/work.jpg',
  screening: '/images/screening.jpg',
  hazmat: '/images/hazmat.jpg',
  logo: '/images/logo.png',
  pendar: '/images/pendar-x10.jpg',
  hovermap: '/images/hovermap-st.jpg',
  xplorir: '/images/xplorir.jpg',
  newsLithium: '/images/news-lithium.jpg',
  newsEvents: '/images/news-events.jpg',
  newsNaval: '/images/news-naval.jpg',
}

export const defaultSettings = {
  siteTitle: 'Visiontec Systems',
  logo: IMG.logo,
  navLinks: [
    { label: 'Solutions', href: '/#solutions' },
    { label: 'CBRNE', href: '/#spectrum' },
    { label: 'Products', href: '/#products' },
    { label: 'How it works', href: '/#how' },
    { label: 'News', href: '/#news' },
  ],
  navCta: { label: 'Request a quote', href: '/#contact' },
  address: 'Georgetown, ON L7G 4X6\nCanada',
  footerColumns: [
    {
      heading: 'Solutions',
      links: [
        { label: 'Community safety', href: '/#solutions' },
        { label: 'Premises safety', href: '/#solutions' },
        { label: 'Event screening', href: '/#solutions' },
      ],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'Products', href: '/#products' },
        { label: 'How it works', href: '/#how' },
        { label: 'News and events', href: '/#news' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Contact', href: '/#contact' },
        { label: 'Rental form', href: '#' },
        { label: 'LinkedIn', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 Visiontec Systems. All rights reserved.',
  backToTop: 'Back to top',
}

export const defaultDesign = {
  colors: {
    accent: '#F05A22',
    primary: '#1F8F72',
    glow: '#4EE0B1',
    background: '#F5F8F7',
    text: '#0B1F1B',
    muted: '#566A64',
    card: '#F4F8F7',
    line: '#DCE5E2',
    dark: '#0A2A24',
    footer: '#030A0E',
  },
  fonts: { heading: 'Sora', body: 'DM Sans', baseSize: 17 },
  effects: { preloader: true, cursorGlow: true, progressBar: true, animations: true },
  customCss: '',
}

export const defaultProducts = [
  { name: 'HoverMap ST', summary: 'Fast situational mapping for responders.', image: IMG.hovermap, ctaLabel: 'Learn more', ctaHref: '#contact' },
  { name: 'Pendar X10', summary: 'Handheld identification from a safe distance.', image: IMG.pendar, ctaLabel: 'Learn more', ctaHref: '#contact' },
  { name: 'XplorIR', summary: 'Portable chemical identification for the field.', image: IMG.xplorir, ctaLabel: 'Learn more', ctaHref: '#contact' },
]

export const defaultPosts = [
  {
    title: 'How to detect the hidden danger of lithium-ion battery fires',
    excerpt: 'Lithium-ion battery fires are a growing public safety concern.',
    image: IMG.newsLithium,
    href: '#',
    linkLabel: 'Read more',
  },
  {
    title: '5 factors to keep in mind when renting security equipment for public events',
    excerpt: 'Set your attendee screening procedure early.',
    image: IMG.newsEvents,
    href: '#',
    linkLabel: 'Read more',
  },
  {
    title: 'Shielding the seas: why we need to protect naval vessels from CBRN threats',
    excerpt: 'Naval platforms are often deployed to dangerous environments.',
    image: IMG.newsNaval,
    href: '#',
    linkLabel: 'Read more',
  },
]

export const defaultEvents = [
  { date: 'May 27 to 28', description: "CANSEC, Canada's leading defence, security and emerging technology event. EY Centre, Ottawa, Ont.", href: '' },
  { date: 'July 14 to 16, 2026', description: "Maritime and Arctic Security and Safety Conference. St. John's Convention Centre, Newfoundland.", href: '' },
  { date: 'From October 6, 2026', description: 'DEFSEC Atlantic. Halifax Convention Centre, Halifax, Nova Scotia.', href: '' },
]

const anchor = (id: string) => ({ background: 'default', spacing: 'default', anchor: id, hidden: false })

/** The original homepage, section by section, in page-builder form. */
export const defaultHomeLayout = [
  {
    blockType: 'hero',
    background: IMG.hazmat,
    badge: 'New',
    pillText: 'Explore our latest detection products',
    pillHref: '#products',
    titleLine1: 'The most advanced CBRNE',
    titleLine2: 'detection technology.',
    subtitle:
      'Detect, identify, protect. Equipment for detection, identification, measurement and surveillance, to buy or rent, with expert guidance from our team.',
    primaryCta: { label: 'View products', href: '#products' },
    secondaryCta: { label: 'Talk to an expert', href: '#contact' },
    showGrid: true,
    tileCommunity: { label: 'Keep my community safe', image: IMG.fire },
    signalTitle: 'Live threat signal',
    tileCbrne: { label: 'CBRNE detection', image: IMG.hazmat },
    tilePremises: { label: 'Keep my premises safe', image: IMG.work },
    featuredLabel: 'Featured product',
    featuredLinkLabel: 'Learn more',
    featuredProduct: 'Pendar X10', // seed resolves this name to the product
    features: ['Complete CBRNE range', 'Buy or rent', 'Expert guidance', 'Event screening'].map((text) => ({ text })),
    settings: anchor(''),
  },
  {
    blockType: 'statement',
    text: 'When you need to be ready for the unimaginable, you need chemical, biological, radiological, nuclear and explosive equipment that delivers superior threat protection.',
    settings: anchor(''),
  },
  {
    blockType: 'solutions',
    tag: 'Solutions',
    heading: 'Protection built around where you work.',
    items: [
      {
        title: 'Keep my community safe',
        text: 'The entire spectrum of CBRNE products for detection, identification, measurement and surveillance.',
        cta: { label: 'View products', href: '#products' },
        image: IMG.fire,
      },
      {
        title: 'Keep my premises safe',
        text: 'Integrated security solutions that protect people and critical infrastructure, from body scanners to x-ray systems.',
        cta: { label: 'View products', href: '#products' },
        image: IMG.work,
      },
      {
        title: 'Screen my event',
        text: 'Rent screening or detection equipment for a temporary event, from international summits to entertainment venues.',
        cta: { label: 'Contact us', href: '#contact' },
        image: IMG.screening,
      },
    ],
    settings: anchor('solutions'),
  },
  {
    blockType: 'spectrum',
    tag: 'The full spectrum',
    heading: 'Every CBRNE threat. One partner.',
    intro: 'Hover to explore what we detect.',
    items: [
      { letter: 'C', name: 'Chemical', text: 'Detect and identify toxic agents and hazardous chemicals.', image: IMG.hazmat, position: '12% 50%' },
      { letter: 'B', name: 'Biological', text: 'Equipment to spot and characterize biological threats.', image: IMG.work, position: '' },
      { letter: 'R', name: 'Radiological', text: 'Measure radiation and locate radioactive sources.', image: IMG.screening, position: '' },
      { letter: 'N', name: 'Nuclear', text: 'Monitoring for nuclear material threats.', image: IMG.hazmat, position: '88% 50%' },
      { letter: 'E', name: 'Explosive', text: 'Find explosives and banned items at checkpoints.', image: IMG.fire, position: '' },
    ],
    settings: anchor('spectrum'),
  },
  {
    blockType: 'marquee',
    row1: ['Detect', 'Identify', 'Protect', 'Screen'].map((word) => ({ word })),
    row2: ['Chemical', 'Biological', 'Radiological', 'Nuclear', 'Explosive'].map((word) => ({ word })),
    settings: anchor(''),
  },
  {
    blockType: 'products',
    tag: 'Products',
    heading: 'Discover our latest products.',
    intro: 'Innovative tools for detection, identification, screening and surveillance.',
    source: 'all',
    limit: 3,
    settings: anchor('products'),
  },
  {
    blockType: 'banner',
    heading: 'Reduce CBRNE threats with the most advanced technology.',
    text: 'All the products you need to protect your team and facilities from a variety of threats.',
    cta: { label: 'Contact us', href: '#contact' },
    image: IMG.hazmat,
    settings: anchor(''),
  },
  {
    blockType: 'steps',
    tag: 'How it works',
    heading: 'From first call to field-ready.',
    steps: [
      { title: 'Assess', text: 'We learn your threats, site and team.' },
      { title: 'Recommend', text: 'We match proven equipment to your needs.' },
      { title: 'Deploy', text: 'Equipment is delivered and ready to use.' },
      { title: 'Support', text: 'Our team stays available after delivery.' },
    ],
    settings: anchor('how'),
  },
  {
    blockType: 'news',
    tag: 'News and events',
    heading: 'Insights from the field.',
    postsLimit: 3,
    showEvents: true,
    settings: anchor('news'),
  },
  {
    blockType: 'contact',
    heading: 'Be ready for the unimaginable.',
    text: 'Tell us what you need to protect. Our team will guide you to the right equipment, to buy or to rent.',
    buttons: [
      { label: 'Contact Visiontec', href: '#' },
      { label: 'Rental form', href: '#' },
    ],
    settings: anchor('contact'),
  },
]
