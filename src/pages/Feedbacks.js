import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useCategories from "./useCategories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CompanyImg from "../assets/company_logo.svg";
import FilterDropdown from "../components/FilterDropdown";
import FeedbackCard from "../components/FeedbackCard";
import useFeedbacks from "./useFeedbacks";
import Spinner from "../components/Spinner";
import EmptyFeedback from "../components/EmptyFeedback";

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

const EmptyFeedbackContainer = styled.div`
  height: 60rem;
  width: 82.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const FeedbackCardContainer = styled.div`
  height: 80vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Feedbacks() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [feedbackCategories, setFeedbackCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  //Fetch Categories
  const {
    isLoading: isLoadingCategories,
    categories,
    error: errorCategories,
  } = useCategories();

  const {
    isLoading: isLoadingFeedbacks,
    feedbacks,
    error: errorFeedbacks,
  } = useFeedbacks();

  useEffect(() => {
    if (categories && categories.length) {
      setFeedbackCategories([
        { category_name: "All", category_id: 0 }, //Adding the all filter
        ...categories,
      ]);

      const query = searchParams.get("category_id");

      if (query) {
        setSelectedCategory(categories.find((c) => c.category_id === query));
      } else {
        setSelectedCategory({ category_name: "All", category_id: 0 });
      }
    }
  }, [categories, searchParams]);

  useEffect(() => {
    if (feedbacks && feedbacks.length) {
      setFilteredFeedbacks(feedbacks);
    } else {
      setFilteredFeedbacks([]);
    }
  }, [feedbacks]);

  const changeCategory = (category) => {
    setSelectedCategory(category);
    if (category.category_id) {
      // setSearchParams({ category_id: category.category_id });
      setSearchParams((prev) => {
        prev.set("category_id", category.category_id);
        return prev;
      });
    } else {
      setSearchParams({});
    }
  };

  const changeSortCriteria = (criteria) => {
    setSelectedCriteria(criteria);
    setSearchParams((prev) => {
      prev.set("sort", criteria.criteria);
      return prev;
    });
  };

  return (
    <StyledFeedbackContainer>
      <Sidebar
        isLoadingCategories={isLoadingCategories}
        categories={feedbackCategories}
        selectedCategory={selectedCategory}
        changeCategory={changeCategory}
      />
      <MainBody>
        <Header>
          <LeftContainer>
            <InnerLeftContainer>
              <LightbulbImg src={CompanyImg} />
              <SuggestionCount>
                {filteredFeedbacks?.length} Suggestions
              </SuggestionCount>
            </InnerLeftContainer>
            <FilterDropdown changeSortCriteria={changeSortCriteria} />
          </LeftContainer>
          <AddFeedbackBtn
            onClick={() => {
              navigate("/feedback/new");
            }}
          >
            + Add Feedback
          </AddFeedbackBtn>
        </Header>
        {isLoadingFeedbacks ? (
          <EmptyFeedbackContainer>
            <Spinner />
          </EmptyFeedbackContainer>
        ) : filteredFeedbacks.length === 0 ? (
          <EmptyFeedbackContainer>
            <EmptyFeedback />
          </EmptyFeedbackContainer>
        ) : (
          <FeedbackCardContainer>
            {filteredFeedbacks.map((feedback) => (
              <FeedbackCard
                key={feedback.feedback_id}
                feedbackData={feedback}
                category={
                  feedbackCategories?.find(
                    (f) => f.category_id === feedback.category_id,
                  ).category_name
                }
              />
            ))}
          </FeedbackCardContainer>
        )}
      </MainBody>
    </StyledFeedbackContainer>
  );
}

export default Feedbacks;
