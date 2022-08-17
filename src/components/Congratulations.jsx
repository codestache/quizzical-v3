import styled from 'styled-components';
import Confetti from 'react-confetti';

const Header = styled.div`
  margin: 10px 0;
  text-align: center;

  h1,
  p,
  button {
    margin: 10px 0;
  }

  button {
    padding: 12px 16px;
    border: none;
    border-radius: 16px;
    background-color: var(--primary-dark-green);
    color: #fff;

    &:hover {
      background-color: var(--primary-hover);
    }
  }
`;

const Congratulations = ({ score, setQuizStarted, numOfQuestions }) => {
  return (
    <Header>
      {score === numOfQuestions && <Confetti />}
      <h1>Quiz Ended!</h1>
      <p>You scored {score} out of {numOfQuestions}</p>
      <button onClick={() => setQuizStarted(false)}>Play again</button>
    </Header>
  );
};

export default Congratulations;
