import { useRef, useEffect } from 'react'

const TimePicker = ({ selectedTime, setSelectedTime, onClose }) => {
  const timePickerRef = useRef(null)
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timePickerRef.current && !timePickerRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])
  
  // Generate times from 9 AM to 10 PM
  const times = []
  for (let hour = 9; hour <= 22; hour++) {
    const hourString = hour % 12 === 0 ? '12' : (hour % 12).toString()
    const period = hour < 12 ? 'am' : 'pm'
    
    times.push(`${hourString}:00 ${period}`)
    times.push(`${hourString}:30 ${period}`)
  }
  
  const handleSelectTime = (time) => {
    setSelectedTime(time)
    onClose()
  }
  
  return (
    <div 
      className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 w-40 max-h-60 overflow-y-auto"
      ref={timePickerRef}
    >
      {times.map((time) => (
        <button
          key={time}
          className={`w-full px-4 py-2 text-left hover:bg-neutral-100 transition-colors
            ${time === selectedTime ? 'bg-primary-50 text-primary-600 font-medium' : ''}
          `}
          onClick={() => handleSelectTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  )
}

export default TimePicker