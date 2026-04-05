import { useState, useEffect } from "react";
import styled from "styled-components";
import ChevronLeft from "../assets/chevron_left_blue.svg";
import Plus from "../assets/plus_icon.svg";
import CategoryDropdown from "../components/CategoryDropdown";
import useCategories from "./useCategories";
import { useCreateFeedback } from "./useCreateFeedback";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const StyledAddFeedbackPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6.8rem;
  align-items: center;
  justify-content: center;
  margin-top: 9.2rem;
`;

const GoBackContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  width: 54rem;
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

const NewFeedbackModal = styled.div`
  width: 54rem;
  height: 65.7rem;
  border-radius: 1rem;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4.2rem;
  position: relative;
`;

const FeedbackModalTitle = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.333px;
`;

const FeedbackForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const FeedbackRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FeedbackRowTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const FeedbackRowTitle = styled.div`
  color: #3a4374;
  font-family: Jost;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.194px;
`;

const FeedbackRowDescription = styled.div`
  color: #647196;
  font-family: Jost;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Input = styled.input`
  font-family: "Jost";
  border-radius: 0.8rem;
  border: ${(props) => (props.error ? "1px solid #EC5757" : "none")};
  background-color: #f7f8fd;
  padding: 1.2rem 1rem;
`;

const TextArea = styled.textarea`
  font-family: "Jost";
  border-radius: 0.8rem;
  border: ${(props) => (props.error ? "1px solid #EC5757" : "none")};
  background-color: #f7f8fd;
  padding: 1.2rem 1rem;
  height: 9.6rem;
  resize: none;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.6rem;
  justify-content: flex-end;
  margin-top: 3.2rem;
`;

const CancelButton = styled.button`
  all: initial;
  font-family: Jost;
  gap: 0.8rem;
  padding: 1.25rem 2.4rem;
  border-radius: 1rem;
  background: #3a4374;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

const AddFeedbackButton = styled.button`
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

const PlusIcon = styled.img`
  height: 5.6rem;
  position: absolute;
  top: -2.8rem;
  left: 4.2rem;
`;

function AddFeedback() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const {
    isLoading: isLoadingCategories,
    categories,
    error: errorCategories,
  } = useCategories();

  const { createFeedback, isLoading: isLoadingFeedbacks } = useCreateFeedback();

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    if (categories && categories.length) {
      setSelectedCategory({
        value: 1,
        label: categories[0].category_name,
        id: categories[0].category_id,
      });
    }
  }, [categories]);

  const onSubmit = (data) => {
    //Keep an empty function, since we are dealing with multiple buttons in a form
  };

  const goBack = () => {
    navigate("/feedbacks");
  };

  const saveAndSend = (data) => {
    const { title, description } = data;
    const dataToSend = {
      title,
      description,
      upvote_count: 0,
      comment_count: 0,
      category_id: selectedCategory.id,
    };

    createFeedback({ data: dataToSend });
  };

  return (
    <StyledAddFeedbackPage>
      <GoBackContainer
        onClick={() => {
          navigate("/feedbacks");
        }}
      >
        <ChevronLeftImg src={ChevronLeft} />
        <GoBackText>Go Back</GoBackText>
      </GoBackContainer>
      <NewFeedbackModal>
        <FeedbackModalTitle>Create New Feedback</FeedbackModalTitle>
        <FeedbackForm onSubmit={handleSubmit(onSubmit)}>
          <FeedbackRow>
            <FeedbackRowTop>
              <FeedbackRowTitle>Feedback Title</FeedbackRowTitle>
              <FeedbackRowDescription>
                Add a short, descriptive headline
              </FeedbackRowDescription>
            </FeedbackRowTop>
            <Input
              type="text"
              id="title"
              {...register("title", {
                required: "This field is required",
              })}
              error={errors?.title?.message?.toString()}
            ></Input>
          </FeedbackRow>
          <FeedbackRow>
            <FeedbackRowTop>
              <FeedbackRowTitle>Category</FeedbackRowTitle>
              <FeedbackRowDescription>
                Choose a category for your feedback
              </FeedbackRowDescription>
            </FeedbackRowTop>
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isLoading={isLoadingCategories}
              options={categories.map((cat, i) => {
                return {
                  value: i + 1,
                  label: cat.category_name,
                  id: cat.category_id,
                };
              })}
            />
          </FeedbackRow>
          <FeedbackRow>
            <FeedbackRowTop>
              <FeedbackRowTitle>Feedback Detail</FeedbackRowTitle>
              <FeedbackRowDescription>
                Include any specific comments on what should be improved, added,
                etc.
              </FeedbackRowDescription>
            </FeedbackRowTop>
            <TextArea
              type="text"
              id="description"
              {...register("description", {
                required: "This field is required",
              })}
              error={errors?.title?.message?.toString()}
            ></TextArea>
          </FeedbackRow>
          <ButtonRow>
            <CancelButton onClick={goBack}>Cancel</CancelButton>
            <AddFeedbackButton
              type="submit"
              onClick={handleSubmit(saveAndSend)}
            >
              Add Feedback
            </AddFeedbackButton>
          </ButtonRow>
        </FeedbackForm>
        <PlusIcon src={Plus} />
      </NewFeedbackModal>
    </StyledAddFeedbackPage>
  );
}

export default AddFeedback;
