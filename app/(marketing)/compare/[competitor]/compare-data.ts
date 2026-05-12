export interface ComparisonRow {
  feature: string
  replyr: string | boolean
  competitor: string | boolean
}

export interface CompetitorData {
  slug: string
  name: string
  headline: string
  subhead: string
  metaTitle: string
  metaDescription: string
  intro: string
  whySwitchPoints: Array<{ title: string; body: string }>
  table: ComparisonRow[]
  faq: Array<{ q: string; a: string }>
  verdict: string
}

export const COMPETITORS: Record<string, CompetitorData> = {
  'podium-alternative': {
    slug: 'podium-alternative',
    name: 'Podium',
    headline: 'Replyr vs. Podium',
    subhead: 'A purpose-built contractor tool vs. a generic messaging platform.',
    metaTitle: 'Podium Alternative for Contractors — Replyr vs. Podium',
    metaDescription:
      'Comparing Replyr vs. Podium for home services contractors. See why contractors switch: purpose-built AI, Google Calendar booking, and $99/mo vs. $300+/mo.',
    intro:
      'Podium is a solid general-purpose messaging platform. It helps businesses collect reviews, manage texts, and respond to leads across channels. But "general purpose" is exactly the problem for contractors. Podium wasn\'t built for HVAC companies, plumbers, or roofers — it was built for any local business. That means the AI doesn\'t understand your trade, the workflow doesn\'t optimize for appointment booking to Google Calendar, and you\'re paying 3x more for features you don\'t need.',
    whySwitchPoints: [
      {
        title: 'Built specifically for home services — not any local business',
        body: `Podium serves dentists, auto dealers, salons, and contractors all with the same product. Replyr is built exclusively for home services contractors. The AI agent understands trades vocabulary, knows how to triage plumbing emergencies vs. routine service, qualifies HVAC repair vs. replacement leads, and handles roofing insurance questions — because that's all it does.

When you train your Replyr agent, you're entering information specific to your trade: your services, your service area ZIP codes, your emergency protocol, your pricing rules. The AI speaks to contractors' customers the way a knowledgeable front-desk person at a contracting company would. Not as a generic "business assistant."`,
      },
      {
        title: 'Google Calendar booking is built in — not an add-on',
        body: `One of Replyr's core features is direct Google Calendar integration. When a lead agrees to an appointment time in the AI chat, the event is created on your calendar automatically and the customer gets a confirmation. No additional integration, no Zapier, no manual entry.

Podium's scheduling features are more generic and require additional setup to connect with your calendar. For a contractor whose day is scheduled on Google Calendar, the difference is significant: Replyr's workflow goes from "customer sends message" to "appointment on your calendar" with zero manual steps.`,
      },
      {
        title: '$99/month flat vs. $300+ for features you don\'t need',
        body: `Podium's pricing starts around $300/month for their Essentials plan and scales up from there for additional features, more contacts, or additional locations. For a small contracting business, you're often paying for bulk SMS credits, review management, and payment features that your business may not need.

Replyr is $99/month flat. Everything is included: unlimited AI lead replies, Google Calendar booking, web chat widget, email channel, real-time dashboard, and the ability to train your agent completely. One flat price, no surprises, all the features a contractor actually uses.`,
      },
      {
        title: 'Setup in 5 minutes vs. onboarding calls and implementation',
        body: `Podium is an enterprise-adjacent product. Getting set up often involves sales calls, onboarding sessions, and configuration work. For a solo contractor or small crew, this friction is a barrier.

Replyr's setup is self-serve: sign up, fill in your business information (15 minutes of setup), paste one line of code on your website, and you're live. No sales call required. Most contractors are receiving and responding to leads on the same day they sign up.`,
      },
    ],
    table: [
      { feature: 'Price', replyr: '$99/month flat', competitor: '$300+/month' },
      { feature: 'Built for contractors', replyr: true, competitor: false },
      { feature: 'AI trained on your specific services', replyr: true, competitor: false },
      { feature: 'Google Calendar booking (built-in)', replyr: true, competitor: false },
      { feature: 'Emergency triage for trades', replyr: true, competitor: false },
      { feature: 'Self-serve 5-minute setup', replyr: true, competitor: false },
      { feature: 'Lead qualification questions', replyr: true, competitor: true },
      { feature: 'Web chat widget', replyr: true, competitor: true },
      { feature: 'SMS/text messaging', replyr: false, competitor: true },
      { feature: 'Review management', replyr: false, competitor: true },
      { feature: 'Payment processing', replyr: false, competitor: true },
      { feature: 'Service area filtering', replyr: true, competitor: false },
      { feature: 'Free trial (no credit card)', replyr: true, competitor: false },
    ],
    faq: [
      {
        q: 'Does Replyr offer SMS / text messaging like Podium?',
        a: 'Replyr focuses on web chat and email channels — the two highest-volume lead sources for most contractor websites. SMS is on the roadmap. If text messaging is your primary channel, Podium may be a better fit for that specific feature.',
      },
      {
        q: 'Can I migrate from Podium to Replyr easily?',
        a: 'Yes. You sign up, fill in your business information, and paste the embed code on your website. No data migration is needed — Replyr starts fresh with new leads from the day you go live.',
      },
      {
        q: 'What if I need review management too?',
        a: 'Replyr focuses on lead capture and booking. If you need review management alongside, tools like Google Business Profile\'s built-in review management or a dedicated review tool may serve that need. Replyr doesn\'t try to do everything — it does contractor lead response exceptionally well.',
      },
      {
        q: 'Is Replyr\'s AI as good as Podium\'s AI?',
        a: 'Replyr uses Google Gemini, one of the best available LLMs. More importantly, because Replyr\'s AI is purpose-built for contractor workflows, it handles the specific scenarios your customers present more accurately than a general-purpose assistant.',
      },
    ],
    verdict:
      'If you\'re a home services contractor who needs fast lead response, intelligent qualification, and Google Calendar booking — Replyr is purpose-built for you at a third of Podium\'s price. If you also need SMS messaging and review management in one platform, Podium is broader but more expensive.',
  },

  'hatch-alternative': {
    slug: 'hatch-alternative',
    name: 'Hatch',
    headline: 'Replyr vs. Hatch',
    subhead: 'Inbound AI response from the first message vs. outbound follow-up automation.',
    metaTitle: 'Hatch Alternative for Contractors — Replyr vs. Hatch',
    metaDescription:
      'Comparing Replyr vs. Hatch for home services contractors. Replyr responds to new leads in 30 seconds. Hatch focuses on outbound follow-up. See which fits your needs.',
    intro:
      'Hatch is a strong outbound communication platform for home services — it excels at automating follow-up sequences for leads that are already in your CRM. Replyr solves a different problem: capturing and qualifying brand-new leads the moment they arrive on your website, before they ever become a CRM record. The two tools address different parts of the lead lifecycle, and understanding which gap you need to fill is the key to making the right choice.',
    whySwitchPoints: [
      {
        title: 'Inbound response vs. outbound follow-up: different problems',
        body: `Hatch is designed to help you follow up with existing leads — people who are already in your system, who have already spoken to you, and who need a nudge to convert. It automates the nurture sequence.

Replyr handles what happens before that: the very first contact when someone finds you on Google, visits your website, and sends their first message. If that first message goes unanswered for hours, there's no lead to follow up on — they booked with a competitor. Replyr ensures every first contact gets an immediate, intelligent response.

For contractors who have a lead follow-up problem (lost leads in their CRM who went cold), Hatch is relevant. For contractors who need to capture and qualify incoming leads faster, Replyr is the right tool.`,
      },
      {
        title: 'Simpler setup, faster time to value',
        body: `Hatch is built for businesses with established lead pipelines and existing CRM data. The setup involves integrating with your CRM, configuring sequences, and building workflows — meaningful work that takes time and often requires help.

Replyr is self-serve in under 5 minutes. Sign up, fill in your business details, paste one line of code on your website. You start capturing leads the same day. No CRM integration required, no workflow builder, no onboarding calls.

For small contractors who want to capture and respond to leads without a complex setup, Replyr's simplicity is a significant advantage.`,
      },
      {
        title: '$99/month vs. enterprise pricing',
        body: `Hatch targets home services companies at scale — multi-location businesses, large franchise operations, and businesses with dedicated sales teams. Its pricing reflects that: it's not published openly, but is typically several hundred to thousands of dollars per month.

Replyr is $99/month flat — designed for the solo owner-operator and small crew who needs professional lead response without an enterprise budget. Unlimited leads, all features, no per-seat fees.`,
      },
      {
        title: 'No CRM required to get started',
        body: `Hatch's value depends on having a CRM with existing lead data to work from. If you're not using a CRM, Hatch doesn't have much to offer.

Replyr is completely standalone. Your Replyr dashboard is your lead management system: every lead that comes in via web chat or email is logged, with full conversation history, contact details, and status tracking. You don't need any other software to start capturing and booking leads.`,
      },
    ],
    table: [
      { feature: 'Price', replyr: '$99/month flat', competitor: 'Custom / $300-2000+/mo' },
      { feature: 'Inbound lead capture (website chat)', replyr: true, competitor: false },
      { feature: 'Outbound follow-up sequences', replyr: false, competitor: true },
      { feature: 'Built for contractors', replyr: true, competitor: true },
      { feature: 'Google Calendar booking', replyr: true, competitor: false },
      { feature: 'Self-serve setup (< 5 min)', replyr: true, competitor: false },
      { feature: 'CRM required to use', replyr: false, competitor: true },
      { feature: 'Real-time lead dashboard', replyr: true, competitor: true },
      { feature: 'AI trained on your business', replyr: true, competitor: true },
      { feature: 'Web chat widget', replyr: true, competitor: false },
      { feature: 'Email channel', replyr: true, competitor: true },
      { feature: 'Free trial (no credit card)', replyr: true, competitor: false },
    ],
    faq: [
      {
        q: 'Can I use both Replyr and Hatch together?',
        a: 'Yes — they solve different problems. Replyr captures and qualifies new inbound leads from your website. Hatch follows up with leads already in your CRM. If you have both inbound capture and outbound follow-up gaps, using both is a reasonable approach.',
      },
      {
        q: 'I already use Hatch — does Replyr replace it?',
        a: 'Only if your primary gap is inbound lead capture. Replyr doesn\'t do outbound follow-up automation. If Hatch is working well for your existing lead nurturing, Replyr adds to it by capturing new leads before they enter your pipeline.',
      },
      {
        q: 'Does Replyr integrate with my CRM?',
        a: 'Replyr has a built-in lead dashboard. Direct CRM integration is on the roadmap. For now, leads captured by Replyr can be manually added to your CRM, or you can manage them directly in the Replyr dashboard.',
      },
      {
        q: 'Is Replyr good for companies with large sales teams?',
        a: 'Replyr is designed for small-to-medium contractors — solo operators up to teams of 15-20. For large franchise operations with multiple locations and dedicated sales teams, a more enterprise-grade tool like Hatch may be a better fit.',
      },
    ],
    verdict:
      'Replyr is the better fit if your main problem is "leads hit my website and don\'t get answered fast enough." Hatch is the better fit if your main problem is "I have leads in my CRM that I\'m not following up with consistently enough." If you have both problems, consider using both.',
  },
}
