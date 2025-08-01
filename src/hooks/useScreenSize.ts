import { useState, useEffect } from 'react'

interface ScreenSize {
  width: number
  height: number
  isNarrow: boolean
  isMobile: boolean
  aspectRatio: number
}

/**
 * Hook to detect screen size and orientation for responsive layouts
 * Specifically useful for determining when to show tier view vs grid view
 */
export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    // Initialize with current values or defaults for SSR
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024
    const height = typeof window !== 'undefined' ? window.innerHeight : 768
    const aspectRatio = width / height
    
    return {
      width,
      height,
      isNarrow: height > width, // Portrait orientation
      isMobile: width <= 768,
      aspectRatio
    }
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height

      setScreenSize({
        width,
        height,
        isNarrow: height > width, // Portrait/narrow screen detection
        isMobile: width <= 768,
        aspectRatio
      })
    }

    // Update on mount
    updateScreenSize()

    // Listen for window resize
    window.addEventListener('resize', updateScreenSize)
    
    // Listen for orientation change (mobile devices)
    window.addEventListener('orientationchange', () => {
      // Small delay to allow orientation change to complete
      setTimeout(updateScreenSize, 100)
    })

    return () => {
      window.removeEventListener('resize', updateScreenSize)
      window.removeEventListener('orientationchange', updateScreenSize)
    }
  }, [])

  return screenSize
}

export default useScreenSize