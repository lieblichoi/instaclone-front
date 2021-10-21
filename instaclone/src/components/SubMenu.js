import React from "react";
import styled from "styled-components";
// icons
import AppsIcon from "@material-ui/icons/Apps";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";

function SubMenu() {
  return (
    <SubMenuContainer>
      <SpanContainer>
        <span>
          <AppsIcon />
          <span>게시물</span>
        </span>
      </SpanContainer>
      <SpanContainer>
        <span>
          <PlayCircleOutlineIcon />
          <span>동영상</span>
        </span>
      </SpanContainer>
      <SpanContainer>
        <span>
          <BookmarkBorderIcon />
          <span>저장됨</span>
        </span>
      </SpanContainer>
      <SpanContainers>
        <span>
          <AssignmentIndOutlinedIcon />
          <span>태그됨</span>
        </span>
      </SpanContainers>
    </SubMenuContainer>
  );
}

const SubMenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #dbdbdb;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
`;

const SpanContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-right: 60px;
  color: #262626;
  height: 52px;
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
  }
`;

const SpanContainers = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #262626;
  height: 52px;
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
  }
`;

export default SubMenu;
