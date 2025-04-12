import { motion } from "framer-motion";
import { PacmanLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center py-6"
    >
      <PacmanLoader color="#3b82f6" size={24} />
    </motion.div>
  );
}
