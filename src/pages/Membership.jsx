import React, { useState } from "react";
import { db, storage } from "../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const neomorphicStyle = {
  boxShadow: "20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff",
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
  backgroundColor: "#f0f0f3",
  cursor: "pointer",
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
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload photo to Firebase Storage
      const photoRef = ref(storage, `members/${formData.photo.name}`);
      await uploadBytes(photoRef, formData.photo);
      const photoURL = await getDownloadURL(photoRef);

      // Add document to Firestore
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
      });
    } catch (error) {
      console.error("Error adding member: ", error);
      alert("Error adding member!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Membership Form</h1>
        <motion.form
          className="bg-white p-6 rounded shadow-lg"
          style={neomorphicStyle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700">Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="mt-1 block w-full"
              style={neomorphicInputStyle}
              required
            />
          </div>
          <div className="mb-4">
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
          <motion.button
            type="submit"
            className="w-full text-white bg-indigo-500 "
            style={{
              ...neomorphicButtonStyle,
              cursor: isLoading ? "not-allowed" : "pointer",
              position: "relative",
              background: "#ccc",
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
      </div>
      <Footer />
    </>
  );
};

export default MembershipForm;
