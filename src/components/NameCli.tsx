import React, {useEffect, useState} from "react";
import './NameCli.css'

export function NameCli() {
    const [glitch, setGlitch] = useState(false);
    const [glitchType, setGlitchType] = useState(0);

    useEffect(() => {
        const triggerGlitch = () => {
            // 5% chance to glitch every check
            if (Math.random() > 0.95) {
                setGlitch(true);
                setGlitchType(Math.floor(Math.random() * 3)); // Different glitch flavors
                
                // Reset glitch after a short period (100-300ms)
                setTimeout(() => {
                    setGlitch(false);
                }, Math.random() * 200 + 100);
            }
        };

        const interval = setInterval(triggerGlitch, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="vertical-center col">
            <div className="row blast-root">
                <h1 className={glitch ? `glitch-cursor type-${glitchType}` : ""}>
                    Hi, I am Miguel
                </h1>
            </div>
        </div>
    );
}
