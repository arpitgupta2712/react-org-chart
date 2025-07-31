/**
 * Utility functions for formatting data in the org chart
 */

/**
 * Formats a phone number for display
 * @param phone - The phone number string
 * @returns Formatted phone number or fallback message
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return 'No phone available'
  // Format: +91 88618 64426 or similar
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

/**
 * Formats a date string for display
 * @param dateString - The date string to format
 * @returns Formatted date string or fallback message
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not specified'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}