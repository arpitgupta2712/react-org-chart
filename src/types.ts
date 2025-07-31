// Employee hierarchy types and interfaces

export interface Employee {
  id: string;
  name: string;
  position: string;
  tier: number; // Dynamic hierarchy tier based on reporting chain depth
  parentId?: string;
  children: Employee[];
}

export interface Position {
  x: number;
  y: number;
}

export interface OrgChartConfig {
  containerWidth: number;
  containerHeight: number;
  tierHeight: number;
  cardWidth: number;
  cardHeight: number;
  horizontalSpacing: number;
  verticalSpacing: number;
}

export const ORG_CHART_CONFIG: OrgChartConfig = {
  containerWidth: 2800,
  containerHeight: 2400,
  tierHeight: 140,
  cardWidth: 160,
  cardHeight: 70,
  horizontalSpacing: 200,
  verticalSpacing: 250
};

// Dynamic hierarchy labels based on organizational depth
export const getHierarchyLabel = (tier: number): string => {
  switch (tier) {
    case 1: return 'Executive';
    case 2: return 'Senior Management';
    case 3: return 'Middle Management';
    case 4: return 'Team Leaders';
    case 5: return 'Senior Staff';
    case 6: return 'Staff';
    case 7: return 'Junior Staff';
    case 8: return 'Entry Level';
    default: return `Tier ${tier}`;
  }
};