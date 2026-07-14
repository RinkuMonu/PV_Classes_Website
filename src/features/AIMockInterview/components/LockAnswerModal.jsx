export default function LockAnswerModal({ isOpen, onConfirm, onCancel, selectedOption }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-[#00316B] p-4 text-center">
          <h2 className="text-xl font-bold text-white">Lock Answer?</h2>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            Are you sure you want to lock Option <strong className="text-[#009FE3] text-xl">{selectedOption}</strong>?
            <br/><span className="text-sm">You cannot change your answer after locking.</span>
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 px-4 rounded-xl bg-[#00316B] text-white font-bold hover:bg-[#00224d] transition-colors shadow-lg shadow-blue-900/20"
            >
              Yes, Lock It
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
