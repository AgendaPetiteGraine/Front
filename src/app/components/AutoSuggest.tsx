import React, {
  useState,
  ChangeEvent,
  FormEvent as ReactFormEvent,
} from "react";
import Autosuggest from "react-autosuggest";

interface Suggestion {
  name: string;
}
interface SuggestionsProps {
  suggestionsTab: Suggestion[];
  placeholder: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: Filter;
}
interface Filter {
  type: string[];
  ageMin: number;
  ageMax: number;
  areBabyAccepted: boolean;
  city: string[];
  keyWords: string;
}
const AutoSuggest: React.FC<SuggestionsProps> = ({
  suggestionsTab,
  placeholder,
  setFilter,
  filter,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [value, setValue] = useState<string>("");

  const getSuggestions = (value: string) => {
    const inputValue = value;
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suggestionsTab.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onChange = (
    event: ReactFormEvent<HTMLElement>,
    { newValue }: { newValue: string }
  ) => {
    setValue(newValue);
    const newFilter = { ...filter };
    newFilter.keyWords = newValue;
    setFilter(newFilter);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Suggestion) => suggestion.name;

  const renderSuggestion = (suggestion: Suggestion) => (
    <div>{suggestion.name}</div>
  );

  const inputProps = {
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default AutoSuggest;
