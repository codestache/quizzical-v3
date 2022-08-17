import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 15px;
    font-size: 1.2rem;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <ReactLoading type="spinningBubbles" color="var(--loader-teal)" />
      <p>Loading data...</p>
    </LoadingContainer>
  );
};

export default Loading;
