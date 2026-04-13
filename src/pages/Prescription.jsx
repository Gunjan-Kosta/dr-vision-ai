import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Save, Printer, UserCircle, Calendar, ClipboardList, Pill, PenTool } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { usePrediction } from '../context/PredictionContext';
import { useAuth } from '../context/AuthContext';

const Prescription = () => {
  const { predictionData, setPatientData } = usePrediction();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    diagnosis: 'Diabetic Retinopathy',
    severity: '',
    date: new Date().toISOString().split('T')[0],
    precautions: '• Eye examinations every 3-6 months\n• Regular monitoring of blood glucose levels\n• Maintain healthy blood pressure and cholesterol',
    medications: '1. Tab. Glycomet 500mg - OD (Once Daily)\n2. Cap. Becosules - OD\n3. Lubricant Eye Drops - 4 times/day',
  });

  useEffect(() => {
    if (predictionData) {
      setFormData(prev => ({
        ...prev,
        severity: predictionData.severity
      }));
    }
  }, [predictionData]);

  if (!predictionData) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setPatientData({
      ...formData,
      doctorName: user?.name || 'Dr. Sarah Wilson',
      doctorRole: user?.role || 'Ophthalmologist',
    });
    navigate('/preview');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/result')}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Prescription</h1>
        </div>

        <form onSubmit={handleGenerate} className="space-y-8">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="bg-medical-50 dark:bg-medical-900/30 p-2 rounded-lg text-medical-600 dark:text-medical-400">
                <UserCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Patient Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input 
                label="Patient Name" 
                name="patientName"
                placeholder="Ex. John Doe" 
                value={formData.patientName}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Age" 
                  name="age"
                  type="number" 
                  placeholder="Ex. 45" 
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="label">Gender</label>
                  <select 
                    name="gender"
                    className="input-field"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option className="dark:bg-slate-900">Male</option>
                    <option className="dark:bg-slate-900">Female</option>
                    <option className="dark:bg-slate-900">Other</option>
                  </select>
                </div>
              </div>
              <Input 
                label="Date" 
                name="date"
                type="date" 
                value={formData.date}
                onChange={handleChange}
              />
              <Input 
                label="Diagnosis" 
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
              />
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Clinical Details</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="label">Severity Level (Auto-filled)</label>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{formData.severity}</span>
                </div>
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <PenTool size={16} className="text-medical-600 dark:text-medical-400" />
                  Precautions
                </label>
                <textarea 
                  name="precautions"
                  className="input-field min-h-[120px] py-3 resize-none dark:bg-slate-900/50"
                  rows={4}
                  value={formData.precautions}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label className="label flex items-center gap-2">
                  <Pill size={16} className="text-medical-600 dark:text-medical-400" />
                  Medications / Prescription
                </label>
                <textarea 
                  name="medications"
                  className="input-field min-h-[150px] py-3 resize-none bg-blue-50/20 dark:bg-blue-900/10"
                  rows={5}
                  value={formData.medications}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/result')}>
              Cancel
            </Button>
            <Button type="submit" className="h-14 px-10">
              <Save size={20} />
              Generate Prescription
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Prescription;
