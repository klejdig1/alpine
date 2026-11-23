import styled from "styled-components";
import { HiOutlineSparkles, HiArrowPath } from "react-icons/hi2";
import { resetLocalData } from "../services/localBackend.js";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Modal } from "./Modal.jsx";
import ReviewerGuideModal from "./ReviewerGuideModal.jsx";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const CreditsBox = styled.div`
  margin-top: auto;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-brand-600);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;

const Subtitle = styled.div`
  font-size: 1.1rem;
  color: var(--color-grey-500);
  line-height: 1.3;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.4rem;
  flex-wrap: wrap;
`;

const SmallButton = styled.button`
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 0.6rem 0.8rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-grey-600);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.2s;

  &:hover {
    background: var(--color-grey-100);
    color: var(--color-grey-800);
  }
`;

function DeveloperCredits() {
  const queryClient = useQueryClient();

  function handleReset() {
    resetLocalData();
    queryClient.invalidateQueries();
    toast.success("Demo database reset to original sample data! 🔄");
  }

  return (
    <CreditsBox>
      <Title>
        <HiOutlineSparkles /> Portfolio Showcase
      </Title>
      <Subtitle>Interactive Sandbox • Auto-resets on refresh</Subtitle>

      <ActionRow>
        <Modal>
          <Modal.Open opens="guide">
            <SmallButton title="View tech stack and features">
              <HiOutlineInformationCircle /> Architecture
            </SmallButton>
          </Modal.Open>
          <Modal.Window name="guide">
            <ReviewerGuideModal />
          </Modal.Window>
        </Modal>

        <SmallButton onClick={handleReset} title="Reset demo database">
          <HiArrowPath /> Reset Data
        </SmallButton>
      </ActionRow>
    </CreditsBox>
  );
}

export default DeveloperCredits;
