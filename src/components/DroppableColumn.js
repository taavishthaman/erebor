import styled from "styled-components";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useState, useEffect, useRef } from "react";

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ColumnDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ColumnTitle = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.194px;
`;

const ColumnDescription = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DroppableArea = styled.div`
  height: 60vh;
  width: 36rem;
  background-color: ${(props) => (props.isDraggedOver ? "#F2F4FF" : "none")};
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function DroppableColumn({ columnTitle, columnDescription, children }) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, []);

  return (
    <StyledColumn>
      <ColumnDetails>
        <ColumnTitle>{columnTitle}</ColumnTitle>
        <ColumnDescription>{columnDescription}</ColumnDescription>
      </ColumnDetails>
      <DroppableArea isDraggedOver={isDraggedOver} ref={ref}>
        {children}
      </DroppableArea>
    </StyledColumn>
  );
}

export default DroppableColumn;
