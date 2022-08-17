import { useContext } from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { QuestionContext } from './QuestionsScreen';

const AnswerOption = styled.div`
  border: 4px solid var(--secondary-dark-blue);
  display: flex;
  min-height: 50px;
  cursor: pointer;

  &:hover {
    border-color: var(--secondary-hover);
  }
`;

const AnswerLetter = styled.div`
  border: px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  background-color: var(--secondary-dark-blue);
  color: #fff;
`;

const AnswerText = styled.div`
  border: px solid;
  display: flex;
  align-items: center;
  margin: 5px 8px;
  font-weight: 600;
`;

const Answer = ({ answerText, index, handleAnswer, isHeld, isCorrect }) => {
  const { disabled, showResults } = useContext(QuestionContext);
  let borderStyles;
  let backgroundStyles;
  if (showResults) {
    borderStyles = {
      pointerEvents: disabled ? 'none' : 'all',
      borderColor:
        isCorrect && (isCorrect || isHeld)
          ? 'var(--correct-green)'
          : !isCorrect && isHeld
          ? 'var(--incorrect-red)'
          : 'none',
    };
    backgroundStyles = {
      backgroundColor: isCorrect
        ? 'var(--correct-green)'
        : !isCorrect && isHeld
        ? 'var(--incorrect-red)'
        : 'none',
    };
  }

  const letterMapping = ['A', 'B', 'C', 'D'];
  return (
    <AnswerOption onClick={handleAnswer} style={borderStyles}>
      <AnswerLetter style={backgroundStyles}>
        {letterMapping[index]}
      </AnswerLetter>
      <AnswerText>{sanitizeHtml(answerText)}</AnswerText>
    </AnswerOption>
  );
};

export default Answer;
