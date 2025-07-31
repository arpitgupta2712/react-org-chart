import styled from 'styled-components'
import { sizes } from '../../../constants/colors'

// Team Summary (Front of card)
export const TeamSummary = styled.div`
  margin-top: auto;
  padding: ${sizes.spaceLG} 0 0 0;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  
  /* Add a subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  }
`

export const TeamCount = styled.div`
  font-size: ${sizes.fontLG};
  font-weight: 700;
  opacity: 0.95;
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  
  svg {
    opacity: 0.8;
  }
`

// Back of Card (Team details)
export const BackHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${sizes.spaceXL};
  padding-bottom: ${sizes.spaceLG};
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
  }
`

export const BackTitle = styled.h3`
  font-size: ${sizes.sectionTitle};
  font-weight: 800;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: ${sizes.spaceSM};
  
  svg {
    opacity: 0.8;
  }
`

export const TeamDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const TeamStats = styled.div`
  text-align: center;
  margin-bottom: ${sizes.spaceXL};
  padding: ${sizes.spaceLG};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  strong {
    font-size: ${sizes.font2XL};
    font-weight: 800;
    display: block;
    margin-bottom: ${sizes.spaceSM};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  font-size: ${sizes.fontLG};
  font-weight: 600;
  opacity: 0.9;
`

export const TeamList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${sizes.spaceSM};
  margin-bottom: ${sizes.spaceMD};
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0; /* Important for flex scrolling */
  
  /* Custom scrollbar for better UX */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`

export const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${sizes.spaceLG};
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
    transform: translateX(8px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`

export const MemberInfo = styled.div`
  flex: 1;
  z-index: 1;
  position: relative;
`

export const MemberName = styled.div`
  font-weight: 700;
  font-size: ${sizes.fontLG};
  margin-bottom: ${sizes.spaceSM};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

export const MemberRole = styled.div`
  font-size: ${sizes.fontSM};
  opacity: 0.85;
  font-weight: 600;
`

export const NavigateIcon = styled.div`
  font-weight: 700;
  font-size: ${sizes.fontLG};
  opacity: 0.6;
  transition: all 0.3s ease;
  z-index: 1;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  ${TeamMember}:hover & {
    opacity: 1;
    transform: translateX(4px) scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
`

export const TeamHint = styled.div`
  font-size: ${sizes.fontSM};
  opacity: 0.8;
  text-align: center;
  font-style: italic;
  margin-top: auto;
  padding: ${sizes.spaceLG};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
`