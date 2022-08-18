import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getCategory from 'api/categoryApi';

const StartQuizContainer = styled.div`
  padding: 15px;
  border: px solid;

  header {
    padding: 10px;
    text-align: center;

    p {
      padding: 3px 0;
    }

    span {
      color: var(--logo-teal);
      font-size: 3rem;
    }

  }
`;

const QuizFormContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: px solid;

  form {
    border: 1px solid;
    border-radius: 16px;
    padding: 10px 15px;
  }
`;

const FormField = styled.div`
  border: px solid;
  display: flex;
  flex-direction: column;
  padding: 6px 0;

  label {
    text-transform: uppercase;
  }

  select,
  input {
    padding: 5px;
  }

  label,
  select,
  input {
    width: 100%;
    font-size: 1.1rem;
  }
`;

const StartButton = styled.button`
  cursor: pointer;
  background-color: var(--primary-dark-green);
  color: #fff;
  font-size: 1.2rem;
  padding: 9px;
  margin: 10px 0;
  border: none;
  border-radius: 16px;
  width: 100%;

  &:hover {
    background-color: var(--primary-hover);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--disabled-gray);
    color: #fff;
  }
`;

const Error = styled.div`
  padding: 10px 5px;
  text-align: center;
  width: 80%;
  margin: auto;
  border: 1px solid var(--error-red);
  border-left: 6px solid var(--error-red);
  color: var(--error-red);
`;

const StartQuizScreen = ({
  formData,
  handleChange,
  handleSubmit,
  handleApiError,
  apiError,
}) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    async function loadCategory() {
      try {
        const data = await getCategory();
        if (!isCancelled) {
          setCategoryList(data);
        }
      } catch (error) {
        handleApiError(error);
        return;
      }
    }
    loadCategory();

    return () => {
      isCancelled = true; //cleanup function
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const categoryElements = categoryList.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <>
      <StartQuizContainer>
        <header>
          <h1>
            <span>Q</span>uizzical
          </h1>
          <p>
            This is a knowledge quiz app. Pick your answers from the options
            provided. It uses data from Open Trivia Database - an open source
            database
          </p>
        </header>
        {apiError.show && (
          <Error>
            <p>{apiError.message}</p>
          </Error>
        )}
        <QuizFormContainer>
          <form onSubmit={handleSubmit}>
            <FormField>
              <label>Number of Questions</label>
              <input
                type="number"
                name="numOfQuestions"
                min="5"
                max="50"
                value={formData.numOfQuestions}
                onChange={handleChange}
                {...(formData.numOfQuestions.length === 0 && {
                  placeholder: 'Cannot be empty',
                })}
              ></input>
            </FormField>
            <FormField>
              <label>Select Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Any Category</option>
                {categoryElements}
              </select>
            </FormField>
            <FormField>
              <label>Select Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </FormField>
            <FormField>
              <label>Select Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True / False</option>
              </select>
            </FormField>
            <StartButton
              {...(formData.numOfQuestions.length === 0 && {
                disabled: true,
              })}
            >
              Start
            </StartButton>
          </form>
        </QuizFormContainer>
      </StartQuizContainer>
    </>
  );
};

export default StartQuizScreen;
