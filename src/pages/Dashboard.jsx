import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, UploadCloud, FileImage, ShieldCheck, Microscope, Loader2 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { usePrediction } from '../context/PredictionContext';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { setPredictionData } = usePrediction();
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult = {
        originalImage: selectedImage,
        heatmapImage: selectedImage, // Base for the Grad-CAM visualization
        severity: "Moderate",
        severityLevel: 2, // 0: No DR, 1: Mild, 2: Moderate, 3: Severe, 4: Proliferative
        confidence: 94.2,
        explanation: "The image shows clear evidence of retinal pathology. Multi-focal microaneurysms and intraretinal hemorrhages are visible in the mid-peripheral regions. Some hard exudates are forming near the superior arcade, suggesting early vascular leakage.",
        summary: "Moderate Non-Proliferative Diabetic Retinopathy (NPDR). The presence of microaneurysms and hemorrhages across multiple quadrants indicates a progression from mild stages. No signs of macular edema or neovascularization are detected in this frame, but close monitoring is essential.",
        findings: [
          { label: "Microaneurysms", count: 12, confidence: 91 },
          { label: "Hemorrhages", count: 8, confidence: 88 },
          { label: "Hard Exudates", count: 4, confidence: 82 },
          { label: "Soft Exudates", count: 0, confidence: 99 }
        ],
        additionalFeature: {
          title: "Vascular Health Score",
          value: "72/100",
          description: "Calculated based on vessel tortuosity and caliber ratios. Lower scores indicate potential hypertensive or diabetic stress on the retinal vasculature."
        },
        timestamp: new Date().toISOString(),
      };
      
      setPredictionData(mockResult);
      setIsAnalyzing(false);
      navigate('/result');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Retinal Image Analysis</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 italic">Upload a high-quality fundus image for DR severity prediction.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-1">
              <div 
                className={`relative border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center transition-all ${
                  dragActive ? "border-medical-500 bg-medical-50/50 dark:bg-medical-900/20" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                } ${selectedImage ? "p-4" : "p-20"}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!selectedImage ? (
                  <div className="text-center group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                    <div className="w-20 h-20 bg-medical-50 dark:bg-medical-900/20 text-medical-600 dark:text-medical-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <UploadCloud size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload retinal image</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                      Drag and drop your image here, or click to browse files from your computer.
                    </p>
                    <Button variant="outline" className="mx-auto">
                      Select File
                    </Button>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                  </div>
                ) : (
                  <div className="w-full relative animate-fade-in">
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 shadow-inner max-h-[500px] flex justify-center bg-slate-950">
                      <img 
                        src={selectedImage} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain"
                      />
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                      <Button 
                        onClick={handleAnalyze} 
                        className="w-full sm:w-64 h-14 text-lg"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="animate-spin" />
                            Analyzing Image...
                          </>
                        ) : (
                          <>
                            <Microscope size={20} />
                            Start Analysis
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-medical-900 text-white border-none overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck size={120} />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck size={24} className="text-medical-400" />
                AI Guidelines
              </h3>
              <ul className="space-y-4 text-medical-100 text-sm">
                <li className="flex gap-3">
                   <div className="mt-1 w-1.5 h-1.5 bg-medical-400 rounded-full shrink-0"></div>
                   Ensure the image is sharp and well-illuminated.
                </li>
                <li className="flex gap-3">
                   <div className="mt-1 w-1.5 h-1.5 bg-medical-400 rounded-full shrink-0"></div>
                   The macula and optic nerve head should be visible.
                </li>
                <li className="flex gap-3">
                   <div className="mt-1 w-1.5 h-1.5 bg-medical-400 rounded-full shrink-0"></div>
                   Avoid reflections or artifacts in the central field.
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-medical-300">
                  This system is an assistive tool. Final diagnosis should be made by a qualified ophthalmologist.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileImage size={20} className="text-medical-600" />
                Upload Tips
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Format:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">JPEG, PNG, DICOM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Max size:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">10 MB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Resolution:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Min 1024x1024</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
