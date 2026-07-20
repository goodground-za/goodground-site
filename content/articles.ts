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
    slug: "biggest-website-mistakes-south-african-smes-make",
    title: "The biggest website mistakes South African SMEs make (and how to fix them)",
    excerpt:
      "Most small business websites do not fail because they look bad. They fail for duller reasons: nobody can find them, they take too long to load on a phone, and they never ask anyone to do anything.",
    metaTitle: "The Biggest Website Mistakes South African SMEs Make",
    metaDescription:
      "The eight website mistakes that quietly cost South African small businesses enquiries, and what to do about each one. Practical, no jargon.",
    keyword: "small business website mistakes South Africa",
    author: "GoodGround",
    date: "2026-07-20",
    readingMinutes: 9,
    category: "Websites",
    body: [
      {
        type: "p",
        text: "Most small business websites in South Africa are not bad in the way people expect. The colours are fine. The logo is where it should be. Somebody clearly put effort in. And yet the thing sits there quietly for two years without producing a single enquiry, and the owner slowly concludes that websites do not really work for a business like theirs.",
      },
      {
        type: "p",
        text: "They do work. What usually went wrong is duller than bad design. The site cannot be found, or it takes eight seconds to load on a phone with two bars of signal, or it never actually asks the visitor to do anything. These are fixable problems, and most of them are cheaper to fix than owners assume.",
      },
      {
        type: "p",
        text: "Here are the mistakes we see most often, roughly in order of how much damage they do.",
      },

      { type: "h2", text: "1. Building a brochure when you needed a salesperson" },
      {
        type: "p",
        text: "The most common website in South Africa is a digital pamphlet. A homepage with a nice photo, an About page that opens with \"Founded in 2013, we pride ourselves on quality service\", a Services page listing what you do, and a Contact page. Nothing on it is wrong. Nothing on it is working either.",
      },
      {
        type: "p",
        text: "A brochure describes you. A salesperson answers the question the customer actually walked in with. Those are different jobs. Someone landing on your site is usually trying to work out three things in about ten seconds: do these people do the thing I need, can I trust them, and how do I get hold of them. If your homepage opens with your company history, you have answered none of those.",
      },
      {
        type: "p",
        text: "The fix is not more copy. It is usually less, arranged better. Say what you do and who you do it for in the first sentence a visitor reads. Put the proof underneath. Make the next step obvious. You can keep the company history. Just stop leading with it.",
      },

      { type: "h2", text: "2. Nobody can find it" },
      {
        type: "p",
        text: "A surprising number of small business websites are effectively invisible to Google. Not penalised, not blocked, just never given a reason to rank. No page titles that match what people search for, no mention of the towns you actually work in, thin pages that say very little, and no Google Business Profile pointing back at the site.",
      },
      {
        type: "p",
        text: "This matters more here than owners realise, because South Africans search locally and specifically. People do not search \"electrical services\". They search \"electrician Durbanville\" or \"emergency electrician near me\". If the words a customer types never appear anywhere on your site, Google has nothing to match them against, and you never enter the running.",
      },
      {
        type: "p",
        text: "We have written about this side of things in more depth in [why small businesses in South Africa need a website](/insights/why-small-businesses-in-south-africa-need-a-website), including how a Google Business Profile and a real website reinforce each other. The short version: being findable is not a marketing extra you add later. It is part of building the site properly in the first place.",
      },

      { type: "h2", text: "3. It is slow, on exactly the connection your customers are using" },
      {
        type: "p",
        text: "Most South Africans will meet your website on a phone, often on mobile data, sometimes on a patchy signal, occasionally during load shedding on whatever the router is running off. A site that feels snappy on fibre in an office can be genuinely unusable in those conditions.",
      },
      {
        type: "p",
        text: "The usual culprits are boring. Enormous uncompressed images straight off a camera. A page loading six different fonts. A pile of plugins each dragging in scripts nobody needed. A video autoplaying in the background that eats a visitor's data before they have read a word.",
      },
      {
        type: "p",
        text: "People do not send a polite complaint about this. They leave, and you never learn it happened. Speed is not a technical vanity metric. On a slow connection it is the difference between an enquiry and silence.",
      },
      {
        type: "quote",
        text: "Every second your site takes to load is a second a customer is deciding whether to bother.",
      },

      { type: "h2", text: "4. Making people hunt for the way to contact you" },
      {
        type: "p",
        text: "Somebody has read enough. They want to phone you, or send a message, or find out where you are. And now they are hunting. The number is only on the Contact page. The Contact page is a form with eleven fields, three of which are compulsory and one of which asks for a budget range they have not thought about yet.",
      },
      {
        type: "p",
        text: "Every extra step here loses people. Not everybody, but enough to matter over a year.",
      },
      {
        type: "ul",
        items: [
          "Put your phone number in the header where people expect it, and make it tappable on a phone.",
          "Cut the form down to the fields you genuinely need to reply. Name, contact, and what they need is usually enough.",
          "Say what happens after they send it, and how long you take to come back to them.",
          "If you are a local business, put the suburb and area you serve somewhere obvious. People are checking whether you come out to them.",
        ],
      },
      {
        type: "p",
        text: "A form is not a qualification exam. You can ask the rest of your questions once someone is actually talking to you.",
      },

      { type: "h2", text: "5. Not actually owning your own website" },
      {
        type: "p",
        text: "This one is quieter than the rest, and it bites later. A lot of small business sites are built inside a platform where the business does not really own anything. The domain is registered to the agency that built it. The hosting is bundled into a monthly fee nobody can itemise. The site itself only exists inside one builder and cannot be moved anywhere else.",
      },
      {
        type: "p",
        text: "It works fine right up until it does not. The developer stops replying. The monthly fee goes up. You want to move to someone else and discover that moving means rebuilding from scratch, because there is nothing to take with you.",
      },
      {
        type: "p",
        text: "You do not need to be technical to avoid this. You need to be able to answer three questions: whose name is the domain registered in, where is the site hosted, and can you get a copy of it. If the answer to any of those is \"the person who built it knows\", that is worth sorting out now rather than during a disagreement.",
      },

      { type: "h2", text: "6. Launching it and then leaving it" },
      {
        type: "p",
        text: "A website is not a job you finish. It is a thing you own, closer to a bakkie than a billboard. Left alone, it quietly rots. Plugins fall out of date and become a security hole. Prices go stale. The team page still lists someone who left in 2024. A form breaks silently and nobody notices for four months, which means four months of enquiries went nowhere.",
      },
      {
        type: "p",
        text: "That last one is more common than you would think, and it is brutal. The site looks perfectly healthy from the outside while quietly dropping every message someone sends you.",
      },
      {
        type: "p",
        text: "You do not need to touch it weekly. But somebody should be checking that it still loads quickly, that the forms still deliver, and that what it says about your business is still true. If nobody in the business is going to do that, it is worth having someone do it for you. Our [website care plans](/services) exist for exactly this reason.",
      },

      { type: "h2", text: "7. Spending the entire budget on day one" },
      {
        type: "p",
        text: "This one is specific to how websites tend to get bought here. A business saves up, pays a large amount upfront for a site, launches it, and then has nothing left for the twelve months afterwards. No budget for content, none for search visibility, none for fixing the things you only discover once real people start using it.",
      },
      {
        type: "p",
        text: "The result is a site that peaks on launch day and declines from there. Which is the opposite of how it should work, because a website should get more valuable over time as it accumulates pages, search visibility and trust.",
      },
      {
        type: "p",
        text: "This is the whole reason we split every project into twelve equal monthly payments instead of asking for one large invoice before you have seen a page. It is not a payment gimmick. It changes what you can afford to do in the year after launch, which is the year that actually decides whether the site works.",
      },

      { type: "h2", text: "8. Flying blind" },
      {
        type: "p",
        text: "Ask most small business owners how many people visited their website last month and you get a shrug. Which is fair enough, because nobody installed anything to tell them.",
      },
      {
        type: "p",
        text: "Without any measurement you are guessing about everything. You cannot tell whether people are finding you, which pages they actually read, where they give up, or whether the enquiry form is even working. You end up redesigning things on instinct and never knowing if it helped.",
      },
      {
        type: "p",
        text: "Basic analytics takes an afternoon to set up and costs nothing. You do not need dashboards or reports. You mostly need to know three things: how many people are arriving, what they looked at, and how many got in touch. That is enough to make better decisions than a guess.",
      },

      { type: "h2", text: "The short version" },
      {
        type: "p",
        text: "Almost none of these are design problems. They are decisions made early, usually for sensible-sounding reasons, that quietly cost you enquiries for years afterwards.",
      },
      {
        type: "ul",
        items: [
          "Lead with what you do and who you do it for, not your company history.",
          "Use the words your customers actually search for, including the places you work in.",
          "Assume a phone on mobile data, and build for that.",
          "Make contacting you a single obvious step.",
          "Own your domain, your hosting and your content.",
          "Check it regularly, especially that the forms still deliver.",
          "Keep budget for the year after launch, not only the launch.",
          "Measure enough to know whether any of it is working.",
        ],
      },
      {
        type: "p",
        text: "If you recognised your own site in more than two of these, that is normal, and none of it is urgent in the way a burst geyser is urgent. But it is the kind of slow leak that is much easier to fix deliberately than to keep paying for.",
      },
      {
        type: "p",
        text: "If you would rather not work through it alone, [tell us about your business](/start-project) and we will come back with next steps.",
      },
    ],
  },
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
