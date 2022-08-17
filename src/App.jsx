import React, { useState } from 'react';
import { ThemeStore } from 'context/ThemeStore';
import {
  Navbar,
  ContentContainer,
  StartQuizScreen,
  QuestionsScreen,
  Footer,
} from 'components';

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    numOfQuestions: '5',
    category: '',
    difficulty: '',
    type: '',
  });

  const [apiError, setApiError] = useState({
    show: false,
    message: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value, //computed properties same as [event.target.name]: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setApiError({
      show: false,
      message: '',
    });
    setQuizStarted(true);
  }

  function handleApiError(error) {
    setQuizStarted(false);
    setApiError({
      show: true,
      message: error.message,
    });
    return;
  }

  return (
    <ThemeStore>
      <Navbar setQuizStarted={setQuizStarted} />
      <ContentContainer>
        {!quizStarted ? (
          <StartQuizScreen
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleApiError={handleApiError}
            apiError={apiError}
          />
        ) : (
          <QuestionsScreen
            formData={formData}
            handleApiError={handleApiError}
            isLoading={isLoading}
            setLoading={setLoading}
            setQuizStarted={setQuizStarted}
          />
        )}
      </ContentContainer>
      <Footer />
    </ThemeStore>
  );
};

export default App;
