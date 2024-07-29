import React from "react";
import GoogleFormEmbed from "../components/GoogleFormEmbed";

function FormPage() {
  const formSrc =
    "https://docs.google.com/forms/d/e/1FAIpQLScVo0-9ILs8rXTtbxYdC5YpuF80A7BoU6Uz1kaWJG_MOo7Reg/viewform?embedded=true";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Application Form
            </h1>
            <div className="bg-gray-50 p-4 rounded-lg" style={{ height: "80vh" }}>
              <GoogleFormEmbed src={formSrc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPage;