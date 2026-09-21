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
  let n = 100;
  const id = () => `${svc.slug}-${n++}`;

  const points = svc.points
    .map(
      (p) =>
        `                        <li style="margin-bottom:10px; display:flex; gap:10px; align-items:flex-start;"><i class="fas fa-check-circle" style="color:var(--bs-primary); margin-top:4px;"></i><span data-cms-id="${id()}" data-cms-kind="text">${p}</span></li>`,
    )
    .join("\n");

  const head = HEAD.replace('window.CMS_PAGE="service"', `window.CMS_PAGE="${svc.slug}"`).replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${svc.title} - ডা. এম. এ. বি. সিদ্দিক</title>`,
  );

  const body = `
    <!-- page header -->
    <div class="container-fluid page-header py-5 mb-5">
        <div class="container text-center py-5">
            <h1 class="display-4 animated slideInLeft" data-cms-id="${id()}" data-cms-kind="text">${svc.title}</h1>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb justify-content-center animated slideInLeft mb-0">
                    <li class="breadcrumb-item"><a class="text-primary" href="index.html" data-cms-id="${id()}" data-cms-kind="text">Home</a></li>
                    <li class="breadcrumb-item"><a class="text-primary" href="service.html" data-cms-id="${id()}" data-cms-kind="text">Services</a></li>
                    <li class="breadcrumb-item active" aria-current="page" data-cms-id="${id()}" data-cms-kind="text">${svc.en}</li>
                </ol>
            </nav>
        </div>
    </div>

    <!-- intro -->
    <div class="container-fluid py-5">
        <div class="container">
            <div class="row g-5 align-items-center">
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <img class="img-fluid rounded" style="width:100%; object-fit:cover; box-shadow:0 20px 50px rgba(0,0,0,.12);" src="img/about-dr.jpg" alt="${svc.title}" data-cms-id="${id()}" data-cms-kind="image">
                </div>
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.2s">
                    <div style="width:65px; height:65px; border-radius:50%; background:linear-gradient(135deg, #BF9456, #d4a95a); display:flex; align-items:center; justify-content:center; margin-bottom:1.2rem;">
                        <i class="${svc.icon}" style="font-size:1.5rem; color:#fff;"></i>
                    </div>
                    <h1 class="font-dancing-script text-primary" data-cms-id="${id()}" data-cms-kind="text">${svc.en}</h1>
                    <h2 class="mb-4" data-cms-id="${id()}" data-cms-kind="text">${svc.title}</h2>
                    <p class="mb-4" data-cms-id="${id()}" data-cms-kind="text">${svc.intro}</p>
                    <ul style="list-style:none; padding:0; margin:0;">
${points}
                    </ul>
                    <a class="btn btn-primary rounded-pill px-4 py-2 mt-4" href="contact.html" data-cms-id="${id()}" data-cms-kind="text">অ্যাপয়েন্টমেন্ট বুক করুন</a>
                </div>
            </div>
        </div>
    </div>

    <!-- extra details -->
    <div class="container-fluid py-5 bg-light">
        <div class="container">
            <div class="text-center mb-5">
                <h1 class="font-dancing-script text-primary" data-cms-id="${id()}" data-cms-kind="text">বিস্তারিত</h1>
                <h2 class="mb-3" data-cms-id="${id()}" data-cms-kind="text">${svc.title} সম্পর্কে জেনে নিন</h2>
            </div>
            <div class="row g-4">
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.1s">
                    <div style="background:#fff; border-radius:16px; padding:2rem 1.5rem; border:2px dashed rgba(191,148,86,0.25); height:100%;">
                        <h5 data-cms-id="${id()}" data-cms-kind="text">কাদের জন্য প্রযোজ্য</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">যেসব রোগীর এই সমস্যার লক্ষণ দীর্ঘদিন ধরে রয়েছে বা ওষুধে উন্নতি হচ্ছে না, তাদের জন্য এই চিকিৎসা প্রযোজ্য।</p>
                    </div>
                </div>
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.2s">
                    <div style="background:#fff; border-radius:16px; padding:2rem 1.5rem; border:2px dashed rgba(191,148,86,0.25); height:100%;">
                        <h5 data-cms-id="${id()}" data-cms-kind="text">চিকিৎসা প্রক্রিয়া</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">প্রথমে পরীক্ষা-নিরীক্ষার মাধ্যমে রোগ নির্ণয়, এরপর রোগীর অবস্থা অনুযায়ী সবচেয়ে উপযুক্ত পদ্ধতিতে চিকিৎসা করা হয়।</p>
                    </div>
                </div>
                <div class="col-md-4 wow fadeIn" data-wow-delay="0.3s">
                    <div style="background:#fff; border-radius:16px; padding:2rem 1.5rem; border:2px dashed rgba(191,148,86,0.25); height:100%;">
                        <h5 data-cms-id="${id()}" data-cms-kind="text">সুস্থ হতে সময়</h5>
                        <p class="mb-0" data-cms-id="${id()}" data-cms-kind="text">অধিকাংশ রোগী অল্প সময়ের মধ্যেই স্বাভাবিক জীবনে ফিরে যেতে পারেন। নির্দিষ্ট সময় চিকিৎসকের পরামর্শ অনুযায়ী ফলো-আপ প্রয়োজন।</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- videos -->
    <div class="container-fluid py-5">
        <div class="container">
            <div class="text-center mb-4">
                <h1 class="font-dancing-script text-primary" data-cms-id="${id()}" data-cms-kind="text">ভিডিও</h1>
                <h2 class="mb-3" data-cms-id="${id()}" data-cms-kind="text">সম্পর্কিত ভিডিও সমূহ</h2>
            </div>
            <div class="gallery" data-cms-id="${svc.slug}-videos" data-cms-kind="text" data-cms-videos="1">
                <p class="cms-video-empty text-center w-100">এখনো কোনো ভিডিও যুক্ত করা হয়নি।</p>
            </div>
        </div>
    </div>
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
