const responseCode = Object.freeze({
  SUCCCESS: 0,
  NO_RESULTS: 1,
  INVALID_PARAMETER: 2,
  TOKEN_NOT_FOUND: 3,
  TOKEN_EMPTY: 4,
});

const getQuestions = async ({
  numOfQuestions = '',
  category = '',
  difficulty = '',
  type = '',
}) => {
  const url = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }

  const data = await res.json();
  if (data === undefined) {
    return null;
  }

  if (data.response_code === responseCode.NO_RESULTS) {
    throw new Error(
      'There are currently no results with the given options. Please try again with different options.'
    );
  }

  if (data.response_code !== responseCode.SUCCCESS) {
    throw new Error(
      'An error occurred while trying to get trivia questions. Please try again later.'
    );
  }

  return data.results;
};

export default getQuestions;
