import styled from "styled-components";
import ChevronLeft from "../assets/chevron_left_blue.svg";
import useFeedback from "./useFeedback";
import FeedbackCard from "../components/FeedbackCard";
import useCategories from "./useCategories";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const FeedbackDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledFeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  align-items: center;
  margin-top: 8rem;
`;

const Header = styled.div`
  width: 82.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ChevronLeftImg = styled.img`
  height: 1rem;
`;

const GoBackText = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const EditFeedbackButton = styled.button`
  all: initial;
  font-family: Jost;
  gap: 0.8rem;
  padding: 1.25rem 2.4rem;
  border-radius: 1rem;
  background: #4661e6;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

const CommentBox = styled.div`
  padding: 2.4rem 3.2rem;
  border-radius: 1rem;
  background: #fff;
  width: 82.5rem;
  height: 35rem;
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const ContainerHeading = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const AddCommentContainer = styled.div`
  padding: 2.4rem 3.2rem;
  width: 82.5rem;
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const CommentArea = styled.textarea`
  font-family: "Jost";
  border-radius: 0.8rem;
  background-color: #f7f8fd;
  padding: 1.2rem 1rem;
  width: 76rem;
  height: 8rem;
  resize: none;
  border: none;
`;

const BottomRow = styled.div`
  display: flex;
  width: 76rem;
  align-items: center;
  justify-content: space-between;
`;

const CharactersLeft = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PostCommentButton = styled.button`
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

function FeedbackDetails() {
  const navigate = useNavigate();

  const {
    isLoading: isLoadingFeedback,
    feedback,
    error: errorFeedback,
  } = useFeedback();

  const {
    isLoading: isLoadingCategories,
    categories,
    error: errorCategories,
  } = useCategories();

  if (isLoadingFeedback || isLoadingCategories) {
    return <Spinner />;
  }

  return (
    <FeedbackDetailsContainer>
      <StyledFeedbackContainer>
        <Header>
          <LeftContainer>
            <ChevronLeftImg src={ChevronLeft} />
            <GoBackText>Go Back</GoBackText>
          </LeftContainer>
          <EditFeedbackButton
            onClick={() => {
              navigate(`/feedback/${feedback[0]?.feedback_id}/edit`);
            }}
          >
            Edit Feedback
          </EditFeedbackButton>
        </Header>
        <FeedbackCard
          key={feedback[0].feedback_id}
          feedbackData={feedback[0]}
          category={
            categories?.find((c) => c?.category_id === feedback[0]?.category_id)
              ?.category_name
          }
        />
        <CommentBox>
          <ContainerHeading>4 Comments</ContainerHeading>
        </CommentBox>
        <AddCommentContainer>
          <ContainerHeading>Add Comment</ContainerHeading>
          <CommentArea placeholder="Type your comment here"></CommentArea>
          <BottomRow>
            <CharactersLeft>250 Characters left</CharactersLeft>
            <PostCommentButton>Post Comment</PostCommentButton>
          </BottomRow>
        </AddCommentContainer>
      </StyledFeedbackContainer>
    </FeedbackDetailsContainer>
  );
}

export default FeedbackDetails;
