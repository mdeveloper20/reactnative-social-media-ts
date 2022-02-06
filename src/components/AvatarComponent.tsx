import styled from 'styled-components/native';

export const AvatarComponent = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: ${(props: {singleMode?: boolean}) =>
    props.singleMode ? '20px' : '0'};
`;
