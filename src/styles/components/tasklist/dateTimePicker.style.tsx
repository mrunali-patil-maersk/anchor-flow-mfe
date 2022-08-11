import styled from "styled-components";
import { Box } from "@anchor/react-components";

export const Styles = styled.div`
  .react-datepicker {
    color: ${({ theme }) => theme.colors.primary.blue[700]};
    font-family: ${({ theme }) => theme.fonts.body};
    padding-bottom: 60px;
  }

  .react-datepicker__day--outside-month {
    color: transparent !important;
    pointer-events: none;
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.functional.grey[100]};
  }
  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header,
  .react-datepicker__day-name,
  .react-datepicker__navigation-icon::before {
    color: ${({ theme }) => theme.colors.primary.blue[800]};
  }

  .react-datepicker__navigation-icon::before {
    border-color: ${({ theme }) => theme.colors.primary.blue[800]};
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.primary.blue[700]};
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
    }
    position: relative;
  }
  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    background-color: ${({ theme }) => theme.colors.primary.blue[300]};
    color: ${({ theme }) => theme.colors.functional.grey[50]};
    :hover {
      background-color: ${({ theme }) => theme.colors.primary.blue[300]};
      color: ${({ theme }) => theme.colors.functional.grey[50]};
    }
    :after {
      background-color: ${({ theme }) => theme.colors.primary.blue[600]};
      content: "";
      height: 4px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
    color: ${({ theme }) => theme.colors.primary.blue[700]};
    border: none;
    outline: none;
  }
  .react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.colors.primary.blue[300]};
    color: ${({ theme }) => theme.colors.functional.grey[50]};
    border: none;
    outline: none;
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
    color: ${({ theme }) => theme.colors.primary.blue[700]};
  }
  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    &:hover {
      background-color: ${({ theme }) => `${theme.colors.primary.blue[50]}50`};
      color: ${({ theme }) => theme.colors.primary.blue[700]};
    }
  }
`;

export const SelectStyled = styled.select`
  margin: 0 4px;
  outline: 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  font-family: "Maersk Text";
  cursor: pointer;
  border-style: solid;
  box-shadow: none;
  min-width: 3.75em;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.functional.grey[50]};
  border-color: ${({ theme }) => theme.colors.functional.grey[300]};
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  &:focus,
  &:active {
    outline: none;
    box-shadow: ${({ theme }) => theme.boxShadows.type.basic.default};
    border-color: ${({ theme }) => theme.colors.primary.blue[400]};
  }
`;
