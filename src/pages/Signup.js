import styled from "styled-components";
import CompanyImg from "../assets/company_logo.svg";
import Envelop from "../assets/envelop.svg";
import Lock from "../assets/lock.svg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.1rem;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CompanyLogo = styled.img`
  height: 4rem;
  width: 4rem;
  filter: invert(98%);
`;

const CompanyName = styled.div`
  font-size: 28px;
  font-weight: bold;
  font-family: "Jost";
`;

const FormStructure = styled.div`
  height: 48.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const TitleHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: flex-start;
  justify-content: flex-start;
  width: 39.6rem;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  font-family: "Jost";
  color: #333333;
`;

const Subtitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: #737373;
  font-family: "Jost";
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 39.6rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
`;

const Label = styled.label`
  font-family: "Jost";
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => (props.error ? "#EC5757" : "#333333")};
`;

const Input = styled.input`
  font-family: "Jost";
  border-radius: 0.8rem;
  border: ${(props) =>
    props.error ? "1px solid #EC5757" : "1px solid #d9d9d9"};
  backgroud: #fff;
  padding: 1.2rem 3.5rem;
`;

const FieldImg = styled.img`
  position: absolute;
  top: 3.7rem;
  left: 1.6rem;
`;

const PasswordCriteriaText = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  color: #737373;
`;

const SignupButton = styled.button`
  all: initial;
  gap: 0.8rem;
  opacity: 1;
  border-radius: 0.8rem;
  padding: 1.3rem 2.7rem;
  background-color: #633cff;
  display: flex;
  align-item: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const BotomLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  color: #737373;
`;

const BottomLink = styled.a`
  font-size: 1.6rem;
  font-weight: 400;
  color: #633cff;
  cursor: pointer;
`;

function Signup() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { signup, isLoading } = useSignup();
  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, password, passwordConfirm } = data;
    signup({ email, password, passwordConfirm });
  }

  return (
    <FormContainer>
      <LoginForm>
        <Header>
          <CompanyLogo src={CompanyImg} />
          <CompanyName>Product Feedback</CompanyName>
        </Header>
        <FormStructure>
          <TitleHeader>
            <Title>Create Account</Title>
            <Subtitle>
              Let's get you started posting and upvoting feedbacks!
            </Subtitle>
          </TitleHeader>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <Label error={errors?.email?.message?.toString()}>
                Email address
              </Label>
              <Input
                placeholder="e.g. alex@email.com"
                type="email"
                id="email"
                {...register("email", {
                  required: "Can't be empty",
                })}
                error={errors?.email?.message?.toString()}
              ></Input>
              <FieldImg src={Envelop}></FieldImg>
            </FormRow>
            <FormRow>
              <Label error={errors?.password?.message?.toString()}>
                Create password
              </Label>
              <Input
                placeholder="Atleast 8 characters"
                type="password"
                id="password"
                {...register("password", {
                  required: "Please check again!",
                })}
                error={errors?.password?.message?.toString()}
              ></Input>
              <FieldImg src={Lock}></FieldImg>
            </FormRow>
            <FormRow>
              <Label>Confirm password</Label>
              <Input
                placeholder="Atleast 8 characters"
                type="password"
                id="passwordConfirm"
                {...register("passwordConfirm", {
                  required: "Passwords should match!",
                })}
                error={errors?.passwordConfirm?.message?.toString()}
              ></Input>
              <FieldImg src={Lock}></FieldImg>
            </FormRow>
            <FormRow>
              <PasswordCriteriaText>
                Password must contain atleast 8 characters
              </PasswordCriteriaText>
            </FormRow>
            <FormRow>
              <SignupButton>Create new account</SignupButton>
            </FormRow>
            <FormRow>
              <BottomContainer>
                <BotomLabel>Already have an account?</BotomLabel>
                <BottomLink
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </BottomLink>
              </BottomContainer>
            </FormRow>
          </Form>
        </FormStructure>
      </LoginForm>
    </FormContainer>
  );
}

export default Signup;
