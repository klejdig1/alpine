import styled from "styled-components";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton.jsx";

const StyledTodayItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  font-size: 1.4rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  flex-wrap: wrap;

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1 1 auto;
  min-width: 14rem;
`;

const Guest = styled.div`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-shrink: 0;

  & span {
    font-size: 1.3rem;
    color: var(--color-grey-500);
  }
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      <LeftSide>
        {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
        {status === "checked-in" && <Tag type="blue">Departing</Tag>}
        {guests?.countryFlag && (
          <Flag src={guests.countryFlag} alt={`Flag of ${guests.countryFlag}`} />
        )}
        <Guest>{guests?.fullName}</Guest>
      </LeftSide>

      <RightSide>
        <span>{numNights} nights</span>
        {status === "unconfirmed" && (
          <Button size="small" variation="primary" as={Link} to={`/checkin/${id}`}>
            Check in
          </Button>
        )}
        {status === "checked-in" && <CheckoutButton bookingId={id} />}
      </RightSide>
    </StyledTodayItem>
  );
}

export default TodayItem;
