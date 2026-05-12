import { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

function CustomSelect({ name, value, options, placeholder, onChange, className }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  const handleOptionSelect = (option) => {
    onChange({
      target: {
        name,
        value: option,
      },
    })
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className={`${className} justify-between gap-3 text-left ${value ? 'text-[#351818]' : 'text-[#9a8781]'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{value || placeholder}</span>
        <FiChevronDown
          className={`h-4 w-4 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-full overflow-hidden rounded-2xl border border-[#d9c5bc] bg-white shadow-[0_18px_50px_rgba(107,28,31,0.12)]">
          <div role="listbox" aria-label={name} className="grid max-h-72 overflow-y-auto p-2">
            {options.map((option) => {
              const isSelected = option === value

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(option)}
                  className={`rounded-xl px-4 py-3 text-left text-sm transition ${
                    isSelected
                      ? 'bg-[#fff0eb] font-medium text-[#351818]'
                      : 'text-[#655651] hover:bg-[#fff7f4]'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CustomSelect