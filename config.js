/**
 * CLINIC_CONFIG
 * --------------------------------------------------------------------------
 * Single source of truth for re-branding this dental clinic demo website.
 * Change values here to re-brand the entire website in under 5 minutes.
 * Both the HTML (via data-config attributes) and script.js consume this object.
 * --------------------------------------------------------------------------
 */
const CLINIC_CONFIG = {
  // Brand & Clinic Info
  clinicName: "Smile Demo Dental Clinic",
  shortName: "Smile Demo",
  tagline: "Compassionate dental care, crafted with precision.",
  subTagline: "Gentle, modern dentistry for local families. Experience pain-free treatments, digital diagnostics, and warm hospitality.",
  
  // Doctor & Lead Specialist
  doctorName: "Dr. Demo Name",
  doctorQualification: "BDS, MDS (Prosthodontics & Implantology)",
  doctorTitle: "Founder & Principal Dental Surgeon",
  doctorExperience: "15+ Years of Clinical Excellence",
  doctorBio: "Trained in advanced digital implantology and aesthetic restorative care, Dr. Demo Name brings a gentle, patient-first approach to everyday dentistry. Every treatment plan is customised, transparent, and focused on preserving your natural teeth with minimal discomfort.",
  doctorQuote: "We believe dentistry should never feel intimidating. When advanced technology meets genuine human empathy, even complex smile restorations become calm, predictable, and reassuring.",

  // Contact & Location Details
  city: "Mumbai",
  area: "Bandra West",
  address: "Suite 204, Platinum Health Square, Turner Road, Bandra West, Mumbai 400050",
  landmark: "Opposite Bandra Post Office",
  phone: "+91 00000 00000",
  phoneRaw: "+910000000000",
  whatsappNumber: "+91 00000 00000",
  whatsappRaw: "910000000000",
  email: "care@smiledemodental.com",
  hours: "Monday – Saturday: 9:30 AM – 8:00 PM (Sundays by prior emergency appointment)",
  mapLink: "https://maps.google.com/?q=Dental+Clinic+Bandra+West",
  googleReviewRating: "4.9",
  googleReviewCount: "380+",

  // Colors & Aesthetic Configuration
  primaryColor: "#0c1a19",     // Deep dark teal ink
  surfaceColor: "#142826",     // Elevated dark teal card
  brandColor: "#2a7f79",       // Medium surgical teal accent
  goldColor: "#b8975a",        // Warm metallic gold/brass
  champagneColor: "#dcc594",   // Soft champagne highlight
  sandColor: "#ece5d8",        // Warm stone neutral
  pearlColor: "#faf8f4",       // Warm luxury cream background
  bodyColor: "#424e4c",        // Editorial charcoal body text

  // Features & Toggles
  showDemoRibbon: true,        // Toggle top ribbon showing client re-branding instructions

  // Signature Feature Band
  signatureFeature: {
    badge: "SINGLE-VISIT CARE",
    title: "Precision Digital Restorations in a Single Appointment",
    description: "No messy physical impressions, no temporary crowns, and no waiting weeks. Using 3D optical scanning and in-clinic computer-aided milling, we restore cracked, worn, or decayed teeth with natural porcelain in under two hours.",
    points: [
      "High-precision 3D digital intraoral scan in 60 seconds",
      "Custom shade matching to your adjacent natural teeth",
      "Permanent medical-grade ceramic bond on the very same day"
    ]
  },

  // Stats Strip (Sample figures)
  stats: [
    { value: 12000, suffix: "+", label: "Happy Patients Treated", note: "Sample demo data" },
    { value: 15, suffix: "+", label: "Years Serving Community", note: "Sample demo data" },
    { value: 3800, suffix: "+", label: "Implants & Restorations", note: "Sample demo data" },
    { value: 99.4, suffix: "%", decimals: 1, label: "Pain-Free Comfort Rating", note: "Sample demo data" }
  ],

  // WhatsApp Pre-filled message generator
  getWhatsAppMessage: function (name, phone, time, treatment, note) {
    let msg = `Hello ${this.clinicName}! I would like to schedule an appointment.\n`;
    if (name) msg += `Name: ${name}\n`;
    if (phone) msg += `Phone: ${phone}\n`;
    if (treatment) msg += `Treatment: ${treatment}\n`;
    if (time) msg += `Preferred Timing: ${time}\n`;
    if (note) msg += `Message: ${note}\n`;
    msg += `(Inquiry via website)`;
    return encodeURIComponent(msg);
  }
};

// Export for Node/CommonJS environments if ever imported, otherwise global in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CLINIC_CONFIG;
}
