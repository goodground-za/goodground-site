/**
 * Blog / Insights content. Typed, no CMS (project constraint). Each article's
 * body is an ordered list of blocks the article template renders. Add articles
 * by prepending to `articles` (newest first).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  slug: string;
  title: string;
  /** Listing + meta description. */
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  /** Primary keyword the piece targets. */
  keyword: string;
  author: string;
  /** ISO date. */
  date: string;
  readingMinutes: number;
  category: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "why-small-businesses-in-south-africa-need-a-website",
    title: "Why every small business in South Africa needs a website (and what a good one actually does)",
    excerpt:
      "Word of mouth has a ceiling. Here's why an online presence, built on solid website design, has become the difference between being found and being forgotten for South African small businesses.",
    metaTitle: "Why Small Businesses in South Africa Need a Website",
    metaDescription:
      "Most South African small businesses lose customers before they say a word. Here's why an online presence and good website design in South Africa is now a foundation, not a luxury.",
    keyword: "website design in South Africa",
    author: "GoodGround",
    date: "2026-07-17",
    readingMinutes: 7,
    category: "Growth",
    body: [
      {
        type: "p",
        text: "Ask a small business owner in South Africa where their new customers come from, and the honest answer is usually word of mouth. A referral from a happy client, a name forwarded on WhatsApp, a bakkie someone spotted at a job down the road. That is a real foundation, and it has carried good businesses for decades. But it has a ceiling, and most owners hit it sooner than they expect.",
      },
      {
        type: "p",
        text: "Here is the moment that ceiling shows up. Someone hears your name, they get a little interested, and the very first thing they do is look you up. If nothing comes up, or what comes up is a Facebook page that went quiet in 2019, you have already lost a bit of trust before you have said a single word. Not because your work is bad, but because you are invisible at the exact moment somebody wanted to find you.",
      },
      {
        type: "p",
        text: "A website fixes that. Not a flashy one, not an expensive one, just a proper one. Below is why an online presence has quietly become a foundation for South African small businesses rather than a nice-to-have, and what a website actually needs to do to earn its keep.",
      },

      { type: "h2", text: "Your customers are already searching for you" },
      {
        type: "p",
        text: "South Africans research on their phones before they buy almost anything. A plumber, a dentist, a coffee spot, a company to redo the office network. The pattern is the same: type a few words into Google, add \"near me\" or a suburb, and pick from whatever comes back. If your business is not in those results, you are not in the running. The customer never rejected you. They simply never saw you.",
      },
      {
        type: "p",
        text: "This is what people mean when they talk about being found online, and it is the practical reason website design in South Africa matters so much right now. A website gives Google something to show when your name, or your service and your town, gets typed in. Without one, you are relying on someone already knowing exactly who you are, which defeats the point of trying to grow.",
      },
      {
        type: "p",
        text: "It also cuts both ways. When you do show up, and the page loads quickly and answers the three questions every visitor has, you win business that would otherwise have gone to the competitor who simply turned up in the search first.",
      },
      {
        type: "p",
        text: "There is a companion to this that no small business should skip: a Google Business Profile. It is free, it puts you on Google Maps, and it is often the first thing someone sees when they search your name or your trade in your area. But a profile works best pointing at something. When your listing links to a real website that backs up the claim, the two reinforce each other, and you start showing up for the local searches that actually turn into phone calls.",
      },
      {
        type: "p",
        text: "Reviews sit right alongside this. A handful of genuine Google reviews, visible next to a website that looks the part, is some of the most persuasive proof a small business can have. People trust other people. Your job is to give them somewhere credible to land once that trust is earned.",
      },

      { type: "h2", text: "Social media is rented ground. A website is land you own." },
      {
        type: "p",
        text: "Plenty of businesses lean entirely on a Facebook or Instagram page, and those are useful. But you do not own them. The rules change without warning, the reach you got last year quietly disappears this year, and accounts get suspended over a misunderstanding with no one to call. You are building on ground you rent from a company that can change the terms whenever it likes.",
      },
      {
        type: "p",
        text: "A website is different. It is the one place online that is genuinely yours. Your domain, your content, your customer enquiries landing in your inbox rather than a platform's notifications. Social media is where you catch attention. Your website is where you keep it, and where you send people when you are ready for them to actually do business with you.",
      },

      { type: "h2", text: "A website is proof that you are a real business" },
      {
        type: "p",
        text: "South Africans are cautious online, and rightly so. Before anyone pays a deposit or books a service, they want to know you are legitimate. A clean website with your real work, a proper contact number, an address or service area, and a few honest words about who you are does an enormous amount of quiet reassurance. It says: this is a real business, run by real people, that will still be here next month.",
      },
      {
        type: "p",
        text: "You do not need testimonials from five hundred clients or awards on the wall. You need to look like you take your own business seriously. A competitor with a tidy website and a clear story will win the cautious customer over a better business with no online presence, almost every time.",
      },

      { type: "h2", text: "What good website design in South Africa actually means" },
      {
        type: "p",
        text: "A website that works for a South African small business is not the same as a beautiful showpiece built for a Silicon Valley startup. It has to account for how people here actually get online. Good website design in South Africa means a handful of specific, unglamorous things done well:",
      },
      {
        type: "ul",
        items: [
          "Built mobile-first. Most of your visitors arrive on a phone, often a mid-range Android, so the site has to look right and work perfectly on a small screen before anything else.",
          "Fast and light. Data is expensive and connections are not always strong. A heavy site that takes ten seconds to load loses the visitor and costs them money to wait. Speed is a feature.",
          "Resilient. Between load-shedding and patchy signal, a site hosted properly and kept lean keeps working when a bloated one would crawl.",
          "Local search ready. Your town, your suburb and your service written into the pages so you turn up when someone nearby searches for exactly what you do.",
          "Easy to act on. A phone number you can tap, a WhatsApp link, a short enquiry form. The path from interested to in touch should take one thumb and a few seconds.",
          "Honest about what you do. Clear services, clear pricing approach, no jargon. Confusion is the fastest way to lose a customer who was ready to buy.",
        ],
      },
      {
        type: "p",
        text: "Get those right and you have a website that earns its place. Skip them for the sake of a fancy animation or a trendy layout, and you have an expensive brochure nobody can use.",
      },

      { type: "h2", text: "It works while you sleep, and during load-shedding" },
      {
        type: "p",
        text: "A shop closes at five. A website does not. Someone can find you at eleven at night, read about what you do, and send an enquiry that is waiting for you in the morning. For a small business where the owner is also the salesperson, the technician and the accounts department, that matters. Your website is the one member of the team that never takes a break, never has an off day, and never forgets to mention the payment options.",
      },
      {
        type: "p",
        text: "Every enquiry it captures overnight is a customer you did not have to chase. Over a year, that quietly adds up to real money, from a tool that only had to be built once.",
      },

      { type: "h2", text: "The real cost is not the website. It is not having one." },
      {
        type: "p",
        text: "The usual reason a small business puts this off is money. A proper website used to mean a large invoice landing all at once, which is a hard thing to justify when cash flow is tight and the return is not obvious yet. That maths has changed. The cost of building a good website has come down, and the way you pay for it no longer has to be a single painful lump sum.",
      },
      {
        type: "p",
        text: "This is exactly why we split every GoodGround project into twelve equal monthly payments. A website should sit in your budget like any other monthly business expense, not force you to choose between growing online and covering next month's costs. When the barrier to starting drops, the only expensive option left is standing still while your competitors get found instead of you.",
      },

      { type: "h2", text: "Start with the ground, not the decoration" },
      {
        type: "p",
        text: "If there is one mistake we see again and again, it is treating a website as decoration. Owners ask for something that looks impressive, when what they actually need is something that works: a clear structure, a message a stranger understands in seconds, and an obvious next step. A logo without strategy has little value. A website without purpose rarely performs. The prettiness comes last, once the foundation underneath it is solid.",
      },
      {
        type: "quote",
        text: "Good ground is where seeds take root, grow, and produce a harvest. Businesses work the same way. Build the foundation first, and growth follows.",
      },
      {
        type: "p",
        text: "So before you worry about colours and fonts, get the basics right. Be findable. Be fast. Be clear about what you do and easy to contact. Own the one piece of the internet that is actually yours. Everything else is built on top of that.",
      },

      { type: "h2", text: "The short version" },
      {
        type: "p",
        text: "Word of mouth got you here, and it still matters. But the customers you have not met yet are looking for you online first, and if they cannot find you, they will find someone else. A well-built, honest, fast website is no longer a luxury for South African small businesses. It is the ground the rest of your growth stands on.",
      },
      {
        type: "p",
        text: "If you have been putting yours off, the hardest part is usually just starting. That part, at least, we have made easy.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
