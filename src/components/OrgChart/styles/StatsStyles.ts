import styled from 'styled-components'
import { colors, sizes } from '../../../constants/colors'

export const Stats = styled.div`
  background: ${colors.cardBackground};
  padding: ${sizes.spaceLG};
  border-radius: ${sizes.spaceMD};
  margin-bottom: ${sizes.spaceXL};
  font-size: ${sizes.fontBase};
  color: ${colors.textPrimary};
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  
  strong {
    color: ${colors.selectedBorder};
  }
`