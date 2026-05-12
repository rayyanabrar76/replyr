export interface VerticalData {
  slug: string
  displayName: string
  headline: string
  subhead: string
  intro: string
  metaTitle: string
  metaDescription: string
  stats: Array<{ value: string; label: string; sub: string }>
  sections: Array<{ h2: string; body: string }>
  faq: Array<{ q: string; a: string }>
}

export const VERTICALS: Record<string, VerticalData> = {
  plumbers: {
    slug: 'plumbers',
    displayName: 'Plumbers',
    headline: 'AI Lead Response for Plumbers',
    subhead: 'Reply to every plumbing inquiry in 30 seconds — emergencies, estimates, and everything in between.',
    intro:
      'Plumbing emergencies don\'t happen on a schedule. A burst pipe at midnight, a water heater that stops working on a Sunday morning, a slow drain that a homeowner finally decides to fix — every one of those leads is a potential job. But if you\'re under a sink, on another call, or asleep, you lose it to the competitor who replied first. Replyr ensures you\'re always first.',
    metaTitle: 'AI Chatbot for Plumbers — Capture Every Lead, Book Every Job',
    metaDescription:
      'Stop losing plumbing leads to slow replies. Replyr responds to plumbing inquiries in 30 seconds, qualifies emergency vs. routine jobs, and books appointments to your Google Calendar.',
    stats: [
      { value: '30s', label: 'Reply time', sub: 'vs. industry avg of 2+ hours' },
      { value: '24/7', label: 'Available', sub: 'including nights and weekends' },
      { value: '60%', label: 'Plumbing calls', sub: 'are emergency or urgent' },
    ],
    sections: [
      {
        h2: 'Emergency plumbing jobs go to whoever replies first',
        body: `When a pipe bursts at 11pm, a homeowner doesn't leave a voicemail and wait. They go online, find three plumbers, message all three, and book the first one to respond. Research consistently shows that 78% of home service leads go to whoever replies first — and the average plumbing business replies in over two hours.

That two-hour gap is where you lose jobs. Not to a better plumber — to a faster one. Replyr closes that gap permanently. From the moment a customer sends a message on your website, your AI agent replies in under 30 seconds, identifies whether it's an emergency, and starts the booking process — whether you're sleeping, on a job site, or driving between calls.

The math is simple: if your average plumbing job is worth $350 and Replyr captures even one extra job per month you would have missed, that's $4,200 in annual revenue from a $99/month tool.`,
      },
      {
        h2: 'Qualify emergency vs. routine before you roll a truck',
        body: `Not every plumbing inquiry needs the same urgency. A customer asking about a slow drain can wait for a scheduled visit. A customer with an active water leak cannot. Replyr is trained to ask the right triage questions — "Is the water actively leaking?" "Have you shut off the main?" "Is the water heater making noise?" — and respond accordingly.

For emergencies, the AI communicates your 24/7 availability and moves straight to booking. For non-emergency work like drain cleaning, fixture replacement, or annual maintenance, it gathers details about the job, confirms your service area, and books a convenient time. Every lead is handled appropriately without you making a single call.

You can also set rules like "always ask if the leak is near electrical" or "mention our no-overtime emergency rate" — giving you control over exactly how leads are handled.`,
      },
      {
        h2: 'You\'re on the job — your AI is at the desk',
        body: `Plumbers can't answer every call while they're working. Under a sink, in a crawl space, or mid-repair, you simply cannot pick up the phone. Traditional answering services are expensive, inconsistent, and can't book appointments or answer specific questions about your business.

Replyr is different. It knows your services (drain cleaning, water heater installation, pipe repair, sewer line inspection — whatever you offer), your service area ZIP codes, your hours, your pricing rules, and your FAQs. It answers exactly as a well-trained front-desk employee would, but faster and at any hour.

Every conversation is logged in your dashboard. When you get back to your truck, you can review new leads, see what the AI said, and follow up with anyone who needs a personal touch. Nothing falls through the cracks.`,
      },
      {
        h2: 'Keep your Google Calendar full automatically',
        body: `Connect Replyr to Google Calendar once during setup. From that point, when a customer agrees to an appointment time through the AI chat, the event is created automatically — no manual entry, no back-and-forth texts. The customer receives a calendar invite to their email.

For plumbers who run their schedule on Google Calendar (or need their dispatcher to have visibility), this means confirmed jobs appear instantly. You wake up to a calendar that already has tomorrow's jobs blocked out, ready to route your day.

Most Replyr customers find that the AI captures several jobs per month that would have otherwise been lost — leads that came in after hours or while the crew was in the field. Over a year, that adds up to real money.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr handle emergency plumbing calls differently from routine requests?',
        a: 'Yes. You can set instructions like "if the customer mentions an active leak, flooding, or sewage backup, tell them we have 24/7 emergency service and prioritize booking." The AI follows your rules and handles each situation appropriately.',
      },
      {
        q: 'What if a customer asks for a price estimate?',
        a: 'You control this. You can tell Replyr "never quote prices over chat — always say we need to assess the job first" or "mention our standard service call fee of $X." The AI sticks to your instructions.',
      },
      {
        q: 'Will it work if I serve multiple ZIP codes?',
        a: 'Yes. Enter your full service area ZIP codes during onboarding. Replyr checks the customer\'s location and politely declines leads outside your area.',
      },
      {
        q: 'Can I take over a conversation if a customer has a complex question?',
        a: 'Yes. Change the lead status to "handed off" in your dashboard and reply directly. The AI steps back and won\'t interfere with your follow-up.',
      },
      {
        q: 'Does it work with my existing website?',
        a: 'One line of code works on any website — WordPress, Wix, Squarespace, custom HTML. If you can paste a snippet of code, you\'re set up in under 5 minutes.',
      },
    ],
  },

  hvac: {
    slug: 'hvac',
    displayName: 'HVAC Companies',
    headline: 'AI Lead Response for HVAC Companies',
    subhead: 'Handle the summer AC rush and winter heating emergencies without missing a single call.',
    intro:
      'HVAC is one of the most time-sensitive businesses in home services. When an AC unit dies in July or a furnace stops working in January, customers need someone fast — and they\'ll call three HVAC companies and book whoever responds first. Replyr ensures you\'re always that company, even during peak season when your phones are already ringing off the hook.',
    metaTitle: 'AI Chatbot for HVAC Companies — Never Miss a Peak-Season Lead',
    metaDescription:
      'Handle summer AC and winter heating emergencies without missing a call. Replyr responds to HVAC leads in 30 seconds, qualifies repair vs. replacement, and books to Google Calendar.',
    stats: [
      { value: '3×', label: 'Lead volume', sub: 'during peak season vs. off-season' },
      { value: '30s', label: 'Reply time', sub: 'vs. 2+ hours without AI' },
      { value: '24/7', label: 'Available', sub: 'nights, weekends, holidays' },
    ],
    sections: [
      {
        h2: 'Peak season hits all at once — your AI handles the overflow',
        body: `Every HVAC company knows what July looks like: the phones ring constantly, every technician is booked days out, and still new leads keep coming. A homeowner whose AC breaks in 90-degree heat will call multiple companies and take whoever responds first with an available slot.

Without AI, this is where HVAC companies leave significant revenue on the table. You can't hire enough staff for peak season alone, and a missed call during a heat wave is a job someone else is getting paid for.

Replyr runs parallel to your team. While your office is handling existing customers and dispatch, the AI is capturing every new lead that hits your website — responding in 30 seconds, qualifying the issue, and filling your next available time slots. During the 11pm heat wave when no one is in the office, Replyr is still working.`,
      },
      {
        h2: 'Qualify service call vs. replacement before you dispatch',
        body: `Not every HVAC call has the same value. A service call on a 3-year-old unit is worth $150-300. A full system replacement is worth $5,000-15,000. The intake process is different for each — and you want to know upfront.

Train Replyr to ask: "How old is your system?" "What's the issue — no cooling, no heat, strange noises?" "Is this the original system or a replacement?" These questions help your dispatcher prioritize and set customer expectations before a technician is ever dispatched.

For replacement leads, the AI can ask about the home's square footage and current system specs, gathering information that allows you to give a more accurate quote when you call back. For service calls, it books straight to your calendar.`,
      },
      {
        h2: 'After-hours is when HVAC equipment breaks',
        body: `Furnaces and AC units have an uncanny ability to fail at the worst possible time — Friday night before a holiday weekend, Sunday morning when your office is closed. These are the moments that define your reputation with a customer. The company that responds at midnight gets the job and the five-star review.

Replyr makes 24/7 response possible without on-call staff. Set it up with your emergency service rules ("we offer after-hours service for heating emergencies — there is a $X emergency fee"), your on-call technician's availability, and the AI handles the customer interaction while you sleep.

You wake up to a dashboard showing exactly what came in overnight: the nature of the call, the customer's system details, whether they accepted the emergency fee, and a booked appointment.`,
      },
      {
        h2: 'Seasonal business needs year-round lead capture',
        body: `HVAC isn't uniformly busy. You have two major peaks and a slower off-season. Many HVAC companies focus heavily on marketing during peak season but let leads slip during off-peak months — maintenance agreements, duct cleaning, system tune-ups, and new construction work that comes in at a slower pace.

Replyr runs the same way whether it's 50 leads a week in July or 5 leads a week in October. Every lead gets the same fast, professional response. This is especially important for maintenance agreement renewals and shoulder-season tune-up calls, which are high-margin and easy to book — but easy to miss when your attention is elsewhere.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr handle both heating and cooling service requests?',
        a: 'Yes. You define your services during onboarding — AC repair, furnace repair, heat pump service, duct cleaning, new installs, maintenance agreements, etc. The AI handles all of them.',
      },
      {
        q: 'Can it communicate an after-hours emergency fee?',
        a: 'Yes. Set an instruction like "for after-hours emergency calls, let the customer know there is a $X emergency dispatch fee and confirm they accept before booking." The AI follows this exactly.',
      },
      {
        q: 'What if we\'re booked out and need to push appointment times?',
        a: 'Replyr books based on your Google Calendar availability. If you\'re booked out 3 days, it books the next available slot. You control your calendar — Replyr just fills it.',
      },
      {
        q: 'Can it ask questions to help us determine if it\'s a repair vs. replacement situation?',
        a: 'Yes. You can add instructions like "ask the customer how old their system is and what issue they\'re experiencing." The AI gathers this during the conversation and it\'s all visible in your dashboard.',
      },
      {
        q: 'Does it work for commercial HVAC as well as residential?',
        a: 'You can configure Replyr for either. If you do both, you can instruct it to ask whether the property is residential or commercial and route or respond accordingly.',
      },
    ],
  },

  roofers: {
    slug: 'roofers',
    displayName: 'Roofers',
    headline: 'AI Lead Response for Roofers',
    subhead: 'Capture every storm-damage and replacement lead before your competitors do.',
    intro:
      'Roofing leads are high-value and highly competitive. After a major storm, hundreds of homeowners in your area are searching for roofers simultaneously — and the contractors who respond first get the jobs. The same is true for replacement leads: a homeowner who starts researching a new roof today won\'t wait two days for a callback. Replyr ensures you\'re always the first roofer to respond.',
    metaTitle: 'AI Chatbot for Roofers — Capture Storm Leads & Book Estimates Fast',
    metaDescription:
      'Never miss a storm-damage or roof replacement lead. Replyr responds to roofing inquiries in 30 seconds, handles insurance questions, qualifies leads, and books estimates to your calendar.',
    stats: [
      { value: '30s', label: 'Reply time', sub: 'vs. 2+ hours industry avg' },
      { value: '$8K', label: 'Avg roofing job', sub: 'value lost when you miss a lead' },
      { value: '24/7', label: 'Available', sub: 'including post-storm surges' },
    ],
    sections: [
      {
        h2: 'Storm season means hundreds of leads hitting at once',
        body: `After a significant hail storm or high-wind event, homeowners in your market all start searching for roofers at the same time. This is a massive opportunity — but also a massive operations challenge. Your phone rings constantly. Your inbox fills up. And you can only talk to one person at a time.

During a storm surge, the roofers who win are the ones who respond to leads fastest and schedule the most inspections. Every lead that doesn't get a response within hours is likely going with a competitor.

Replyr handles unlimited simultaneous conversations. While you're on the phone with one homeowner, your AI is responding to twenty others — qualifying their situation, confirming your availability for inspections, and booking time slots to your Google Calendar. You come back from storm inspections with a calendar full of follow-up appointments already set.`,
      },
      {
        h2: 'Roofing leads need patience — your AI provides it',
        body: `Roofing is a considered purchase. Unlike a burst pipe, a homeowner with a damaged roof will take time to research, get multiple estimates, and compare contractors. The sales cycle is longer, which means the initial response sets the tone for the entire relationship.

Replyr gives every lead a thorough, professional first interaction — even at 11pm when no one is in your office. It explains your inspection process, what to expect from a roof assessment, and how insurance claims work (if you handle storm damage). It captures the customer's contact info and property details, and books the inspection appointment.

A lead that gets a detailed, professional response from "your team" at midnight is far more likely to stick with you through the estimate process than one who sends a form and hears nothing for 24 hours.`,
      },
      {
        h2: 'Handle insurance claim questions without putting your team on the phone',
        body: `A significant portion of roofing leads are insurance-related: storm damage, hail damage, wind damage. These leads often have specific questions about the claims process — "Do you work with insurance companies?" "What does my adjuster need?" "Will I have to pay out of pocket?"

Train Replyr with answers to your most common insurance questions. It can explain your inspection process, what happens during the adjuster visit, how you handle supplements, and whether you offer a deductible assistance program (if you do). It can also capture whether a lead is insurance vs. out-of-pocket, which is useful for prioritizing your follow-up.

No team member needs to be on call to answer these questions at 9pm. The AI handles it and books the inspection.`,
      },
      {
        h2: 'Pre-qualify before every estimate visit',
        body: `A roofing estimate takes time. Before you drive across town, you want to know: Is this a full replacement or a repair? Is it insurance or cash? How old is the current roof? How large is the home? Is the homeowner the decision-maker?

Configure Replyr to ask these questions naturally during the initial conversation. By the time you're looking at a lead in your dashboard, you already have the key qualification data. You know which leads to prioritize, which to follow up personally, and which to let your sales process handle.

This saves your team hours per week and ensures that the appointments you do set are with qualified homeowners who are ready to move forward.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr handle both storm damage and residential replacement leads?',
        a: 'Yes. You can train it with information about both workflows — the storm damage inspection process, how insurance claims work, and the standard replacement estimate process. It handles each type appropriately.',
      },
      {
        q: 'Can it ask whether the lead is insurance vs. cash?',
        a: 'Yes. Add an instruction like "ask whether the damage is from a recent storm and if they\'ll be filing an insurance claim." This information appears in your dashboard for each lead.',
      },
      {
        q: 'How does it handle leads from areas we don\'t service?',
        a: 'Enter your service area ZIP codes and Replyr politely declines out-of-area leads, letting them know you only serve certain locations.',
      },
      {
        q: 'What if we get a surge of leads after a storm — can it handle the volume?',
        a: 'Yes. Replyr handles unlimited simultaneous conversations. Whether 5 or 500 leads come in at once, every one gets a response in under 30 seconds.',
      },
      {
        q: 'Can it communicate our typical lead time for estimates?',
        a: 'Yes. Set instructions like "let customers know we\'re typically able to schedule inspections within 3-5 business days, sooner for active leaks." The AI communicates your real availability.',
      },
    ],
  },

  electricians: {
    slug: 'electricians',
    displayName: 'Electricians',
    headline: 'AI Lead Response for Electricians',
    subhead: 'Electrical emergencies happen at midnight. Be the first electrician to respond.',
    intro:
      'Electrical problems don\'t wait for business hours. A tripped breaker that won\'t reset, flickering lights that suggest a wiring issue, a panel that\'s sparking — these are the calls where homeowners need immediate help and will hire whoever responds fastest. Replyr makes you the fastest electrician in your market, 24 hours a day.',
    metaTitle: 'AI Chatbot for Electricians — Respond to Emergency Calls in 30 Seconds',
    metaDescription:
      'Never miss an electrical emergency lead. Replyr responds to electrician inquiries in 30 seconds, qualifies safety-critical situations, and books appointments to your Google Calendar.',
    stats: [
      { value: '30s', label: 'Reply time', sub: 'faster than any competitor' },
      { value: '24/7', label: 'Available', sub: 'electrical emergencies never wait' },
      { value: '$500+', label: 'Avg job value', sub: 'lost when a lead goes unanswered' },
    ],
    sections: [
      {
        h2: 'Electrical emergencies don\'t wait for business hours',
        body: `A homeowner with a sparking outlet or a breaker that keeps tripping isn't going to wait until 9am to call an electrician. They\'re searching online right now, and they\'re contacting everyone who shows up in local search results.

The electrician who responds first — even if it\'s 10pm on a Tuesday — wins that job. And electrical emergencies tend to be high-value: panel upgrades, rewiring, emergency repairs. The customer is motivated to act immediately.

Replyr responds to every inquiry the moment it arrives. It identifies the nature of the issue, asks whether there\'s an immediate safety concern (sparking, burning smell, no power), communicates your emergency service availability, and books a visit. You don\'t lose a $2,000 panel job because you were already in bed.`,
      },
      {
        h2: 'Ask the right safety questions before you dispatch',
        body: `Electrical issues have a safety dimension that other trades don\'t. Before dispatching a technician, you want to know: Is there a burning smell? Are there visible sparks? Is the power out completely? Are they in the panel box right now?

Configure Replyr with a safety triage protocol. It can ask these questions naturally and, if the situation sounds immediately dangerous, provide basic safety instructions ("if you smell burning, cut power at the main breaker and call us immediately") while routing the conversation to an emergency booking.

For non-emergency inquiries — outlet installation, ceiling fan wiring, EV charger installation — Replyr takes the details and books a standard appointment. Every lead type is handled appropriately.`,
      },
      {
        h2: 'Qualify residential vs. commercial before the estimate',
        body: `Many electricians serve both residential and commercial customers, but the sales process is different. A homeowner wanting a ceiling fan installed and a property manager needing a panel upgrade for a retail space have different needs, different decision timelines, and different qualification criteria.

Replyr can ask upfront whether the property is residential or commercial, the scope of the work, and whether they have existing plans or permits. This data is all in your dashboard before you ever call them back — letting you allocate the right person (a residential tech vs. a commercial estimator) from the start.`,
      },
      {
        h2: 'Win permit and inspection leads before they call someone else',
        body: `Permit-required work — service upgrades, new circuits, EV charger installation, generator hookups — tends to generate multiple estimates from homeowners doing their homework. These leads take days, not hours, to close.

The contractor who reaches out first sets the anchor for the entire comparison process. If you\'re first to respond, first to schedule a site visit, and first to provide a quote, you have a significant advantage over the competitor who emails back two days later.

Replyr captures these leads the moment they submit your contact form and schedules the estimate visit immediately. Your competitor might be just as qualified — but you\'re the one who was there.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr identify potentially dangerous electrical situations?',
        a: 'You can configure it with safety triage questions — "Is there a burning smell?" "Are you seeing sparks?" If a situation sounds dangerous, you can instruct it to provide basic safety guidance and escalate to an emergency booking.',
      },
      {
        q: 'Can I set different responses for emergencies vs. standard requests?',
        a: 'Yes. Set instructions like "if the customer mentions sparks, burning smell, or total power loss, tell them we offer same-day emergency service with a $X emergency fee and prioritize booking." The AI follows your rules.',
      },
      {
        q: 'What about permit and code questions?',
        a: 'You can pre-load FAQs during onboarding: "Do I need a permit for X?" "Will you pull the permit?" "How long does the inspection process take?" The AI answers from your FAQ library.',
      },
      {
        q: 'Can it handle EV charger installation inquiries specifically?',
        a: 'Yes. Add information about your EV charger services — panel requirements, Level 2 installation pricing range, permit process — and the AI can discuss this with leads intelligently.',
      },
      {
        q: 'How do I know what the AI said to each customer?',
        a: 'Every conversation is stored in your dashboard. You can read the complete transcript for any lead at any time.',
      },
    ],
  },

  landscapers: {
    slug: 'landscapers',
    displayName: 'Landscapers',
    headline: 'AI Lead Response for Landscapers',
    subhead: 'Spring comes once. Don\'t lose a single estimate request to a slow reply.',
    intro:
      'Landscaping is a seasonal business where spring lead volume determines your entire year. When homeowners start reaching out in March and April, they\'re contacting multiple landscapers simultaneously — and the ones who respond fastest book the most jobs. Replyr ensures you never miss an estimate request, even when your crew is in the field all day.',
    metaTitle: 'AI Chatbot for Landscapers — Capture Spring Leads & Book Estimates Automatically',
    metaDescription:
      'Stop losing landscaping leads to slow replies. Replyr responds to estimate requests in 30 seconds, qualifies recurring vs. one-time jobs, and books consultations to your Google Calendar.',
    stats: [
      { value: '30s', label: 'Reply time', sub: 'vs. 2+ hours industry avg' },
      { value: '4×', label: 'Spring volume', sub: 'vs. rest of year for most markets' },
      { value: '24/7', label: 'Available', sub: 'your crew never misses a lead' },
    ],
    sections: [
      {
        h2: 'Spring comes once a year — don\'t waste a single lead',
        body: `For most landscaping companies, spring is everything. March through May is when the majority of annual contracts are signed, when estimate requests flood in, and when the busiest customers are making decisions about their yard for the season.

The problem: your crew is in the field. You\'re quoting, planting, mowing, and installing — and new leads are hitting your website that don\'t get a response until the next morning. By then, the homeowner has already booked with another landscaper who replied the same day.

Replyr runs while your crew works. Every new lead gets a response in under 30 seconds, a professional greeting, and a booked estimate consultation — whether you\'re on a job site or asleep. During spring rush, this can mean the difference between a full season of contracts and a half-full schedule.`,
      },
      {
        h2: 'Qualify recurring maintenance vs. one-time project work',
        body: `Landscaping leads fall into two very different categories: recurring maintenance customers (weekly mowing, seasonal cleanup, fertilization programs) and one-time project work (landscape design, hardscaping, tree removal, spring cleanups). Your pricing model, crew allocation, and follow-up process are different for each.

Configure Replyr to ask the right qualifying question early: "Are you looking for ongoing maintenance service, or is this a one-time project?" This simple filter routes leads to the right workflow in your dashboard and ensures you bring the right estimator on a consultation.

Recurring customers are especially valuable — they represent long-term revenue. Replyr can communicate your maintenance packages, recurring pricing, and seasonal programs to help these leads understand your offerings before they even talk to you.`,
      },
      {
        h2: 'Your crew is in the field — not at a desk',
        body: `Landscaping isn\'t an office job. Your team is outdoors, operating equipment, handling clients on-site — not monitoring a contact form or answering a business phone. Without a dedicated office manager (which most small landscaping businesses can\'t afford), leads pile up unanswered.

A standard home services customer expects a response within a few hours. If they don\'t hear from you, they\'ve already called three other landscapers. One line of code on your website changes this entirely: the moment a lead hits your contact form, the AI is there.

Replyr also handles email leads if you point your contact form or forwarding address through it. Both web chat and email leads are captured, responded to, and logged in your dashboard — visible whenever you have a moment to review.`,
      },
      {
        h2: 'Convert estimate requests into confirmed consultations',
        body: `The goal of every lead interaction is to get an estimate on the calendar. A homeowner who reaches out about their yard will get 2-3 estimates and choose among them — you need to be one of those estimates. The more you book, the more you close.

Replyr books estimate consultations directly to your Google Calendar. During onboarding, connect your calendar and set your typical consultation availability (e.g., Tuesdays and Thursdays 8am-5pm). When a lead agrees to a time, the appointment is created automatically and both parties get a confirmation.

Many landscaping companies that use Replyr report booking 20-30% more estimate visits per week — simply because they\'re no longer losing leads during the hours the crew is out.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr handle both maintenance and project inquiries?',
        a: 'Yes. You can define both service types during onboarding and configure the AI to ask which type of service the lead needs, then respond appropriately for each.',
      },
      {
        q: 'Can I tell it my service area so it declines leads outside my range?',
        a: 'Yes. Enter your service ZIP codes and Replyr will politely let out-of-area leads know you\'re not currently serving their location.',
      },
      {
        q: 'What if I need to see the property before I can quote — can Replyr explain that?',
        a: 'Yes. Add an instruction like "all projects require a free in-person estimate before we can provide pricing." Replyr will communicate this and book the estimate visit.',
      },
      {
        q: 'Can it handle leads for a specific service like sod installation or tree removal?',
        a: 'Yes. List all your services during onboarding and the AI will handle specific service inquiries, provide basic information, and book the appropriate consultation.',
      },
      {
        q: 'Does it work for year-round leads or just during spring season?',
        a: 'It works year-round. During slower seasons (fall cleanup, winter snow removal if you offer it), it captures those leads too. You never miss anything regardless of time of year.',
      },
    ],
  },

  'general-contractors': {
    slug: 'general-contractors',
    displayName: 'General Contractors',
    headline: 'AI Lead Response for General Contractors',
    subhead: 'Capture, qualify, and book more project leads — without more office staff.',
    intro:
      'General contracting projects are large decisions that start with a lot of research. A homeowner planning a kitchen remodel or an addition will reach out to multiple contractors before choosing one. The contractor who responds first, qualifies the lead professionally, and schedules a consultation fastest has a significant advantage — regardless of price. Replyr gives you that speed without adding headcount.',
    metaTitle: 'AI Chatbot for General Contractors — Qualify Leads & Book Consultations Fast',
    metaDescription:
      'Stop losing GC leads to slow follow-up. Replyr responds to remodel and renovation inquiries in 30 seconds, qualifies budget and scope, and books consultations to Google Calendar.',
    stats: [
      { value: '30s', label: 'Reply time', sub: 'vs. 2+ hours without AI' },
      { value: '$15K+', label: 'Avg GC project', sub: 'value lost per missed lead' },
      { value: '24/7', label: 'Available', sub: 'leads come in evenings and weekends' },
    ],
    sections: [
      {
        h2: 'Budget qualification: stop chasing leads who won\'t spend',
        body: `General contracting is a time-intensive sales process. Site visits, detailed estimates, and proposal preparation take significant time — and if the homeowner\'s budget doesn\'t match your project minimums, that time is wasted.

Configure Replyr to ask early, natural qualification questions: "What\'s your approximate budget for this project?" "Is this a full renovation or a partial update?" "Are you planning to finance or paying cash?" These questions, asked at the first contact before any site visit, help you prioritize your pipeline.

Leads with budgets below your minimum can be politely informed of your project minimums upfront. Leads with qualifying budgets are fast-tracked to a consultation. Your calendar fills with quality appointments instead of tire-kicker visits.`,
      },
      {
        h2: 'Weekend leads don\'t wait until Monday',
        body: `Homeowners research renovation projects on nights and weekends. That\'s when they have time to browse contractor websites, read reviews, and fill out contact forms. Monday morning, your inbox is full of leads from the weekend — but so is every other contractor\'s.

A lead that came in Saturday night and gets a response Monday morning is a stale lead. The homeowner has already heard from two or three other contractors by then. First impressions matter more in GC work than almost any other trade.

Replyr responds immediately when leads come in Saturday night, Sunday afternoon, or any other time you\'re not in the office. The lead gets a professional response, a sense of your process, and a scheduled consultation time — all before your competitors even open their email Monday morning.`,
      },
      {
        h2: 'From first message to signed estimate: speed wins',
        body: `General contracting has a long sales cycle, but that doesn\'t mean the early stages should be slow. Research shows that contractors who respond within 5 minutes of a lead inquiry are 21x more likely to qualify that lead than those who wait 30 minutes. For contractors who respond hours or days later, conversion rates drop dramatically.

The first response sets the tone for the entire relationship. A fast, professional, detailed response says: "This contractor is organized and responsive." A slow, generic response says: "This contractor is probably too busy or not very organized."

Replyr gives every lead a fast, professional first interaction that reflects well on your business — even when you\'re on a job site or handling a project crisis.`,
      },
      {
        h2: 'Build a pipeline while you\'re on site',
        body: `For most general contractors, the biggest constraint on growth isn\'t finding enough work — it\'s having the capacity to follow up on every lead while managing active projects. You\'re simultaneously running crews, managing subs, dealing with inspections, and handling client questions. New leads fall through the cracks not because you don\'t want the work, but because there are only so many hours in a day.

Replyr handles the initial lead capture and consultation scheduling automatically. By the time you have a moment to check your dashboard, you\'ll find qualified leads with their budget, project scope, and timeline already captured — and a consultation already booked. All you have to do is show up.`,
      },
    ],
    faq: [
      {
        q: 'Can Replyr ask about project budget and scope?',
        a: 'Yes. Configure instructions like "ask the homeowner about their approximate budget and the scope of the project (full renovation, addition, partial update)." This information is captured in every lead record.',
      },
      {
        q: 'What if we have a project minimum — can Replyr communicate that?',
        a: 'Yes. Add an instruction like "our minimum project size is $X — if the customer\'s budget is below this, politely let them know we may not be the right fit." This filters leads before your team wastes time.',
      },
      {
        q: 'Can it handle multiple project types (kitchens, baths, additions, whole-home)?',
        a: 'Yes. List all your project types and specialties during onboarding. The AI discusses each type intelligently and books the appropriate consultation.',
      },
      {
        q: 'Will it work if I primarily get referrals — do I still need this?',
        a: 'Even referral-heavy contractors get online leads from their website and Google Business profile. These leads are highly qualified (they already know you by reputation) and deserves an equally fast response.',
      },
      {
        q: 'How does the Google Calendar booking work for consultations?',
        a: 'Connect your calendar during setup and set your consultation availability. When a lead agrees to a time, Replyr creates the event and sends both parties a confirmation. No manual scheduling.',
      },
    ],
  },
}
