import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ href: "/index.html" });
  },
  head: () => ({
    meta: [
      { title: "অধ্যাপক ডাঃ এম এ বি সিদ্দিক | কোলোরেক্টাল ও ক্যান্সার সার্জন" },
      {
        name: "description",
        content:
          "অধ্যাপক ডাঃ এম এ বি সিদ্দিক — কোলোরেক্টাল, ব্রেস্ট, এন্ডোল্যাপারোস্কপিক ও ক্যান্সার সার্জন, ঢাকা ও গাজীপুর।",
      },
      { property: "og:title", content: "অধ্যাপক ডাঃ এম এ বি সিদ্দিক | কোলোরেক্টাল ও ক্যান্সার সার্জন" },
      {
        property: "og:description",
        content: "কোলোরেক্টাল, ব্রেস্ট, এন্ডোল্যাপারোস্কপিক ও ক্যান্সার সার্জারিতে বিশেষজ্ঞ। অ্যাপয়েন্টমেন্ট নিন।",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => null,
});
