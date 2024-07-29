import React, { useState } from "react";
import { db, storage } from "../../firebase/Firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";

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

export default MembershipForm;
