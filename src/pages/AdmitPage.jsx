import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase/Firebase"; // Adjust this import based on your Firebase setup
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaGraduationCap,
  FaPhone,
  FaDownload,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AdmitCardGenerator = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const admitCardRef = useRef(null);
  const imageRef = useRef(null);

  const neomorphicStyle = {
    backgroundColor: "#f0f0f3",
    borderRadius: "20px",
    boxShadow: "10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff",
  };

  const inputStyle = {
    backgroundColor: "#f0f0f3",
    borderRadius: "10px",
    border: "none",
    padding: "10px 15px",
    boxShadow: "inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff",
  };

  const buttonStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff",
  };

  const fetchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUser(null);
    setImageLoaded(false);

    try {
      const q = query(collection(db, "members"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No user found with this email address.");
      } else {
        setUser(querySnapshot.docs[0].data());
      }
    } catch (err) {
      setError("An error occurred while fetching the user data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.photo) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = user.photo;
    }
  }, [user]);

  const downloadPDF = async () => {
    if (!imageLoaded) {
      alert("Please wait for the image to load before downloading.");
      return;
    }

    const input = admitCardRef.current;
    const canvas = await html2canvas(input, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Add the user's photo separately
    if (user.photo && imageRef.current) {
      const imgElement = imageRef.current;
      const imgWidth = 40; // Adjust as needed
      const imgHeight = (imgElement.height * imgWidth) / imgElement.width;
      const imgX = pdfWidth - imgWidth - 10; // 10mm from right edge
      const imgY = 10; // 10mm from top
      pdf.addImage(user.photo, "JPEG", imgX, imgY, imgWidth, imgHeight);
    }

    pdf.save("admit_card.pdf");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <form onSubmit={fetchUser} className="mb-8" style={neomorphicStyle}>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Admit Card Generator
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Enter your email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                  style={inputStyle}
                  placeholder="example@email.com"
                />
              </div>
              <button
                type="submit"
                style={buttonStyle}
                className="w-full transition duration-200 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Searching..." : "Generate Admit Card"}
              </button>
            </div>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8"
              style={neomorphicStyle}
            >
              <p>{error}</p>
            </motion.div>
          )}

          {user && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8"
              style={neomorphicStyle}
            >
              <div
                ref={admitCardRef}
                className="bg-white p-8 border-2 border-gray-300 rounded-lg"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Admit Card
                  </h3>
                  <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">
                    {user.photo ? (
                      <img
                        ref={imageRef}
                        src={user.photo}
                        alt="User"
                        className="w-full h-full object-cover"
                        onLoad={() => setImageLoaded(true)}
                      />
                    ) : (
                      <span className="text-gray-500">No Photo</span>
                    )}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FaUser className="mr-4 text-blue-500" />
                    <span className="font-semibold">Name:</span>
                    <span className="ml-2">{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="mr-4 text-blue-500" />
                    <span className="font-semibold">Email:</span>
                    <span className="ml-2">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaIdCard className="mr-4 text-blue-500" />
                    <span className="font-semibold">Aadhar Number:</span>
                    <span className="ml-2">{user.aadharNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <FaGraduationCap className="mr-4 text-blue-500" />
                    <span className="font-semibold">Qualification:</span>
                    <span className="ml-2">{user.qualification}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="mr-4 text-blue-500" />
                    <span className="font-semibold">Phone:</span>
                    <span className="ml-2">{user.phoneNumber}</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    This admit card is valid for the upcoming Events. Please
                    bring a printed copy along with a valid ID.
                  </p>
                </div>
              </div>
              <button
                onClick={downloadPDF}
                className="mt-4 flex items-center justify-center w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                disabled={!imageLoaded}
              >
                <FaDownload className="mr-2" />
                {imageLoaded ? "Download Admit Card" : "Loading image..."}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default AdmitCardGenerator;
