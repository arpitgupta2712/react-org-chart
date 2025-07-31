import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: ${colors.textPrimary};
  
  h3 {
    font-size: ${sizes.fontXL};
    margin: ${sizes.spaceLG} 0 ${sizes.spaceMD} 0;
    font-weight: 700;
  }
  
  p {
    font-size: ${sizes.fontBase};
    color: ${colors.textSecondary};
  }
`

export const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid ${colors.borderLight};
  border-top: 4px solid ${colors.selectedBorder};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  color: ${colors.error};
  
  h3 {
    font-size: ${sizes.fontXL};
    margin-bottom: ${sizes.spaceMD};
    font-weight: 700;
  }
  
  p {
    font-size: ${sizes.fontBase};
    margin-bottom: ${sizes.spaceLG};
  }
  
  button {
    padding: ${sizes.spaceMD} ${sizes.spaceLG};
    background: ${colors.error};
    color: white;
    border: none;
    border-radius: ${sizes.spaceMD};
    font-size: ${sizes.fontBase};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${colors.textSecondary};
    }
  }
`

export const NoResults = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${sizes.space2XL};
  background: ${colors.cardBackground};
  border-radius: ${sizes.cardBorderRadius};
  color: ${colors.textSecondary};
  
  p {
    font-size: ${sizes.fontLG};
    margin-bottom: ${sizes.spaceLG};
  }
  
  button {
    padding: ${sizes.spaceMD} ${sizes.spaceXL};
    background: ${colors.selectedBorder};
    color: white;
    border: none;
    border-radius: ${sizes.spaceMD};
    font-size: ${sizes.fontBase};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background: ${colors.highlightBorder};
    }
  }
`