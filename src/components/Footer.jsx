import styled from 'styled-components';

const FooterContainer = styled.div`
  padding: 12px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>Codestache ©2022</p>
    </FooterContainer>
  );
};

export default Footer;
