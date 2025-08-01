import React, { useState, useEffect, useCallback } from 'react'
import { Employee } from '../../../types'
import { RawEmployee } from '../../../services/dataLoader'
import EmployeeCard from '../../EmployeeCard'
import { TierViewContainer, TierRow, TierLabel, NavigationControls, NavButton, ViewInfo, SwipeHint, ConnectionLine } from '../styles/TierViewStyles'
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'

interface TierViewProps {
  employees: Employee[]
  getRawEmployee: (employeeId: string) => RawEmployee | undefined
  getManagerName: (managerId: string) => string
  onCardClick?: (employee: Employee) => void
  selectedEmployeeId?: string
  highlightedEmployeeId?: string
  currentDataSetIndex?: number
  guestMode?: boolean
}

export const TierView: React.FC<TierViewProps> = ({
  employees,
  getRawEmployee,
  getManagerName,
  onCardClick,
  selectedEmployeeId,
  highlightedEmployeeId,
  currentDataSetIndex,
  guestMode = false
}) => {
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('')
  const [tierPath, setTierPath] = useState<Employee[]>([])

  // Find root employees (those without parents)
  const rootEmployees = employees.filter(emp => !emp.parentId)

  // Initialize with first root employee
  useEffect(() => {
    if (rootEmployees.length > 0 && !currentEmployeeId) {
      setCurrentEmployeeId(rootEmployees[0].id)
    }
  }, [rootEmployees, currentEmployeeId])

  // Build tier path from current employee up to root
  const buildTierPath = useCallback((employeeId: string): Employee[] => {
    const path: Employee[] = []
    let current = employees.find(emp => emp.id === employeeId)
    
    while (current) {
      path.unshift(current)
      if (current.parentId) {
        current = employees.find(emp => emp.id === current?.parentId)
      } else {
        current = undefined
      }
    }
    
    return path
  }, [employees])

  // Update tier path when current employee changes
  useEffect(() => {
    if (currentEmployeeId) {
      const path = buildTierPath(currentEmployeeId)
      setTierPath(path)
    }
  }, [currentEmployeeId, buildTierPath])

  // Get employees at the same level as current employee
  const getSiblings = (employee: Employee): Employee[] => {
    if (!employee.parentId) {
      return rootEmployees
    }
    const parent = employees.find(emp => emp.id === employee.parentId)
    return parent ? parent.children : []
  }

  // Navigation functions
  const navigateHorizontal = (direction: 'left' | 'right') => {
    const currentEmployee = employees.find(emp => emp.id === currentEmployeeId)
    if (!currentEmployee) return

    const siblings = getSiblings(currentEmployee)
    const currentIndex = siblings.findIndex(emp => emp.id === currentEmployeeId)
    
    if (direction === 'left' && currentIndex > 0) {
      setCurrentEmployeeId(siblings[currentIndex - 1].id)
    } else if (direction === 'right' && currentIndex < siblings.length - 1) {
      setCurrentEmployeeId(siblings[currentIndex + 1].id)
    }
  }

  const navigateVertical = (direction: 'up' | 'down') => {
    const currentEmployee = employees.find(emp => emp.id === currentEmployeeId)
    if (!currentEmployee) return

    if (direction === 'up' && currentEmployee.parentId) {
      // Navigate to parent
      setCurrentEmployeeId(currentEmployee.parentId)
    } else if (direction === 'down' && currentEmployee.children.length > 0) {
      // Navigate to first child
      setCurrentEmployeeId(currentEmployee.children[0].id)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault()
          navigateHorizontal('left')
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault()
          navigateHorizontal('right')
          break
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault()
          navigateVertical('up')
          break
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault()
          navigateVertical('down')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentEmployeeId])

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y
    const minSwipeDistance = 50

    // Determine if horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          navigateHorizontal('right')
        } else {
          navigateHorizontal('left')
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          navigateVertical('down')
        } else {
          navigateVertical('up')
        }
      }
    }

    setTouchStart(null)
  }

  // Get display information for current state
  const currentEmployee = employees.find(emp => emp.id === currentEmployeeId)
  const siblings = currentEmployee ? getSiblings(currentEmployee) : []
  const currentSiblingIndex = siblings.findIndex(emp => emp.id === currentEmployeeId)
  const hasParent = currentEmployee?.parentId !== undefined

  if (!currentEmployee) return null

  // Build hierarchy path from root to current employee for breadcrumb
  const buildHierarchyPath = (employee: Employee): Employee[] => {
    const path: Employee[] = []
    let current: Employee | undefined = employee
    
    // Build path from current up to root
    while (current) {
      path.unshift(current) // Add to beginning of array
      current = current.parentId ? employees.find(emp => emp.id === current!.parentId) : undefined
    }
    
    return path
  }

  const hierarchyPath = buildHierarchyPath(currentEmployee)
  const currentPositionInPath = hierarchyPath.length - 1
  
  // Get only 1 subordinate to display - show current employee + ONE direct report at a time
  const hasChildren = (currentEmployee?.children.length ?? 0) > 0
  const secondaryEmployee = hasChildren ? currentEmployee.children[0] : null
  const secondaryLabel = hasChildren ? 'Managing' : null

  return (
    <TierViewContainer
      className={secondaryEmployee ? 'two-tier' : 'single-tier'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ViewInfo>
        <h3>{currentEmployee.name}</h3>
        <p>{currentEmployee.position}</p>
        <div className="selection-count">
          {currentSiblingIndex + 1} of {siblings.length} colleagues
        </div>
      </ViewInfo>

      {/* Hierarchy Breadcrumb Trail - Show path from root to current */}
      {hierarchyPath.length > 1 && (
        <div className="hierarchy-breadcrumb">
          <div className="breadcrumb-label">Path:</div>
          <div className="breadcrumb-trail">
            {hierarchyPath.map((pathEmployee, index) => (
              <div key={pathEmployee.id} className="breadcrumb-item">
                <div 
                  className={`breadcrumb-card ${index === currentPositionInPath ? 'current' : 'ancestor'}`}
                  data-tier={pathEmployee.tier}
                  onClick={() => setCurrentEmployeeId(pathEmployee.id)}
                >
                  <div className="breadcrumb-name">{pathEmployee.name}</div>
                  <div className="breadcrumb-position">{pathEmployee.position}</div>
                </div>
                {index < hierarchyPath.length - 1 && (
                  <div className="breadcrumb-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Employee - Always at Top */}
      <TierRow className="primary-tier">
        <TierLabel>Selected</TierLabel>
        <div className="card-wrapper">
          <EmployeeCard
            employee={currentEmployee}
            rawEmployee={getRawEmployee(currentEmployee.id)}
            managerName={currentEmployee.parentId ? getManagerName(currentEmployee.parentId) : undefined}
            onCardClick={onCardClick}
            isSelected={selectedEmployeeId === currentEmployee.id}
            isHighlighted={highlightedEmployeeId === currentEmployee.id || currentEmployee.id === currentEmployeeId}
            currentDataSetIndex={currentDataSetIndex}
            guestMode={guestMode}
          />
        </div>
      </TierRow>

      {/* Connection Line - Only show when there's a secondary employee */}
      {secondaryEmployee && <ConnectionLine />}

      {/* Secondary Employee - Direct Report (ONE card only) */}
      {secondaryEmployee && secondaryLabel && (
        <TierRow className="secondary-tier">
          <TierLabel>{secondaryLabel}</TierLabel>
          <div className="card-wrapper">
            <EmployeeCard
              employee={secondaryEmployee}
              rawEmployee={getRawEmployee(secondaryEmployee.id)}
              managerName={secondaryEmployee.parentId ? getManagerName(secondaryEmployee.parentId) : undefined}
              onCardClick={onCardClick}
              isSelected={selectedEmployeeId === secondaryEmployee.id}
              isHighlighted={highlightedEmployeeId === secondaryEmployee.id}
              currentDataSetIndex={currentDataSetIndex}
              config={{ compact: true }}
              guestMode={guestMode}
            />
          </div>
        </TierRow>
      )}

      {/* Navigation Controls */}
      <NavigationControls>
        <NavButton 
          onClick={() => navigateHorizontal('left')}
          disabled={currentSiblingIndex <= 0}
          title="Previous colleague (Left/A)"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </NavButton>

        <NavButton 
          onClick={() => navigateVertical('up')}
          disabled={!hasParent}
          title="Go to manager (Up/W)"
        >
          <ChevronUp size={20} />
          <span>Manager</span>
        </NavButton>

        <NavButton 
          onClick={() => navigateVertical('down')}
          disabled={!hasChildren}
          title="Go to direct report (Down/S)"
        >
          <ChevronDown size={20} />
          <span>Report</span>
        </NavButton>

        <NavButton 
          onClick={() => navigateHorizontal('right')}
          disabled={currentSiblingIndex >= siblings.length - 1}
          title="Next colleague (Right/D)"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </NavButton>
      </NavigationControls>

      <SwipeHint>
        Swipe or use arrow keys to navigate
      </SwipeHint>
    </TierViewContainer>
  )
}

export default TierView