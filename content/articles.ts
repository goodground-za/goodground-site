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
  /** Slugs from content/servicePages.ts, rendered as a "Related services"
   * block at the end of the article (SEO audit 2026-08-16, item 7). */
  relatedServiceSlugs?: string[];
};

export const articles: Article[] = [
  {
    slug: "how-much-does-a-website-cost-in-south-africa",
    title: "How much does a website cost in South Africa? (2026 guide, with real numbers)",
    excerpt:
      "Most website pricing pages hide the number behind a quote form. This one doesn't. Real 2026 prices for DIY builders, freelancers, agencies, and GoodGround's own fixed packages, so you know what you're actually paying for before you enquire.",
    metaTitle: "Website Cost in South Africa: 2026 Guide & Real Prices",
    metaDescription:
      "What does a website actually cost in South Africa? Real 2026 prices from R8,500: DIY builders vs freelancers vs agencies.",
    keyword: "website cost South Africa",
    author: "GoodGround",
    date: "2026-08-13",
    readingMinutes: 10,
    category: "Pricing",
    body: [
      {
        type: "p",
        text: "A custom-coded business website in South Africa costs between R8,500 and R32,000 for a complete, fixed-price build. Most small businesses land between R15,000 and R23,000. A drag-and-drop builder like Wix or Squarespace costs R150 to R500 a month, forever. A freelancer working alone typically charges R5,000 to R15,000, with wide quality variance. A full-service agency charges R30,000 to R150,000 or more, often with a monthly retainer on top.",
      },
      {
        type: "p",
        text: "That's the real range. Nobody else publishes it this plainly, because most studios want you on a call before they say a number. This guide breaks down exactly what decides the price, what GoodGround charges for each package in 2026, and how to avoid paying for the wrong thing.",
      },

      { type: "h2", text: "The short answer: real 2026 price ranges" },
      {
        type: "p",
        text: "Four options exist, and each one trades cost against control. Know which trade you're actually making before you commit to one.",
      },
      {
        type: "ul",
        items: [
          "DIY builder ([Wix](https://www.wix.com/pricing), Squarespace, GoDaddy): R150 to R500 a month. No upfront cost, but you rent the site for as long as you run it, and you build it yourself. Check the provider's own pricing page before committing, plans and currency conversions shift.",
          "Freelancer: R5,000 to R15,000 for a basic build. Cheaper than a studio, but quality, reliability, and support after launch vary enormously from one freelancer to the next.",
          "Small studio, fixed-price and custom-coded: R8,500 to R32,000 for a complete build. One quoted price, no monthly rental, built by a team you can actually hold to a contract.",
          "Large agency or retainer model: R30,000 to R150,000+, frequently with an ongoing monthly fee layered on top of the build cost.",
        ],
      },
      {
        type: "p",
        text: "Cheaper isn't automatically worse, and expensive isn't automatically better. A one-page landing site for a pop-up stall doesn't need R30,000 spent on it. A ten-page site meant to carry a growing business for the next five years shouldn't be built on a R200-a-month template. Match the spend to the job, not to a number that sounded reasonable. We wrote a longer comparison of [what you actually give up with a drag-and-drop builder](/insights/hand-coded-websites-vs-drag-and-drop-builders) if you want the full breakdown.",
      },

      { type: "h2", text: "What actually decides the price" },
      {
        type: "p",
        text: "Every website quote, ours included, comes down to the same handful of variables. Understand these and you'll know exactly why one project costs R8,500 and another costs R32,000, instead of guessing.",
      },
      {
        type: "ul",
        items: [
          "Number of pages. A single-page site costs a fraction of a fifteen-page site, because each page needs its own layout, content, and testing.",
          "Custom code versus a template. A site built from scratch to match your brand costs more than a theme with your logo dropped in, and it looks like it too.",
          "Functionality. A contact form is cheap. A multi-step quote calculator, a booking widget, or a filterable portfolio each add real development hours.",
          "Design complexity. Custom animations, interactive elements, and bespoke illustrations cost more than static layouts, because someone has to build and test the motion, not just the picture.",
          "SEO depth. Basic on-page SEO (titles, headings, meta descriptions) comes standard almost everywhere. Keyword research, schema markup, and site speed optimisation are separate, deeper work.",
          "Copywriting and content. Writing the words that go on the site is a different skill from building it, and it's priced separately almost everywhere, GoodGround included.",
          "Revision rounds and timeline. More rounds of changes cost more time. A rush job compresses everyone's schedule and usually carries a rush fee.",
        ],
      },
      {
        type: "p",
        text: "Two businesses can ask for what sounds like the same thing, a five-page site, and land on very different quotes, because one wants a booking calendar, custom animations, and a blog, while the other wants five plain pages with text and a contact form. The page count was never the real variable. The functionality behind each page is.",
      },

      { type: "h2", text: "How to compare two quotes without getting confused" },
      {
        type: "p",
        text: "A R12,000 quote and a R25,000 quote for what looks like the same project usually aren't quoting the same project at all. Before you compare numbers, compare what's actually inside them.",
      },
      {
        type: "ul",
        items: [
          "Is the design template-based or built from scratch for your brand specifically? A template is cheaper because someone else already did most of the work, for someone else's business.",
          "Is SEO basic (titles and headings) or does it include keyword research, schema markup, and speed optimisation? Those are two different products wearing the same label.",
          "How many rounds of revisions are included, and what happens once you use them up? Extra rounds cost money almost everywhere, but not every quote tells you that upfront.",
          "Does the price include copywriting, or are you expected to supply every word yourself? A quote that looks cheaper often just moved a real cost onto your plate instead of removing it.",
          "Is the number fixed, or does it grow once the project starts? A fixed price agreed before work begins protects you from a final invoice that doesn't match the quote you accepted.",
        ],
      },
      {
        type: "p",
        text: "Ask these five questions of any quote you receive, ours included, and the real comparison becomes obvious fast. Every GoodGround package answers all five on [the pricing page](/pricing#packages) itself, not in a follow-up email after you've already committed.",
      },

      { type: "h2", text: "GoodGround's actual 2026 pricing" },
      {
        type: "p",
        text: "We publish real prices instead of hiding them behind a quote form. Every project is one fixed price, agreed before we start, with no surprise invoice at the end. Here's exactly what's on [our pricing page](/pricing#packages) right now.",
      },
      {
        type: "ul",
        items: [
          "Micro, R8,500: a single-page site, fully custom-coded, with micro-interactions and a working contact form. Built in about a week. Suited to freelancers, pop-ups, and holding pages.",
          "Launch, R15,000: up to 5 pages, custom-coded, with a contact form and basic on-page SEO. About 2 weeks. Suited to a new business that needs a credible presence without the extras.",
          "Grow, R23,000: up to 10 pages including a blog, custom interactive elements, and SEO setup with Analytics and Search Console. 3 to 4 weeks. Suited to a business ready to market itself properly.",
          "Scale, R32,000: 15+ pages, advanced custom functionality, advanced SEO and speed optimisation, plus a training session so you can manage updates yourself. 4 to 6 weeks. Suited to a business that needs the site to be a real sales tool.",
        ],
      },
      {
        type: "p",
        text: "None of these fit your exact scope? Build your own from a R6,000 Base Build Fee (one homepage, one contact form, basic SEO) and add exactly what you need: R2,500 for an extra standard page, R4,000 for a complex custom-layout page, R4,500 to set up a blog, R3,000 for advanced SEO, R1,500 for a form with conditional logic, and dozens more line items, each with a real price attached before you commit to anything. Configure it yourself in the [build-your-own tool](/pricing#build-your-own) and watch the total update as you add or remove items.",
      },

      { type: "h2", text: "Two ways to pay for it" },
      {
        type: "p",
        text: "The price is fixed either way. How you pay it is your choice.",
      },
      {
        type: "ul",
        items: [
          "50% deposit: half upfront secures the project, the other half is due on completion, before handover.",
          "12-month plan: the first instalment secures your booking, and the remaining 11 equal instalments become payable once the project is completed.",
        ],
      },
      {
        type: "p",
        text: "Neither option changes the total. Both exist because a proper website shouldn't force a small business to choose between investing in itself and covering next month's expenses. See exactly how each package breaks down under both plans on [the pricing page](/pricing).",
      },

      { type: "h2", text: "The costs nobody mentions until after you've paid" },
      {
        type: "p",
        text: "A website build price and a website's running cost are two different numbers, and any studio that blurs them is setting you up for a surprise. Hosting, a domain name, and ongoing maintenance sit outside the build price everywhere, GoodGround included. Budget roughly R150 to R300 a year for a .co.za domain and anywhere from R100 to R500 a month for hosting, depending on how much traffic and storage your site needs.",
      },
      {
        type: "p",
        text: "Then there's what happens after launch. Plugins go out of date. Content stops being accurate. Small issues turn into slow load times if nobody's watching. That's what a [Website Care Plan](/services#care-plans) covers: ongoing updates, monitoring, and small content changes, handled monthly instead of piling up until something breaks.",
      },

      { type: "h2", text: "Why the cheapest option often costs more" },
      {
        type: "p",
        text: "A R200-a-month builder looks cheaper than a R23,000 fixed build on the day you sign up. Run the maths past year three and the comparison flips: three years of that subscription is R7,200, and you still don't own the site, still can't take it elsewhere, and still built it yourself with a template everyone else on the platform has access to. A fixed-price build costs more on day one and belongs to you outright from day one too.",
      },
      {
        type: "quote",
        text: "You're not comparing a cheap website to an expensive one. You're comparing rent to ownership.",
      },
      {
        type: "p",
        text: "A cheap freelancer carries a different risk: no company behind the contract, no guarantee they're still answering emails in a year, and support that depends entirely on one person's availability. That's not true of every freelancer, but it's true often enough to weigh against the lower price before you commit. Ask any freelancer quoting you a low number what happens if they're unavailable for a month, or stop freelancing altogether. A one-person operation with no answer to that question is a real risk sitting inside an attractive price.",
      },

      { type: "h2", text: "Quick answers" },
      {
        type: "ul",
        items: [
          "Does the price include hosting and a domain? No. Those are arranged separately from the build price, and we'll point you in the right direction when you enquire.",
          "Is there a deposit? Yes, if you choose that option: 50% upfront, 50% on completion. Or spread the same total over 12 monthly instalments instead.",
          "What if my project needs more than a package includes? Add exactly what you need from the à la carte menu, priced and confirmed before we build it.",
          "How long does a build take? 1 week for Micro, up to 6 weeks for Scale, depending on scope.",
          "How do I get an exact number for my project? Configure your own build in the [pricing configurator](/pricing#build-your-own), or [tell us about your project](/start-project) and we'll come back with a firm quote within 1 to 2 business days.",
        ],
      },
      {
        type: "p",
        text: "A website is one of the few business expenses you can actually price before you commit to it. [See every package and build your own total](/pricing), or [start your project](/start-project) and get a firm number back within two business days.",
      },
    ],
  },
  {
    slug: "website-vs-facebook-page",
    title: "Website vs Facebook page: which one actually grows your business?",
    excerpt:
      "A Facebook page took you an afternoon to build. That speed is exactly the problem. Here's what a website does that a Facebook page structurally cannot, and the order in which the smartest businesses actually use both.",
    metaTitle: "Website vs Facebook Page: Which Grows Your Business?",
    metaDescription:
      "A Facebook page is fast and free. It still can't do half of what a website does for a South African small business. Here's the honest comparison.",
    keyword: "website vs Facebook page South Africa",
    author: "GoodGround",
    date: "2026-08-11",
    readingMinutes: 9,
    category: "Growth",
    body: [
      {
        type: "p",
        text: "Ask ten small business owners why they haven't built a website yet, and most will give you some version of the same answer: I already have a Facebook page. It's a reasonable position. The page took an afternoon to set up, it cost nothing, and people actually comment on the posts. Why pay for a website when Facebook already does the job for free?",
      },
      {
        type: "p",
        text: "Here's the honest answer. A Facebook page and a website are not two versions of the same tool. They do different jobs, and one of those jobs, the one that decides whether a stranger finds you, trusts you, and can actually reach you, is a job a Facebook page cannot do no matter how well you run it. Not because Facebook built a worse product. Because a page inside someone else's platform was never designed to be a business's front door. It was designed to be a stall inside someone else's market.",
      },

      { type: "h2", text: "Give the Facebook page its due" },
      {
        type: "p",
        text: "A Facebook page earns its keep in specific, narrow ways, and pretending otherwise doesn't help anyone make a good decision. It costs nothing to start. It puts you in front of an audience that already exists on the platform. Posting a photo of today's special or an event happening this weekend takes thirty seconds and reaches people who follow you right now. Comments happen in public, which builds a kind of visible social proof a static page can't fake. For fast, low-stakes updates, Facebook is genuinely good at what it does.",
      },
      {
        type: "p",
        text: "None of that is in dispute. The question isn't whether a Facebook page has value. It's whether that value is enough to carry the weight small business owners are quietly asking it to carry: being found by strangers, being trusted by them, and converting that trust into an actual enquiry. On all three, a Facebook page runs into walls it cannot get past, because those walls were built into the platform on purpose.",
      },

      { type: "h2", text: "Google barely knows your Facebook page exists" },
      {
        type: "p",
        text: "Type a service and a suburb into Google, an electrician in Bellville, a caterer in Nelspruit, a physio near me, and look closely at what actually shows up. Real websites. Google Business Profiles. Directory listings. A Facebook page occasionally appears, usually buried well below the businesses that built an actual site, because Google's search results are built to reward sites it can properly read: clean pages, clear headings, content that matches what people are searching for, and a domain that belongs to you specifically.",
      },
      {
        type: "p",
        text: "A Facebook page hands none of that control to you. You cannot set your own page titles the way a website lets you. You cannot structure the page around the exact words a customer searches. You cannot build the ten or twenty pages a website can, each one written to answer a different question a different customer is typing into Google. Facebook decided what a business page looks like, and every business on the platform gets the same shape. We've written before about why [your customers are already searching for you before they ever see your marketing](/insights/why-small-businesses-in-south-africa-need-a-website), and a page that Google mostly can't parse means you're invisible at the exact moment someone typed in exactly what you offer.",
      },
      {
        type: "quote",
        text: "The customer didn't reject you. They never saw you, because Google never showed them a Facebook page instead of a website.",
      },

      { type: "h2", text: "A Facebook-only business reads as a smaller business" },
      {
        type: "p",
        text: "Before anyone pays a deposit or books an appointment, they're running a quiet background check. Is this a real business? Will it still exist next month? Can I trust these people with my money? A website, even a modest one, answers that question in seconds: a clear description of what you do, real photos of real work, a proper way to contact you, maybe a page or two explaining how you operate. It reads as a business that took itself seriously enough to build something.",
      },
      {
        type: "p",
        text: "A Facebook page alone reads differently, whether that's fair or not. It looks like a side project. It looks like something anyone could set up in an afternoon, because that's exactly what it is. Customers comparing you to a competitor with an actual website, even a competitor who does slightly worse work, will often pick the one that looks like it's built to last. Legitimacy is not about spending a fortune on design. It's about having something that looks like yours, not something that looks like a stall inside somebody else's market.",
      },

      { type: "h2", text: "You don't own a Facebook page. You rent it." },
      {
        type: "p",
        text: "This is the one that costs businesses the most, and it costs them quietly enough that most owners never connect the dots. Facebook can change how many of your followers actually see your posts, and it has, repeatedly, over the years, without asking anyone's permission: organic reach for business pages has fallen from roughly 16% when pages first launched to a low single-digit percentage today, according to [HubSpot's tracking of the decline](https://blog.hubspot.com/marketing/facebook-organic-reach-declining). An account can get restricted or suspended over an automated flag with no human to call and no timeline for a fix. The platform's rules, its algorithm, its whole business model, none of it answers to you. You built an audience on ground you don't own, and the landlord can change the terms whenever the landlord wants.",
      },
      {
        type: "p",
        text: "A website doesn't have that problem, because there's no landlord. Your domain is registered in your name. Your content lives on hosting you control. Nobody can throttle how many people see your homepage this month because an algorithm shifted. We called this exact trade-off [rented ground versus land you actually own](/insights/why-small-businesses-in-south-africa-need-a-website) in an earlier piece, and it's worth repeating here in the specific context of Facebook: a page can vanish, get restricted, or simply stop reaching anyone, and you'd have no real recourse. A website is the one piece of your online presence that answers to you and nobody else.",
      },
      {
        type: "ul",
        items: [
          "Your website's domain is registered in your business's name, not a platform account that can be suspended.",
          "A website's reach isn't decided by an algorithm you don't control and can't see inside.",
          "Customer enquiries land in your inbox directly, not inside a platform's messaging system you have to check separately.",
          "Nothing about how your website looks, loads, or is structured depends on decisions Meta makes for reasons that have nothing to do with you.",
        ],
      },

      { type: "h2", text: "A page can't structure a real decision the way a website can" },
      {
        type: "p",
        text: "Most real purchases involve more than one question. What do you actually offer? What does it cost, or roughly what should someone expect to pay? How long does it take? What happens after they get in touch? A Facebook page is built around a feed of posts in chronological order, which is a poor tool for answering a structured set of questions in the order a customer actually needs them answered. Somebody trying to understand your pricing has to scroll backwards through months of unrelated updates hoping you once posted about it.",
      },
      {
        type: "p",
        text: "A website doesn't have that constraint. A dedicated pricing page lays out exactly what something costs and what's included, the way [our own pricing page](/pricing) breaks down fixed packages and a build-your-own option so a visitor never has to guess. A services page explains what you do in the order that makes sense for a stranger, not in the order you happened to post about it. Structure is not a nice-to-have. It's the difference between a visitor finding an answer in ten seconds and a visitor giving up and moving to the next search result.",
      },

      { type: "h2", text: "The right order: website first, Facebook page as the megaphone" },
      {
        type: "p",
        text: "None of this is an argument to delete your Facebook page. It's an argument about which one does the foundational work and which one amplifies it. A website is the destination: the place that actually explains what you do, proves you're legitimate, and gives a visitor a clear way to act. A Facebook page is a megaphone: a way to tell your existing audience about a new post, a promotion, or an update, and point them somewhere that can actually close the sale.",
      },
      {
        type: "p",
        text: "Run it the other way round, all your effort poured into the page and nothing behind it, and you're building an audience you don't own on a platform that answers a question nobody asked. Build the website first, and every Facebook post becomes a lot more valuable, because it's now sending people somewhere built to convert them rather than somewhere built to keep them scrolling.",
      },

      { type: "h2", text: "What this looks like in practice" },
      {
        type: "ul",
        items: [
          "Build the website first. It's the one asset in this list you'll actually own in five years.",
          "Keep the Facebook page. Use it for what it's good at: quick updates, events, and staying visible to people who already know you.",
          "Every post should point somewhere. Link back to the relevant page on your website instead of assuming the post itself has to do all the convincing.",
          "Put your website address in your Facebook bio, not just a phone number. Make the path from platform to owned ground obvious.",
          "Claim your Google Business Profile and link it to your website, not your Facebook page. It's free, and it's often the first thing a local search shows.",
        ],
      },

      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          "A Facebook page is fast, free, and good at quick updates to an audience that already follows you.",
          "It's structurally weak at the three things that actually grow a business: being found by strangers on Google, reading as a legitimate business to someone who's never heard of you, and answering a structured decision in the order a customer needs it answered.",
          "You rent a Facebook page. You own a website. One of those can be restricted or throttled by rules you never agreed to.",
          "The right setup uses both, in order: a website as the foundation, a Facebook page as the megaphone that points people back to it.",
        ],
      },
      {
        type: "p",
        text: "If your business is currently running on a Facebook page and nothing else, that's not a failure. It's a starting point most businesses pass through. The only mistake is staying there longer than you need to. [Tell us about your business](/start-project) and we'll come back with next steps, or have a look at [what a proper build costs](/pricing) before you decide anything.",
      },
    ],
  },
  {
    slug: "website-that-converts-and-grows-with-your-business",
    title: "How to build a website that converts customers and grows with your business",
    excerpt:
      "Most businesses treat conversion and growth as separate problems: marketing worries about one, the developer worries about the other. Build them into the same site from day one and neither costs you customers later.",
    metaTitle: "A Website That Converts Customers and Grows With Your Business",
    metaDescription:
      "Two questions decide whether a website works: does it turn visitors into enquiries, and can it grow without a rebuild? How to get both right.",
    keyword: "website that converts South Africa",
    author: "GoodGround",
    date: "2026-08-03",
    readingMinutes: 7,
    category: "Websites",
    body: [
      {
        type: "p",
        text: "A website has one real job at first: turn a visitor into an enquiry. Six months later it picks up a second job nobody planned for: hold up while the business adds services, pages and traffic on top of it. Most sites are built for the first job and quietly fail the second, because clarity and growth get treated as two separate problems. Marketing owns conversion. The developer owns the code. Nobody owns the point where they meet.",
      },
      {
        type: "p",
        text: "That split is the mistake. A site built to convert today and a site built to grow tomorrow are not two projects. They are the same project, decided at the same wireframe, and the businesses that get this right end up with a site that keeps performing years after launch instead of one that has to be rebuilt the moment it starts working.",
      },

      { type: "h2", text: "Clarity converts. A menu of options doesn't." },
      {
        type: "p",
        text: "Visitors do not convert because a page is clever. They convert because it removes every reason to hesitate. A confused visitor does not ask you a question. They close the tab and try the next result on Google.",
      },
      {
        type: "p",
        text: "Three things do almost all of the work here, and none of them are decoration:",
      },
      {
        type: "ul",
        items: [
          "One obvious next step per page. Not three buttons competing for attention. One.",
          "A first sentence that answers what you do, who it's for, and what happens if they get in touch, before they have to scroll to find out.",
          "Proof placed exactly where the doubt shows up, not buried on a separate page nobody visits.",
        ],
      },
      {
        type: "p",
        text: "Look at how most service pages handle pricing. A page that leads with one clear offer and one clear call to action converts better than a page listing five tiers, four add-ons and a paragraph of fine print. Not because the options are wrong to have. Because a visitor deciding whether to trust a stranger with their money does not want to do maths first.",
      },
      {
        type: "quote",
        text: "A confused visitor doesn't ask a question. They close the tab.",
      },

      { type: "h2", text: "Speed is the first impression, not a technical detail" },
      {
        type: "p",
        text: "Before a visitor reads a word of your copy, the page has already made an argument for or against you: how fast it appeared. A page that loads instantly feels like a business that has its act together. A page that hangs for three seconds on mobile data feels like a warning sign, whether that's fair or not. Google's own [Core Web Vitals guidance](https://web.dev/articles/vitals) treats loading speed, responsiveness, and visual stability as ranking-relevant signals for exactly this reason: a slow page isn't just an annoyance, it's measurably worse at holding on to visitors.",
      },
      {
        type: "p",
        text: "We've written before about why this matters even more on the connections most South Africans are actually using in [the biggest website mistakes South African SMEs make](/insights/biggest-website-mistakes-south-african-smes-make). The short version applies here too: a slow site and a bloated site are usually the same site, and every extra second is a visitor quietly deciding whether you're worth the wait.",
      },
      {
        type: "p",
        text: "The fix is not glamorous. Compress the images. Load only the fonts you're using. Keep the layout stable so a button doesn't jump out from under someone's thumb the moment they go to tap it. None of that shows up in a mockup, and all of it shows up in whether the enquiry actually arrives.",
      },

      { type: "h2", text: "Built to grow, not just built to launch" },
      {
        type: "p",
        text: "A site that converts on day one still has to survive day two hundred, when you add a fourth service, a second location, or a colleague who needs to update a page without breaking the one next to it. Most sites were never built with that day in mind, which is why adding one new page so often means paying someone to carefully avoid breaking three others.",
      },
      {
        type: "p",
        text: "A site built to grow is built on a small number of reusable pieces instead of one-off pages stitched together as they were needed. The same button, the same card, the same heading style, used consistently across the whole site rather than reinvented per page. Content that lives in a structure, not scattered across whatever layout felt right at the time. Get that foundation right once, and adding a new page becomes an afternoon's work instead of a small redesign.",
      },
      {
        type: "ul",
        items: [
          "One set of components reused everywhere, so a new page looks and behaves like the rest of the site automatically.",
          "Content kept in a clear structure, so a new service or location slots in without touching the pages around it.",
          "Patterns simple enough that someone new to the site can add to it safely, without needing to understand the whole codebase first.",
        ],
      },

      { type: "h2", text: "Why we build every GoodGround site this way" },
      {
        type: "p",
        text: "This is the actual argument for [building a site by hand instead of assembling one inside a drag-and-drop builder](/insights/hand-coded-websites-vs-drag-and-drop-builders): a template is sized for an average business doing average things, and it fights you the moment your business needs something specific. A foundation built around your business, not a shared template, is what lets a site handle both jobs at once: converting the visitor in front of it today, and taking on whatever the business needs next year without a rebuild.",
      },
      {
        type: "p",
        text: "It's also why every project comes with a choice in how you pay for it: a 50% deposit and the rest on completion, or 12 monthly instalments. A website that's actually built to grow keeps earning its cost well past launch day, and the way you pay for it should match that.",
      },

      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          "Conversion comes from clarity: one next step, an answer in the first sentence, proof at the point of doubt.",
          "Speed is not a nice-to-have. It's the first thing a visitor judges you on, before they've read anything.",
          "A site built on reusable components and structured content grows by addition, not by rebuild.",
          "Treat conversion and growth as the same project from the first wireframe, and neither one costs you the other later.",
        ],
      },
      {
        type: "p",
        text: "A website that converts today and a website that scales tomorrow are built the same way: on a clear, deliberate foundation. If yours is fighting you on either front, [tell us about your business](/start-project) and we'll come back with next steps.",
      },
    ],
    relatedServiceSlugs: ["ux-design"],
  },
  {
    slug: "hand-coded-websites-vs-drag-and-drop-builders",
    title: "Why hand-coded websites will always beat drag-and-drop website builders",
    excerpt:
      "Drag-and-drop builders win the first afternoon. Hand-coded websites win every day after that. Here's what you're actually trading away for the convenience, and when it does and doesn't matter.",
    metaTitle: "Hand-Coded Websites vs Drag-and-Drop Website Builders",
    metaDescription:
      "Wix, Squarespace and GoDaddy get you online fast, but at a cost you notice later. What hand-coded websites get you that builders can't.",
    keyword: "hand-coded website vs website builder",
    author: "GoodGround",
    date: "2026-07-27",
    readingMinutes: 8,
    category: "Websites",
    body: [
      {
        type: "p",
        text: "Somewhere in the process of shopping for a website, most business owners see two very different numbers. One is a monthly fee from a drag-and-drop builder, small enough to feel like nothing, with a promise that you'll have a live site by the end of the afternoon. The other is a quote from someone who is going to sit down and write the thing by hand, which takes longer and costs more upfront.",
      },
      {
        type: "p",
        text: "On paper the builder looks like the obvious choice. It's cheaper today, it's faster today, and it doesn't require you to trust a stranger with weeks of your time and money. The problem is that a website isn't judged on today. It's judged on the two or three years it sits there working, or not working, for your business. Measured over that stretch, the maths flips completely.",
      },
      {
        type: "p",
        text: "This isn't an argument that drag-and-drop tools are badly made. Wix, Squarespace and GoDaddy's builder are genuinely impressive pieces of software for what they're trying to do. The argument is narrower than that: they're trying to do something different from what most growing businesses actually need, and the gap between the two only shows up once you're living with the result.",
      },

      { type: "h2", text: "What a drag-and-drop builder is actually building" },
      {
        type: "p",
        text: "A builder isn't building your site from scratch when you drag a block onto the page. It's assembling your site out of a fixed set of components that every other customer on that platform is also using, wrapped in code written to handle every possible thing anyone might ever want, not the specific thing you want. Your \"custom\" layout is really a configuration of someone else's system.",
      },
      {
        type: "p",
        text: "That's a reasonable trade when you have no other option. It stops being reasonable once you realise what it costs you: every page loads code for features you're not using, every layout is bent to fit a grid someone else designed, and every change you want to make has to be possible within the builder's menu of options, not just possible in principle.",
      },

      { type: "h2", text: "Page weight, and who actually pays for it" },
      {
        type: "p",
        text: "Because a builder has to support everyone's possible use case at once, it ships a lot of code your visitor never asked for. Widgets for features you've never touched, styling systems layered on top of styling systems, tracking scripts baked in by default. HTTP Archive's [Web Almanac page-weight report](https://almanac.httparchive.org/en/2025/page-weight) puts the median mobile page at over 2MB, most of it images and JavaScript the visitor never chose to load. A hand-coded site ships exactly what that page needs and nothing else, because there was no library of extra features to drag in.",
      },
      {
        type: "p",
        text: "That difference is invisible on fast fibre in an office. It's not invisible on the connection most of your customers are actually using. We've written before about how [most South African website visitors arrive on a phone, often on patchy mobile data](/insights/biggest-website-mistakes-south-african-smes-make), and a bloated page is one of the quietest ways a business loses an enquiry it never even knew it had.",
      },
      {
        type: "quote",
        text: "A builder gives every visitor the code for every feature on the platform. A hand-coded site gives them only the page they asked for.",
      },

      { type: "h2", text: "Design that stops where the template stops" },
      {
        type: "p",
        text: "Every builder has a ceiling, even the good ones. You can rearrange the furniture, but you're still working inside someone else's floor plan. Want a layout that breaks the grid, an interaction that doesn't exist as a pre-built widget, or a page that behaves differently for two kinds of customer? You're either stuck, or you're paying for a third-party plugin that half-works and slows the whole site down further.",
      },
      {
        type: "p",
        text: "Hand-coded work has no ceiling like that, because nothing was pre-built to fight against. If it can be described, it can be built. That matters less for a single static page than it does for a business that's actually trying to differentiate itself from three competitors running the exact same template with different logos in the corner.",
      },

      { type: "h2", text: "SEO you can actually control" },
      {
        type: "p",
        text: "Most builders give you a title field and a description field, and call that SEO. What actually decides whether Google understands and ranks a page goes much deeper: clean heading structure, markup that matches what the page is really about, structured data describing your business correctly, a sitemap that reflects your real pages, and page speed that a stack of unused widgets is actively working against.",
      },
      {
        type: "p",
        text: "A hand-coded site gives you control over every one of those layers, because there's no platform standing between you and the code. That's a big part of why [being findable has to be built into the site from the start rather than bolted on later](/insights/why-small-businesses-in-south-africa-need-a-website), and it's much harder to do properly when the tool you're using was never designed to hand you that level of control in the first place.",
      },

      { type: "h2", text: "Whose website is it, really?" },
      {
        type: "p",
        text: "This is the one that bites hardest, and latest. A site built inside a drag-and-drop platform only exists inside that platform. There's no folder of files you can hand to someone else. If you ever want to leave, and prices do go up, features do get discontinued, accounts do get suspended over nothing, leaving means rebuilding the entire site from scratch somewhere else.",
      },
      {
        type: "p",
        text: "We've covered this trap in more detail in [the biggest website mistakes South African SMEs make](/insights/biggest-website-mistakes-south-african-smes-make), but the short version is worth repeating here: you should always be able to answer who owns the domain, where the site is hosted, and whether you can get a real copy of it. With a hand-coded site those answers are simple, because there's nothing standing between you and your own work.",
      },
      {
        type: "ul",
        items: [
          "Your domain is registered in your business's name, not the builder's account.",
          "The actual code exists as files you can hand to anyone, not a configuration locked inside one platform.",
          "Leaving, if you ever want to, means moving house. It doesn't mean starting over.",
        ],
      },

      { type: "h2", text: "The subscription that never stops" },
      {
        type: "p",
        text: "Builders are rarely sold as one fee. There's the plan itself, then a fee to remove their branding, then a fee for the app that handles bookings, then another for the one that handles forms properly, then a jump to a higher tier once you hit a traffic or feature limit. None of these are large on their own. Stacked over three or four years, they usually add up to more than a proper build would have cost outright.",
      },
      {
        type: "p",
        text: "The difference is what you're left holding at the end. Keep paying a builder for four years and you own nothing you can walk away with. This is exactly why every GoodGround project can be paid off over 12 monthly instalments instead of one large invoice: you get a predictable monthly cost without the ongoing rent, because at the end of it the finished site is genuinely yours.",
      },

      { type: "h2", text: "What happens when the business actually grows" },
      {
        type: "p",
        text: "A template is sized for an average business doing average things. The moment yours needs something specific, a quote calculator, a booking flow that matches how your team actually works, an integration with the system you already use to run the business, the builder either can't do it or forces you into a workaround held together with third-party plugins and hope.",
      },
      {
        type: "p",
        text: "A hand-coded site was never fighting a template to begin with, so it grows the way the business grows. New pages, new functionality and new integrations get added to a foundation that was built to take them, instead of bolted onto a system that was never meant to hold that much weight.",
      },

      { type: "h2", text: "Where a builder is honestly the right call" },
      {
        type: "p",
        text: "None of this means drag-and-drop tools are always the wrong answer. If you're testing an idea before it's a real business, running a market stall for one weekend, or you genuinely have no budget and need something online today, a builder is a sensible stopgap. Nobody should feel bad about starting there.",
      },
      {
        type: "p",
        text: "The distinction worth holding onto is that a builder is a starting point, not a destination. It's fine for the business you have on day one. It quietly becomes the wrong tool for the business you're trying to build, and the businesses that outgrow it fastest are usually the ones actually succeeding.",
      },

      { type: "h2", text: "The short version" },
      {
        type: "ul",
        items: [
          "A builder assembles your site from a shared template. A hand-coded site is built around your business specifically.",
          "Builders ship code for features you don't use. Hand-coded sites load only what the page needs.",
          "Design, SEO and structured data are only fully in your control when there's no platform standing between you and the code.",
          "A builder site only exists inside that platform's account. A hand-coded site is files you actually own.",
          "Monthly builder fees stack up for years and leave you with nothing to show for them. A proper build, paid off monthly, ends with you owning the result outright.",
        ],
      },
      {
        type: "p",
        text: "A drag-and-drop builder will always win the first afternoon. A hand-coded site is built to win every day after that, which is the part that actually decides whether a website helps your business or just sits there costing you a small amount every month for years.",
      },
      {
        type: "p",
        text: "If you've outgrown the template you started with, or you'd rather skip it altogether, [tell us about your business](/start-project) and we'll come back with next steps.",
      },
    ],
    relatedServiceSlugs: ["website-redesign"],
  },
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
        text: "Most South Africans will meet your website on a phone, often on mobile data, sometimes on a patchy signal, occasionally during load shedding on whatever the router is running off. [DataReportal's Digital 2026 South Africa report](https://datareportal.com/reports/digital-2026-south-africa) counts 127 million active mobile connections in the country, nearly double the population, almost all of it on 3G, 4G or 5G rather than fixed lines. A site that feels snappy on fibre in an office can be genuinely unusable in those conditions.",
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
        text: "This is the whole reason every project can be paid off over twelve monthly instalments instead of one large invoice before you have seen a page. It is not a payment gimmick. It changes what you can afford to do in the year after launch, which is the year that actually decides whether the site works.",
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
    relatedServiceSlugs: ["seo", "website-care-plans"],
  },
  {
    slug: "why-small-businesses-in-south-africa-need-a-website",
    title: "Why every small business in South Africa needs a website (and what a good one actually does)",
    excerpt:
      "Word of mouth has a ceiling. Here's why an online presence, built on solid website design, has become the difference between being found and being forgotten for South African small businesses.",
    metaTitle: "Why Small Businesses in South Africa Need a Website",
    metaDescription:
      "Most South African small businesses lose customers before they say a word. Why a good website is now a foundation, not a luxury.",
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
        text: "There is a companion to this that no small business should skip: a [Google Business Profile](https://support.google.com/business/answer/3038063). It is free, it puts you on Google Maps, and it is often the first thing someone sees when they search your name or your trade in your area. But a profile works best pointing at something. When your listing links to a real website that backs up the claim, the two reinforce each other, and you start showing up for the local searches that actually turn into phone calls.",
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
        text: "This is exactly why every GoodGround project offers a choice in how you pay: a 50% deposit and the rest on completion, or twelve equal monthly instalments. A website can sit in your budget like any other business expense, not force you to choose between growing online and covering next month's costs. When the barrier to starting drops, the only expensive option left is standing still while your competitors get found instead of you.",
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
