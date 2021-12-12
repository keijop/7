import styled from 'styled-components'

export default styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 3px;
  border: 2px solid ${props => props.theme.maroon};
  background-color: ${props => props.theme.lightpink};
  color: ${props => props.theme.maroon};
  &:hover {
    color: ${props => props.theme.lightgreen};
    background-color: ${props => props.theme.maroon};
  }
`
