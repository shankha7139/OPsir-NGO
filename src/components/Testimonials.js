import React from 'react';
import { motion } from "framer-motion";

function TestimonialCard({ quote, author }) {
  return (
    <motion.div
      className="max-w-md rounded-xl overflow-hidden shadow-xl bg-white p-8 m-4 border border-purple-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.1)",
      }}
    >
      <div className="relative">
        <svg
          className="absolute top-0 left-0 w-16 h-16 text-blue-100 transform -translate-x-6 -translate-y-6"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="relative z-10 text-gray-600 text-lg italic leading-relaxed">
          {quote}
        </p>
      </div>
      <p
        className="text-right mt-6 font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
      >
        - {author}
      </p>
    </motion.div>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 px-8 bg-gradient-to-b from-pink-500/20 via-purple-500/20 to-blue-400/20 "
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          हमारे बारे में लोगों के विचार
        </motion.h2>
        <motion.div
          className="flex flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <TestimonialCard
            quote="इस एनजीओ ने वास्तव में जीवन बदल दिए हैं। उनकी प्रतिबद्धता और प्रभाव प्रेरणादायक हैं, और मैं उनके मिशन का समर्थन करते हुए बेहद गर्व महसूस करता हूँ।"
            author="सुमीत चौधरी, स्वयंसेवक"
          />
          <TestimonialCard
            quote="मैंने खुद इस संगठन द्वारा किए गए बदलाव को देखा है। सकारात्मक परिवर्तन लाने के प्रति उनकी प्रतिबद्धता बेजोड़ और वास्तव में प्रेरणादायक है।"
            author="ऋषि चौहान, सामुदायिक नेता"
          />
          <TestimonialCard
            quote="यह एनजीओ जो काम करता है वह परिवर्तनकारी से कम नहीं है। उन्होंने हमारे समुदाय में सकारात्मक परिवर्तन की लहर पैदा की है।"
            author="अनिल तेवतिया, लाभार्थी"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;