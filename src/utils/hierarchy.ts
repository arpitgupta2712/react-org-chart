/**
 * Hierarchy utility functions
 */

// Dynamic hierarchy labels based on organizational depth
export const getHierarchyLabel = (tier: number): string => {
  switch (tier) {
    case 1: return 'Board of Directors';
    case 2: return 'Executive';
    case 3: return 'Senior Management';
    case 4: return 'Area Manager';
    case 5: return 'Venue Manager';
    case 6: return 'Junior Staff';
    case 7: return 'Helper';
    case 8: return 'Intern';
    default: return `Tier ${tier}`;
  }
}