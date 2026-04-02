import styled from "styled-components";
import ChevronUpBlue from "../assets/chevron_up_blue.svg";
import CommentIcon from "../assets/comment_icon.svg";

const StyledFeedbackCard = styled.div`
  width: 82.5rem;
  height: 15.1rem;
  border-radius: 1rem;
  background: #fff;
  padding: 2.8rem 3.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 4rem;
`;

const UpvoteContainer = styled.div`
  width: 4rem;
  height: 5.3rem;
  border-radius: 1rem;
  background: #f2f4fe;
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
  color: #3a4374;
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

function FeedbackCard() {
  return (
    <StyledFeedbackCard>
      <LeftContainer>
        <UpvoteContainer>
          <ChevronUp src={ChevronUpBlue} />
          <UpvoteCount>36</UpvoteCount>
        </UpvoteContainer>
        <DetailContainer>
          <TopContainer>
            <CardTitle>Add tags for solutions</CardTitle>
            <CardDescription>
              Easier to search for solutions based on a specific stack.
            </CardDescription>
          </TopContainer>
          <CategoryPill>Enhancement</CategoryPill>
        </DetailContainer>
      </LeftContainer>
      <RightContainer>
        <CommentIconImg src={CommentIcon} />
        <CommentCount>3</CommentCount>
      </RightContainer>
    </StyledFeedbackCard>
  );
}

export default FeedbackCard;
