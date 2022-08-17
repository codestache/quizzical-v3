import React, { useState, useEffect, createContext } from 'react';
import Loading from './Loading';
import { nanoid } from 'nanoid';
import getQuestions from 'api/questionsApi';
import { Question, Congratulations } from 'components';

export const QuestionContext = createContext();

const QuestionScreen = ({
  formData,
  handleApiError,
  isLoading,
  setLoading,
  setQuizStarted,
}) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadQuestions() {
      setLoading(true);
      try {
        const data = await getQuestions(formData);
        if (!isCancelled) {
          setQuestions(processData(data));
        }
      } catch (error) {
        handleApiError(error);
        return;
      }
      setLoading(false);
    }
    loadQuestions();

    return () => {
      isCancelled = true; //cleanup function
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function processData(data) {
    return data.map((item) => {
      return {
        ...item,
        id: nanoid(),
        answers: shuffleAnswers([
          correctAns_ObjArr(item.correct_answer),
          ...incorrectAns_ObjArr(item.incorrect_answers),
        ]),
      };
    });

    function correctAns_ObjArr(correct_answer) {
      return {
        value: correct_answer,
        id: nanoid(),
        isCorrect: true,
        isHeld: false,
      };
    }

    function incorrectAns_ObjArr(incorrect_answers) {
      return incorrect_answers.map((incorrect_answer) => {
        return {
          value: incorrect_answer,
          id: nanoid(),
          isCorrect: false,
          isHeld: false,
        };
      });
    }

    function shuffleAnswers(answersArray) {
      return answersArray.sort(() => Math.random() - 0.5);
    }
  }

  function handleNextQuestion() {
    setShowResults(false);
    setDisabled(false);
    setCurrentIndex(currentIndex + 1);
  }

  function handleAnswer(selectedAnswer, selectedQuestionId, selectedAnswerId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return question.id === selectedQuestionId
          ? {
              ...question,
              answers: question.answers.map((answer) => {
                return answer.id === selectedAnswerId
                  ? {
                      ...answer,
                      isHeld: true,
                    }
                  : answer;
              }),
            }
          : question;
      })
    );

    if (selectedAnswer === questions[currentIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowResults(true);
    setDisabled(true);
  }

  return questions.length > 0 ? (
    <>
      {currentIndex >= questions.length ? (
        <Congratulations
          score={score}
          setQuizStarted={setQuizStarted}
          numOfQuestions={questions.length}
        />
      ) : (
        <QuestionContext.Provider value={{ disabled, showResults }}>
          <Question
            data={questions[currentIndex]}
            selectedQuestionId={questions[currentIndex].id}
            numOfQuestions={questions.length}
            currentIndex={currentIndex}
            handleNextQuestion={handleNextQuestion}
            handleAnswer={handleAnswer}
            showResults={showResults}
          />
        </QuestionContext.Provider>
      )}
    </>
  ) : (
    isLoading && <Loading />
  );
};

export default QuestionScreen;
