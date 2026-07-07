"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Stethoscope, Brain, FolderOpen, Microscope, BarChart2 } from "lucide-react";
import { processMRIImage } from "@/lib/opencvUtils";

export default function AddPatientPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      setAnalysisDone(false);
    }
  };


  const handleAnalyze = async () => {
    if (!imageUrl || !imgRef.current || !canvasRef.current) return;
    setIsAnalyzing(true);
    setAnalysisDone(false);
    
    // Process image using OpenCV
    const success = await processMRIImage(imgRef.current, canvasRef.current);
    
    setIsAnalyzing(false);
    if (success) {
      setAnalysisDone(true);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Script src="https://docs.opencv.org/4.8.0/opencv.js" strategy="lazyOnload" />
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
<div className="flex items-center justify-between mb-8">

  <div>
    {/* <h1 className="text-5xl font-bold text-blue-500">
      Add Patient
    </h1> */}
    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500"> Add Patient </h1>

    <p className="text-slate-400 mt-3 text-lg">
      Enter patient information and upload MRI scan for analysis.
    </p>
  </div>

  <button
    onClick={() => router.push("/dashboard")}
    className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-700 bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all shadow-lg backdrop-blur-sm"
  >
    <FaHome />
    Dashboard
  </button>

</div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Patient Details Card */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl p-8 backdrop-blur-sm group hover:border-slate-700 transition-colors">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-100">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                <Stethoscope className="w-6 h-6" />
              </div>
              Patient Information
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
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-500"
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
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-500"
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
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-500"
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
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl p-8 backdrop-blur-sm group hover:border-slate-700 transition-colors">

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-slate-100">
              <div className="p-2.5 rounded-2xl bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20 transition-colors">
                <Brain className="w-6 h-6" />
              </div>
              MRI Scan Upload
            </h2>

            <div 
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer ${
                isDragging 
                  ? "border-indigo-500 bg-indigo-500/10" 
                  : "border-slate-700/50 hover:border-indigo-500/50 bg-slate-950/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >

              <div className={`mb-4 transition-colors ${isDragging ? "text-indigo-400" : "text-indigo-400/80"}`}>
                <FolderOpen className="w-16 h-16 mx-auto" />
              </div>

              <p className="text-slate-400 mb-2">
                Drag and drop your MRI scan here, or <span className="text-indigo-400 font-medium">browse</span>
              </p>
              <p className="text-slate-500 text-sm mb-6">
                Supports .jpg, .jpeg, .png
              </p>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setImage(file);
                    setImageUrl(URL.createObjectURL(file));
                    setAnalysisDone(false);
                  }
                }}
                className="hidden"
                ref={fileInputRef}
              />

              {image && (
                <div className="mt-6 text-left w-full flex flex-col items-center">
                  <p className="text-emerald-400 font-medium bg-emerald-500/10 py-2 px-4 rounded-xl inline-block mb-4">
                    Selected: {image.name}
                  </p>
                  <div className="flex flex-row gap-6 items-center justify-center">
                    <div className="flex flex-col items-center">
                      <span className="text-slate-400 text-sm mb-2 font-medium">Original</span>
                      <img 
                        src={imageUrl} 
                        ref={imgRef}
                        alt="Original MRI" 
                        className="w-32 h-32 object-cover rounded-xl border-2 border-slate-700/50"
                        crossOrigin="anonymous"
                      />
                    </div>
                    {analysisDone && (
                      <div className="flex flex-col items-center">
                        <span className="text-indigo-400 text-sm mb-2 font-medium">Processed</span>
                        <canvas 
                          ref={canvasRef}
                          className="w-32 h-32 object-cover rounded-xl border-2 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                        ></canvas>
                      </div>
                    )}
                    {/* Hidden canvas for processing if not yet done */}
                    <canvas ref={canvasRef} className={`hidden ${analysisDone ? 'hidden' : ''}`} />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!image || isAnalyzing}
              className={`w-full mt-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-900/20 py-4 rounded-2xl text-lg font-semibold transition-all flex items-center justify-center gap-2 text-white ${
                (!image || isAnalyzing) ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Microscope className="w-6 h-6" /> 
              {isAnalyzing ? "Processing with OpenCV..." : "Analyze MRI"}
            </button>
          </div>
        </div>

        {/* Future Result Section */}
        <div className="mt-10 bg-slate-900/50 border border-slate-800 rounded-3xl shadow-xl p-8 backdrop-blur-sm group hover:border-slate-700 transition-colors">

          <h2 className="text-xl font-semibold mb-5 flex items-center gap-3 text-slate-100">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <BarChart2 className="w-6 h-6" />
            </div>
            MRI Analysis Report
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