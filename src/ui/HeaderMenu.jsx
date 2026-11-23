import styled from "styled-components";
import ButtonIcon from "./ButtonIcon.jsx";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle.jsx";
import { Modal } from "./Modal.jsx";
import ReviewerGuideModal from "./ReviewerGuideModal.jsx";
import { HiOutlineInformationCircle, HiArrowPath } from "react-icons/hi2";
import { resetLocalData } from "../services/localBackend.js";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleReset() {
    resetLocalData();
    queryClient.invalidateQueries();
    toast.success("Demo data reset to default! 🔄");
  }

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")} title="Account Profile">
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <DarkModeToggle />
      </li>

      <li>
        <Modal>
          <Modal.Open opens="guide">
            <ButtonIcon title="Project & Tech Stack Guide">
              <HiOutlineInformationCircle />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="guide">
            <ReviewerGuideModal />
          </Modal.Window>
        </Modal>
      </li>

      <li>
        <ButtonIcon onClick={handleReset} title="Reset Demo Data">
          <HiArrowPath />
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
