import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowLeft, ChevronRight, FileText, Info, Layers, Eye, CheckCircle2, Activity, Zap, Search } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePrediction } from '../context/PredictionContext';

const Result = () => {
  const { predictionData } = usePrediction();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('original'); // 'original' or 'heatmap'

  if (!predictionData) {
    return <Navigate to="/" />;
  }

  const severityColors = {
    "No DR": "bg-emerald-500",
    "Mild": "bg-yellow-400",
    "Moderate": "bg-orange-500",
    "Severe": "bg-red-500",
    "Proliferative": "bg-red-700",
  };

  const severityTextColors = {
    "No DR": "text-emerald-700",
    "Mild": "text-yellow-700",
    "Moderate": "text-orange-700",
    "Severe": "text-red-700",
    "Proliferative": "text-red-900",
  };

  const severityBgColors = {
    "No DR": "bg-emerald-50",
    "Mild": "bg-yellow-50",
    "Moderate": "bg-orange-50",
    "Severe": "bg-red-50",
    "Proliferative": "bg-red-50",
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 print:pb-0 print:min-h-0 print:bg-white transition-colors duration-300">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 print:p-0 print:py-0 print:m-0">
        <div className="flex items-center gap-4 mb-8 print:mb-2 print:mt-0">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors print:hidden"
          >
            <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white print:text-black print:text-xl">Analysis Report</h1>
            <p className="text-slate-500 dark:text-slate-400 print:text-black print:text-xs">Prediction completed on {new Date(predictionData.timestamp).toLocaleString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 print:grid-cols-5 print:gap-4 print:text-sm">
          {/* Main View Area */}
          <div className="lg:col-span-3 space-y-6 print:col-span-3 print:space-y-2">
            <Card className="overflow-hidden print:border-slate-300 print:shadow-none print:rounded-none">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 transition-colors duration-300 print:hidden">
                <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  <button 
                    onClick={() => setActiveTab('original')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === 'original' ? "bg-medical-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    Original Image
                  </button>
                  <button 
                    onClick={() => setActiveTab('heatmap')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeTab === 'heatmap' ? "bg-medical-600 text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Layers size={16} />
                    Grad-CAM
                  </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  <Eye size={14} />
                  Viewing: {activeTab}
                </div>
              </div>
              
              <div className="relative aspect-square sm:aspect-video print:hidden bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={predictionData.originalImage} 
                      className={`w-full h-full object-contain ${activeTab === 'heatmap' ? 'brightness-50' : ''}`}
                      alt="Retinal" 
                    />
                    {activeTab === 'heatmap' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-1/3 h-1/3 bg-red-500/40 rounded-full blur-[80px] absolute top-1/4 left-1/3 animate-pulse"></div>
                        <div className="w-1/4 h-1/4 bg-yellow-400/30 rounded-full blur-[60px] absolute bottom-1/3 right-1/4"></div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {activeTab === 'heatmap' && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-xl flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-2 w-24 rounded-full overflow-hidden bg-slate-800">
                          <div className="h-full w-1/4 bg-blue-500"></div>
                          <div className="h-full w-1/4 bg-green-500"></div>
                          <div className="h-full w-1/4 bg-yellow-500"></div>
                          <div className="h-full w-1/4 bg-red-500"></div>
                        </div>
                        <span>Heatmap Intensity (Low - High)</span>
                      </div>
                      <span>Highlighting key diagnostic regions</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Print-Only Dual View for Both Images */}
              <div className="hidden print:grid grid-cols-2 gap-4 p-4 border-b border-slate-300">
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-bold mb-2 uppercase text-slate-500 tracking-wider">Original Capture</p>
                  <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center rounded-lg overflow-hidden border border-slate-200">
                    <img src={predictionData.originalImage} className="w-full h-full object-contain" alt="Original" />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-bold mb-2 uppercase text-slate-500 tracking-wider">Grad-CAM Heatmap</p>
                  <div className="relative w-full aspect-square bg-slate-50 flex items-center justify-center rounded-lg overflow-hidden border border-slate-200">
                    <img src={predictionData.originalImage} className="w-full h-full object-contain brightness-50" alt="Heatmap" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-screen">
                      <div className="w-1/2 h-1/2 bg-red-500/60 rounded-full blur-[30px] absolute top-1/4 left-1/4"></div>
                      <div className="w-1/3 h-1/3 bg-yellow-400/50 rounded-full blur-[20px] absolute bottom-1/4 right-1/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
              <Card className="p-6 print:p-3 print:shadow-none print:border-slate-300 print:rounded-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 rounded-lg flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Image Explanation</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  "{predictionData.explanation}"
                </p>
              </Card>

              <Card className="p-6 print:p-3 print:shadow-none print:border-slate-300 print:rounded-none">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{predictionData.additionalFeature.title}</h4>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-black text-purple-600 dark:text-purple-400">{predictionData.additionalFeature.value}</span>
                  <span className="text-sm text-slate-400 dark:text-slate-500 mb-1">Health Index</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {predictionData.additionalFeature.description}
                </p>
              </Card>
            </div>

            <Card className="p-6 print:p-3 print:shadow-none print:border-slate-300 print:rounded-none">
              <h4 className="font-bold text-slate-900 dark:text-white print:mb-3 mb-6 flex items-center gap-2">
                <Search size={18} className="text-medical-600 dark:text-medical-400" />
                Detected Anomalies
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 print:gap-2">
                {predictionData.findings.map((finding, idx) => (
                  <div key={idx} className="p-3 print:p-2 bg-slate-50 dark:bg-slate-950 rounded-xl print:rounded-none border border-slate-100 dark:border-slate-800 print:border-slate-300">
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">{finding.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-slate-800 dark:text-slate-200">{finding.count}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-600">instances</span>
                    </div>
                    <div className="mt-2 w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-medical-500" 
                        style={{ width: `${finding.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Severity & Action Sidebar */}
          <div className="lg:col-span-2 space-y-6 print:col-span-2 print:space-y-4">
            <Card className="p-8 print:p-4 print:shadow-none print:border-slate-300 print:rounded-none">
              <h3 className="text-xl print:text-lg font-bold text-slate-900 dark:text-white mb-6 print:mb-3 font-serif">Diagnosis Summary</h3>
              
               <div className={`p-4 rounded-2xl mb-6 flex items-center justify-between ${severityBgColors[predictionData.severity]} dark:bg-slate-950 dark:border dark:border-slate-800`}>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-60 dark:text-slate-400">Severity Level</p>
                    <p className={`text-2xl font-black ${severityTextColors[predictionData.severity]}`}>{predictionData.severity}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/50 print:bg-slate-100 dark:bg-slate-900 rounded text-[10px] font-bold text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={10} className="text-emerald-600 print:text-black" />
                        {predictionData.confidence}% CONFIDENCE
                      </div>
                    </div>
                  </div>
                  <div className={`w-12 h-12 print:w-8 print:h-8 rounded-full flex items-center justify-center text-white ${severityColors[predictionData.severity]} shadow-lg print:shadow-none`}>
                    <AlertCircle size={28} className="print:w-5 print:h-5" />
                  </div>
               </div>

              <div className="space-y-4 print:space-y-2">
                <div className="p-4 print:p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl print:rounded-none relative overflow-hidden print:border-slate-300">
                  <div className="absolute top-0 right-0 p-2 opacity-5 dark:opacity-10 dark:text-white">
                    <Info size={40} />
                  </div>
                  <h4 className="flex items-center gap-2 font-bold mb-2 text-slate-800 dark:text-slate-200">
                    <Info size={16} className="text-medical-600 dark:text-medical-400" />
                    Medical Summary
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {predictionData.summary}
                  </p>
                </div>

                <div className="p-4 print:p-3 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl print:rounded-none print:border-slate-300">
                  <h4 className="font-bold mb-2 text-blue-900 dark:text-blue-300 text-sm">Recommended Next Steps:</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-2">
                    <li className="flex gap-2">
                      <ChevronRight size={14} className="mt-1 shrink-0" />
                      Ophthalmoscopy for clinical confirmation
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight size={14} className="mt-1 shrink-0" />
                      Optical Coherence Tomography (OCT) scan
                    </li>
                    <li className="flex gap-2">
                      <ChevronRight size={14} className="mt-1 shrink-0" />
                      Fasting Blood Sugar (FBS) review
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-10 space-y-3 print:hidden">
                <Button 
                  onClick={() => navigate('/prescription')}
                  className="w-full h-14"
                >
                  <FileText size={20} />
                  Create Prescription
                </Button>
                <Button 
                   variant="outline" 
                   className="w-full"
                   onClick={() => window.print()}
                >
                  Download Report PDF
                </Button>
              </div>
            </Card>

            <div className="print:hidden">
              <Card className="p-6 bg-slate-900 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <AlertCircle size={18} className="text-yellow-400" />
                  Wait, Something's wrong?
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  If the analysis seems incorrect or the image is poorly captured, you can re-run the prediction.
                </p>
                <Button 
                  variant="ghost" 
                  className="w-full border border-white/10 hover:bg-white/5 text-sm text-slate-300"
                  onClick={() => navigate('/')}
                >
                  Re-upload Image
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Result;
