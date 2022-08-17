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

  span {
    color: var(--logo-teal);
    font-size: 1.6rem;
  }

`;

const Navbar = ({ setQuizStarted }) => {
  return (
    <>
      <NavContainer>
        <h3 onClick={() => setQuizStarted(false)}>
          <span>Q</span>uizzical
        </h3>
        <Toggle />
      </NavContainer>
    </>
  );
};

export default Navbar;
