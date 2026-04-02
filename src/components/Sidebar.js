import { styled } from "styled-components";
import ProductContainer from "../assets/product_name_container.svg";
import Cookies from "js-cookie";
import CategoriesFilterContainer from "./CategoriesFilterContainer";
import RoadmapStatus from "./RoadmapStatus";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ProductNameContainer = styled.div`
  position: relative;
`;

const ProductNameImg = styled.img`
  width: 25.5rem;
`;

const ProductDetailsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 2.4rem;
  top: 6.2rem;
`;

const ProductName = styled.div`
  color: #fff;
  font-family: Jost;
  font-size: 2rem;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const FeedbackBoardText = styled.div`
  color: #fff;
  font-family: Jost;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  opacity: 0.75;
`;

function Sidebar({
  isLoadingCategories,
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <StyledSidebar>
      <ProductNameContainer>
        <ProductNameImg src={ProductContainer} />
        <ProductDetailsContainer>
          <ProductName>Frontend Mentor</ProductName>
          <FeedbackBoardText>Feedback Board</FeedbackBoardText>
        </ProductDetailsContainer>
      </ProductNameContainer>
      <CategoriesFilterContainer
        isLoadingCategories={isLoadingCategories}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <RoadmapStatus />
    </StyledSidebar>
  );
}

export default Sidebar;
