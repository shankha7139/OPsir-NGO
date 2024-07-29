import React from 'react';
import { motion } from "framer-motion";
import { colors } from "../theme";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <motion.section
      id="about"
      className="py-24 px-8 relative overflow-hidden bg-gradient-to-b from-blue-400/20 via-purple-500/20 to-pink-500/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          हमारा मिशन
        </motion.h2>
        <motion.div
          className="bg-white/80 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            हमारा एनजीओ, ग्रेजुएट क्लब, एक ऐसी दुनिया बनाने के लिए समर्पित है जहाँ हर व्यक्ति को बुनियादी आवश्यकताओं तक पहुँच हो और एक संतोषजनक जीवन जीने का अवसर मिले। हम एकता की शक्ति में विश्वास करते हैं और समाजिक समस्याओं का मुकाबला करने के लिए समुदायों को एकजुट करने का प्रयास करते हैं।
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            हमारे मुख्य मूल्य करुणा, ईमानदारी, और धैर्य हैं। हम सहानुभूति के साथ सेवा करने, अपने कार्य को पारदर्शिता के साथ संपन्न करने, और विपत्ति के सामने कभी हार न मानने के प्रति प्रतिबद्ध हैं।
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            हमारा मुख्य उद्देश्य जरूरतमंदों को संसाधन और समर्थन प्रदान करना है, चाहे वह खाद्य वितरण, शैक्षिक कार्यक्रमों या स्वास्थ्य सेवाओं के माध्यम से हो। हमारा लक्ष्य न केवल तत्काल आवश्यकताओं को पूरा करना है बल्कि इन समस्याओं के मूल कारणों का समाधान करने के लिए स्थायी समाधान भी लागू करना है।
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
            हम इन सामाजिक समस्याओं के बारे में जागरूकता बढ़ाने, नीति परिवर्तन की वकालत करने और दूसरों को कार्रवाई के लिए प्रेरित करने के प्रति भी समर्पित हैं। हमारा मानना है कि दुनिया को बेहतर बनाने में हर व्यक्ति की भूमिका होती है।
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            अपने काम के माध्यम से, हम व्यक्तियों को सशक्त बनाने, समुदायों को मजबूत करने और एक अधिक समान और न्यायपूर्ण समाज में योगदान देने की उम्मीद करते हैं। हमारे मिशन में शामिल हों और बदलाव लाने में हमारी मदद करें।
          </p>
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="#learn-more"
            onClick={() => navigate("/about")}
            className="inline-block px-8 py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            अधिक पढ़ें 
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default About;