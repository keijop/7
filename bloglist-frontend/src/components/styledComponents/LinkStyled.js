import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default styled(Link)`
  margin: 0.5rem;
  padding: 0.5rem;
  background-color: ${props => props.theme.superlightpink};
`
