import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs } from 'firebase/firestore';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MembershipForm from "../components/Membership/MembershipForm";
import AdmitCardGenerator from "../components/Membership/AdmitCardGenerator";
import { db } from "../firebase/Firebase"; 

const Membership = () => {
  const [isMember, setIsMember] = useState(null);
  const [memberNames, setMemberNames] = useState([]);

  const fetchMemberNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'members'));
      const membersData = querySnapshot.docs.map(doc => doc.data().name);
      setMemberNames(membersData);
    } catch (error) {
      console.error("Error fetching member names: ", error);
    }
  };

  useEffect(() => {
    fetchMemberNames();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="marquee-container py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
          <marquee scrollamount="25"> हमारे सम्मानित सदस्य --
            {" " + memberNames.join(' • ')}
          </marquee>
      </div>
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          className="w-full max-w-4xl p-6 sm:p-8 lg:p-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header and Membership Status Switch */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              सदस्यता पोर्टल
            </h1>

            <h3 className="text-l sm:text-xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
              क्या आप एक सदस्य हैं?
            </h3>
            <div className="flex justify-center">
              <div className="bg-gray-100 p-1 rounded-full w-full max-w-xs sm:max-w-md">
                <div className="flex flex-col sm:flex-row justify-center">
                  <button
                    onClick={() => setIsMember(false)}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 mb-2 sm:mb-0 ${
                      isMember === false
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    नया सदस्य
                  </button>
                  <button
                    onClick={() => setIsMember(true)}
                    className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-200 ${
                      isMember === true
                        ? "bg-pink-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    आईडी कार्ड बनाएं
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {isMember === false && (
              <motion.div
                key="new-member"
                className="w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MembershipForm />
              </motion.div>
            )}
            {isMember === true && (
              <motion.div
                key="existing-member"
                className="w-full max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdmitCardGenerator />
              </motion.div>
            )}
            {isMember === null && (
              <motion.div 
                key="welcome"
                className="text-center w-full max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-indigo-100 to-pink-100 p-8 rounded-2xl shadow-inner">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    हमारे समुदाय में आपका स्वागत है
                  </h2>
                  <p className="text-gray-600 mb-6">
                    हमारे साथ जुड़ें और विशेष लाभ और संसाधनों का लाभ उठाएं। आरंभ करने के लिए ऊपर अपनी सदस्यता स्थिति चुनें।
                  </p>
                  <ul className="text-center max-w-md mx-auto mb-6">
                    <li className="flex justify-center items-center mb-2">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        प्रीमियम सामग्री तक पहुंच
                    </li>
                    <li className="flex justify-center items-center mb-2">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        विशेष सदस्य कार्यक्रम
                    </li>
                    <li className="flex justify-center items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        नेटवर्किंग के अवसर
                    </li>
                </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;
