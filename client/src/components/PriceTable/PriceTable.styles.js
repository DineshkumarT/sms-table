import styled from "styled-components";

export const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      width: 250px;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;
