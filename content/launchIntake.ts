/**
 * The launch-offer intake form.
 *
 * WHY THIS IS DATA AND NOT JSX. There are more than fifty questions here. Hand
 * writing each one as markup would run to a couple of thousand lines, and the
 * server would then need its own copy of every rule to validate against — which
 * is exactly how a client and a server stop agreeing about what is required.
 * The form is declared once, rendered generically, and validated by one shared
 * function that both sides import. Add a question here and the page, the
 * validation and the emailed brief all pick it up.
 *
 * WHO FILLS THIS IN. Someone starting their first business, who has probably
 * never commissioned a website and does not know what a hex code is. So every
 * question is asked in plain language and carries either an example or the
 * reason we are asking. Nothing assumes prior knowledge. Where a technical
 * answer would be ideal but unlikely — brand colours being the obvious one —
 * the form accepts the everyday answer instead: "I like green" is a usable
 * answer and is treated as one.
 *
 * This is deliberately NOT the 34-page Website Project Brief. That document is
 * right for a full custom build. This covers what is needed to build the
 * one-page launch-offer site and nothing beyond it. (It was five pages until
 * 2026-09-23. The "pages" step now asks which sections the page carries, and
 * keeps its field ids so stored briefs and the API don't change shape.)
 */

export type IntakeFieldType = "text" | "email" | "tel" | "textarea" | "radio" | "checkboxes";

export type IntakeField = {
  /** Stable key. Used as the input name, the payload key and the brief heading. */
  id: string;
  /** The question, in plain language. */
  label: string;
  /** Why we ask, or an example. Shown under the label, not as a placeholder. */
  help?: string;
  type: IntakeFieldType;
  required?: boolean;
  /** Characters for text inputs; maximum selections for a checkbox group. */
  max: number;
  options?: readonly string[];
  /** Option name to a CSS colour, so a colour question can show real colour. */
  swatches?: Readonly<Record<string, string>>;
  rows?: number;
  /** Half-width on a wide screen. Full width is the default. */
  half?: boolean;
  /**
   * Show this question only when another answer matches. Keeps the form short
   * for the person filling it in: nobody is asked to paste hex codes after
   * saying they do not have any.
   *
   * A hidden question is never required, on the client or on the server.
   */
  showIf?: { field: string; equals: readonly string[] };
};

export type IntakeSection = {
  id: string;
  number: string;
  title: string;
  intro: string;
  fields: readonly IntakeField[];
};

/**
 * Where brand assets go.
 *
 * The Drive folder is created per client and the link is emailed, so there is
 * no URL to hard-code. While `driveUrl` is empty the page says we email the
 * link, which is what actually happens — rather than printing a dead or
 * bracketed placeholder at a client. Set it only if a single standing upload
 * folder is ever used for everyone.
 */
export const intakeAssets = {
  driveUrl: "",
  heading: "Sending us your logo and photos",
  body: "We email you a private Google Drive folder for your project. Upload your logo, photographs and anything else you have to that folder — it handles big files that email would bounce. You do not need to have uploaded anything before sending this form.",
  items: [
    "Your logo, in the best quality you have. The original file from your designer is ideal.",
    "Photographs of your work, your premises, your products or your team.",
    "Anything already written about your business, such as a flyer or a brochure.",
    "Certificates, registrations or awards you would like shown.",
  ],
} as const;

export const intakeRoute = {
  path: "/launch-offer-intake-form",
  api: "/api/launch-intake",
  title: "Website Launch Offer | Project Form | GoodGround",
  description:
    "The project form for GoodGround's website launch offer. Tell us about your new business so we can build your website.",
} as const;

export const intakeHero = {
  eyebrow: "Website launch offer",
  heading: "Tell us about your business.",
  standfirst:
    "This is everything we need to build your website. It looks long because we would rather ask you once than guess and get it wrong.",
  points: [
    "Most people take 20 to 30 minutes.",
    "Your answers save as you type, so you can close this and come back later.",
    "Only the questions marked with a star are required. Skip anything you are unsure about and we will talk it through.",
    "There are no wrong answers. Write the way you would explain it to a customer.",
  ],
} as const;

export const intakeCopy = {
  progressLabel: "Your progress",
  savedLabel: "Saved",
  savingLabel: "Saving…",
  draftNote:
    "Saved in this browser only. Using a different device or clearing your history will start a blank form.",
  clearDraft: "Clear my answers",
  clearConfirm: "Clear every answer and start again? This cannot be undone.",
  submit: "Send my project form",
  submitting: "Sending…",
  submitSupport:
    "We read every form ourselves. Expect to hear from us within two working days.",
  confirmLabel:
    "The answers above are correct as far as I know, and I am happy for GoodGround to use them to build my website.",
  requiredNote: "Marked with a star",
  optionalNote: "optional",
  success:
    "Thank you. Your project form has reached us and we will be in touch within two working days. If you have not uploaded your logo and photographs yet, you can still do that in your Google Drive folder.",
  failure:
    "Something went wrong sending your form and it did not reach us. Your answers are still here, so please try again in a moment. If it keeps failing, email hello@goodground.co.za and we will sort it out.",
  incomplete:
    "A few required questions still need an answer. They are marked below.",
  chooseUpTo: (n: number) => `Choose up to ${n}.`,
  charsLeft: (n: number) => `${n} characters left`,
} as const;

/**
 * The questions.
 *
 * Ordered the way a conversation would go: who you are, what you do, who buys
 * it, what you want it to look like, what you can give us, and the practical
 * details. Contact details for the footer come late on purpose — they are easy
 * to answer, so they are a gentle end rather than a barrier at the start.
 */
export const intakeSections: readonly IntakeSection[] = [
  {
    id: "you",
    number: "1",
    title: "You and your business",
    intro: "The basics, so we know who we are talking to and what to call your business on the website.",
    fields: [
      { id: "your_name", label: "Your name", type: "text", required: true, max: 100, half: true },
      { id: "email", label: "Email address", type: "email", required: true, max: 254, half: true,
        help: "Where we send everything about your project." },
      { id: "phone", label: "Phone number", type: "tel", required: true, max: 40, half: true },
      { id: "whatsapp", label: "WhatsApp number", type: "tel", max: 40, half: true,
        help: "Only if it is different from the number above." },
      { id: "business_name", label: "Business name", type: "text", required: true, max: 120, half: true,
        help: "Exactly as you want it to appear on the website." },
      { id: "registered_name", label: "Registered company name", type: "text", max: 160, half: true,
        help: "Only if it differs from your trading name. It usually belongs in the small print at the bottom of the site." },
      { id: "business_stage", label: "Where are you right now?", type: "radio", required: true, max: 60,
        options: [
          "Not trading yet, getting ready to open",
          "Just started, trading under six months",
          "Trading six to twelve months",
          "Trading over a year, but never had a website",
        ] },
    ],
  },

  {
    id: "business",
    number: "2",
    title: "What your business does",
    intro: "This becomes the words on your home page, so answer it the way you would say it out loud. Do not worry about making it sound polished — that is our job.",
    fields: [
      { id: "one_liner", label: "In one sentence, what does your business do?", type: "text", required: true, max: 200,
        help: "If someone asked you at a braai, what would you say? For example: “We fix and service air conditioners for homes and small offices in the northern suburbs.”" },
      { id: "what_you_do", label: "Now the longer version", type: "textarea", required: true, max: 1500, rows: 5,
        help: "Explain what you do as if the reader has never heard of your trade. What happens, how long it takes, what they get at the end." },
      { id: "why_started", label: "Why did you start this business?", type: "textarea", max: 1200, rows: 4,
        help: "This is usually the best material for your About page. What made you go out on your own? What do you care about getting right?" },
      { id: "based_in", label: "Which town or suburb are you based in?", type: "text", required: true, max: 120, half: true },
      { id: "service_areas", label: "Which areas do you serve?", type: "text", required: true, max: 300, half: true,
        help: "Helps you show up when someone searches for your trade plus their area." },
      { id: "premises", label: "How do customers deal with you?", type: "radio", required: true, max: 60,
        options: [
          "They come to my premises",
          "I travel to them",
          "Both",
          "Everything is done online or over the phone",
        ] },
    ],
  },

  {
    id: "offer",
    number: "3",
    title: "What you sell",
    intro: "Your services are usually the biggest section of your page. This is what fills it.",
    fields: [
      { id: "services", label: "List everything you offer", type: "textarea", required: true, max: 2500, rows: 8,
        help: "One per line. For each one, a few words on what it is and who it is for. Rough prices if you have them — you can decide later whether those go on the site." },
      { id: "main_service", label: "Which one do you most want more of?", type: "text", required: true, max: 200,
        help: "We build the site around this one. It gets the most space and the clearest path to contacting you." },
      { id: "pricing_display", label: "Do you want prices on the website?", type: "radio", required: true, max: 60,
        options: [
          "Yes, show exact prices",
          "Show “from” prices only",
          "No prices, ask them to enquire",
          "I am not sure, advise me",
        ],
        help: "There is no single right answer. Prices build trust and filter out the wrong enquiries, but they can also date quickly." },
      { id: "not_promoted", label: "Anything you would rather not advertise?", type: "textarea", max: 800, rows: 3,
        help: "Work you take on but do not want more of, or something you are phasing out." },
    ],
  },

  {
    id: "customers",
    number: "4",
    title: "Your customers",
    intro: "A website works when it answers what a customer is already wondering. These answers do more for the finished site than anything else on this form.",
    fields: [
      { id: "customer_who", label: "Describe your typical customer", type: "textarea", required: true, max: 1200, rows: 4,
        help: "Homeowners? Landlords? Other businesses? Young families? Be as specific as you can — “everyone” gives us nothing to aim at." },
      { id: "customer_problem", label: "What problem do they come to you with?", type: "textarea", required: true, max: 1200, rows: 4,
        help: "In their words, not industry words. What has usually gone wrong, or what are they trying to get done?" },
      { id: "customer_worry", label: "What are they nervous about before they commit?", type: "textarea", max: 1200, rows: 4,
        help: "Price? Being overcharged? Whether you will actually arrive? Whether you are qualified? We answer these directly on the site, and it is one of the biggest things that turns a visitor into an enquiry." },
      { id: "why_you", label: "Why should someone choose you over a competitor?", type: "textarea", required: true, max: 1200, rows: 4,
        help: "Be honest and specific. “Good service” is what everyone says. “I answer my own phone and I quote within 24 hours” is worth putting on a website." },
      { id: "main_action", label: "What should a visitor do on your site?", type: "radio", required: true, max: 60,
        options: [
          "Phone me",
          "Message me on WhatsApp",
          "Fill in an enquiry form",
          "Email me",
          "Book a time online",
          "Come to my premises",
        ],
        help: "The main thing. Every page will point at this." },
      { id: "second_action", label: "And a second choice, for people not ready to do that yet?", type: "text", max: 200,
        help: "For example, download a price list, or send a WhatsApp instead of phoning." },
    ],
  },

  {
    id: "references",
    number: "5",
    title: "Websites you like",
    intro: "The fastest way to tell us what you want it to look like is to show us. They do not have to be in your industry, and you do not need to explain it in design terms.",
    fields: [
      { id: "competitors", label: "Who are your main competitors?", type: "textarea", max: 800, rows: 3,
        help: "Names or website addresses. We look at them so your site does not end up looking like theirs." },
      { id: "like_sites", label: "Two or three websites you like", type: "textarea", max: 1200, rows: 4,
        help: "Paste the addresses, and after each one write what you liked. “Clean and easy to read”, “the photos are big”, “I could find the price straight away” are all genuinely useful." },
      { id: "dislike_sites", label: "Any websites you really do not like?", type: "textarea", max: 800, rows: 3,
        help: "Just as useful. What put you off?" },
    ],
  },

  {
    id: "look",
    number: "6",
    title: "Colours and feel",
    intro: "You do not need to know anything about design to answer this. Tell us what you like and we will build something that works.",
    fields: [
      { id: "has_logo", label: "Do you have a logo?", type: "radio", required: true, max: 80,
        options: [
          "Yes, and I have the original file from a designer",
          "Yes, but only a picture of it or a low quality copy",
          "No, I need one",
        ] },
      { id: "has_colours", label: "Do you have set brand colours?", type: "radio", required: true, max: 80,
        options: [
          "Yes, I know the exact colours",
          "I have a rough idea of what I like",
          "No, please choose for me",
        ] },
      { id: "brand_colours", label: "What are they?", type: "textarea", max: 500, rows: 3,
        showIf: { field: "has_colours", equals: ["Yes, I know the exact colours"] },
        help: "If you have codes like #2E1848 or a brand sheet from a designer, paste them here. If you only know them by name that is fine too — “the green from my logo” works." },
      { id: "colour_likes", label: "Which colours would you like on your site?", type: "checkboxes", max: 4,
        options: [
          "Green", "Blue", "Navy", "Teal", "Orange", "Red", "Burgundy",
          "Purple", "Pink", "Yellow", "Earthy browns", "Black and white",
          "Grey", "Cream and beige",
        ],
        swatches: {
          Green: "#2e7d46", Blue: "#1e6fd9", Navy: "#17304f", Teal: "#12796f",
          Orange: "#e8551f", Red: "#c62828", Burgundy: "#7b1d3a", Purple: "#5b2a86",
          Pink: "#d1477a", Yellow: "#e4a11b", "Earthy browns": "#7a5c3e",
          "Black and white": "#1b1b1b", Grey: "#7c7f85", "Cream and beige": "#ddd0b8",
        },
        help: "Pick whatever appeals to you. This is enough for us to build a proper palette around — we do the rest." },
      { id: "colour_avoid", label: "Any colours to stay away from?", type: "text", max: 200,
        help: "A competitor colour, or something you simply dislike." },
      { id: "feel_words", label: "How should your business come across?", type: "checkboxes", required: true, max: 5,
        options: [
          "Professional", "Friendly", "Trustworthy", "Modern", "Traditional",
          "Bold", "Calm", "Premium", "Affordable", "Fun", "Serious",
          "Local and personal", "Technical and expert", "Handmade", "Clean and simple",
        ],
        help: "Choose up to five. These guide the fonts, the spacing and the tone of the writing." },
      { id: "feel_note", label: "Anything else about the look and feel?", type: "textarea", max: 800, rows: 3 },
    ],
  },

  {
    id: "content",
    number: "7",
    title: "Photos, words and proof",
    intro: "What you already have, and what we need to arrange. An honest “I have nothing” is more useful than a maybe, because it tells us to plan for it.",
    fields: [
      { id: "photos", label: "Do you have photographs?", type: "radio", required: true, max: 80,
        options: [
          "Yes, a good set I am happy with",
          "A few, but not many",
          "None yet",
        ] },
      { id: "photos_of", label: "What do they show?", type: "textarea", max: 800, rows: 3,
        showIf: { field: "photos", equals: ["Yes, a good set I am happy with", "A few, but not many"] },
        help: "Finished work, your premises, your team, your products, you at work." },
      { id: "stock_ok", label: "Are you happy for us to use stock photography?", type: "radio", required: true, max: 80,
        options: [
          "Yes, wherever it helps",
          "Only to fill gaps, real photos come first",
          "No, real photos only",
        ],
        help: "Stock fills a gap well, but a real photo of your own work almost always performs better." },
      { id: "written_copy", label: "Have you already written anything about your business?", type: "radio", required: true, max: 80,
        options: [
          "Yes, and I would like it used",
          "Some rough notes",
          "No, please write it for me",
        ],
        help: "Writing it for you is included. Most people choose that." },
      { id: "reviews", label: "Do you have any reviews or testimonials?", type: "textarea", max: 1500, rows: 4,
        help: "Paste them here, or give us a link to your Google or Facebook reviews. Even two or three make a real difference. We only publish what you actually have." },
      { id: "credentials", label: "Qualifications, registrations, guarantees or memberships", type: "textarea", max: 1200, rows: 4,
        help: "Trade registrations, insurance, industry bodies, years of experience, a guarantee you offer. Anything that shows a stranger you are the real thing." },
    ],
  },

  {
    id: "pages",
    number: "8",
    title: "Your page",
    intro: "Your website is one page, built from sections that follow each other as a visitor scrolls. Tick the sections you want. If you tick a lot, we will talk it through and help you choose.",
    fields: [
      { id: "pages_wanted", label: "Which sections do you want?", type: "checkboxes", required: true, max: 9,
        options: [
          "Introduction", "About", "Services", "Gallery of work", "Recent projects",
          "Pricing", "Frequently asked questions", "Testimonials", "Contact",
        ],
        help: "An introduction and a contact section are on nearly every site. Beyond that it depends on what you sell." },
      { id: "pages_note", label: "Anything that must appear in a particular section?", type: "textarea", max: 1200, rows: 4,
        help: "For example a price list in the services section, or a map beside the contact details." },
    ],
  },

  {
    id: "contact",
    number: "9",
    title: "Your details, as they should appear",
    intro: "Exactly what goes on the website itself. Check it carefully — this is what customers will use to reach you.",
    fields: [
      { id: "public_phone", label: "Phone number to show", type: "tel", required: true, max: 40, half: true },
      { id: "public_email", label: "Email address to show", type: "email", required: true, max: 254, half: true,
        help: "If you would like a new address at your own domain, say so in the next section." },
      { id: "show_address", label: "Should your address be on the site?", type: "radio", required: true, max: 80,
        options: [
          "Yes, the full address",
          "Only the suburb or town",
          "No address at all",
        ],
        help: "If you work from home, most people choose the suburb only. A full address helps if customers come to you." },
      { id: "address", label: "The address", type: "textarea", max: 400, rows: 3,
        showIf: { field: "show_address", equals: ["Yes, the full address", "Only the suburb or town"] } },
      { id: "hours", label: "Your opening or working hours", type: "textarea", required: true, max: 500, rows: 3,
        help: "For example: Monday to Friday 8am to 5pm, Saturday 8am to 1pm, closed Sunday. If you take calls after hours, say so." },
      { id: "socials", label: "Your social media pages", type: "textarea", max: 800, rows: 3,
        help: "Paste the full links to Facebook, Instagram, TikTok or LinkedIn. Leave blank if you do not have any yet." },
    ],
  },

  {
    id: "domain",
    number: "10",
    title: "Your web address",
    intro: "Your package includes registering a domain and setting up email on it for the first twelve months.",
    fields: [
      { id: "has_domain", label: "Do you already own a web address?", type: "radio", required: true, max: 80,
        options: [
          "Yes, I own one already",
          "No, please register one for me",
          "I am not sure",
        ] },
      { id: "domain_name", label: "Which web address would you like?", type: "text", max: 200,
        help: "Give us two or three options in case your first choice is taken, for example yourbusiness.co.za." },
      { id: "email_addresses", label: "Which email addresses would you like?", type: "text", max: 300,
        help: "For example info@yourbusiness.co.za, or your own first name. Tell us how many people need one." },
    ],
  },

  {
    id: "final",
    number: "11",
    title: "Last few things",
    intro: "Anything we have not asked that you think we should know.",
    fields: [
      { id: "launch_when", label: "When would you like to be live?", type: "text", max: 150, half: true,
        help: "A date, or as soon as possible." },
      { id: "must_have", label: "Anything that absolutely must be on the site?", type: "textarea", max: 1200, rows: 4,
        help: "A specific photo, a phrase you always use, a promotion you run, a form you need." },
      { id: "anything_else", label: "Anything else at all?", type: "textarea", max: 1500, rows: 4,
        help: "Questions, worries, something about your business that did not fit anywhere above. Nothing is too small." },
    ],
  },
] as const;

/** Every field, flattened. The validator and the brief builder both walk this. */
export const intakeFields: readonly IntakeField[] = intakeSections.flatMap((s) => s.fields);
