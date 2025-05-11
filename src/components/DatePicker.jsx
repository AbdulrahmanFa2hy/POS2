import { useState, useEffect, useRef } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'

const DatePicker = ({ selectedDate, setSelectedDate, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [days, setDays] = useState([])
  const datePickerRef = useRef(null)
  
  useEffect(() => {
    // Generate days for the current month
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const daysArray = eachDayOfInterval({ start: monthStart, end: monthEnd })
    
    setDays(daysArray)
  }, [currentMonth])
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])
  
  const handleSelectDate = (date) => {
    setSelectedDate(format(date, 'd MMM, yyyy'))
    onClose()
  }
  
  return (
    <div 
      className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-neutral-200 p-4"
      ref={datePickerRef}
    >
      <div className="flex justify-between items-center mb-4">
        <button 
          className="p-1 rounded-full hover:bg-neutral-100"
          onClick={() => setCurrentMonth(addDays(currentMonth, -30))}
        >
          &lt;
        </button>
        <h3 className="font-medium">{format(currentMonth, 'MMMM yyyy')}</h3>
        <button 
          className="p-1 rounded-full hover:bg-neutral-100"
          onClick={() => setCurrentMonth(addDays(currentMonth, 30))}
        >
          &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-xs text-neutral-500 py-1">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before start of month */}
        {Array.from({ length: days[0]?.getDay() || 0 }).map((_, index) => (
          <div key={`empty-${index}`} className="w-8 h-8" />
        ))}
        
        {days.map((day) => {
          const formattedDay = format(day, 'd MMM, yyyy')
          const isSelected = formattedDay === selectedDate
          const isToday = isSameDay(day, new Date())
          
          return (
            <button
              key={day.toString()}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors
                ${isSelected ? 'bg-primary-600 text-white hover:bg-primary-700' : 'hover:bg-neutral-100'}
                ${isToday && !isSelected ? 'border border-primary-500 text-primary-600' : ''}
              `}
              onClick={() => handleSelectDate(day)}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default DatePicker