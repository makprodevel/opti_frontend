import { useState, useEffect, useRef, RefObject } from 'react'

function isElementInViewport(el: HTMLElement, container: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  return (
    rect.top >= containerRect.top &&
    rect.left >= containerRect.left &&
    rect.bottom <= containerRect.bottom &&
    rect.right <= containerRect.right
  )
}

function useElementInViewport(
  containerRef: RefObject<HTMLElement>
): [boolean, RefObject<HTMLElement>] {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const checkVisibility = () => {
    if (elementRef.current && containerRef.current) {
      setIsVisible(
        isElementInViewport(elementRef.current, containerRef.current)
      )
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    checkVisibility()

    container.addEventListener('scroll', checkVisibility)
    container.addEventListener('resize', checkVisibility)

    return () => {
      container.removeEventListener('scroll', checkVisibility)
      container.removeEventListener('resize', checkVisibility)
    }
  }, [containerRef])

  return [isVisible, elementRef]
}

export default useElementInViewport
