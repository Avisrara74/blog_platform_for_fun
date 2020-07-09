import styled from 'styled-components';

const defaultButtonStyles = `
  font-size: 14px;
  padding: 4px 16px;
  color: #F5222D;
  border: 1px solid #F5222D;
  border-radius: 5px;
  background-color: white;
  font-weight: 500;
`;

/* app.js main styles */
export const MainWrapper = styled.div`
  background-color: #E5E5E5;
`;

export const ContentHeader = styled.header`
  
`;

export const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
`;

export const ContentBody = styled.div`
  background-color: #E5E5E5;
  margin: 24px 24px;
  max-width: 941px;
  width: 100%;
  word-break: break-all;
`;

export const ContentAuth = styled.div`
  margin: 60px 24px;
  padding: 48px 32px;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  box-sizing: border-box;
  box-shadow: 0px 0.608796px 2.93329px rgba(0, 0, 0, 0.0196802),
              0px 1.46302px 7.04911px rgba(0, 0, 0, 0.0282725), 
              0px 2.75474px 13.2728px rgba(0, 0, 0, 0.035), 
              0px 4.91399px 23.6765px rgba(0, 0, 0, 0.0417275), 
              0px 9.19107px 44.2843px rgba(0, 0, 0, 0.0503198), 
              0px 22px 106px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  max-width: 100%;
  width: 384px;
  height: min-content;
`;
/* app.js main styles */

/* articles styles */
export const ArticlesWrapper = styled.div`
  
`;

export const ArticlesItemsWrapper = styled.div`
  background: #E5E5E5;
  display: flex;
  flex-direction: column;
`;

export const ArticlesItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
  background-color: #FFFFFF;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  min-height: 14vh;
  
  @media only screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

export const ArticleWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 16px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  
`;

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ArticleBody = styled.div`
  word-break: break-all;
  min-height: 60vh;
`;

export const ArticlesInfo = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  flex-direction: column;
  flex-basis: 70%;
  margin-right: 16px;
  
  & > div, & > p {
    flex-basis: 100%;
  }
  
  @media only screen and (max-width: 320px) {
    justify-content: center;
    text-align: center;
  }
`;

export const ArticlesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media only screen and (max-width: 320px) {
    justify-content: center;
  }
`;

export const ArticlesHeaderTitle = styled.div`
  color: #1890FF;
  font-size: 20px;
`;

export const ArticlesStats = styled.div`
  
`;

export const ArticlesLikeImg = styled.img`
  width: 16px;
  height: 16px;
  margin: 0 0 0 8px;
  cursor: pointer;
`;

export const ArticlesLikesCount = styled.span`
  margin: 0 0 0 4px;
`;

export const ArticlesUserInfoWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  
  @media only screen and (max-width: 320px) {
    order: -1;
    justify-content: center;
  }
`;

export const ArticleUserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const ArticlesUserInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ArticlesTagsWrap = styled.div``;

export const ArticlesTag = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  padding: 0 4px;
  
  &:not(:first-child) {
    margin: 0 0 0 8px;
  }
`;

export const ArticlesDescription = styled.p`
  font-size: 12px;
  margin: 0;
`;

export const ArticlesUserInfoGroup = styled.div`
  margin: 0px 16px 0px 0px;
  text-align: center;
`;

export const ArticleAuthorOptions = styled.div`
  margin: 8px 0 0 0;
`;

export const ArticleDeleteButton = styled.button`
  font-size: 14px;
  padding: 4px 16px;
  color: #F5222D;
  border: 1px solid #F5222D;
  border-radius: 5px;
  background-color: white;
  font-weight: 500;

  outline: none;
  position: relative;
  cursor: pointer;
  z-index: 0;


  &:before {
      content: '';
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      position: absolute;
      top: -2px;
      left:-2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      border-radius: 10px;
  }
  
  &:active {
      color: #000
  }
  
  &:active:after {
      background: transparent;
  }
  
  &:hover:before {
      opacity: 1;
  }
  
  &:after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      left: 0;
      top: 0;
      border-radius: 10px;
  }
  
  @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
  }
`;

export const ArticleEditButton = styled.button`
  font-size: 14px;
  padding: 4px 16px;
  color: #52C41A;;
  border: 1px solid #52C41A;;
  border-radius: 5px;
  background-color: white;
  font-weight: 500;
  margin: 0 0 0 16px;
  
  outline: none;
  position: relative;
  cursor: pointer;
  z-index: 0;

  &:before {
      content: '';
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      position: absolute;
      top: -2px;
      left:-2px;
      background-size: 400%;
      z-index: -1;
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      border-radius: 10px;
  }
  
  &:active {
      color: #000
  }
  
  &:active:after {
      background: transparent;
  }
  
  &:hover:before {
      opacity: 1;
  }
  
  &:after {
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: white;
      left: 0;
      top: 0;
      border-radius: 10px;
  }
  
  @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
  }
`;

export const ArticlesUsername = styled.p`
  margin: 0;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  
`;

export const ArticlesDate = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  margin: 0;
`;

export const ArticlesUserImage = styled.img`
  height: 46px;
  width: 46px;
  border-radius: 50%;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #E5E5E5;
  margin: 16px 0 0 0;
`;
/* articles styles */

/* form styles */
export const FormSignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  max-width: 384px;
`;

export const FormTitle = styled.div`
  text-align: center;
  color: #262626;
  font-size: 20px;
  margin: 0 0 16px 0;
  font-weight: 500;
`;

export const FormItem = styled.label`
  color: #262626;
  font-size: 14px;
  font-weight: normal;
  margin: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  
  &:last-of-type {
    margin-bottom: 8px;
  }
`;

export const FormSignUpLink = styled.div`
  color: #8C8C8C;
  font-size: 12px;
  text-align: center;
`;

export const FormSignInLink = styled.div`
  color: #8C8C8C;
  font-size: 12px;
  text-align: center;
`;

export const FormItemError = styled.div`
  color: #F5222D;
  font-size: 14px;
`;

export const FormCheckboxWrap = styled.div`
  border-top: 1px solid #E8E8E8;
  padding-top: 8px;
  display: flex;
  flex-direction: row;
`;

export const FormCheckboxTitle = styled.label`
  margin: 0 0 0 8px;
`;

export const FormSubmitButtonStyles = {
  height: 40,
};

/* FormArticle */

export const FormArticle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  padding: 48px 32px;
  min-height: 642px;
`;

export const FormItemTagsWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

export const FormAddTagButton = styled.button`
  padding: 4px 16px;
  font-size: 16px;
  border-radius: 4px;
  margin: 0 0 0 16px;
  background-color: #FFFFFF;
  color: #1890FF;
  border: 1px solid #1890FF;
  width: 100px;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const FormRemoveTagButton = styled.button`
  padding: 4px 16px;
  width: 100px;
  font-size: 16px;
  border-radius: 4px;
  margin: 0 0 0 16px;
  background-color: #FFFFFF;
  color: #F5222D;
  border: 1px solid #F5222D;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const FormItemTagsTitle = styled.span`
  display: flex;
  flex-wrap: wrap;
`;

export const FormItemTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 10px 0;
`;

export const LoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  font-size: 18px;
  align-items: center;
  padding: 0px 20px;
  background-color: #FFFFFF;
  
  @media screen and (max-width: 598px) {
    min-height: 80px;
    height: auto;
  }
`;

export const HeaderIsAuth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  
  & > *:not(:last-child):not(:nth-child(2)) {
    margin-right: 24px;
  }
  
  & > div:nth-child(2) {
    padding: 6px 8px 0 0;
  }
  
  @media screen and (max-width: 564px) {
    flex-wrap: wrap;
  }
`;

export const HeaderUsername = styled.span`
  color: #262626;
  font-size: 20px;
  font-weight: 500;
  padding: 4px 8px 0 0;
`;

export const HeaderIsNotAuth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderSignIn = styled.div`
  margin-right: 32px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.85);
`;

export const HeaderSignUp = styled.button`
  ${defaultButtonStyles}
  border: 1px solid #52C41A;
  box-sizing: border-box;
  padding: 8px 16px;
  border-radius: 5;
  color: #52C41A;
  text-decoration: none;
`;

export const HeaderCreateArticle = styled.button`
  ${defaultButtonStyles}
  border: 1px solid #52C41A;
  box-sizing: border-box;
  padding: 4px 8px;
  font-size: 14px;
  color: #52C41A;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  & > a {
    color: #52C41A;
  }
`;

export const HeaderLogOut = styled.button`
  ${defaultButtonStyles};
  border: 1px solid rgba(0, 0, 0, 0.75);
  box-sizing: border-box;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.75);
  padding: 8px 16px;
  
  & > a {
    color: rgba(0,0,0,0.75);
  }
  @media screen and (max-width: 598px) {
    margin: 8px 0px;
  }
`;

export const HeaderEditProfile = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 16px 0 0;
  
  @media screen and (max-width: 598px) {
    
    order: -1;
  }
`;
