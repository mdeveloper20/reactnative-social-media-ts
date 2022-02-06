import styled from 'styled-components/native';

export const PostWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))`
  padding: 20px;
`;
