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
};