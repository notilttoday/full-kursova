import { useEffect, useRef } from 'react'

interface ClickOutsideProps {
  children: React.ReactNode
  exceptionRef?: React.RefObject<HTMLElement>
  onClick: () => void
  className?: string
}

export const ClickOutside: React.FC<ClickOutsideProps> = ({ children, exceptionRef, onClick, className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickListener = (event: MouseEvent): void => {
      let clickedInside: null | boolean = false
      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) ||
          (exceptionRef.current && exceptionRef.current === event.target) ||
          (exceptionRef.current && exceptionRef.current.contains(event.target as Node))
      } else {
        clickedInside = wrapperRef.current && wrapperRef.current.contains(event.target as Node)
      }

      if (!clickedInside) {
        onClick()
      }
    }

    document.addEventListener('mousedown', handleClickListener)

    return (): void => {
      document.removeEventListener('mousedown', handleClickListener)
    }
  }, [exceptionRef, onClick])

  return (
    <div ref={wrapperRef} className={`${className || ''}`}>
      {children}
    </div>
  )
}
