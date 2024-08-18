import React from "react";
import { motion } from "framer-motion";

const style = {
    width: 20,
    height: 20,
    opacity: 1,
    margin: 8,
    borderRadius: 0,
    display: "inline-block",
    background: "#654AB4",
};

const variants = {
    start: {
        scale: 0.2,
        rotate: 0,
    },
    end: {
        scale: 1,
        rotate: 360,
    },
};

export default function Loader() {
    return (
        <div className="w-full h-screen flex items-center justify-center" >
            {[0, 0.2, 0.4, 0.6, 0.8].map((delay, index) => (
                <motion.div
                    key={index}
                    style={style}
                    variants={variants}
                    initial="start"
                    animate="end"
                    transition={{    
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "anticipate",
                        duration: 1, 
                        delay: delay,
                    }}
                />
            ))}
        </div>
    );
}
