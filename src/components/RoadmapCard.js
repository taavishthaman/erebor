import styled from "styled-components";
import ChevronUp from "../assets/chevron_up_blue.svg";
import CommentIcon from "../assets/comment_icon.svg";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef, useState } from "react";

const StyledCard = styled.div`
  width: 35rem;
  border-radius: 0.5rem;
  background: #fff;
  opacity: ${(props) => (props.dragging ? 0.3 : 1)};
`;

const CardInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const CardThemeLine = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: ${(props) =>
    props.status === "planned"
      ? "#f49f85"
      : props.status === "in_progress"
        ? "#AD1FEA"
        : "#62BCFA"};
  border-radius: 0.5rem 0.5rem 0 0;
`;

const CardDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 0 3.2rem 3.2rem 3.2rem;
`;

const CardStatus = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StatusDot = styled.div`
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.status === "planned"
      ? "#f49f85"
      : props.status === "in_progress"
        ? "#AD1FEA"
        : "#62BCFA"};
`;

const StatusText = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TextDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Title = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const Subtitle = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.6rem;
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

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UpvoteContainer = styled.div`
  width: 6.9rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.95rem;
  border-radius: 1rem;
  background: #f2f4fe;
  cursor: pointer;
`;

const ChevronUpImg = styled.img`
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

function RoadmapCard({ feedbackData, category }) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, []);

  const getStatus = (status) => {
    return status === "planned"
      ? "Planned"
      : status === "in_progress"
        ? "In-Progress"
        : "Live";
  };

  return (
    <StyledCard dragging={dragging} ref={ref}>
      <CardInnerContainer>
        <CardThemeLine status={feedbackData.feedback_status}></CardThemeLine>
        <CardDetailContainer>
          <TopContainer>
            <CardStatus>
              <StatusDot status={feedbackData.feedback_status}></StatusDot>
              <StatusText>{getStatus(feedbackData.feedback_status)}</StatusText>
            </CardStatus>
            <TextDetailContainer>
              <Title>{feedbackData.title}</Title>
              <Subtitle>{feedbackData.description}</Subtitle>
            </TextDetailContainer>
          </TopContainer>
          <CategoryPill>{category}</CategoryPill>
          <BottomContainer>
            <UpvoteContainer>
              <ChevronUpImg src={ChevronUp} />
              <UpvoteCount>{feedbackData.upvote_count}</UpvoteCount>
            </UpvoteContainer>
            <RightContainer>
              <CommentIconImg src={CommentIcon} />
              <CommentCount>{feedbackData.comment_count}</CommentCount>
            </RightContainer>
          </BottomContainer>
        </CardDetailContainer>
      </CardInnerContainer>
    </StyledCard>
  );
}

export default RoadmapCard;
