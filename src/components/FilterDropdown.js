import styled from "styled-components";
import Select from "react-dropdown-select";

const Dropdown = styled.div`
  display: flex;
  gap: 1.4rem;
`;

const Title = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const DropdownIcon = styled.img``;

const StyledSelect = styled(Select)`
  border: none !important;
  color: var(--08, #0c0e16);
  .react-dropdown-select-dropdown-handle svg {
    fill: white !important;
  }
  font-family: "Jost" !important;
  font-size: 15px !important;
  font-style: normal;
  font-weight: 700 !important;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  ::placeholder {
    font-family: "Jost" !important;
    color: var(--08, #f2f4fe);
    font-size: 15px !important;
    font-style: normal;
    font-weight: 700 !important;
    line-height: 15px; /* 100% */
    letter-spacing: -0.25px;
  }
`;

function FilterDropdown({ setSelectedType }) {
  const options = [
    {
      value: 1,
      label: "Most Upvotes",
    },
    {
      value: 2,
      label: "Least Upvotes",
    },
    {
      value: 3,
      label: "Most Comments",
    },
    {
      value: 4,
      label: "Least Comments",
    },
  ];

  return (
    <Dropdown>
      <StyledSelect
        placeholder="Filter by criteria"
        options={options}
        itemRenderer={({ item, itemIndex, props, state, methods }) => (
          <div
            style={{
              padding: "10px",
              // Add border to all items except the last one
              borderBottom:
                itemIndex !== options.length - 1 ? "1px solid #ccc" : "none",
              cursor: "pointer",
            }}
            onClick={() => methods.addItem(item)}
          >
            {item.label}
          </div>
        )}
        values={[]}
        onChange={(values) => {
          if (values.length) setSelectedType(values[0].label);
          else setSelectedType("");
        }}
      ></StyledSelect>
    </Dropdown>
  );
}

export default FilterDropdown;
