"use client"

import SignIn from "@/components/SignIn";
import SignupForm from "@/components/SignupForm";
import { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  

  return (
    <main className=" min-h-screen flex justify-center items-center bg-slate-900">
      <div className="flip-card bg-slate-800 py-4 px-6  rounded-md w-1/2" >
        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.div
              key="back"
              className="card back"
              initial={{ opacity: 0, rotateY: 180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 180 }}
            >
              <SignupForm />
              <div className="flex gap-2 items-center">
                <p className="text-white text-sm">Already have an account? </p>
                <button onClick={handleFlip} className="font-bold text-white">sign in</button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="front"
              className="card front"
              initial={{ opacity: 1, rotateY: 0 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -180 }}
            >
              <SignIn />
              <div className="flex gap-2 items-center">
                <p className="text-white text-sm">Don't have an account? </p>
                <button onClick={handleFlip} className="font-bold text-white">sign up</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
