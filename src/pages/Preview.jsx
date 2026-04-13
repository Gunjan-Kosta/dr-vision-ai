import React, { useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { ArrowLeft, Download, Printer, Share2, Stethoscope, Phone, Mail, Globe } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import { Button } from '../components/ui/Button';
import { usePrediction } from '../context/PredictionContext';

const Preview = () => {
  const { patientData, predictionData } = usePrediction();
  const navigate = useNavigate();
  const printRef = useRef();

  if (!patientData) {
    return <Navigate to="/prescription" />;
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const content = printRef.current;
    
    // We would normally use html2canvas + jspdf for high fidelity
    // But for this demo, we'll provide a professional printed view
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 print:bg-white print:pb-0 transition-colors duration-300">
      <div className="print:hidden dark">
        <Navbar />
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 print:p-0">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/prescription')}
              className="p-2 hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-slate-400" />
            </button>
            <h1 className="text-2xl font-bold text-white">Final Preview</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={handleDownload} className="text-slate-300 hover:bg-white/5 border border-white/10">
              <Download size={18} />
              Download PDF
            </Button>
            <Button onClick={handlePrint} className="bg-medical-600 hover:bg-medical-500 shadow-lg shadow-medical-600/20">
              <Printer size={18} />
              Print Prescription
            </Button>
          </div>
        </div>

        {/* Prescription Sheet */}
        <div 
          ref={printRef}
          className="bg-white shadow-2xl rounded-sm min-h-[1000px] p-12 print:shadow-none print:m-0 print:p-8 border-t-[12px] border-medical-600"
        >
          {/* Hospital Header */}
          <div className="flex justify-between items-start mb-10 pb-10 border-b-2 border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-medical-600 text-white p-3 rounded-2xl">
                <Stethoscope size={40} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">CITY VISION HOSPITAL</h2>
                <p className="text-medical-600 font-bold tracking-widest text-sm italic">Ophthalmology Excellence</p>
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              <p className="flex items-center justify-end gap-2 font-semibold text-slate-700">
                123 Eye Care Lane, Medical District
                <Globe size={14} className="text-medical-600" />
              </p>
              <p className="flex items-center justify-end gap-2">
                +1 (555) 0123-4567
                <Phone size={14} className="text-medical-600" />
              </p>
              <p className="flex items-center justify-end gap-2">
                contact@cityvision.com
                <Mail size={14} className="text-medical-600" />
              </p>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="mb-10 flex justify-between">
            <div>
              <p className="text-xl font-bold text-slate-900">{patientData.doctorName}</p>
              <p className="text-medical-600 font-semibold">{patientData.doctorRole}</p>
              <p className="text-xs text-slate-400 mt-1">Specialist in Retinal Disorders</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900">DATE: {new Date(patientData.date).toLocaleDateString()}</p>
              <p className="text-xs text-slate-400">Ref ID: DR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          {/* Patient Details Row */}
          <div className="bg-slate-50 p-6 rounded-xl grid grid-cols-4 gap-6 mb-12">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Patient Name</p>
              <p className="font-bold text-slate-900">{patientData.patientName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Age / Gender</p>
              <p className="font-bold text-slate-900">{patientData.age} Years / {patientData.gender}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Diagnosis</p>
              <p className="font-bold text-slate-900">{patientData.diagnosis} - {patientData.severity}</p>
            </div>
          </div>

          {/* Rx Icon */}
          <div className="text-5xl font-serif text-slate-300 mb-6 italic opacity-50 select-none">Rx</div>

          {/* Prescription Content */}
          <div className="flex flex-col h-full min-h-[400px]">
            <div className="flex-grow space-y-12">
              <section>
                <h3 className="text-sm font-black text-slate-900 mb-4 border-l-4 border-medical-600 pl-3">MEDICATIONS</h3>
                <div className="whitespace-pre-line text-slate-700 leading-loose ml-7 font-medium">
                  {patientData.medications}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-black text-slate-900 mb-4 border-l-4 border-medical-600 pl-3">ADVICE & PRECAUTIONS</h3>
                <div className="whitespace-pre-line text-slate-700 leading-loose ml-7 font-medium">
                  {patientData.precautions}
                </div>
              </section>
            </div>

            {/* Footer with Signature */}
            <div className="mt-24 border-t border-slate-100 pt-10 flex justify-between items-end">
              <div className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
                This prescription is generated based on AI-assisted analysis of retinal imaging. Final confirmation has been provided by the signing physician. 
                <br /><br />
                © Dr. Vision AI Systems
              </div>
              <div className="text-center">
                <div className="w-48 border-b-2 border-slate-900 mb-2">
                  <div className="h-12 flex items-center justify-center opacity-30 select-none font-serif italic text-2xl">
                    {patientData.doctorName}
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-900">Dr. Signature</p>
                <p className="text-[10px] text-slate-400">Registration No: MED-129381</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-4 print:hidden">
           <p className="text-slate-500 text-sm flex items-center gap-2">
             <Share2 size={14} />
             Share digitally with patient via WhatsApp or Email
           </p>
        </div>
      </main>
      <div className="dark">
        <Footer />
      </div>
    </div>
  );
};

export default Preview;
