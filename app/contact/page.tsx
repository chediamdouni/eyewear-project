import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact — Clevards Eyewear",
  description: "Get in touch with our team. Questions about our sunglasses, orders, or returns? We're here to help.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 pb-24 md:pt-28 md:pb-32 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.12),transparent_55%),_#fdf8f1]">
      <div className="max-w-xl mx-auto px-6 lg:px-8">
        <h1 className="font-display text-3xl md:text-4xl font-normal text-black mb-2">
          Contact
        </h1>
        <p className="text-sm text-black/60 mb-12">
          Questions about our sunglasses, orders, or returns? We&apos;re here to help.
        </p>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-xs font-medium uppercase tracking-wider text-black/70 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 text-sm bg-white border border-black/10 focus:border-black/30 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium uppercase tracking-wider text-black/70 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 text-sm bg-white border border-black/10 focus:border-black/30 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-xs font-medium uppercase tracking-wider text-black/70 mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 text-sm bg-white border border-black/10 focus:border-black/30 focus:outline-none transition-colors"
            >
              <option value="">Select a topic</option>
              <option value="order">Order & shipping</option>
              <option value="returns">Returns & exchanges</option>
              <option value="product">Product question</option>
              <option value="wholesale">Wholesale inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-medium uppercase tracking-wider text-black/70 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 text-sm bg-white border border-black/10 focus:border-black/30 focus:outline-none transition-colors resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-sm font-medium bg-black text-white hover:bg-black/90 transition-colors"
          >
            Send message
          </button>
        </form>

        <div className="mt-16 pt-16 border-t border-black/10">
          <h2 className="text-xs font-medium uppercase tracking-wider text-black/70 mb-6">
            Other ways to reach us
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-black/80">
              <Mail className="w-4 h-4 text-black/50" />
              <a href="mailto:hello@clevards.com" className="hover:text-black transition-colors">
                hello@clevards.com
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-black/80">
              <Phone className="w-4 h-4 text-black/50" />
              <a href="tel:+21612345678" className="hover:text-black transition-colors">
                +216 12 345 678
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm text-black/80">
              <MapPin className="w-4 h-4 text-black/50" />
              <span>Tunis, Tunisia</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
