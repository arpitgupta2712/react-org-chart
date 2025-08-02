import styled from 'styled-components'
import { colors, sizes, design } from '../../constants'

export const HeaderTextContent = styled.div`
  flex: 1;
  min-width: 0; /* Allow text to truncate if needed */
  
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`

export const HeaderContainer = styled.header`
  background: ${colors.cardBackground};
  margin: ${sizes.spaceLG};
  border-radius: ${sizes.cardBorderRadius};
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  /* Subtle pattern overlay matching employee cards */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  /* Compact design for narrow screens */
  @media (max-width: 768px) {
    margin: ${sizes.spaceSM};
    border-radius: ${sizes.spaceMD};
  }
  
  @media (max-width: 480px) {
    margin: ${sizes.spaceXS} ${sizes.spaceXS} 0;
    border-radius: ${sizes.spaceSM};
  }
`

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  padding: ${sizes.spaceXL};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: ${sizes.spaceLG} ${sizes.spaceMD};
    flex-direction: row;
    align-items: center;
    gap: ${sizes.spaceSM};
  }
  
  @media (max-width: 480px) {
    padding: ${sizes.spaceLG} ${sizes.spaceSM};
    gap: ${sizes.spaceXS};
  }
`

export const HeaderIcon = styled.div`
  flex-shrink: 0;
  
  img {
    width: 140px;
    height: 140px;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
  
  @media (max-width: 768px) {
    img {
      width: 100px;
      height: 100px;
    }
  }
  
  @media (max-width: 480px) {
    img {
      width: 60px;
      height: 60px;
    }
  }
`

export const CompanyTitle = styled.h1`
  font-family: ${design.typography.fontFamily};
  font-size: 2.5rem;
  font-weight: 800;
  color: ${colors.textPrimary};
  margin: 0 0 ${sizes.spaceSM} 0;
  background: linear-gradient(135deg, ${colors.textPrimary} 0%, ${colors.textSecondary} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin: 0 0 ${sizes.spaceLG} ${sizes.spaceSM};
    line-height: 1.2;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin: 0;
  }
`

export const CompanySubtitle = styled.p`
  font-family: ${design.typography.fontFamily};
  font-size: ${sizes.fontLG};
  color: ${colors.textSecondary};
  margin: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  
  @media (max-width: 768px) {
    font-size: ${sizes.fontBase};
    gap: ${sizes.spaceXS};
    flex-wrap: wrap;
    margin: 0 0 0 ${sizes.spaceSM};
  }
  
  @media (max-width: 480px) {
    font-size: ${sizes.fontSM};
    gap: 2px;
    
    /* Stack vertically on very narrow screens */
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.3;
  }
`

export const TechStack = styled.span`
  background: ${colors.highlightBorder};
  color: white;
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: ${sizes.spaceXS};
  font-family: ${design.typography.fontFamily};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
  
  @media (max-width: 768px) {
    font-size: ${sizes.fontSM};
    padding: ${sizes.spaceXS} ${sizes.spaceSM};
    letter-spacing: 0.25px;
  }
  
  @media (max-width: 480px) {
    font-size: ${sizes.fontXS};
    padding: ${sizes.spaceXS} ${sizes.spaceSM};
    letter-spacing: 0;
    border-radius: ${sizes.spaceXS};
  }
`