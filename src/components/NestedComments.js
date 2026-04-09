import styled from "styled-components";
import ProfileIcon from "../assets/profile_icon.svg";

const StyledCommentContainer = styled.div``;

const StyledComment = styled.div`
  display: flex;
  gap: 3.2rem;
  margin-left: ${(props) => `${props.depth * 40}px`};
  align-items: flex-start;
`;

const Rule = styled.hr`
  border: none;
  border-top: 1px solid #8c92b3;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
  opacity: 0.25;
`;

const ProfileImg = styled.img`
  width: 4rem;
  filter: invert(70%);
`;

const CommentBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;
  width: 95%;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ReplyButton = styled.div`
  color: #4661e6;
  font-family: Jost;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;

const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommenterName = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.194px;
`;

const CommenterUsername = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CommentBody = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Spacer = styled.div`
  margin-top: 3.2rem;
`;

const ReplyContainer = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const ReplyBox = styled.textarea`
  font-family: "Jost";
  border-radius: 0.8rem;
  background-color: #f7f8fd;
  width: 46rem;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem;
  resize: none;
  border: none;
  height: 8rem;
  color: #3a4374;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PostReplyButton = styled.button`
  all: initial;
  font-family: Jost;
  gap: 0.8rem;
  padding: 1.25rem 2.4rem;
  border-radius: 1rem;
  background: #ad1fea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  height: 2rem;
`;

function NestedComments({
  comments,
  depth = 0,
  isFirst,
  toggleReply,
  replyId,
  setReply,
  postReply,
}) {
  const commentIds = Object.keys(comments);

  if (commentIds.length === 0 || depth > 2) {
    return <></>;
  }

  return (
    <div>
      {commentIds.map((commentId, i) => (
        <StyledCommentContainer border={depth === 0 && !isFirst}>
          {depth === 0 && i > 0 ? <Rule /> : <></>}
          {depth > 0 ? <Spacer /> : null}
          <StyledComment depth={depth}>
            <ProfileImg src={ProfileIcon} />
            <CommentBodyContainer>
              <CommentMeta>
                <UserDataContainer>
                  <CommenterName>
                    {comments[commentId].name || comments[commentId].email}
                  </CommenterName>
                  <CommenterUsername>
                    {comments[commentId].username || comments[commentId].email}
                  </CommenterUsername>
                </UserDataContainer>
                {depth < 2 ? (
                  <ReplyButton
                    onClick={() => {
                      toggleReply(commentId);
                    }}
                  >
                    Reply
                  </ReplyButton>
                ) : (
                  <></>
                )}
              </CommentMeta>
              <CommentBody>{comments[commentId].comment}</CommentBody>
              {replyId === commentId ? (
                <ReplyContainer>
                  <ReplyBox
                    onChange={(e) => {
                      setReply(e.target.value);
                    }}
                  ></ReplyBox>
                  <PostReplyButton
                    onClick={() => {
                      postReply();
                    }}
                  >
                    Post Reply
                  </PostReplyButton>
                </ReplyContainer>
              ) : (
                <></>
              )}
            </CommentBodyContainer>
          </StyledComment>
          <NestedComments
            comments={comments[commentId].children}
            depth={depth + 1}
            isFirst={false}
            toggleReply={toggleReply}
            replyId={replyId}
            setReply={setReply}
            postReply={postReply}
          />
        </StyledCommentContainer>
      ))}
    </div>
  );
}

export default NestedComments;
