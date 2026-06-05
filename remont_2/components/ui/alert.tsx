"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info";
  message?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const typeStyles = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-900/30 text-red-300 border-red-700/50",
  warning: "bg-yellow-900/30 text-yellow-300 border-yellow-700/50",
  info: "bg-blue-900/30 text-blue-300 border-blue-700/50",
};

const fadeInBlur = {
  initial: { opacity: 0, filter: "blur(10px)", y: 10 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const Alert: React.FC<AlertProps> = ({
  type = "info",
  message = "This is an alert message.",
  onClick,
}) => {
  return (
    <motion.div
      className={cn(
        "border px-4 py-3 flex gap-x-2 items-center rounded-xl text-sm",
        typeStyles[type]
      )}
      role="alert"
      variants={fadeInBlur}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.01, rotate: 1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      <span className="font-bold capitalize">{type}:</span>
      <span>{message}</span>
    </motion.div>
  );
};

export default Alert;
