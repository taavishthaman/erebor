import styled from "styled-components";
import Select from "react-dropdown-select";
import Spinner from "../components/Spinner";
import TickIcon from "../assets/tick_purple.svg";

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
  width: 45.6rem !important;
  background-color: #f7f8fd !important;
  .react-dropdown-select-content {
    color: #647196 !important;
  }

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
    color: var(--08, #0c0e16);
    font-size: 15px !important;
    font-style: normal;
    font-weight: 700 !important;
    line-height: 15px; /* 100% */
    letter-spacing: -0.25px;
  }
`;

function StatusDropdown({ selectedStatus, setSelectedStatus, options }) {
  return (
    <Dropdown>
      <StyledSelect
        placeholder="Select a status"
        options={options}
        itemRenderer={({ item, itemIndex, props, state, methods }) => {
          const isSelected = state.values.some((v) => v.value === item.value);

          return (
            <div
              style={{
                padding: "10px",
                // Add border to all items except the last one
                borderBottom:
                  itemIndex !== options.length - 1 ? "1px solid #ccc" : "none",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onClick={() => methods.addItem(item)}
            >
              <span>{item.label}</span>
              {isSelected && <img src={TickIcon} alt="selected" />}
            </div>
          );
        }}
        values={selectedStatus ? [selectedStatus] : []}
        onChange={(values) => {
          console.log(values);
          setSelectedStatus(values[0]);
        }}
      ></StyledSelect>
    </Dropdown>
  );
}

export default StatusDropdown;
