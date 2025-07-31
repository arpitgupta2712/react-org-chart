import styled from 'styled-components'
import { colors, sizes } from '../../constants/colors'

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
  
  @media (max-width: 768px) {
    margin: ${sizes.spaceMD} ${sizes.spaceMD} 0;
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
    padding: ${sizes.spaceLG};
    flex-direction: column;
    text-align: center;
    gap: ${sizes.spaceMD};
  }
`

export const HeaderIcon = styled.div`
  img {
    width: 160px;
    height: 160px;
    object-fit: contain;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  }
  
  @media (max-width: 768px) {
    img {
      width: 96px;
      height: 96px;
    }
  }
`

export const CompanyTitle = styled.h1`
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
    font-size: 1.8rem;
  }
`

export const CompanySubtitle = styled.p`
  font-size: ${sizes.fontLG};
  color: ${colors.textSecondary};
  margin: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  
  @media (max-width: 768px) {
    font-size: ${sizes.fontBase};
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const TechStack = styled.span`
  background: linear-gradient(135deg, ${colors.selectedBorder} 0%, ${colors.highlightBorder} 100%);
  color: white;
  padding: ${sizes.spaceXS} ${sizes.spaceSM};
  border-radius: ${sizes.spaceXS};
  font-size: ${sizes.fontSM};
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
`