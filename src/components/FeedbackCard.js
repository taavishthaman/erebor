import { useState } from "react";
import styled from "styled-components";
import ChevronUpBlue from "../assets/chevron_up_blue.svg";
import ChevronUpWhite from "../assets/chevron_up_white.svg";
import CommentIcon from "../assets/comment_icon.svg";
import { useCreateUpvote } from "../pages/useCreateUpvote";
import { useDeleteUpvote } from "../pages/useDeleteUpvote";
import { useNavigate } from "react-router-dom";

const StyledFeedbackCard = styled.div`
  width: 82.5rem;
  height: 15.1rem;
  border-radius: 1rem;
  background: #fff;
  padding: 2.8rem 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 4rem;
`;

const UpvoteContainer = styled.div`
  width: 4rem;
  height: 5.3rem;
  border-radius: 1rem;
  background: ${(props) => (props.upvoted ? "#4661E6" : "#F2F4FE")};
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChevronUp = styled.img`
  height: 0.8rem;
`;

const UpvoteCount = styled.div`
  color: ${(props) => (props.upvoted ? "#fff" : "#3a4374")};
  text-align: center;
  font-family: Jost;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.181px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const CardTitle = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const CardDescription = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CategoryPill = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background-color: #f2f4ff;
  width: fit-content;
  padding: 0.5rem 1.6rem;
  color: #4661e6;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const CommentIconImg = styled.img`
  height: 1.6rem;
`;

const CommentCount = styled.div`
  color: #3a4374;
  text-align: center;
  font-family: Jost;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.222px;
`;

function FeedbackCard({ feedbackData, category }) {
  const navigate = useNavigate();
  const { createUpvote, isLoading: isLoadingUpvoteCreate } = useCreateUpvote();
  const { deleteUpvote, isLoading: isLoadingUpvoteDelete } = useDeleteUpvote();
  const [upvote, setUpvote] = useState(feedbackData.has_user_upvoted);

  return (
    <StyledFeedbackCard
      onClick={() => {
        navigate(`/feedback/${feedbackData.feedback_id}/comments`);
      }}
    >
      <LeftContainer>
        <UpvoteContainer
          upvoted={upvote}
          onClick={(e) => {
            e.stopPropagation();
            setUpvote((prev) => {
              if (prev === false) {
                createUpvote({ feedbackId: feedbackData.feedback_id });
                return true;
              } else {
                deleteUpvote({ feedbackId: feedbackData.feedback_id });
                return false;
              }
            });
          }}
        >
          <ChevronUp src={upvote ? ChevronUpWhite : ChevronUpBlue} />
          <UpvoteCount upvoted={upvote}>
            {feedbackData?.upvote_count || 0}
          </UpvoteCount>
        </UpvoteContainer>
        <DetailContainer>
          <TopContainer>
            <CardTitle>{feedbackData?.title}</CardTitle>
            <CardDescription>{feedbackData?.description}</CardDescription>
          </TopContainer>
          <CategoryPill>{category}</CategoryPill>
        </DetailContainer>
      </LeftContainer>
      <RightContainer>
        <CommentIconImg src={CommentIcon} />
        <CommentCount>{feedbackData?.comment_count || 0}</CommentCount>
      </RightContainer>
    </StyledFeedbackCard>
  );
}

export default FeedbackCard;
