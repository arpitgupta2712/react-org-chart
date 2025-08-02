import styled from 'styled-components'
import { colors, sizes, design } from '../../../constants'

export const Container = styled.div`
  font-family: ${design.typography.fontFamily};
  background: ${colors.cardBackground};
  min-height: 100vh;
  padding: ${sizes.space2XL};
  
  @media (max-width: 1200px) {
    padding: ${sizes.spaceXL};
  }
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceLG};
  }
`

export const EmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  gap: ${sizes.space2XL};
  align-items: start; /* ⚡️ Align cards to top for clean rows */
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
    gap: ${sizes.spaceXL};
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${sizes.spaceLG};
  }
`