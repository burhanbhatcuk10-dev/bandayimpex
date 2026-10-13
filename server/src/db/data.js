
const D = {
  biscuit:
    "A crunchy, delightful treat baked to perfection — the ideal companion for your tea-time and anytime snacking. Made with wholesome ingredients and the taste India has trusted for generations.",
  dairy:
    "Wholesome dairy goodness crafted with care. Rich, fresh and packed with nutrition to add a little joy to every meal and every moment of the day.",
  snack:
    "A light, indulgent snack that's perfect to pop anytime, anywhere. A crispy, tasty bite that brings a smile with every mouthful.",
  cake:
    "Soft, moist and freshly baked to melt in your mouth. A slice of happiness for celebrations big and small, made with love and quality.",
  rusk:
    "Crisp, light and perfectly baked — the ideal partner for your chai. A wholesome crunch that turns every tea break into a treat.",
  bread:
    "Freshly baked, soft and wholesome bread to start your day right. Made from quality ingredients for the goodness your family deserves.",
  bar:
    "A nutritious, high-fibre bar to fuel your day the healthy way. Wholesome goodness on the go, without compromising on taste.",
};

const B = {
  biscuit: ["100% VEGETARIAN", "CRUNCHY BISCUIT"],
  dairy: ["100% VEGETARIAN", "SOURCE OF CALCIUM"],
  snack: ["100% VEGETARIAN", "BAKED GOODNESS"],
  cake: ["100% VEGETARIAN", "SOFT & FRESH"],
  rusk: ["100% VEGETARIAN", "CRISPY & LIGHT"],
  bread: ["100% VEGETARIAN", "FRESHLY BAKED"],
  bar: ["100% VEGETARIAN", "HIGH FIBRE"],
};

export const categories = [
  "BISCUITS",
  "DAIRY",
  "SNACKING",
  "CAKES",
  "RUSK",
  "BREADS",
  "NUTRITIOUS BARS",
];

export const heroSlides = [
  {
    title: "Exciting Goodness In Every Bite",
    subtitle: "Delighting India for over a Century",
    tagline: "Eat Healthy, Think Better",
    cta: "Explore Brands",
    link: "/products",
    image_url:
      "https://images.unsplash.com/photo-1619201238590-4d45d078fec5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxiaXNjdWl0cyUyMGNvb2tpZXN8ZW58MHx8fHwxNzgzODE4MzU3fDA&ixlib=rb-4.1.0&q=85",
  },
  {
    title: "Celebrating Every Occasion",
    subtitle: "Sweetening moments across generations",
    tagline: "Bharat Ki BIPL",
    cta: "Discover Our Story",
    link: "/about",
    image_url:
      "https://images.pexels.com/photos/36236282/pexels-photo-36236282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    title: "Trusted By Families",
    subtitle: "Nutrition, Taste and Care in every pack",
    tagline: "Since 1892",
    cta: "Learn More",
    link: "/about",
    image_url:
      "https://images.unsplash.com/photo-1761933806608-87e8cae7c0fa?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxmYW1pbHklMjB0ZWElMjB0aW1lfGVufDB8fHx8MTc4MzgxODM1N3ww&ixlib=rb-4.1.0&q=85",
  },
];

// category -> products
export const products = {
  BISCUITS: [
    { slug: "marie-gold", name: "Marie Gold", tagline: "India's favourite tea-time biscuit", taglines: ["India's favourite tea-time biscuit", "Light. Crisp. Wholesome.", "Goodness of wheat in every bite"], quantity: "Pack of 12", weight: "250 g", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1551584277-a31a25e08fc8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", sub_images: ["https://images.unsplash.com/photo-1558961363-fa8fdf82db35?crop=entropy&cs=srgb&fm=jpg&w=600&q=85", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=srgb&fm=jpg&w=600&q=85", "https://images.unsplash.com/photo-1585329678734-285d3adee73c?crop=entropy&cs=srgb&fm=jpg&w=600&q=85"], color: "#e7ebf3" },
    { slug: "good-day", name: "Good Day", tagline: "Smile More, Live More", taglines: ["Smile More, Live More", "Buttery, crunchy & irresistible"], quantity: "Pack of 6", weight: "100 g", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxjb29raWVzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", sub_images: ["https://images.unsplash.com/photo-1558961363-fa8fdf82db35?crop=entropy&cs=srgb&fm=jpg&w=600&q=85", "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=srgb&fm=jpg&w=600&q=85"], color: "#e7ebf3" },
    { slug: "bourbon", name: "Bourbon", tagline: "The Original Chocolate Cream Biscuit", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1619201238590-4d45d078fec5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxiaXNjdWl0cyUyMGNvb2tpZXN8ZW58MHx8fHwxNzgzODE4MzU3fDA&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "milk-bikis", name: "Milk Bikis", tagline: "Doodh Roti Ki Shakti", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxjb29raWVzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "nutrichoice", name: "NutriChoice", tagline: "Eat Healthy, Think Better", description: D.biscuit, badges: ["100% VEGETARIAN", "HIGH FIBRE"], image_url: "https://images.pexels.com/photos/5847103/pexels-photo-5847103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", color: "#e7ebf3" },
    { slug: "tiger", name: "Tiger", tagline: "Power to become anything", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxjb29raWVzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "treat", name: "Treat", tagline: "Full of Fun", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1748765968997-ba9bae9cfd7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHw0fHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "50-50", name: "50-50", tagline: "Perfect Balance of Sweet & Salty", description: D.biscuit, badges: B.biscuit, image_url: "https://images.unsplash.com/photo-1585329678734-285d3adee73c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  DAIRY: [
    { slug: "britannia-cheese", name: "BIPL Cheese", tagline: "Pure Cheese, Pure Joy", description: D.dairy, badges: B.dairy, image_url: "https://images.unsplash.com/photo-1683314573422-649a3c6ad784?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxjaGVlc2V8ZW58MHx8fHwxNzgzODE4NDEwfDA&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "winkin-cow", name: "Winkin' Cow", tagline: "Flavoured Milk for Kids", description: D.dairy, badges: B.dairy, image_url: "https://images.unsplash.com/photo-1634141510639-d691d86f47be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxkYWlyeSUyMHByb2R1Y3RzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "britannia-butter", name: "BIPL Butter", tagline: "Rich & Creamy", description: D.dairy, badges: B.dairy, image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHwxfHxidXR0ZXJ8ZW58MHx8fHwxNzgzODE4NDEwfDA&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "dairy-whitener", name: "Dairy Whitener", tagline: "Milk that stays with you", description: D.dairy, badges: B.dairy, image_url: "https://images.unsplash.com/photo-1634141510639-d691d86f47be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzV8MHwxfHNlYXJjaHwyfHxkYWlyeSUyMHByb2R1Y3RzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  SNACKING: [
    { slug: "britannia-wafers", name: "BIPL Wafers", tagline: "Crunchy Delight", description: D.snack, badges: B.snack, image_url: "https://images.unsplash.com/photo-1585329678734-285d3adee73c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "croissants", name: "Croissants", tagline: "Filled with Choco Goodness", description: D.snack, badges: B.snack, image_url: "https://images.unsplash.com/photo-1748765968997-ba9bae9cfd7b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHw0fHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  CAKES: [
    { slug: "britannia-cake", name: "BIPL Cake", tagline: "Freshly Baked Goodness", description: D.cake, badges: B.cake, image_url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxjb29raWVzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
    { slug: "fruit-cake", name: "Fruit Cake", tagline: "Traditional Fruity Delight", description: D.cake, badges: B.cake, image_url: "https://images.unsplash.com/photo-1597733153203-a54d0fbc47de?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxjb29raWVzfGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  RUSK: [
    { slug: "toastea-rusk", name: "Toastea Premium Rusk", tagline: "The Perfect Tea Partner", description: D.rusk, badges: B.rusk, image_url: "https://images.unsplash.com/photo-1585329678734-285d3adee73c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwyfHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  BREADS: [
    { slug: "britannia-bread", name: "BIPL Bread", tagline: "Fresh Everyday", description: D.bread, badges: B.bread, image_url: "https://images.unsplash.com/photo-1551584277-a31a25e08fc8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxiaXNjdWl0JTIwcGFja2V0fGVufDB8fHx8MTc4MzgxODQwM3ww&ixlib=rb-4.1.0&q=85", color: "#e7ebf3" },
  ],
  "NUTRITIOUS BARS": [
    { slug: "nutrichoice-bar", name: "NutriChoice Bar", tagline: "Healthy on the Go", description: D.bar, badges: B.bar, image_url: "https://images.pexels.com/photos/5847103/pexels-photo-5847103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", color: "#e7ebf3" },
  ],
};

export const initiatives = [
  { title: "BIPL A-EYE", description: "A vision of independence for the visually impaired. AI-led solution provides voice-based responses to guide shoppers.", bg: "#e7ebf3", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&w=940&h=650" },
  { title: "Har Pocket Ab Dustbin", description: "Get your hands dirty for the cleanest of causes. Tackling plastic pollution one pocket at a time. 100% Plastic Neutral, 2 Years and Counting.", bg: "#e7ebf3", image_url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=srgb&fm=jpg&w=940&h=650" },
  { title: "HerStore", description: "A first for women in India. Divison of BIPL empowering women through a unique concept - support some of India's finest women entrepreneurs.", bg: "#e7ebf3", image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&w=940&h=650" },
  { title: "Nutrition Foundation", description: "BIPL Nutrition Foundation working to eradicate malnutrition among under-privileged children across India.", bg: "#e7ebf3", image_url: "https://images.unsplash.com/photo-1594708767771-a5f2d3b71eba?crop=entropy&cs=srgb&fm=jpg&w=940&h=650" },
];

export const newsItems = [
  { date: "May 24, 2025", title: "BIPL Q4 FY25 Results Announcement", category: "Financial" },
  { date: "Apr 15, 2025", title: "BIPL launches new NutriChoice range for healthy snacking", category: "Product Launch" },
  { date: "Mar 08, 2025", title: "BIPL celebrates Women's Day with HerStore Initiative", category: "CSR" },
  { date: "Feb 12, 2025", title: "BIPL expands manufacturing capabilities in Ranjangaon", category: "Business" },
  { date: "Jan 20, 2025", title: "Good Day launches new premium cookie range", category: "Product Launch" },
  { date: "Dec 05, 2024", title: "BIPL Nutrition Foundation reaches 1 million children", category: "CSR" },
];

export const leadership = [
  {
    name: "Nusli N. Wadia",
    role: "Chairman",
    initials: "NW",
    bio: "Chairman of the BIPL Group, guiding the company's long-term vision and stewardship for over four decades.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    instagram: "",
    portfolio: "",
    show_instagram: false,
    show_twitter: true,
    show_linkedin: true,
    show_portfolio: false,
  },
  {
    name: "Varun Berry",
    role: "Executive Vice Chairman & Managing Director",
    initials: "VB",
    bio: "Leads BIPL's operations and growth strategy, driving innovation across the company's portfolio of trusted brands.",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
    portfolio: "",
    show_instagram: true,
    show_twitter: true,
    show_linkedin: true,
    show_portfolio: false,
  },
  {
    name: "Rajneet Kohli",
    role: "Executive Director & CEO",
    initials: "RK",
    bio: "Responsible for BIPL's day-to-day leadership, brand building and expansion into new categories and markets.",
    linkedin: "https://www.linkedin.com/",
    twitter: "",
    instagram: "",
    portfolio: "",
    show_instagram: false,
    show_twitter: false,
    show_linkedin: true,
    show_portfolio: false,
  },
  {
    name: "N. Venkataraman",
    role: "Chief Financial Officer",
    initials: "NV",
    bio: "Oversees BIPL's financial strategy, planning and investor relations with a focus on sustainable value creation.",
    linkedin: "https://www.linkedin.com/",
    twitter: "",
    instagram: "",
    portfolio: "",
    show_instagram: false,
    show_twitter: false,
    show_linkedin: true,
    show_portfolio: false,
  },
];

export const milestones = [
  { year: "1892", event: "BIPL founded in Kolkata with an investment of Rs. 295" },
  { year: "1910", event: "Advent of electricity revolutionised biscuit manufacture" },
  { year: "1921", event: "BIPL becomes the first company east of the Suez Canal to use gas ovens" },
  { year: "1954", event: "Development of high-quality sliced and wrapped bread in India" },
  { year: "1997", event: "BIPL's Corporate Identity re-designed - 'Eat Healthy, Think Better'" },
  { year: "2010", event: "BIPL enters dairy category with cheese, curd and milk" },
  { year: "2024", event: "Celebrating over 130 years of delighting India" },
];

export const jobs = [
  { title: "Senior Brand Manager - Biscuits", location: "Bengaluru", type: "Full-time", dept: "Marketing" },
  { title: "Production Engineer", location: "Ranjangaon, Maharashtra", type: "Full-time", dept: "Operations" },
  { title: "Data Scientist - Consumer Insights", location: "Bengaluru", type: "Full-time", dept: "Analytics" },
  { title: "Supply Chain Manager", location: "Mumbai", type: "Full-time", dept: "Supply Chain" },
  { title: "Sales Executive", location: "Delhi NCR", type: "Full-time", dept: "Sales" },
  { title: "Quality Assurance Lead", location: "Chennai", type: "Full-time", dept: "Quality" },
];

export const stats = [
  { value: "130+", label: "Years of Trust" },
  { value: "5B+", label: "Packs Consumed Annually" },
  { value: "50+", label: "Countries Served" },
  { value: "6M+", label: "Retail Outlets" },
];

export const sustainabilityPillars = [
  { title: "Sustainable Sourcing", description: "Working with farmers for wheat, milk and other ingredients through responsible partnerships.", icon: "Sprout" },
  { title: "Water Stewardship", description: "Committed to reducing water consumption across all our manufacturing units.", icon: "Droplet" },
  { title: "Plastic Neutrality", description: "100% Plastic Neutral for 2 years - collecting and processing plastic waste equivalent to what we generate.", icon: "Recycle" },
  { title: "Nutrition & Health", description: "Delivering wholesome, nutritious products for every Indian family.", icon: "Heart" },
];

export const financials = [
  { metric: "Revenue (FY25)", value: "₹17,617 Cr", change: "+5.2%" },
  { metric: "EBITDA Margin", value: "18.7%", change: "+80 bps" },
  { metric: "Net Profit", value: "₹2,116 Cr", change: "+4.1%" },
  { metric: "Market Cap", value: "₹1.30 L Cr", change: "NSE:BIPL" },
];

export const reports = [
  { title: "Annual Report 2024-25", date: "May 2025", size: "12.4 MB" },
  { title: "Q4 FY25 Financial Results", date: "May 2025", size: "2.1 MB" },
  { title: "Q3 FY25 Investor Presentation", date: "Feb 2025", size: "5.6 MB" },
  { title: "Annual Report 2023-24", date: "May 2024", size: "11.8 MB" },
  { title: "Sustainability Report 2024", date: "Aug 2024", size: "8.3 MB" },
  { title: "Corporate Governance Report", date: "Mar 2025", size: "1.5 MB" },
];

export const siteContent = {
  // Brand / SEO
  "brand.name": "BIPL",
  "site.title": "BIPL — Eat Healthy, Think Better",

  // Header
  "header.nav.about": "ABOUT",
  "header.nav.products": "PRODUCTS",
  "header.nav.impact": "IMPACT",
  "header.nav.investors": "INVESTOR RELATIONS",
  "header.nav.wisebite": "WISEBITE",
  "header.nav.careers": "CAREERS",
  "header.nav.news": "NEWS & MEDIA",
  "header.nav.contact": "CONTACT",
  "header.search_placeholder": "Search BIPL products, brands, news...",
  "header.shop_now": "Shop Now",
  "header.mega.eyebrow": "Exciting Goodness In Every Bite",
  "header.mega.title": "OUR PRODUCTS",
  "header.mega.view_all": "View All Brands",

  // Home — brands section
  "brands_section.eyebrow": "Exciting Goodness In Every Bite",
  "brands_section.title": "OUR BRANDS",
  // Home — initiatives
  "initiatives_section.title": "INITIATIVES",
  // Home — about band
  "aboutband.eyebrow": "Our Legacy",
  "aboutband.title_prefix": "A story that began in",
  "aboutband.title_year": "1892",
  "aboutband.body1":
    "From a small factory in Kolkata to becoming India's most-loved food brand, BIPL has been part of the country's growth story. With a heritage that spans over a century, we continue to innovate, delight and nourish generations of Indian families with quality products.",
  "aboutband.body2":
    "Today, over half of all Indian households consume a BIPL product every month. From Marie Gold to Good Day, Bourbon to Milk Bikis - each brand carries the promise of trust, taste and quality.",
  "aboutband.cta": "Read Our Story",
  "aboutband.badge_number": "130+",
  "aboutband.badge_line1": "Years of",
  "aboutband.badge_line2": "Delighting India",
  "aboutband.image":
    "https://images.unsplash.com/photo-1758691031132-1e6ef88521f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHw0fHxmYW1pbHklMjB0ZWElMjB0aW1lfGVufDB8fHx8MTc4MzgxODM1N3ww&ixlib=rb-4.1.0&q=85",
  // Home — news
  "home.news.eyebrow": "In the news",
  "home.news.title": "Latest Updates",
  "home.news.view_all": "View All News",
  "common.read_more": "Read more",

  // Footer
  "footer.newsletter.title": "Stay Deliciously Updated",
  "footer.newsletter.subtitle": "Subscribe to get the latest news, product launches and offers from BIPL",
  "footer.newsletter.button": "Subscribe",
  "footer.about": "Delighting India for over 130 years with quality biscuits, dairy, cakes and more. Bharat Ki BIPL.",
  "footer.company.title": "Company",
  "footer.company.link1": "About Us",
  "footer.company.link2": "Leadership",
  "footer.company.link3": "Milestones",
  "footer.company.link4": "Sustainability",
  "footer.company.link5": "Careers",
  "footer.brands.title": "Brands",
  "footer.brands.link1": "Marie Gold",
  "footer.brands.link2": "Good Day",
  "footer.brands.link3": "Bourbon",
  "footer.brands.link4": "NutriChoice",
  "footer.brands.link5": "Dairy Products",
  "footer.contact.title": "Contact",
  "footer.address": "BIPL, 5/1A, Hungerford Street, Kolkata - 700017",
  "footer.phone": "1800-233-1007",
  "footer.email": "consumer.services@britindia.com",
  "footer.rights": "All Rights Reserved.",
  "footer.legal.privacy": "Privacy Policy",
  "footer.legal.terms": "Terms of Use",
  "footer.legal.cookies": "Cookie Preferences",
  "footer.legal.sitemap": "Sitemap",
  "social.facebook": "#",
  "social.instagram": "#",
  "social.twitter": "#",
  "social.youtube": "#",
  "social.linkedin": "#",

  // About page
  "about.hero.eyebrow": "About BIPL",
  "about.hero.title": "Delighting India\nfor over 130 years",
  "about.hero.subtitle":
    "From a modest beginning in 1892 to becoming one of India's most trusted food brands — our journey is one of innovation, resilience and love for consumers.",
  "about.story.eyebrow": "Our Story",
  "about.story.title": "Built on trust, taste and tradition",
  "about.story.body1":
    "BIPL was set up in 1892 with a small investment of Rs. 295 in Kolkata. Since then, we have grown from strength to strength, becoming a household name across India and reaching more than 50 countries worldwide.",
  "about.story.body2":
    "Today, our brands — Marie Gold, Good Day, Bourbon, NutriChoice, Milk Bikis, Tiger, Treat, 50-50, BIPL Cheese and more — delight over 5 billion consumers annually. We remain committed to our mission: \"Eat Healthy, Think Better.\"",
  "about.stat1": "5B+ Consumers",
  "about.stat2": "50+ Countries",
  "about.stat3": "130+ Years",
  "about.stat4": "50+ Products",
  "about.milestones.eyebrow": "Our Journey",
  "about.milestones.title": "A century of milestones",
  "about.leadership.eyebrow": "Leadership",
  "about.leadership.title": "Meet our leaders",
  "about.leadership.hint": "Tap a leader to view their profile.",

  // Contact page
  "contact.hero.eyebrow": "Get in Touch",
  "contact.hero.title": "Contact Us",
  "contact.hero.subtitle":
    "We'd love to hear from you. Whether it's a question, feedback or a business enquiry — our team is ready.",
  "contact.office.title": "Head Office",
  "contact.office.detail": "BIPL\n5/1A, Hungerford Street\nKolkata - 700017",
  "contact.phone.title": "Toll-free",
  "contact.phone.detail": "1800-233-1007\n(Mon-Sat, 9am - 6pm)",
  "contact.email.title": "Email",
  "contact.email.detail": "consumer.services@britindia.com\ninvestor.relations@britindia.com",
  "contact.form.title": "Send us a message",
  "contact.form.name": "Full Name",
  "contact.form.email": "Email",
  "contact.form.subject": "Subject",
  "contact.form.message": "Your message...",
  "contact.form.button": "Send Message",

  // Careers page
  "careers.hero.eyebrow": "Careers",
  "careers.hero.title": "Build your career\nwith BIPL",
  "careers.hero.subtitle":
    "Join a legacy that has shaped India's food landscape for 130+ years. We are looking for passionate individuals who want to make a real impact.",
  "careers.search_placeholder": "Search by role, department or location...",
  "careers.apply": "Apply Now",
  "careers.empty": "No positions match your search.",
  "careers.form.resume": "Attach Resume (PDF)",
  "careers.form.submit": "Submit Application",

  // Brands page
  "brands.hero.eyebrow": "Our Portfolio",
  "brands.hero.title": "Our Brands",
  "brands.hero.subtitle":
    "From India's favourite biscuits to wholesome dairy — explore the wide range of BIPL brands trusted across generations.",
  "brands.empty": "More products coming soon in this category.",

  // Media page
  "media.hero.eyebrow": "Media Room",
  "media.hero.title": "News & Updates",
  "media.hero.subtitle": "Latest press releases, announcements and stories from BIPL.",

  // Investors page
  "investors.hero.eyebrow": "Investor Relations",
  "investors.hero.title": "Financial Excellence",
  "investors.hero.subtitle":
    "Delivering consistent growth, sustainable returns and long-term value for our shareholders.",
  "investors.downloads.eyebrow": "Downloads",
  "investors.downloads.title": "Reports & Filings",
  "investors.contact.title": "Investor Contact",
  "investors.contact.detail": "investor.relations@britindia.com · +91 33 2287 2439",
  "investors.contact.button": "Contact IR Team",

  // Product detail page
  "product.available_on": "Available On",
  "product.shop1.label": "Big Basket",
  "product.shop1.url": "#",
  "product.shop2.label": "Blinkit",
  "product.shop2.url": "#",
  "product.shop3.label": "Shop Now",
  "product.shop3.url": "#",
  "product.weight_label": "Weight",
  "product.quantity_label": "Quantity",
  "product.watch_suffix": "Watch the Story",
  "product.related.eyebrow": "You May Also Like",
  "product.related.title": "MORE GOODNESS FOR YOU",
  "product.related.cta": "Explore All Products",
  "product.notfound.title": "Product not found",
  "product.notfound.body": "The product you're looking for isn't available.",
  "product.notfound.back": "Back to Products",

  // Mobile bottom navigation
  "bottomnav.home": "Home",
  "bottomnav.products": "Products",
  "bottomnav.news": "News",
  "bottomnav.careers": "Careers",
  "bottomnav.contact": "Contact",
};
