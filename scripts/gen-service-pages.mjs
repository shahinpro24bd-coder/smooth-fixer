// Generates the per-service detail pages (and their 2.html edit copies)
// from public/service.html so the nav, footer, styles and scripts always match.
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const src = fs.readFileSync(path.join(PUBLIC_DIR, "service.html"), "utf8");
const lines = src.split("\n");

const headEnd = lines.findIndex((l) => l.trim() === "</head>"); // exclusive of </head>
const bodyStart = lines.findIndex((l) => l.trim() === "<body>");
const navStart = lines.findIndex((l, i) => i > bodyStart && l.trim() === "<!-- nav -->");
const navEnd = lines.findIndex((l, i) => i > navStart && l.trim() === "<!-- nav -->");
const footerStart = lines.findIndex((l) => l.trim() === "<!-- Footer -->");

const HEAD = lines.slice(0, headEnd).join("\n");
const NAV = lines.slice(bodyStart + 1, navEnd + 1).join("\n");
const FOOTER = lines.slice(footerStart).join("\n");

const SERVICES = [
  {
    slug: "service-cancer",
    title: "ক্যান্সার সার্জারি",
    en: "Cancer Surgery",
    icon: "fas fa-ribbon",
    intro:
      "কোলোরেক্টাল, পাকস্থলী, পেটের, হেপাটোবিলিয়ারি ও ব্রেস্ট ক্যান্সারের বিশ্বমানের সার্জারি। রোগ নির্ণয় থেকে শুরু করে অপারেশন ও অপারেশন-পরবর্তী সম্পূর্ণ যত্ন—সবকিছুই একই ছাদের নিচে।",
    points: [
      "পাকস্থলী, কোলন ও রেকটাম ক্যান্সারের সম্পূর্ণ অপসারণ",
      "লিভার ও পিত্তনালীর (হেপাটোবিলিয়ারি) ক্যান্সার সার্জারি",
      "ব্রেস্ট ক্যান্সারের অনকোপ্লাস্টিক সার্জারি",
      "কেমোথেরাপি ও রেডিওথেরাপি টিমের সাথে সমন্বিত চিকিৎসা",
      "অপারেশন-পরবর্তী নিয়মিত ফলো-আপ",
    ],
  },
  {
    slug: "service-laparoscopic",
    title: "ল্যাপারোস্কোপিক সার্জারি",
    en: "Laparoscopic Surgery",
    icon: "fas fa-microscope",
    intro:
      "পেট না কেটে ছোট ছিদ্রের মাধ্যমে আধুনিক ন্যূনতম আক্রমণাত্মক সার্জারি। কম ব্যথা, কম দাগ এবং দ্রুত সুস্থ হয়ে ঘরে ফেরার সুযোগ।",
    points: [
      "পিত্তথলির পাথর (গলব্লাডার) অপসারণ",
      "অ্যাপেন্ডিসাইটিসের অপারেশন",
      "হার্নিয়া মেরামত",
      "ভেরিকোসিল ও হাইড্রোসিলের চিকিৎসা",
      "পেটের টিউমার ও ডায়াগনস্টিক ল্যাপারোস্কোপি",
    ],
  },
  {
    slug: "service-breast",
    title: "ব্রেস্ট সার্জারি",
    en: "Breast Surgery",
    icon: "fas fa-female",
    intro:
      "স্তনের আকৃতি যথাসম্ভব ঠিক রেখে অনকোপ্লাস্টিক ব্রেস্ট সার্জারি ও টিউমার অপারেশন। রোগীর গোপনীয়তা ও মানসিক স্বস্তিকে সর্বোচ্চ গুরুত্ব দেওয়া হয়।",
    points: [
      "ব্রেস্ট ক্যান্সারের আধুনিক অস্ত্রোপচার",
      "অনকোপ্লাস্টিক ও ব্রেস্ট-কনজারভিং সার্জারি",
      "ফাইব্রোএডেনোমা ও অন্যান্য টিউমার অপসারণ",
      "স্তনের ফোঁড়া ও সংক্রমণের চিকিৎসা",
      "এফএনএসি ও বায়োপসির মাধ্যমে রোগ নির্ণয়",
    ],
  },
  {
    slug: "service-colorectal",
    title: "কোলোরেক্টাল ও অ্যানোরেক্টাল",
    en: "Colorectal &amp; Anorectal",
    icon: "fas fa-procedures",
    intro:
      "পাইলস, অ্যানাল ফিসার, ফিস্টুলা ও পেরিএনাল এবসেসের লেজার ও লঙ্গো পদ্ধতিতে অত্যাধুনিক চিকিৎসা। অধিকাংশ ক্ষেত্রেই রোগী একই দিনে বাড়ি ফিরতে পারেন।",
    points: [
      "পাইলসের লেজার ও লঙ্গো (স্ট্যাপলার) সার্জারি",
      "অ্যানাল ফিসারের স্থায়ী সমাধান",
      "ফিস্টুলা-ইন-অ্যানো-এর লেজার চিকিৎসা",
      "পেরিএনাল এবসেস ও পাইলোনিডাল সাইনাস",
      "কোলন ও রেকটামের রোগের সম্পূর্ণ ব্যবস্থাপনা",
    ],
  },
  {
    slug: "service-endoscopy",
    title: "এন্ডোস্কোপি ও কোলোনোস্কোপি",
    en: "Endoscopy &amp; Colonoscopy",
    icon: "fas fa-eye",
    intro:
      "পেট ও কোলনের রোগ নির্ণয়ে আধুনিক এন্ডোস্কোপি ও কোলোনোস্কোপি সুবিধা। প্রয়োজনে একই সময়ে বায়োপসি ও পলিপ অপসারণ করা হয়।",
    points: [
      "আপার জিআই এন্ডোস্কোপি",
      "কোলোনোস্কোপি ও সিগময়েডোস্কোপি",
      "বায়োপসি ও পলিপেকটমি",
      "গিলে ফেলা বিদেশি বস্তু অপসারণ",
      "রক্তক্ষরণ নিয়ন্ত্রণে থেরাপিউটিক এন্ডোস্কোপি",
    ],
  },
  {
    slug: "service-general",
    title: "জেনারেল সার্জারি",
    en: "General Surgery",
    icon: "fas fa-user-md",
    intro:
      "থাইরয়েড, পেট ও নরম টিস্যুর সকল ধরনের অপারেশন অভিজ্ঞ হাতে সম্পন্ন করা হয়। জরুরি ও নির্ধারিত—দুই ধরনের অস্ত্রোপচারের সুবিধা রয়েছে।",
    points: [
      "থাইরয়েড ও গলার গ্রন্থির অপারেশন",
      "পেটের জরুরি ও নির্ধারিত অস্ত্রোপচার",
      "নরম টিস্যুর টিউমার, সিস্ট ও লাইপোমা অপসারণ",
      "ক্ষত ও ডায়াবেটিক ফুটের চিকিৎসা",
      "সকল ধরনের ছোট অস্ত্রোপচার",
    ],
  },
];

function reId(html, slug) {
  return html.replace(/data-cms-id="service-/g, `data-cms-id="${slug}-`);
}

function build(svc) {
  let n = 200;
  const id = () => `${svc.slug}-${n++}`;

  const points = svc.points
    .map(
      (p) =>
        `                        <li><i class="fas fa-check" aria-hidden="true"></i><span data-cms-id="${id()}" data-cms-kind="text">${p}</span></li>`,
    )
    .join("\n");

  const head = HEAD.replace('window.CMS_PAGE="service"', `window.CMS_PAGE="${svc.slug}"`).replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${svc.title} | অধ্যাপক ডাঃ এম এ বি সিদ্দিক</title>`,
  ).replace(
    /<meta\s+content="[^"]*"\s+name="description">/,
    `<meta content="অধ্যাপক ডাঃ এম এ বি সিদ্দিকের তত্ত্বাবধানে ${svc.title}—রোগ নির্ণয়, আধুনিক অস্ত্রোপচার ও ফলো-আপ সেবা সম্পর্কে বিস্তারিত জানুন।" name="description">\n    <meta property="og:title" content="${svc.title} | অধ্যাপক ডাঃ এম এ বি সিদ্দিক">\n    <meta property="og:description" content="${svc.title}—বিশেষজ্ঞ পরামর্শ, আধুনিক চিকিৎসা ও সার্জারি সেবা।">\n    <meta property="og:type" content="website">\n    <meta name="twitter:card" content="summary">`,
  );

  const body = `
    <!-- page header -->
    <header class="container-fluid page-header service-detail-header">
        <div class="container service-detail-header-inner text-center">
            <p class="service-detail-kicker animated slideInLeft" data-cms-id="${id()}" data-cms-kind="text">বিশেষায়িত সার্জারি সেবা</p>
            <h1 class="display-4 animated slideInLeft" data-cms-id="${id()}" data-cms-kind="text">${svc.title}</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-center animated slideInLeft mb-0">
                    <li class="breadcrumb-item"><a href="index.html" data-cms-id="${id()}" data-cms-kind="text">হোম</a></li>
                    <li class="breadcrumb-item"><a href="service.html" data-cms-id="${id()}" data-cms-kind="text">সেবাসমূহ</a></li>
                    <li class="breadcrumb-item active" aria-current="page" data-cms-id="${id()}" data-cms-kind="text">${svc.en}</li>
                </ol>
            </nav>
        </div>
    </header>

    <main>
    <section class="service-detail-intro">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div class="service-detail-portrait">
                        <img src="img/about-dr.jpg" alt="${svc.title} বিশেষজ্ঞ অধ্যাপক ডাঃ এম এ বি সিদ্দিক" data-cms-id="${id()}" data-cms-kind="image">
                        <div class="service-detail-doctor-strip">
                            <strong data-cms-id="${id()}" data-cms-kind="text">অধ্যাপক ডাঃ এম এ বি সিদ্দিক</strong>
                            <span data-cms-id="${id()}" data-cms-kind="text">কোলোরেক্টাল, ব্রেস্ট, এন্ডোল্যাপারোস্কপিক ও ক্যান্সার সার্জন</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.2s">
                    <div class="service-detail-icon">
                        <i class="${svc.icon}" aria-hidden="true"></i>
                    </div>
                    <p class="service-detail-eyebrow" data-cms-id="${id()}" data-cms-kind="text">${svc.en}</p>
                    <h2 data-cms-id="${id()}" data-cms-kind="text">বিশেষজ্ঞের তত্ত্বাবধানে ${svc.title}</h2>
                    <p class="service-detail-lead" data-cms-id="${id()}" data-cms-kind="text">${svc.intro}</p>
                    <ul class="service-detail-list">
${points}
                    </ul>
                    <div class="service-detail-actions">
                        <a class="btn btn-primary rounded-pill px-4 py-3" href="contact.html" data-cms-id="${id()}" data-cms-kind="text">অ্যাপয়েন্টমেন্ট বুক করুন</a>
                        <a class="service-detail-phone" href="tel:+88017101001161"><i class="fas fa-phone-alt" aria-hidden="true"></i><span data-cms-id="${id()}" data-cms-kind="text">০১৭১০-১০০১১৬১</span></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="service-detail-care">
        <div class="container">
            <div class="service-detail-heading text-center">
                <p class="service-detail-eyebrow" data-cms-id="${id()}" data-cms-kind="text">রোগী-কেন্দ্রিক সেবা</p>
                <h2 data-cms-id="${id()}" data-cms-kind="text">পরামর্শ থেকে সুস্থতা—প্রতিটি ধাপে যত্ন</h2>
                <p data-cms-id="${id()}" data-cms-kind="text">সঠিক রোগ নির্ণয়, উপযুক্ত চিকিৎসা পরিকল্পনা এবং নিয়মিত ফলো-আপের মাধ্যমে নিরাপদ ও স্বস্তিদায়ক চিকিৎসা নিশ্চিত করা হয়।</p>
            </div>
            <div class="row g-4 service-detail-steps">
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                    <article class="service-detail-step">
                        <span>01</span><i class="fas fa-notes-medical" aria-hidden="true"></i>
                        <h5 data-cms-id="${id()}" data-cms-kind="text">কাদের জন্য প্রযোজ্য</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">যেসব রোগীর এই সমস্যার লক্ষণ দীর্ঘদিন ধরে রয়েছে বা ওষুধে উন্নতি হচ্ছে না, তাদের জন্য এই চিকিৎসা প্রযোজ্য।</p>
                    </article>
                </div>
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.2s">
                    <article class="service-detail-step">
                        <span>02</span><i class="fas fa-stethoscope" aria-hidden="true"></i>
                        <h5 data-cms-id="${id()}" data-cms-kind="text">চিকিৎসা প্রক্রিয়া</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">প্রয়োজনীয় পরীক্ষা-নিরীক্ষার পর রোগীর বয়স, শারীরিক অবস্থা ও রোগের ধরন অনুযায়ী ব্যক্তিগত চিকিৎসা পরিকল্পনা করা হয়।</p>
                    </article>
                </div>
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.3s">
                    <article class="service-detail-step">
                        <span>03</span><i class="fas fa-heartbeat" aria-hidden="true"></i>
                        <h5 data-cms-id="${id()}" data-cms-kind="text">অপারেশন ও ফলো-আপ</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">নিরাপদ অস্ত্রোপচারের পর সুস্থতার অগ্রগতি পর্যবেক্ষণ, প্রয়োজনীয় পরামর্শ এবং নির্ধারিত ফলো-আপ নিশ্চিত করা হয়।</p>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <section class="service-detail-appointment">
        <div class="container">
            <div class="service-detail-appointment-inner">
                <div>
                    <p class="service-detail-kicker" data-cms-id="${id()}" data-cms-kind="text">বিশেষজ্ঞ পরামর্শ প্রয়োজন?</p>
                    <h2 data-cms-id="${id()}" data-cms-kind="text">আপনার সমস্যা নিয়ে সরাসরি কথা বলুন</h2>
                    <p data-cms-id="${id()}" data-cms-kind="text">রিপোর্ট ও পূর্ববর্তী চিকিৎসার তথ্য সঙ্গে নিয়ে অ্যাপয়েন্টমেন্টে আসুন।</p>
                </div>
                <a class="btn btn-light rounded-pill px-4 py-3" href="contact.html" data-cms-id="${id()}" data-cms-kind="text">চেম্বার ও অ্যাপয়েন্টমেন্ট</a>
            </div>
        </div>
    </section>

    <section class="service-detail-videos">
        <div class="container">
            <div class="service-detail-heading text-center">
                <p class="service-detail-eyebrow" data-cms-id="${id()}" data-cms-kind="text">ভিডিও লাইব্রেরি</p>
                <h2 data-cms-id="${id()}" data-cms-kind="text">${svc.title} সম্পর্কিত ভিডিও</h2>
            </div>
            <div class="gallery" data-cms-id="${svc.slug}-videos" data-cms-kind="text" data-cms-videos="1">
                <p class="cms-video-empty text-center w-100">এখনো কোনো ভিডিও যুক্ত করা হয়নি।</p>
            </div>
        </div>
    </section>
    </main>
`;

  return `${head}</head>
<body>
${reId(NAV, svc.slug)}
${body}
${reId(FOOTER, svc.slug)}`;
}

for (const svc of SERVICES) {
  const page = build(svc);
  const editor = page.replace(
    '<script src="/cms/cms-content.js"></script>',
    '<script src="/cms/cms-content.js"></script>\n<script src="/cms/cms-fonts.js"></script>\n<script src="/cms/cms-editor.js"></script>',
  );
  fs.writeFileSync(path.join(PUBLIC_DIR, `${svc.slug}.html`), page, "utf8");
  fs.writeFileSync(path.join(PUBLIC_DIR, `${svc.slug}2.html`), editor, "utf8");
}

console.log("generated", SERVICES.map((s) => s.slug).join(", "));
