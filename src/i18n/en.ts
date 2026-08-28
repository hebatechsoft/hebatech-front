import type { Dictionary, Split } from './es';

/**
 * Inglés.
 *
 * No es una traduccion literal del español: el sitio se apoya en que la
 * serif italica marca el registro MANUAL, y esa palabra no cae en el mismo
 * lugar de la frase en los dos idiomas. Cada titular con `hand` se rehizo
 * para que la pieza en italica siga nombrando trabajo hecho a mano.
 *
 *   es  Lo que hoy haces / a mano, / automatizado.
 *   en  What you still do / by hand, / automated.
 *
 * Los nombres propios no se traducen: Rave, Heba Barber, HEBA. Las cifras
 * tampoco se convierten: el precio de Rave se cobra en pesos colombianos y
 * decir "$2.50 USD" seria inventar una tarifa que no existe.
 */
export const en: Dictionary = {
  meta: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: 'HEBA. Custom software and automation, from Colombia.',
    description:
      'Software studio in Colombia. Custom systems, applied AI and our own products for companies that outgrew their own processes.',
    switchTo: 'Ver en español',
  },

  nav: {
    links: [
      { href: '#productos', label: 'Products' },
      { href: '#enfoque', label: 'Approach' },
      { href: '#servicios', label: 'Services' },
      { href: '#trabajo', label: 'Work' },
    ],
    cta: "Let's talk",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'HEBA, home',
  },

  hero: {
    eyebrow: 'Software studio',
    line1: 'What you still do',
    line2: 'by hand,',
    line3: 'automated.',
    lead: 'We build custom systems and ship our own products for companies that outgrew their own processes.',
    ctaPrimary: "Let's talk",
    ctaSecondary: 'See our products',
  },

  products: {
    eyebrow: 'Our own products',
    title: "We don't only build for clients. We run our own software too.",
    rave: {
      state: 'Live',
      blurb:
        'Inventory, sales, quotes and real-time reports. Already in production, with nine modules, from $10,000 COP a month and a three-day trial.',
      specs: ['Smart inventory', 'Accounts receivable', 'Quotes and dispatch notes', 'POS and CRM'],
      cta: 'Visit Rave',
    },
    barber: {
      state: 'In progress',
      blurb:
        'Bookings, clients and cash for barbershops. Built for the front desk and the phone, between one haircut and the next.',
      specs: ['Bookings with reminders', 'Client history', 'Commission per barber', 'Daily cash close'],
      cta: 'I want early access',
    },
  },

  focus: {
    title: {
      pre: "The problem is never the software. It's ",
      hand: 'the process nobody wrote down.',
    } as Split,
    body1:
      'Almost every company we work with already has a system. It just lives across three spreadsheets, one notebook, and the head of whoever has been there for fifteen years.',
    body2: 'We start by understanding that system before replacing it. Then we write software.',
    steps: [
      {
        title: 'We diagnose',
        body: 'We sit down with the people doing the work today and look at the real process. You leave with a written scope and a closed price.',
        when: '1 week, no cost',
      },
      {
        title: 'We build',
        body: 'Working software in your hands every two weeks. No disappearing for three months and coming back with a surprise.',
        when: 'First usable version in 4 to 6 weeks',
      },
      {
        title: 'We stay',
        body: 'We train your team, adjust whatever reality proves wrong, and stay available after launch.',
        when: 'Ongoing support',
      },
    ],
  },

  services: {
    title: 'When no product solves your problem.',
    lead: 'Three ways to work together. There is no fourth.',
    items: [
      {
        title: 'Custom development',
        body: 'We sit down with the people doing the work, not with whoever signs off from above. That is where the scope comes from, not from a template.',
        note: 'Inventory, traceability, sales management, integrations with what you already use.',
      },
      {
        title: 'Applied AI',
        body: 'Artificial intelligence where it solves something concrete: classifying documents, answering repeated questions, pulling data out of invoices.',
        note: "We don't do AI just to be able to say we do AI.",
      },
      {
        title: 'Automation',
        body: 'That task someone on your team repeats every Tuesday for three hours. We find it, measure it, and turn it into an automatic flow.',
        note: 'We start with the one eating the most time.',
      },
    ],
  },

  voices: {
    title: 'This is how almost every first meeting starts.',
    note: "These are not testimonials. They are the lines we hear most when someone tells us how they work today.",
    phrases: [
      'My inventory lives in three spreadsheets and none of them match.',
      'Orders come in over WhatsApp and one always gets lost.',
      'I close the month a week late. Every month.',
      "If the person who handles the cash is out, nobody knows where anything is.",
      'To find out how much stock we have, I have to go ask someone.',
    ],
  },

  work: {
    eyebrow: 'Work',
    title: 'From four days to minutes.',
    caseTag: 'Medellín · January 2026',
    before: '4 days',
    after: 'Minutes',
    caption: 'Month-end close, before and after.',
    lead: 'Acabados y Estilos en Madera, in Medellín, was tracking sales, inventory, clients and outstanding payments by hand, all in Excel. We built them a custom system to run it from one place, delivered on the estimated timeline. It went live in January 2026: the month-end close that used to take almost four days now takes minutes, all in one click.',
    tag: 'Real case, published with the client’s permission',
  },

  contact: {
    title: {
      pre: 'Tell us what you are ',
      hand: 'still doing by hand.',
    } as Split,
    lead: 'We answer within one business day. You talk straight to whoever is going to build your system, not to a salesperson.',
    place: 'Medellín, Colombia',
    nextTitle: 'What happens next',
    nextSteps: [
      'We answer within one business day. Always a person, never an autoresponder.',
      'Half an hour on a call to understand what is done by hand today and what it costs you.',
      'If we can help, you get a scope and a closed price.',
    ],
    topics: [
      'Rave, I want it in my company',
      'Heba Barber, I want to try it',
      'A custom system',
      'Automating a process',
      "I'm not sure yet, I'd like to talk",
    ],
    form: {
      name: 'Name',
      namePlaceholder: 'What we should call you',
      nameError: 'We need a name to get back to you.',
      email: 'Email',
      emailPlaceholder: 'you@company.com',
      emailError: 'Leave us a valid email so we can reach you.',
      whatsapp: 'WhatsApp (optional)',
      whatsappHelp: 'If you would rather we write you there.',
      whatsappError: 'That number does not look valid.',
      topic: 'What do you need',
      message: 'Tell us a bit',
      messageHelp: 'What is done by hand in your company today.',
      messagePlaceholder: 'For example: every week someone copies WhatsApp orders into a spreadsheet.',
      messageError: 'Give us at least a couple of lines.',
      submit: 'Send',
      sending: 'Sending',
      checkFields: 'Check the marked fields.',
      sendingStatus: 'Sending.',
      ok: 'Done. We answer within one business day.',
      fail: 'We could not send it. Write us directly at {email} or on WhatsApp.',
    },
  },

  footer: {
    tagline: 'Software, made properly',
    blurb: 'Custom systems and our own products for companies that outgrew their own processes.',
    columns: {
      products: 'Products',
      studio: 'Studio',
      contact: 'Contact',
    },
    links: {
      focus: 'Approach',
      services: 'Services',
      work: 'Work',
    },
    rights: 'HEBA Studio, formerly HebaTech. Medellín, Colombia.',
  },

  loader: {
    label: 'Software studio',
  },

  fab: {
    label: 'Message us on WhatsApp',
    message: 'Hi, I would like more information about Heba.',
  },
};
