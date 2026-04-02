import styled from "styled-components";
import Spinner from "./Spinner";

const StyledCategoryContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  width: 25.5rem;
  gap: 0.8rem;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 1rem;
`;

const CategoryPill = styled.div`
  height: 3rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.selected ? "#4661E6" : "#F2F4FF")};
  color: ${(props) => (props.selected ? "#FFF" : "#4661E6")};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  cursor: pointer;
`;

const CategoryText = styled.div`
  font-family: Jost;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

function CategoriesFilterContainer({
  isLoadingCategories,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  if (isLoadingCategories) {
    return <Spinner />;
  }

  return (
    <StyledCategoryContainer>
      {categories.map((category) => (
        <CategoryPill
          onClick={() => {
            setSelectedCategory(category);
          }}
          selected={category.category_name === selectedCategory.category_name}
        >
          <CategoryText>{category.category_name}</CategoryText>
        </CategoryPill>
      ))}
    </StyledCategoryContainer>
  );
}

export default CategoriesFilterContainer;
