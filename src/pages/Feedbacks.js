import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import useCategories from "./useCategories";
import { useEffect, useState } from "react";
import CompanyImg from "../assets/company_logo.svg";
import FilterDropdown from "../components/FilterDropdown";
import FeedbackCard from "../components/FeedbackCard";

const StyledFeedbackContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 4.8rem;
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  height: 80vh;
  overflow-y: scroll;
`;

const Header = styled.div`
  padding: 1.4rem 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 82.5rem;
  height: 7.2rem;
  border-radius: 1rem;
  background: #373f68;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 3.8rem;
  align-items: center;
`;

const InnerLeftContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const LightbulbImg = styled.img`
  height: 2.4rem;
`;

const SuggestionCount = styled.div`
  color: #fff;
  font-family: Jost;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const AddFeedbackBtn = styled.button`
  all: initial;
  gap: 0.8rem;
  opacity: 1;
  font-family: Jost;
  border-radius: 1rem;
  padding: 1.3rem 2.7rem;
  background-color: #ad1fea;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #f2f4fe;
  cursor: pointer;
`;

function Feedbacks() {
  //Fetch Categories
  const { isLoading: isLoadingCategories, categories, error } = useCategories();
  const [feedbackCategories, setFeedbackCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});

  useEffect(() => {
    if (categories && categories.length) {
      setFeedbackCategories([
        { category_name: "All", category_id: 0 }, //Adding the all filter
        ...categories,
      ]);

      setSelectedCategory({ category_name: "All", category_id: 0 });
    }
  }, [categories]);

  return (
    <StyledFeedbackContainer>
      <Sidebar
        isLoadingCategories={isLoadingCategories}
        categories={feedbackCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MainBody>
        <Header>
          <LeftContainer>
            <InnerLeftContainer>
              <LightbulbImg src={CompanyImg} />
              <SuggestionCount>6 Suggestions</SuggestionCount>
            </InnerLeftContainer>
            <FilterDropdown />
          </LeftContainer>
          <AddFeedbackBtn>+ Add Feedback</AddFeedbackBtn>
        </Header>
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
      </MainBody>
    </StyledFeedbackContainer>
  );
}

export default Feedbacks;
