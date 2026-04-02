import styled from "styled-components";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div``;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
