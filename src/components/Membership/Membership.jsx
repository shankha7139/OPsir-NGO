import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MembershipForm from "./MembershipForm";
import AdmitCardGenerator from "./AdmitCardGenerator";

const neomorphicStyle = {
  borderRadius: "20px",
  padding: "40px",
  backgroundColor: "#f0f0f3",
};

const neomorphicButtonStyle = {
  boxShadow: "8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff",
  borderRadius: "12px",
  padding: "12px",
  border: "none",
  outline: "none",
  backgroundColor: "#4f46e5",
  color: "#fff",
  cursor: "pointer",
};

const Membership = () => {
  const [isMember, setIsMember] = useState(null);
  const [isSwitchVisible, setIsSwitchVisible] = useState(true);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
        {isSwitchVisible && (
          <motion.div
            className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg"
            style={neomorphicStyle}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Membership Status
              </h1>
              <button
                onClick={() => setIsSwitchVisible(false)}
                className="ml-2 text-red-500"
              >
                X
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setIsMember(false)}
                className="mr-2"
                style={neomorphicButtonStyle}
              >
                New Member
              </button>
              <button
                onClick={() => setIsMember(true)}
                style={neomorphicButtonStyle}
              >
                Existing Member
              </button>
            </div>
          </motion.div>
        )}
        {!isSwitchVisible && (
          <button
            onClick={() => setIsSwitchVisible(true)}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg"
            style={neomorphicStyle}
          >
            Membership Status
          </button>
        )}
        <motion.div
          className="relative max-w-2xl w-full space-y-8 p-10 bg-white rounded-3xl shadow-xl"
          style={neomorphicStyle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isMember === false && <MembershipForm />}
          {isMember === true && <AdmitCardGenerator />}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Membership;
