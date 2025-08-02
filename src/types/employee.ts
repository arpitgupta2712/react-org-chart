/**
 * Employee and position type definitions
 */

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