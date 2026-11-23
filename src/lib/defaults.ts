export type Link = { label: string; href: string }

export const IMG = {
  fire: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/Teledyne-FLIR-StormCaster-E-Flying-1.jpg',
  work: '/images/work.jpg',
  screening: '/images/screening.jpg',
  hazmat: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/DSC_8944.jpg',
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
    { label: 'Products', href: '/products' },
    { label: 'How it works', href: '/#how' },
    { label: 'News', href: '/news' },
  ],
  navCta: { label: 'Contact Visiontec', href: '/contact' },
  address: 'Georgetown, ON L7G 4X6\nCanada',
  footerColumns: [
    {
      heading: 'Solutions',
      links: [
        { label: 'Keep my community safe Vikas', href: '/products' },
        { label: 'Keep my premises safe', href: '/products' },
        { label: 'Screen my event', href: '/contact' },
      ],
    },
    {
      heading: 'Explore',
      links: [
        { label: 'Products', href: '/products' },
        { label: 'How it works', href: '/#how' },
        { label: 'News and events', href: '/news' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Contact Visiontec', href: '/contact' },
        { label: 'Rental form', href: '/rental-form' },
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
  { name: 'HoverMap ST', summary: 'Fast situational mapping for responders.', image: IMG.hovermap, ctaLabel: 'Learn more', ctaHref: '/products' },
  { name: 'Pendar X10', summary: 'Handheld identification from a safe distance.', image: IMG.pendar, ctaLabel: 'Learn more', ctaHref: '/products' },
  { name: 'XplorIR', summary: 'Portable chemical identification for the field.', image: IMG.xplorir, ctaLabel: 'Learn more', ctaHref: '/products' },
]

export const defaultPosts = [
  {
    title: 'How to detect the hidden danger of lithium-ion battery fires',
    excerpt: 'Lithium-ion battery fires are a growing public safety concern.',
    image: IMG.newsLithium,
    href: '/news',
    linkLabel: 'Read more',
  },
  {
    title: '5 factors to keep in mind when renting security equipment for public events',
    excerpt: 'Set your attendee screening procedure early.',
    image: IMG.newsEvents,
    href: '/news',
    linkLabel: 'Read more',
  },
  {
    title: 'Shielding the seas: why we need to protect naval vessels from CBRN threats',
    excerpt: 'Naval platforms are often deployed to dangerous environments.',
    image: IMG.newsNaval,
    href: '/news',
    linkLabel: 'Read more',
  },
]

export const defaultEvents = [
  { date: 'May 27 to 28', description: "CANSEC, Canada's leading defence, security and emerging technology event. EY Centre, Ottawa, Ont.", href: '' },
  { date: 'July 14 to 16, 2026', description: "Maritime and Arctic Security and Safety Conference. St. John's Convention Centre, Newfoundland.", href: '' },
  { date: 'From October 6, 2026', description: 'DEFSEC Atlantic. Halifax Convention Centre, Halifax, Nova Scotia.', href: '' },
]

const anchor = (id: string) => ({ background: 'default', spacing: 'default', anchor: id, hidden: false })

export const defaultHomeLayout = [
  {
    id: 'starter-1-1',
    blockType: 'hero',
    background: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/DSC_8944.jpg',
    badge: 'New',
    pillText: 'Explore our latest detection products',
    pillHref: '/products',
    titleLine1: 'The most advanced CBRNE',
    titleLine2: 'detection technology.',
    subtitle:
      'Detect, identify, protect. Equipment for detection, identification, measurement and surveillance, to buy or rent, with expert guidance from our team.',
    primaryCta: { label: 'View products', href: '/products' },
    secondaryCta: { label: 'Talk to an expert', href: '/contact' },
    showGrid: true,
    tileCommunity: {
      label: 'Keep my community safe Vikas',
      image: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/Teledyne-FLIR-StormCaster-E-Flying-1.jpg',
    },
    signalTitle: 'Live threat signal',
    tileCbrne: { label: 'CBRNE detection', image: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/DSC_8944.jpg' },
    tilePremises: { label: 'Keep my premises safe', image: IMG.work },
    featuredLabel: 'Featured product',
    featuredLinkLabel: 'Learn more',
    featuredProduct: 'Pendar X10',
    features: ['Complete CBRNE range', 'Buy or rent', 'Expert guidance', 'Event screening'].map((text) => ({ text })),
    settings: anchor(''),
  },
  {
    id: 'starter-2-2',
    blockType: 'solutions',
    tag: 'Solutions',
    heading: 'Protection built around where you work.',
    items: [
      {
        title: 'Keep my community safe Vikas',
        text: 'The entire spectrum of CBRNE products for detection, identification, measurement and surveillance.',
        cta: { label: 'View products', href: '/products' },
        image: 'https://myclientwebsite.com/headless/wp-content/uploads/2026/11/Teledyne-FLIR-StormCaster-E-Flying-1.jpg',
      },
      {
        title: 'Keep my premises safe',
        text: 'Integrated security solutions that protect people and critical infrastructure, from body scanners to x-ray systems.',
        cta: { label: 'View products', href: '/products' },
        image: IMG.work,
      },
      {
        title: 'Screen my event',
        text: 'Rent screening or detection equipment for a temporary event.',
        cta: { label: 'Contact us', href: '/contact' },
        image: IMG.screening,
      },
    ],
    settings: anchor('solutions'),
  },
  {
    id: 'starter-3-3',
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
    id: 'starter-4-4',
    blockType: 'products',
    tag: 'Products',
    heading: 'Discover our latest products.',
    intro: 'Innovative tools for detection, identification, screening and surveillance.',
    source: 'all',
    limit: 3,
    items: defaultProducts,
    settings: anchor('products'),
  },
  {
    id: 'starter-5-5',
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
    id: 'starter-6-6',
    blockType: 'news',
    tag: 'News and events',
    heading: 'Insights from the field.',
    postsLimit: 3,
    showEvents: true,
    posts: defaultPosts,
    events: defaultEvents,
    settings: anchor('news'),
  },
  {
    id: 'starter-7-7',
    blockType: 'contact',
    heading: 'Be ready for the unimaginable.',
    text: 'Tell us what you need to protect. Our team will guide you to the right equipment, to buy or to rent.',
    buttons: [
      { label: 'Contact Visiontec', href: '/contact' },
      { label: 'Rental form', href: '/rental-form' },
    ],
    settings: anchor('contact'),
  },
]