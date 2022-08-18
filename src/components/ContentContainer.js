import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: calc(100% - 100px);
  height: calc(100vh - 100%);
  min-height: calc(100vh - 100px);
  justify-content: center;
  align-items: center;
`;

export default ContentContainer;
