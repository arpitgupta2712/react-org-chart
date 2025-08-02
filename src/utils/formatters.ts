/**
 * Utility functions for formatting non-date data in the org chart
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