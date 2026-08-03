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
    slug: "website-that-converts-and-grows-with-your-business",
    title: "How to build a website that converts customers and grows with your business",
    excerpt:
      "Most businesses treat conversion and growth as separate problems: marketing worries about one, the developer worries about the other. Build them into the same site from day one and neither costs you customers later.",
    metaTitle: "A Website That Converts Customers and Grows With Your Business",
    metaDescription:
      "Two questions decide whether a website works: does it turn visitors into enquiries, and can it grow without a rebuild? Here's how to get both right from the start.",
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
        text: "Before a visitor reads a word of your copy, the page has already made an argument for or against you: how fast it appeared. A page that loads instantly feels like a business that has its act together. A page that hangs for three seconds on mobile data feels like a warning sign, whether that's fair or not.",
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
        text: "It's also why we split every project into 12 equal monthly payments instead of one invoice before you've seen a single page. A website that's actually built to grow keeps earning its cost well past launch day, and the way you pay for it should match that, not front-load all the risk into month one.",
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
  },
  {
    slug: "hand-coded-websites-vs-drag-and-drop-builders",
    title: "Why hand-coded websites will always beat drag-and-drop website builders",
    excerpt:
      "Drag-and-drop builders win the first afternoon. Hand-coded websites win every day after that. Here's what you're actually trading away for the convenience, and when it does and doesn't matter.",
    metaTitle: "Hand-Coded Websites vs Drag-and-Drop Website Builders",
    metaDescription:
      "Wix, Squarespace and GoDaddy get you online fast, but at a cost you only notice later. Here's what hand-coded websites actually get you that builders can't.",
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
        text: "Because a builder has to support everyone's possible use case at once, it ships a lot of code your visitor never asked for. Widgets for features you've never touched, styling systems layered on top of styling systems, tracking scripts baked in by default. A hand-coded site ships exactly what that page needs and nothing else, because there was no library of extra features to drag in.",
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
        text: "The difference is what you're left holding at the end. Keep paying a builder for four years and you own nothing you can walk away with. This is exactly why we split every GoodGround project into 12 equal monthly payments instead of one large invoice: you get the predictable monthly cost without the ongoing rent, because at the end of it the finished site is genuinely yours.",
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
