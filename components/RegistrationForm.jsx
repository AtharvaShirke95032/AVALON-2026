"use client";

import React, { useState } from 'react';
import CyberpunkButton from './ui/CyberpunkButton';

const RegistrationForm = ({ eventName, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        teamName: "",
        leadName: "",
        email: "",
        phone: "",
        members: "2",
        college: "",
        event: eventName || "ROBO RACE",
        screenshot: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, screenshot: e.target.files[0] }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            const response = await fetch('/api/register', {
                method: 'POST',
                body: data
            });

            const result = await response.json();
            if (result.success) {
                alert("UPLOAD SUCCESSFUL. DATA COMMITTED TO THE GRID.");
                onClose();
            } else {
                alert("DATA CORRUPTION: " + result.error);
            }
        } catch (error) {
            alert("SIGNAL INTERRUPTED. PLEASE RETRY.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="text-white font-vt323">
            <h2 className="text-4xl font-bold mb-6 text-cyber-yellow glitch-text" data-text={`REGISTER FOR ${formData.event}`}>
                REGISTER FOR {formData.event}
            </h2>

            <div className="flex mb-8">
                <div className={`flex-1 h-1 ${step >= 1 ? 'bg-cyber-cyan shadow-[0_0_10px_#00f0ff]' : 'bg-white/20'}`}></div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-cyber-cyan shadow-[0_0_10px_#00f0ff]' : 'bg-white/20'}`}></div>
                <div className={`flex-1 h-1 ${step >= 3 ? 'bg-cyber-cyan shadow-[0_0_10px_#00f0ff]' : 'bg-white/20'}`}></div>
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter shadow-cyber-cyan/20">// TEAM_DESIGNATION</label>
                                <input
                                    type="text" name="teamName" required
                                    placeholder="CRITICAL_UNIT_ID"
                                    className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/20"
                                    onChange={handleChange} value={formData.teamName}
                                />
                            </div>
                            <div>
                                <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// OPS_LEAD_COMMANDER</label>
                                <input
                                    type="text" name="leadName" required
                                    placeholder="LEAD_IDENTITY"
                                    className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/20"
                                    onChange={handleChange} value={formData.leadName}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// DATA_UPLINK_EMAIL</label>
                            <input
                                type="email" name="email" required
                                placeholder="COMM_CHANNEL@GRID.NET"
                                className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/20"
                                onChange={handleChange} value={formData.email}
                            />
                        </div>
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// ENCRYPTED_VOICE_LINE</label>
                            <input
                                type="tel" name="phone" required
                                placeholder="+91 XXXX XXXX"
                                className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/20"
                                onChange={handleChange} value={formData.phone}
                            />
                        </div>
                        <CyberpunkButton color="cyan" type="button" onClick={nextStep} className="w-full mt-4">INITIALIZE_PHASE_02</CyberpunkButton>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// SECTOR_AFFILIATION</label>
                            <input
                                type="text" name="college" required
                                placeholder="COLLEGE_OR_INSTITUTE"
                                className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/20"
                                onChange={handleChange} value={formData.college}
                            />
                        </div>
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// SQUAD_SIZE</label>
                            <select
                                name="members"
                                className="w-full bg-black/40 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all"
                                onChange={handleChange} value={formData.members}
                            >
                                <option value="2">02 OPERATIVES</option>
                                <option value="3">03 OPERATIVES</option>
                                <option value="4">04 OPERATIVES</option>
                            </select>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <CyberpunkButton color="pink" type="button" onClick={prevStep} className="flex-1">BACKTRACK</CyberpunkButton>
                            <CyberpunkButton color="yellow" type="button" onClick={nextStep} className="flex-1">VALIDATE_CREDITS</CyberpunkButton>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <div className="bg-white/5 p-4 border-l-4 border-cyber-yellow">
                            <p className="text-cyber-yellow font-bold uppercase mb-2">Payment Details</p>
                            <p className="text-sm">Amount to Pay: <span className="text-lg">₹400</span></p>
                            <p className="text-sm">UPI ID: <span className="text-cyber-cyan">example@upi</span></p>
                            <div className="mt-4 flex justify-center">
                                {/* Placeholder for QR Code */}
                                <div className="w-48 h-48 bg-white/10 flex items-center justify-center border-2 border-dashed border-cyber-cyan">
                                    <span className="text-xs text-center px-4 opacity-50">QR CODE WILL BE INSERTED HERE</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-cyber-cyan text-sm mb-1 uppercase tracking-tighter">Upload Payment Screenshot</label>
                            <input
                                type="file" name="screenshot" accept="image/*" required
                                className="w-full bg-black border-2 border-dashed border-white/20 p-4 focus:border-cyber-yellow outline-none transition-colors cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="flex gap-4 mt-8">
                            <CyberpunkButton color="pink" type="button" onClick={prevStep} className="flex-1" disabled={isSubmitting}>Rewind</CyberpunkButton>
                            <CyberpunkButton color="cyan" type="submit" className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? "TRANSMITTING..." : "Finalize Submission"}
                            </CyberpunkButton>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegistrationForm;
