"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function AddPatientPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [image, setImage] = useState(null);
  

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
<div className="flex items-center justify-between mb-8">

  <div>
    {/* <h1 className="text-5xl font-bold text-blue-500">
      Add Patient
    </h1> */}
    <h1 className="text-4xl font-bold text-blue-500"> Add Patient </h1>

    <p className="text-slate-400 mt-3 text-lg">
      Enter patient information and upload MRI scan for analysis.
    </p>
  </div>

  <button
    onClick={() => router.push("/dashboard")}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-2xl shadow-lg transition"
  >
    <FaHome />
    Dashboard
  </button>

</div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Patient Details Card */}
          <div className="bg-slate-900 rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">
              👨‍⚕️ Patient Information
            </h2>

            <div className="space-y-5">

              <div>
                <label className="text-slate-300 block mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter patient name"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                  placeholder="Enter age"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-2">
                  Gender
                </label>

                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* MRI Upload Card */}
          <div className="bg-slate-900 rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-semibold mb-6">
              🧠 MRI Scan Upload
            </h2>

            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 text-center">

              <div className="text-6xl mb-4">
                📁
              </div>

              <p className="text-slate-400 mb-6">
                Upload MRI image (.jpg, .jpeg, .png)
              </p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm"
              />

              {image && (
                <p className="mt-4 text-green-400">
                  Selected: {image.name}
                </p>
              )}
            </div>

            <button
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl text-lg font-semibold transition"
            >
              🔬 Analyze MRI
            </button>
          </div>
        </div>

        {/* Future Result Section */}
        <div className="mt-10 bg-slate-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-semibold mb-5">
            📊 MRI Analysis Report
          </h2>

          <div className="text-slate-400">
            Upload an MRI scan and click <b>Analyze MRI</b> to generate:
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Tumor Detection</li>
              <li>Tumor Type</li>
              <li>Confidence Score</li>
              <li>Probability Distribution</li>
              <li>Heatmap Visualization</li>
              <li>PDF Report</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}