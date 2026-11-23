import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 1.2rem;
  gap: 0.8rem;
  box-shadow: var(--shadow-sm);

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-400);
    flex-shrink: 0;
  }

  & input {
    border: none;
    background: transparent;
    font-size: 1.3rem;
    color: var(--color-grey-700);
    outline: none;
    width: 15rem;

    @media (max-width: 640px) {
      width: 100%;
    }

    &::placeholder {
      color: var(--color-grey-400);
    }
  }
`;

function SearchInput({ placeholder = "Search..." }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  function handleChange(e) {
    const value = e.target.value;
    if (value) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <SearchContainer>
      <HiMagnifyingGlass />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
      />
    </SearchContainer>
  );
}

export default SearchInput;
