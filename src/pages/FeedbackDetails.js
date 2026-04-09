import styled from "styled-components";
import ChevronLeft from "../assets/chevron_left_blue.svg";
import useFeedback from "./useFeedback";
import FeedbackCard from "../components/FeedbackCard";
import useCategories from "./useCategories";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NestedComments from "../components/NestedComments";
import useComments from "./useComments";
import { useCreateComment } from "./useCreateComment";

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
  margin-top: 2rem;
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
  cursor: pointer;
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
  height: 40rem;
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

const NestedCommentsContainer = styled.div`
  height: 62rem;
  overflow-y: scroll;
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
  const { id: feedbackId } = useParams();

  const {
    isLoading: isLoadingComments,
    comments: commentsFlat,
    error: errorComments,
  } = useComments();

  const [replyId, setReplyId] = useState("");
  const [comments, setComments] = useState({ children: {} });

  const [parentComment, setParentComment] = useState("");
  const [reply, setReply] = useState("");

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

  const { createComment, isLoading: isLoadingCreateComments } =
    useCreateComment();

  const goBack = () => {
    navigate("/feedbacks");
  };

  useEffect(() => {
    const recursivelyFillObject = (commentsFlatList, commentsObj) => {
      const currentLevelIds = Object.keys(commentsObj);

      if (currentLevelIds.length === 0) {
        return;
      }

      for (let i = 0; i < commentsFlatList.length; i++) {
        const currComment = commentsFlatList[i];
        if (currentLevelIds.includes(currComment.parent_comment_id)) {
          commentsObj[currComment.parent_comment_id].children[
            currComment.comment_id
          ] = {
            ...currComment,
            children: {},
          };
        } else {
          for (let j = 0; j < currentLevelIds.length; j++) {
            recursivelyFillObject(
              commentsFlatList,
              commentsObj[currentLevelIds[j]].children,
            );
          }
        }
      }
    };

    if (commentsFlat && commentsFlat.length) {
      const commentsFlatList = [...commentsFlat];

      let commentsObj = {};

      //1) Fill the top level comments
      for (let i = 0; i < commentsFlatList.length; i++) {
        const currComment = commentsFlatList[i];
        if (currComment.parent_comment_id === null) {
          commentsObj[currComment.comment_id] = {
            ...currComment,
            children: {},
          };
          commentsFlatList.splice(i, 1);
          i--;
        }
      }

      //2) Fill the nested comments recursively
      recursivelyFillObject(commentsFlatList, commentsObj);

      setComments({ children: { ...commentsObj } });
    }
  }, [commentsFlat]);

  const toggleReply = (id) => {
    setReplyId((prev) => {
      if (prev) {
        return "";
      } else {
        return id;
      }
    });
  };

  const postComment = () => {
    const data = {
      comment: parentComment,
    };

    createComment({ feedbackId, data });
    setParentComment("");
  };

  const postReply = () => {
    createComment({
      feedbackId,
      data: {
        comment: reply,
        parentId: replyId,
      },
    });
    toggleReply();
    setReply("");
  };

  if (isLoadingFeedback || isLoadingCategories) {
    return <Spinner />;
  }

  return (
    <FeedbackDetailsContainer>
      <StyledFeedbackContainer>
        <Header>
          <LeftContainer>
            <ChevronLeftImg src={ChevronLeft} />
            <GoBackText
              onClick={() => {
                goBack();
              }}
            >
              Go Back
            </GoBackText>
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
          <ContainerHeading>
            {commentsFlat?.length || 0} Comments
          </ContainerHeading>
          <NestedCommentsContainer>
            <NestedComments
              comments={comments.children}
              depth={0}
              isFirst={true}
              toggleReply={toggleReply}
              replyId={replyId}
              setReply={setReply}
              postReply={postReply}
            />
          </NestedCommentsContainer>
        </CommentBox>
        <AddCommentContainer>
          <ContainerHeading>Add Comment</ContainerHeading>
          <CommentArea
            placeholder="Type your comment here"
            onChange={(e) => {
              setParentComment(e.target.value);
            }}
            value={parentComment}
            maxLength={250}
          ></CommentArea>
          <BottomRow>
            <CharactersLeft>
              {250 - parentComment.length} Characters left
            </CharactersLeft>
            <PostCommentButton
              onClick={() => {
                postComment();
                setParentComment("");
              }}
            >
              Post Comment
            </PostCommentButton>
          </BottomRow>
        </AddCommentContainer>
      </StyledFeedbackContainer>
    </FeedbackDetailsContainer>
  );
}

export default FeedbackDetails;
