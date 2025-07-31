// Data loader for employees.json file

import { Employee } from '../types'

export interface RawEmployee {
  employee_id: string;
  company_id: string;
  employee_name: string;
  designation: string;
  salary_package: number;
  employment_status: string;
  company_email_id: string;
  phone: string;
  date_of_joining: string;
  reporting_to: string | null;
}

export class EmployeeDataLoader {
  private rawEmployees: RawEmployee[] = [];
  private processedEmployees: Employee[] = [];

  async loadEmployees(): Promise<{ employees: Employee[], rawEmployees: RawEmployee[] }> {
    try {
      const response = await fetch('/data/employees.json');
      this.rawEmployees = await response.json();
      console.log(`📊 Loaded ${this.rawEmployees.length} raw employees from JSON`);
      
      this.processedEmployees = this.processRawEmployees();
      console.log(`✅ Processed ${this.processedEmployees.length} valid employees`);
      
      this.buildHierarchy();
      
      return {
        employees: this.processedEmployees,
        rawEmployees: this.rawEmployees
      };
    } catch (error) {
      console.error('❌ Error loading employees:', error);
      throw new Error('Failed to load employee data');
    }
  }

  private processRawEmployees(): Employee[] {
    return this.rawEmployees
      .filter(emp => emp.employment_status === 'Active')
      .filter(emp => emp.designation && emp.designation.trim() !== '') // Filter out null/empty designations
      .map(emp => ({
        id: emp.employee_id,
        name: emp.employee_name,
        position: emp.designation,
        tier: 1, // Will be calculated dynamically based on reporting chain depth
        parentId: emp.reporting_to || undefined,
        children: []
      }));
  }

  private buildHierarchy(): void {
    // Create maps for lookups - by company_id for manager relationships
    const companyIdToEmployee = new Map<string, Employee>();
    const employeeIdToCompanyId = new Map<string, string>();
    
    // Build lookup maps
    this.rawEmployees.forEach(rawEmp => {
      const employee = this.processedEmployees.find(emp => emp.id === rawEmp.employee_id);
      if (employee) {
        companyIdToEmployee.set(rawEmp.company_id, employee);
        employeeIdToCompanyId.set(rawEmp.employee_id, rawEmp.company_id);
      }
    });

    console.log(`🔗 Built lookup maps for ${companyIdToEmployee.size} employees`);

    // Build parent-child relationships using reporting_to -> company_id
    this.rawEmployees.forEach(rawEmp => {
      if (rawEmp.reporting_to && companyIdToEmployee.has(rawEmp.reporting_to)) {
        const employee = companyIdToEmployee.get(rawEmp.company_id);
        const manager = companyIdToEmployee.get(rawEmp.reporting_to);
        
        if (employee && manager) {
          employee.parentId = manager.id; // Use employee_id for parentId
          manager.children.push(employee);
        }
      }
    });

    // Find root employees (those who don't report to anyone in our list)
    const rootEmployees = this.processedEmployees.filter(emp => !emp.parentId);

    console.log(`👑 Found ${rootEmployees.length} root employees:`, 
      rootEmployees.map(e => `${e.name} (${e.position})`));

    // Calculate hierarchy tiers based on reporting chain depth
    this.calculateHierarchyTiers(rootEmployees);

    // Log hierarchy statistics
    const tierCounts = new Map<number, number>();
    this.processedEmployees.forEach(emp => {
      tierCounts.set(emp.tier, (tierCounts.get(emp.tier) || 0) + 1);
    });

    const maxTier = Math.max(...this.processedEmployees.map(emp => emp.tier));
    console.log('📈 Employees by organizational tier:');
    for (let tier = 1; tier <= maxTier; tier++) {
      const count = tierCounts.get(tier) || 0;
      if (count > 0) {
        console.log(`  Tier ${tier}: ${count} employees`);
      }
    }
  }

  private calculateHierarchyTiers(rootEmployees: Employee[]): void {
    // Start with root employees at tier 1
    const queue: { employee: Employee; tier: number }[] = [];
    
    rootEmployees.forEach(emp => {
      queue.push({ employee: emp, tier: 1 });
    });

    // BFS to assign tiers based on reporting depth (no artificial cap)
    while (queue.length > 0) {
      const { employee, tier } = queue.shift()!;
      employee.tier = tier;

      // Add children to queue with next tier (unlimited depth)
      const nextTier = tier + 1;
      employee.children.forEach(child => {
        queue.push({ employee: child, tier: nextTier });
      });
    }
  }

  getEmployeeStats(): { total: number; byTier: Record<number, number> } {
    const stats = {
      total: this.processedEmployees.length,
      byTier: {} as Record<number, number>
    };

    this.processedEmployees.forEach(emp => {
      if (!stats.byTier[emp.tier]) {
        stats.byTier[emp.tier] = 0;
      }
      stats.byTier[emp.tier]++;
    });

    return stats;
  }
}

// Singleton instance for easy use
export const dataLoader = new EmployeeDataLoader();