import React from 'react'

const Modal = ({onClose, children}) => {
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-md">
            {children}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
        </div>
    </div>
  )
}

export default Modal