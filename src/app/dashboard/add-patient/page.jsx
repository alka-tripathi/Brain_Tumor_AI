// "use client";

// import { useState } from "react";

// export default function AddPatientPage() {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     patientAge: "",
//     patientGender: "",
//     notes: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/patients", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (data.success) {
//       alert("Patient added successfully!");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-white p-10">
//       <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-3xl">
//         <h1 className="text-3xl font-bold mb-8">
//           ➕ Add Patient
//         </h1>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Patient Name"
//             className="w-full p-3 rounded-xl bg-slate-800"
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 patientName: e.target.value,
//               })
//             }
//           />

//           <input
//             type="number"
//             placeholder="Age"
//             className="w-full p-3 rounded-xl bg-slate-800"
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 patientAge: e.target.value,
//               })
//             }
//           />

//           <select
//             className="w-full p-3 rounded-xl bg-slate-800"
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 patientGender: e.target.value,
//               })
//             }
//           >
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>

//           <textarea
//             placeholder="Doctor Notes"
//             className="w-full p-3 rounded-xl bg-slate-800"
//             rows="4"
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 notes: e.target.value,
//               })
//             }
//           />

//           <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl">
//             Save Patient
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function AddPatientPage() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    notes: "",
  });

  const [mriImage, setMriImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!mriImage) return;

    setLoading(true);

    const data = new FormData();
    data.append("image", mriImage);

    const res = await fetch("/api/analyze-mri", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    setFormData((prev) => ({
      ...prev,
      notes: result.summary,
    }));

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Patient added successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-xl mx-auto bg-slate-900 p-8 rounded-3xl">
        <h1 className="text-3xl font-bold mb-8">
          ➕ Add Patient
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Patient Name"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                patientName: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Age"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                patientAge: e.target.value,
              })
            }
          />

          <select
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                patientGender: e.target.value,
              })
            }
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* MRI Upload */}
          <div>
            <label className="block mb-2">
              Upload MRI Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full p-3 rounded-xl bg-slate-800"
              onChange={(e) => setMriImage(e.target.files[0])}
            />

            <button
              type="button"
              onClick={generateSummary}
              className="mt-3 bg-green-600 px-4 py-2 rounded-xl"
            >
              {loading ? "Analyzing..." : "Generate AI Summary"}
            </button>
          </div>

          <textarea
            value={formData.notes}
            placeholder="Doctor Notes"
            rows="5"
            className="w-full p-3 rounded-xl bg-slate-800"
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl">
            Save Patient
          </button>
        </form>
      </div>
    </div>
  );
}