import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState } from 'react';

const ContactMe = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 relative min-h-screen bg-linear-to-br from-black via-purple-950 to-black overflow-hidden flex items-center px-6 py-20"
    >

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-80 h-80 bg-cyan-400 opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row gap-12 items-center relative z-10">

        {/* LEFT — Animation + Heading */}
        <div className="flex-1 w-full">

          {/* Badge */}
          <span className="inline-block text-xs font-bold tracking-widest text-purple-400 border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 rounded-full mb-5 uppercase">
            Get In Touch
          </span>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Let's Work <br />
            <span className="bg-linear-to-r from-[#ff8a00] via-[#ff4d00] to-[#ff0040] bg-clip-text text-transparent">
              Together
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-white/50 text-base leading-relaxed max-w-sm mb-4">
            Have a project in mind? I'd love to hear about it.
            Drop me a message and let's build something amazing.
          </p>

          {/* Lottie Animation */}
          <div className="w-full h-72 md:h-80">
            <DotLottieReact
              src="/assets/animations/contact.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </div>
        </div>

        {/* RIGHT — Contact Form */}
        <div className="flex-1 w-full">
          <div className="relative bg-white/5 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-md overflow-hidden">

            {/* Card inner glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 opacity-5 rounded-full blur-3xl pointer-events-none" />

            {/* Name */}
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="David Cruz"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="david@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-xs font-semibold tracking-widest text-white/50 uppercase mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none focus:border-purple-500/60 focus:bg-purple-500/5 transition-all duration-200 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full py-3.5 bg-linear-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-bold text-sm tracking-widest rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/40 mb-6">
              Send Message ✦
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactMe;