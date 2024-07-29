import React, { useState, useRef, useEffect } from "react";
import { db, storage } from "../firebase/Firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaIdCard, FaGraduationCap, FaPhone, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const neomorphicStyle = {
  borderRadius: "20px",
  padding: "40px",
  backgroundColor: "#f0f0f3",
};

const neomorphicInputStyle = {
  boxShadow: "inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff",
  borderRadius: "12px",
  padding: "12px",
  border: "none",
  outline: "none",
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

const App = () => {
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

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
    age: "",
    qualification: "",
    address: "",
    photo: null,
    aadharNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      if (file && file.size < 11 * 1024 * 1024) {
        setFormData((prevData) => ({
          ...prevData,
          photo: file,
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Image size should be less than 11MB");
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const checkExistingUser = async (email, aadharNumber) => {
    const emailQuery = query(
      collection(db, "members"),
      where("email", "==", email)
    );
    const aadharQuery = query(
      collection(db, "members"),
      where("aadharNumber", "==", aadharNumber)
    );

    const emailSnapshot = await getDocs(emailQuery);
    const aadharSnapshot = await getDocs(aadharQuery);

    if (!emailSnapshot.empty) {
      throw new Error("Email already exists");
    }

    if (!aadharSnapshot.empty) {
      throw new Error("Aadhar number already exists");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await checkExistingUser(formData.email, formData.aadharNumber);

      const photoRef = ref(storage, `members/${formData.photo.name}`);
      await uploadBytes(photoRef, formData.photo);
      const photoURL = await getDownloadURL(photoRef);

      await addDoc(collection(db, "members"), {
        ...formData,
        photo: photoURL,
      });

      alert("Member added successfully!");
      setFormData({
        name: "",
        gender: "",
        phoneNumber: "",
        email: "",
        age: "",
        qualification: "",
        address: "",
        photo: null,
        aadharNumber: "",
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding member: ", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="relative max-w-2xl w-full space-y-8 p-10 bg-white rounded-3xl shadow-xl"
      style={neomorphicStyle}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Membership Form
      </h1>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <motion.form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Highest Educational Qualification
            </label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="mt-2 text-red-500"
                  onClick={() => {
                    setPreview(null);
                    setFormData((prevData) => ({
                      ...prevData,
                      photo: null,
                    }));
                  }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            ></textarea>
          </div>
        </div>
        <motion.button
          type="submit"
          className="w-full text-lg font-semibold text-white"
          style={{
            ...neomorphicButtonStyle,
            cursor: isLoading ? "not-allowed" : "pointer",
            position: "relative",
            background: "linear-gradient(to right, #4f46e5, #6b46e5)",
          }}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white absolute left-1/2 transform -translate-x-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM12 24c6.627 0 12-5.373 12-12h-4a8 8 0 01-8 8v4z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

const AdmitCardGenerator = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const admitCardRef = useRef(null);
  const imageRef = useRef(null);

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
    <motion.div
      className="relative max-w-2xl w-full space-y-8 p-10 bg-white rounded-3xl shadow-xl"
      style={neomorphicStyle}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
              style={neomorphicInputStyle}
              placeholder="example@email.com"
            />
          </div>
          <button
            type="submit"
            style={neomorphicButtonStyle}
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
              <h3 className="text-2xl font-bold text-gray-800">Admit Card</h3>
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
                This admit card is valid for the upcoming Events. Please bring a
                printed copy along with a valid ID.
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
  );
};

export default App;
