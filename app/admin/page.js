"use client";

import React, { useEffect, useState } from 'react';
import CyberpunkButton from '@/components/ui/CyberpunkButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth !== 'true') {
            router.push('/admin/login');
        } else {
            setIsAuthorized(true);
            fetchRegistrations();
        }
    }, []);

    const fetchRegistrations = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/registrations');
            const data = await res.json();
            setRegistrations(data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleAction = async (id, action) => {
        try {
            await fetch('/api/admin/registrations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, action })
            });
            fetchRegistrations();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isAuthorized || isLoading) return <div className="p-20 text-cyber-cyan animate-pulse text-4xl font-vt323 tracking-widest text-center">INITIALIZING ADMIN GRID...</div>;

    return (
        <main className="min-h-screen bg-black text-white p-8 font-vt323">
            <div className="scanline-overlay"></div>

            <div className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-bold text-cyber-yellow glitch-text" data-text="MODERATOR CONSOLE">MODERATOR CONSOLE</h1>
                <div className="text-right">
                    <p className="text-cyber-cyan">ACTIVE OPS: {registrations.length}</p>
                    <p className="text-cyber-pink animate-pulse">THREAT LEVEL: MINIMAL</p>
                </div>
            </div>

            <div className="overflow-x-auto cyber-box border-white/20">
                <table className="w-full text-left">
                    <thead className="bg-white/10 text-cyber-cyan border-b border-white/20">
                        <tr>
                            <th className="p-4">TEAM / LEAD</th>
                            <th className="p-4">EVENT</th>
                            <th className="p-4">CONTACT</th>
                            <th className="p-4">RECEIPT</th>
                            <th className="p-4">STATUS</th>
                            <th className="p-4">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg) => (
                            <tr key={reg.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="font-bold text-cyber-yellow uppercase">{reg.team_name}</div>
                                    <div className="text-xs opacity-60">Lead: {reg.lead_name} ({reg.members} members)</div>
                                    <div className="text-[10px] opacity-40">{reg.college}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs border ${reg.event === 'ROBO RACE' ? 'border-cyber-cyan text-cyber-cyan' : 'border-cyber-pink text-cyber-pink'}`}>
                                        {reg.event}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="text-xs">{reg.email}</div>
                                    <div className="text-xs text-cyber-cyan">{reg.phone}</div>
                                </td>
                                <td className="p-4">
                                    {reg.screenshot_url ? (
                                        <button
                                            onClick={() => setSelectedImage(reg.screenshot_url)}
                                            className="text-xs text-cyber-cyan underline hover:text-cyber-yellow"
                                        >
                                            VIEW RECEIPT
                                        </button>
                                    ) : (
                                        <span className="text-xs opacity-30">NO IMAGE</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-bold uppercase ${reg.status === 'approved' ? 'text-green-400' :
                                        reg.status === 'rejected' ? 'text-cyber-pink' : 'text-cyber-yellow animate-pulse'
                                        }`}>
                                        {reg.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAction(reg.id, 'approve')}
                                            className="px-2 py-1 text-[10px] bg-green-900/30 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all"
                                        >
                                            APPROVE
                                        </button>
                                        <button
                                            onClick={() => handleAction(reg.id, 'reject')}
                                            className="px-2 py-1 text-[10px] bg-red-900/30 border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black transition-all"
                                        >
                                            REJECT
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/95" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-2xl w-full">
                        <Image
                            src={selectedImage}
                            alt="Receipt"
                            width={800}
                            height={1000}
                            className="w-full h-auto cyber-box border-cyber-cyan"
                        />
                        <button className="absolute -top-10 right-0 text-cyber-cyan font-bold tracking-widest">[ ESC ] TO CLOSE</button>
                    </div>
                </div>
            )}
        </main>
    );
}
