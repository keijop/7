import styled from 'styled-components'

export default styled.nav`
  display: flex;

  justify-content: space-around;
  align-items: center;
  color: ${props => props.theme.maroon};
  background-color: ${props => props.theme.lightgreen};
  a:hover {
    background: white;
  }
  a {
    text-decoration: none;
    border-radius: 3px;
    padding: 0.5rem;
    font-weight: 900;
  }
  a:visited {
    color: ${props => props.theme.maroon};
  }
`
