import styled from "styled-components";
import Detective from "../assets/detetctive.svg";
import { useNavigate } from "react-router-dom";

const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
`;

const DetectiveImg = styled.img`
  width: 12.9rem;
  height: 13.6rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const NoFeedbackTitle = styled.div`
  color: #3a4374;
  text-align: center;
  font-family: Jost;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
`;

const NoFeedbackSubtitle = styled.div`
  color: #647196;
  text-align: center;
  font-family: Jost;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 41rem;
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

function EmptyFeedback() {
  const navigate = useNavigate();
  return (
    <StyledEmptyContainer>
      <DetectiveImg src={Detective} />
      <TextContainer>
        <NoFeedbackTitle>There is no feedback yet.</NoFeedbackTitle>
        <NoFeedbackSubtitle>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </NoFeedbackSubtitle>
      </TextContainer>
      <AddFeedbackBtn
        onClick={() => {
          navigate("/feedback/new");
        }}
      >
        + Add Feedback
      </AddFeedbackBtn>
    </StyledEmptyContainer>
  );
}

export default EmptyFeedback;
