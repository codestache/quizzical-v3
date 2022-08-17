import React from 'react';
import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html';
import Answer from 'components/Answer';

const InitContainer = styled.div`
  border: px solid;
  width: 80%;
  margin: 1.5rem 0;

  h2 {
    border-top: 1px solid gray;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    border-left: 8px solid gray;
    padding: 15px 5px;
  }

  h2,
  h3 {
    border: px solid;
    text-align: center;
    margin-bottom: 1.5em;
  }
`;

const AnswersContainer = styled.div`
  border: px solid;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
  }
`;

const NextContainer = styled.div`
  border: px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

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

const Question = ({
  data: { question, answers },
  selectedQuestionId,
  numOfQuestions,
  currentIndex,
  handleNextQuestion,
  handleAnswer,
  showResults,
}) => {
  return (
    <InitContainer>
      <header>
        <h3>
          Question {currentIndex + 1}/{numOfQuestions}
        </h3>
        <h2>{sanitizeHtml(question)}</h2>
      </header>
      <AnswersContainer>
        {answers.map((answer, index) => (
          <Answer
            key={answer.id}
            index={index}
            answerText={answer.value}
            isHeld={answer.isHeld}
            isCorrect={answer.isCorrect}
            handleAnswer={() =>
              handleAnswer(answer.value, selectedQuestionId, answer.id)
            }
          />
        ))}
      </AnswersContainer>
      {showResults && (
        <NextContainer>
          <button onClick={() => handleNextQuestion()}>
            {!(currentIndex === numOfQuestions - 1)
              ? 'Next Question'
              : 'Show Score'}
          </button>
        </NextContainer>
      )}
    </InitContainer>
  );
};

export default Question;
