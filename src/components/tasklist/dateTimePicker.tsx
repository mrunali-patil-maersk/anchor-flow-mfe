import { forwardRef, useEffect, useState } from "react";
import { Box, Button, Tooltip } from "@anchor/react-components";
import DatePicker, { ReactDatePickerCustomHeaderProps } from "react-datepicker";

import { IconNames } from "@anchor/react-components/dist/lib/components/Icon";
import {
  allMonths,
  getLocalizedFormat,
  getMonth,
  getTimeFromNow,
  getYear,
  rangeYears,
} from "src/utils/dateTimeUtils";
import { SelectStyled, Styles } from "@styles/components/tasklist/dateTimePicker.style";

interface DateTimePickerProps {
  initLabel: string;
  icon: IconNames;
  dateValue: Date | null;
  onSave: (value: Date | null) => void;
  loading: boolean;
}

const DateTimePicker = ({ dateValue, loading, onSave, initLabel, icon }: DateTimePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      setStartDate(dateValue);
    }
  }, [dateValue, loading]);

  const handleOnChange = (date) => {
    setStartDate(date);
  };

  const handleResetDate = (e) => {
    e?.preventDefault();
    if (dateValue !== null) {
      onSave(null);
      setIsOpen(false);
    } else {
      setStartDate(null);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setStartDate(dateValue);
    setIsOpen(false);
  };

  const handleSave = () => {
    if (dateValue !== startDate) {
      onSave(startDate);
      setIsOpen(false);
    }
  };

  const months = allMonths();
  const years = rangeYears();

  const CustomInput = forwardRef((_, ref) => {
    const label = dateValue ? getTimeFromNow(dateValue) : initLabel;
    return (
      <Box>
        <Tooltip
          apperance="inverted"
          content={dateValue ? getLocalizedFormat(dateValue) : initLabel}
          position="top"
          width="auto"
        >
          <Button
            icon={icon}
            size="small"
            variant="outlined"
            label={label}
            disabled={loading || isOpen}
            onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
          />
        </Tooltip>
      </Box>
    );
  });

  CustomInput.displayName = "CustomInputDate";

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    return (
      <Box display="flex" justifyContent="space-between" px={8}>
        <Button
          icon="chevron-left"
          hiddenlabel={true}
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          size="small"
          variant="plain"
        />
        <Box display="flex">
          <SelectStyled
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectStyled>

          <SelectStyled
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(+value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectStyled>
        </Box>

        <Button
          icon="chevron-right"
          hiddenlabel={true}
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          size="small"
          variant="plain"
        />
      </Box>
    );
  };

  return (
    <Styles>
      <DatePicker
        selected={startDate}
        open={isOpen}
        value={startDate ? startDate.toISOString() : undefined}
        onChange={(date) => handleOnChange(date)}
        customInput={<CustomInput />}
        showTimeSelect
        shouldCloseOnSelect={false}
        onClickOutside={handleCancel}
        showMonthDropdown
        useShortMonthInDropdown
        showYearDropdown
        dropdownMode="select"
        popperPlacement="auto-start"
        renderCustomHeader={renderCustomHeader}
      >
        <Box
          position="absolute"
          bottom="0"
          width="100%"
          display="flex"
          justifyContent="space-between"
          px={16}
          py={8}
          borderTop="1px solid"
          borderColor="#aeaeae"
        >
          <Box>
            <Button variant="plain" type="reset" label="Clear" onClick={handleResetDate} />
          </Box>
          <Box display="flex">
            <Box mr={8}>
              <Button variant="outlined" label="Cancel" onClick={handleCancel} />
            </Box>
            <Button label="Save" disabled={dateValue === startDate} onClick={handleSave} />
          </Box>
        </Box>
      </DatePicker>
    </Styles>
  );
};

export default DateTimePicker;
