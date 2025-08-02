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

/**
 * Formats currency amounts for display
 * @param amount - The amount to format (number or string)
 * @returns Formatted currency string in INR
 */
export const formatCurrency = (amount: number | string | null | undefined): string => {
  if (!amount) return 'Not provided'
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount)
}

/**
 * Formats account numbers for secure display
 * @param accountNumber - The account number to format
 * @returns Masked account number showing only last 4 digits
 */
export const formatAccountNumber = (accountNumber: string | null | undefined): string => {
  if (!accountNumber) return 'Not provided'
  const cleanNumber = accountNumber.replace(/\D/g, '')
  if (cleanNumber.length < 4) return '****'
  return `****${cleanNumber.slice(-4)}`
}