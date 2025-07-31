import styled from 'styled-components'
import { sizes } from '../../../constants/colors'

export const FlipContainer = styled.div<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  flex-grow: 1; /* Grow to fill available space */
  min-height: 25rem; /* ⚡️ CRITICAL: Provide height for absolutely positioned children */
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`

export const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
`

export const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  padding: ${sizes.spaceLG};
  box-sizing: border-box;
  overflow: hidden;
`

export const FlipButton = styled.button`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  padding: ${sizes.spaceMD} ${sizes.spaceLG};
  border-radius: 1.25rem;
  font-size: ${sizes.fontSM};
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.25) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`