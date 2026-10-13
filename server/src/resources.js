
export const resources = [
  {
    key: "categories",
    label: "Categories",
    columns: ["name", "sort_order"],
    orderBy: "sort_order ASC, name ASC",
  },
  {
    key: "products",
    label: "Products",
    columns: [
      "slug", "name", "category", "tagline", "taglines", "description",
      "quantity", "weight", "color", "badges", "image_url", "sub_images", "sort_order",
    ],
    jsonColumns: ["badges", "taglines", "sub_images"],
    image: { field: "image", urlColumn: "image_url", idColumn: "image_public_id" },
    subImages: { field: "sub_image_files", column: "sub_images" },
    orderBy: "category ASC, sort_order ASC, id ASC",
  },
  {
    key: "hero-slides",
    table: "hero_slides",
    label: "Hero Slides",
    columns: ["title", "subtitle", "tagline", "cta", "link", "image_url", "overlay_enabled", "overlay_color", "sort_order"],
    boolColumns: ["overlay_enabled"],
    image: { field: "image", urlColumn: "image_url", idColumn: "image_public_id" },
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "news",
    table: "news_items",
    label: "News & Media",
    columns: ["title", "category", "date", "sort_order"],
    orderBy: "sort_order ASC, id DESC",
  },
  {
    key: "jobs",
    label: "Jobs",
    columns: ["title", "location", "type", "dept", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "initiatives",
    label: "Initiatives",
    columns: ["title", "description", "bg", "image_url", "sort_order"],
    image: { field: "image", urlColumn: "image_url", idColumn: "image_public_id" },
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "leadership",
    label: "Leadership",
    columns: [
      "name", "role", "initials", "bio", "image_url",
      "instagram", "twitter", "linkedin", "portfolio",
      "show_instagram", "show_twitter", "show_linkedin", "show_portfolio",
      "sort_order",
    ],
    boolColumns: ["show_instagram", "show_twitter", "show_linkedin", "show_portfolio"],
    image: { field: "image", urlColumn: "image_url", idColumn: "image_public_id" },
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "milestones",
    label: "Milestones",
    columns: ["year", "event", "sort_order"],
    orderBy: "sort_order ASC, year ASC",
  },
  {
    key: "stats",
    label: "Stats",
    columns: ["value", "label", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "sustainability",
    table: "sustainability_pillars",
    label: "Sustainability Pillars",
    columns: ["title", "description", "icon", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "reports",
    label: "Investor Reports",
    columns: ["title", "date", "size", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
  {
    key: "financials",
    label: "Financial Highlights",
    columns: ["metric", "value", "change", "sort_order"],
    orderBy: "sort_order ASC, id ASC",
  },
];

export const getResource = (key) => resources.find((r) => r.key === key);
