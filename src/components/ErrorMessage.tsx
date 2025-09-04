import React from 'react'

const ErrorMessage = ({ children } : {children: React.ReactNode}) => {
  return (
    <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
      <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">!</span>
      {children}
    </p>
  )
}

export default ErrorMessage
