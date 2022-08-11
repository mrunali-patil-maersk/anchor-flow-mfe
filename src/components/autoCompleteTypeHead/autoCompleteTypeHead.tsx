import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { chain, debounce } from "lodash";

import {
  Input,
  AutoCompleteContainer,
  AutoCompleteItem,
  AutoCompleteItemButton,
  Root,
  Variant,
  InputWrapper,
  CloseIcon,
  AutoCompleteItemSubText,
} from "@styles/components/tasklist/autoCompleteTypeHead.style";
import { Button as AButton, Icon, Tooltip } from "@anchor/react-components";
import { IconNames } from "@anchor/react-components/dist/lib/components/Icon";
import useOnClickOutside from "@hooks/useOnClickOutside";

export interface IData {
  id: string;
  text: string;
  subText?: string;
  value: string;
}

export interface DefaultDataType {
  id: string;
  text: string;
  value: string;
}

export interface autoCompleteProps {
  style?: {};
  data: IData[];
  variant?: Variant;
  icon: IconNames;
  value: string;
  defaultData?: DefaultDataType[];
  buttonLabel?: string;
  buttonLabelTooltip?: string;
  onSelect: (item: IData | DefaultDataType) => void;
}

const AutoCompleteTypeHead = ({
  style,
  data,
  variant = "small",
  icon,
  value,
  defaultData = [],
  buttonLabelTooltip,
  buttonLabel,
  onSelect,
}: autoCompleteProps) => {
  const [search, setSearch] = useState<{ text: string; suggestions: IData[] }>({
    text: value ?? "",
    suggestions: [],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autoCompleteRef = useRef<HTMLInputElement>(null);
  useOnClickOutside(autoCompleteRef, () => resetState());
  const isMounted = useRef(false);

  useEffect(() => {
    if (isInputVisible) {
      inputRef.current?.focus();
    }
  }, [isInputVisible, inputRef]);

  const initSuggestionToShow = useCallback(() => {
    if (isMounted.current) {
      // 3 record will show in initial + me + unassigned
      const suggestions = chain(data).shuffle().sort().slice(0, 3).value();
      setSearch((prevState) => ({ ...prevState, suggestions: suggestions }));
    }
  }, [data]);

  useEffect(() => {
    isMounted.current = true;
    setSearch((prevState) => ({
      ...prevState,
      text: value,
    }));
    initSuggestionToShow();
    return () => {
      initSuggestionToShow();
      isMounted.current = false;
    };
  }, [value, initSuggestionToShow]);

  const updateSuggestion = debounce((value: string) => {
    if (isMounted.current) {
      let suggestions: IData[] = [];
      if (value.length > 0) {
        const regex = new RegExp(`^${value}`, "i");
        suggestions = data
          .sort()
          .filter((v: IData) => regex.test(v.text) || regex.test(v.subText ?? ""));
        setSearch((prevSearch) => ({ ...prevSearch, suggestions }));
      } else {
        initSuggestionToShow();
      }

      setIsComponentVisible(true);
    }
  }, 500);

  const onFocus = () => {
    setIsComponentVisible(true);
  };

  const onTextChanged = (value) => {
    setSearch((prevSearch) => ({ ...prevSearch, text: value }));
    updateSuggestion(value);
  };

  const resetState = (valueText = value) => {
    if (isMounted.current) {
      setIsComponentVisible(false);
      setIsInputVisible(false);
      initSuggestionToShow();
      setSearch((prevState) => ({
        ...prevState,
        text: valueText,
      }));
    }
  };

  const suggestionSelected = (item: IData) => {
    if (onSelect) {
      onSelect(item);
    }
    setSearch({
      text: item.text,
      suggestions: [],
    });
    resetState();
  };

  const defaultSuggestionSelected = (item: DefaultDataType) => {
    if (onSelect) {
      onSelect(item);
    }
    setSearch({
      text: item.value,
      suggestions: [],
    });
    resetState();
  };

  const clearSearch = () => {
    onTextChanged("");
    inputRef.current?.focus();
  };

  const { suggestions } = search;

  return (
    <Root style={style} variant={variant} ref={autoCompleteRef}>
      {isInputVisible ? (
        <InputWrapper variant={variant}>
          <Icon name={icon} />
          <Input
            id="input"
            value={search.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onTextChanged(e.target.value)}
            type="text"
            onFocus={onFocus}
            ref={inputRef}
            variant={variant}
          />
          {search.text && <CloseIcon name="times" onClick={clearSearch} />}
        </InputWrapper>
      ) : (
        <Tooltip
          apperance="inverted"
          content={buttonLabelTooltip ? buttonLabelTooltip : search.text}
          position="top"
          width="auto"
        >
          <AButton
            variant="outlined"
            iconPosition="left"
            icon={icon}
            label={buttonLabel ? buttonLabel : search.text}
            size={variant}
            onClick={() => setIsInputVisible(true)}
          />
        </Tooltip>
      )}
      {isComponentVisible && (
        <AutoCompleteContainer>
          {defaultData?.length > 0 &&
            defaultData.map((item: DefaultDataType) => (
              <AutoCompleteItem key={item.id} onClick={() => defaultSuggestionSelected(item)}>
                <AutoCompleteItemButton variant="body1" fontStyle="normal">
                  {item.text}
                </AutoCompleteItemButton>
              </AutoCompleteItem>
            ))}
          {suggestions.length > 0 &&
            suggestions.map((item: IData) => (
              <AutoCompleteItem key={item.id} onClick={() => suggestionSelected(item)}>
                <AutoCompleteItemButton variant="body1" fontStyle="normal">
                  {item.text}
                </AutoCompleteItemButton>
                {item.subText && (
                  <AutoCompleteItemSubText variant="body2" fontStyle="normal">
                    {item.subText}
                  </AutoCompleteItemSubText>
                )}
              </AutoCompleteItem>
            ))}
        </AutoCompleteContainer>
      )}
    </Root>
  );
};

export default AutoCompleteTypeHead;
