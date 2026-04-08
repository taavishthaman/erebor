import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RoadmapStatusContainer = styled.div`
  padding: 2.4rem;
  display: flex;
  width: 25.5rem;
  gap: 0.8rem;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 1rem;
  flex-direction: column;
  gap: 2.4rem;
`;

const RoadmapHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const RoadmapText = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.25px;
`;

const View = styled.a`
  color: #4661e6;
  font-family: Jost;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  cursor: pointer;
`;

const RoadmapStatusBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const StatusDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 2rem;
  background-color: ${(props) => props.color};
`;

const StatusName = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StatusNumber = styled.div`
  color: #647196;
  text-align: right;
  font-family: Jost;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

function RoadmapStatus({ feedbacks }) {
  const navigate = useNavigate();

  return (
    <RoadmapStatusContainer>
      <RoadmapHeader>
        <RoadmapText>Roadmap</RoadmapText>
        <View
          onClick={() => {
            navigate("/roadmap");
          }}
        >
          View
        </View>
      </RoadmapHeader>
      <RoadmapStatusBody>
        <StatusRow>
          <StatusLeft>
            <StatusDot color={"#F49F85"} />
            <StatusName>Planned</StatusName>
          </StatusLeft>
          <StatusNumber>
            {feedbacks.filter((f) => f.feedback_status === "planned").length}
          </StatusNumber>
        </StatusRow>
        <StatusRow>
          <StatusLeft>
            <StatusDot color={"#AD1FEA"} />
            <StatusName>In-Progress</StatusName>
          </StatusLeft>
          <StatusNumber>
            {
              feedbacks.filter((f) => f.feedback_status === "in_progress")
                .length
            }
          </StatusNumber>
        </StatusRow>
        <StatusRow>
          <StatusLeft>
            <StatusDot color={"#62BCFA"} />
            <StatusName>Live</StatusName>
          </StatusLeft>
          <StatusNumber>
            {feedbacks.filter((f) => f.feedback_status === "live").length}
          </StatusNumber>
        </StatusRow>
      </RoadmapStatusBody>
    </RoadmapStatusContainer>
  );
}

export default RoadmapStatus;
