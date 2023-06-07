import styled from 'styled-components';
export const CellContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px;
  min-height: 90px;
  margin: 4px 0;
  background-color: rgb(128 128 128 / 30%);
  box-shadow: rgba(0, 0, 0, 0.21) 0px 0px 3px 1px;
  flex-direction: column;
  line-height: 1;
  position: relative;
  * button {
    transition: all 0.3s ease-in-out;
  }
  &:hover * button {
    opacity: 1 !important;
  }
`;
