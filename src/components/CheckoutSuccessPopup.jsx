import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPopup({ message }) {
  const [show, setShow] = useState(true);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md text-center relative">
            <CheckCircle className="text-green-500 mx-auto mb-3" size={50} />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              🎉 Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-4">{message}</p>

            <button
              onClick={() => setShow(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
