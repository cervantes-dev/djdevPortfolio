import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SERVICE_ID  = 'service_ob4p1y8';
const TEMPLATE_ID = 'template_j7s9cts';
const PUBLIC_KEY  = 'PX4KuCQGtfDSVmXYB';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
  viewport: { once: false },
});

const ContactMe = () => {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState(null); // 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('empty');
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setStatus('loading');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        PUBLIC_KEY
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }

    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 relative min-h-screen bg-linear-to-br from-black via-purple-950 to-black overflow-hidden flex items-center px-6 py-20"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {status && status !== 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            // REPLACE with:
className={`fixed top-20 left-1/2 -translate-x-1/2 z-[999] px-6 py-3 rounded-full text-sm font-semibold tracking-wide shadow-lg backdrop-blur-md border ${
              status === 'success'
                ? 'bg-green-500/10 border-green-500/40 text-green-400'
                : status === 'error'
                ? 'bg-red-500/10 border-red-500/40 text-red-400'
                : 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400'
            }`}
          >
            {status === 'success' && '✅ Message sent! I\'ll get back to you soon.'}
            {status === 'error'   && '❌ Something went wrong. Please try again.'}
            {status === 'empty'   && '⚠️ Please fill in all fields before sending.'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center relative z-10">

        {/* LEFT — Animation + Heading */}
        <div className="flex-1 w-full">

          {/* Badge */}
          <motion.span
            {...fadeUp(0)}
            className="w-fit font-mono text-xs font-semibold tracking-widest uppercase border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full mb-5 inline-block"
          >
            <span className="bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.span>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.1)}
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            Let's Work <br />
            <span className="bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-white/50 text-base leading-relaxed max-w-sm mb-4"
          >
            Have a project in mind? I'd love to hear about it.
            Drop me a message and let's build something amazing.
          </motion.p>

          {/* Lottie Animation */}
          <motion.div {...fadeUp(0.3)} className="w-full h-72 md:h-80">
            <DotLottieReact
              src="/assets/animations/contact.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </motion.div>
        </div>

        {/* RIGHT — Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false }}
          className="flex-1 w-full"
        >
          <div className="relative bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-md overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

            {/* Name */}
            <motion.div {...fadeUp(0.15)} className="mb-5">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="David Cruz"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200"
              />
            </motion.div>

            {/* Email */}
            <motion.div {...fadeUp(0.25)} className="mb-5">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="david@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200"
              />
            </motion.div>

            {/* Message */}
            <motion.div {...fadeUp(0.35)} className="mb-6">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200 resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              {...fadeUp(0.45)}
              onClick={handleSubmit}
              disabled={status === 'loading'}
              whileHover={status !== 'loading' ? { y: -3, boxShadow: '0 10px 30px rgba(255,100,0,0.35)' } : {}}
              whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
              className="w-full py-3.5 bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-300 mb-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message ✦'
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMe;