import {
  StyledDate,
  StyledDateLabel,
  StyledDateWrapper,
} from "./DateRange.styles";

const DateRange = ({ fromDate, toDate, onFromDateChange, onToDateChange }) => {
  return (
    <StyledDateWrapper>
      <StyledDate>
        <StyledDateLabel>
          <label>From Date:</label>
        </StyledDateLabel>
        <input
          type="date"
          name="from-date"
          value={fromDate}
          onChange={onFromDateChange}
        />
      </StyledDate>
      <StyledDate>
        <label>To Date:</label>
        <input
          type="date"
          name="to-date"
          value={toDate}
          min={fromDate}
          onChange={onToDateChange}
        />
      </StyledDate>
    </StyledDateWrapper>
  );
};

export default DateRange;
