"use client";

import React, { useState } from 'react';
import CyberpunkButton from './ui/CyberpunkButton';
import Image from 'next/image';
import confetti from 'canvas-confetti';

const RegistrationForm = ({ eventName, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        teamName: eventName === "ROBO RACE" || eventName === "CAD COMPETITION" ? "INDIVIDUAL_ENTRY" : "",
        leadName: "",
        email: "",
        phone: "",
        members: eventName === "ROBO RACE" || eventName === "CAD COMPETITION" ? "1" : "2",
        college: "",
        event: eventName || "ROBO RACE",
        screenshot: null
    });

    const eventFees = {
        "ROBO SOCCER": "300",
        "REVERSE CODING": "250",
        "ROBO RACE": "150",
        "CAD COMPETITION": "150",
        "INNOVATIVE PAPERWEIGHT": "200"
    };

    const isIndividual = formData.event === "ROBO RACE" || formData.event === "CAD COMPETITION";

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
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#00f0ff', '#ff003c', '#fcee0a']
                });
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
                            <div className={isIndividual ? "hidden" : ""}>
                                <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter shadow-cyber-cyan/20">// TEAM_DESIGNATION</label>
                                <input
                                    type="text" name="teamName" required={!isIndividual}
                                    placeholder="CRITICAL_UNIT_ID"
                                    className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/30 font-sans text-sm"
                                    onChange={handleChange} value={formData.teamName}
                                />
                            </div>
                            <div className={isIndividual ? "col-span-2" : ""}>
                                <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// {isIndividual ? "PARTICIPANT_IDENTITY" : "OPS_LEAD_COMMANDER"}</label>
                                <input
                                    type="text" name="leadName" required
                                    placeholder={isIndividual ? "YOUR_NAME" : "LEAD_IDENTITY"}
                                    className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/30 font-sans text-sm"
                                    onChange={handleChange} value={formData.leadName}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// DATA_UPLINK_EMAIL</label>
                            <input
                                type="email" name="email" required
                                placeholder="COMM_CHANNEL@GRID.NET"
                                className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/30 font-sans text-sm"
                                onChange={handleChange} value={formData.email}
                            />
                        </div>
                        <div>
                            <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// ENCRYPTED_VOICE_LINE</label>
                            <input
                                type="tel" name="phone" required
                                placeholder="+91 XXXX XXXX"
                                className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/30 font-sans text-sm"
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
                                className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all placeholder:text-white/30 font-sans text-sm"
                                onChange={handleChange} value={formData.college}
                            />
                        </div>
                        {!isIndividual && (
                            <div>
                                <label className="block text-cyber-cyan text-xs mb-1 uppercase tracking-tighter">// SQUAD_SIZE</label>
                                <select
                                    name="members"
                                    className="w-full bg-black/60 border-b-2 border-cyber-cyan/30 p-2 focus:border-cyber-cyan outline-none transition-all font-sans text-sm"
                                    onChange={handleChange} value={formData.members}
                                >
                                    <option value="2">02 OPERATIVES</option>
                                    <option value="3">03 OPERATIVES</option>
                                    <option value="4">04 OPERATIVES</option>
                                </select>
                            </div>
                        )}
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
                            <p className="text-sm">Amount to Pay: <span className="text-lg text-cyber-cyan">₹{eventFees[formData.event] || "0"}</span></p>
                            <p className="text-sm">UPI ID: <span className="text-cyber-pink">rajsalunke541@okhdfcbank</span></p>
                            <div className="mt-4 flex justify-center py-4 bg-white/10 cyber-box border-cyber-cyan/30">
                                <Image
                                    src="/assets/payment_qr.png"
                                    alt="UPI QR Code"
                                    width={200}
                                    height={200}
                                    className="invert"
                                />
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
