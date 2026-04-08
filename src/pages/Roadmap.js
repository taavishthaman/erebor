import styled from "styled-components";
import ChevronLeft from "../assets/chevron_left_white.svg";
import RoadmapCard from "../components/RoadmapCard";
import DroppableColumn from "../components/DroppableColumn";
import { useEffect, useState } from "react";
import useFeedbacks from "./useFeedbacks";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import useCategories from "./useCategories";

const StyledRoadmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  align-items: center;
  margin-top: 4rem;
`;

const StyledHeader = styled.div`
  width: 111rem;
  border-radius: 1rem;
  background-color: #373f68;
  padding: 2.7rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const GoBackContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  width: 54rem;
`;

const ChevronLeftImg = styled.img`
  height: 1rem;
`;

const GoBackText = styled.div`
  color: #fff;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Title = styled.div`
  color: #fff;
  font-family: Jost;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
`;

const AddFeedbackButton = styled.button`
  all: initial;
  font-family: Jost;
  gap: 0.8rem;
  padding: 1.25rem 2.4rem;
  border-radius: 1rem;
  background: #ad1fea;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

const ColumnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 111rem;
`;

function Roadmap() {
  const navigate = useNavigate();
  const {
    isLoading: isLoadingFeedbacks,
    feedbacks,
    error: errorFeedbacks,
  } = useFeedbacks();

  const {
    isLoading: isLoadingCategories,
    categories,
    error: errorCategories,
  } = useCategories();

  const [boardData, setBoardData] = useState({
    planned: [],
    "in-progress": [],
    live: [],
  });

  useEffect(() => {
    if (feedbacks.length) {
      const devFeedbacks = feedbacks.filter(
        (feedback) => feedback.feedback_status !== "suggestion",
      );

      const plannedFeedbacks = devFeedbacks.filter(
        (feedback) => feedback.feedback_status === "planned",
      );

      const inProgressFeedbacks = devFeedbacks.filter(
        (feedback) => feedback.feedback_status === "in_progress",
      );

      const liveFeedbacks = devFeedbacks.filter(
        (feedback) => feedback.feedback_status === "live",
      );

      setBoardData({
        planned: [...plannedFeedbacks],
        "in-progress": [...inProgressFeedbacks],
        live: [...liveFeedbacks],
      });
    }
  }, [feedbacks]);

  const goBack = () => {
    navigate("/feedbacks");
  };

  if (!feedbacks || !categories) {
    return <Spinner />;
  }

  return (
    <StyledRoadmapContainer>
      <StyledHeader>
        <LeftContainer>
          <GoBackContainer>
            <ChevronLeftImg src={ChevronLeft} />
            <GoBackText
              onClick={() => {
                goBack();
              }}
            >
              Go Back
            </GoBackText>
          </GoBackContainer>
          <Title>Roadmap</Title>
        </LeftContainer>
        <AddFeedbackButton
          onClick={() => {
            navigate("/feedback/new");
          }}
        >
          + Add Feedback
        </AddFeedbackButton>
      </StyledHeader>
      <ColumnContainer>
        <DroppableColumn
          columnTitle={`Planned (${boardData["planned"].length})`}
          columnDescription={"Ideas prioritized for research"}
        >
          {boardData["planned"].map((cardData) => (
            <RoadmapCard
              feedbackData={cardData}
              category={
                categories?.find((f) => f.category_id === cardData.category_id)
                  .category_name
              }
            />
          ))}
        </DroppableColumn>
        <DroppableColumn
          columnTitle={`In-Progress (${boardData["in-progress"].length})`}
          columnDescription={"Currently being developed"}
        >
          {boardData["in-progress"].map((cardData) => (
            <RoadmapCard
              feedbackData={cardData}
              category={
                categories?.find((f) => f.category_id === cardData.category_id)
                  .category_name
              }
            />
          ))}
        </DroppableColumn>
        <DroppableColumn
          columnTitle={`Live (${boardData["live"].length})`}
          columnDescription={"Released features"}
        >
          {boardData["live"].map((cardData) => (
            <RoadmapCard
              feedbackData={cardData}
              category={
                categories?.find((f) => f.category_id === cardData.category_id)
                  .category_name
              }
            />
          ))}
        </DroppableColumn>
      </ColumnContainer>
    </StyledRoadmapContainer>
  );
}

export default Roadmap;
