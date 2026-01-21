"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CyberpunkButton from '@/components/ui/CyberpunkButton';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'avalon2026') {
            localStorage.setItem('admin_auth', 'true');
            router.push('/admin');
        } else {
            setError('ACCESS DENIED: INCORRECT CREDENTIALS');
            setPassword('');
        }
    };

    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-4 font-vt323">
            <div className="scanline-overlay"></div>
            <div className="max-w-md w-full cyber-box border-cyber-pink p-8 text-center">
                <h1 className="text-4xl font-bold text-cyber-yellow mb-8 glitch-text" data-text="RESTRICTED AREA">RESTRICTED AREA</h1>
                <p className="text-cyber-cyan mb-6 text-sm">AUTHENTICATION REQUIRED TO ACCESS MODERATOR CONSOLE</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="ENTER PASSCODE"
                            className="w-full bg-black border-2 border-cyber-pink/50 p-4 text-center focus:border-cyber-pink outline-none text-cyber-pink tracking-[1em]"
                            required
                        />
                    </div>

                    {error && <p className="text-cyber-pink text-xs animate-pulse uppercase">{error}</p>}

                    <CyberpunkButton color="pink" type="submit" className="w-full">
                        INITIALIZE UPLINK
                    </CyberpunkButton>
                </form>

                <div className="mt-8 text-[10px] opacity-30 uppercase">
                    Unauthorized access is a violation of the grid protocol.
                </div>
            </div>
        </main>
    );
}
