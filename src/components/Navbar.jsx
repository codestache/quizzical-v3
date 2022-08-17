import styled from 'styled-components';
import Toggle from './Toggle';

const NavContainer = styled.div`
  display: flex;
  margin-right: auto;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};

  h3 {
    display: flex;
    align-items: center;
    margin-left: 15px;
    padding: 2px 0;
    border-bottom: none;
    justify-content: center;
    cursor: pointer;
  }

  span:nth-child(1) {
    color: var(--dark-blue);
    font-size: 1.6rem;
  }
  span:nth-child(2) {
    color: var(--dark-orange);
  }
  span:nth-child(3) {
    color: var(--purple);
  }
  span:nth-child(4) {
    color: var(--dark-green);
  }
  span:nth-child(5) {
    color: var(--dark-blue);
  }
  span:nth-child(6) {
    color: var(--dark-orange);
  }
  span:nth-child(7) {
    color: var(--purple);
  }
  span:nth-child(8) {
    color: var(--dark-green);
  }
  span:nth-child(9) {
    color: var(--dark-blue);
  }
`;

const Navbar = ({ setQuizStarted }) => {
  return (
    <>
      <NavContainer>
        <h3 onClick={() => setQuizStarted(false)}>
          <span>Q</span>
          <span>u</span>
          <span>i</span>
          <span>z</span>
          <span>z</span>
          <span>i</span>
          <span>c</span>
          <span>a</span>
          <span>l</span>
        </h3>
        <Toggle />
      </NavContainer>
    </>
  );
};

export default Navbar;
