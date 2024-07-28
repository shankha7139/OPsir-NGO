import React from "react";
import GoogleFormEmbed from "../components/GoogleFormEmbed";

function FormPage() {
  const formSrc =
    "https://docs.google.com/forms/d/1Mkn3pb42F1wdOTZWEPpndVIUugFRXYmeEF8n50j1RmU";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Application form
            </h1>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GoogleFormEmbed src={formSrc} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
