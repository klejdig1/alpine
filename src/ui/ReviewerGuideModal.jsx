import styled from "styled-components";
import Heading from "./Heading.jsx";
import { portfolioConfig } from "../config/portfolio.js";
import { HiOutlineCheckCircle, HiOutlineCodeBracket, HiOutlineSparkles } from "react-icons/hi2";

const GuideContainer = styled.div`
  max-width: 65rem;
  max-height: 80vh;
  overflow-y: auto;
  padding: 0.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-300);
    border-radius: 3px;
  }
`;

const IntroBox = styled.div`
  background: var(--color-brand-50);
  border: 1px solid var(--color-brand-200);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  color: var(--color-brand-800);
  font-size: 1.4rem;
  line-height: 1.6;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-700);
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TechCard = styled.div`
  background: var(--color-grey-50);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & strong {
    font-size: 1.4rem;
    color: var(--color-brand-600);
  }

  & span {
    font-size: 1.2rem;
    color: var(--color-grey-500);
    line-height: 1.4;
  }
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
`;

const FeatureItem = styled.li`
  font-size: 1.3rem;
  color: var(--color-grey-600);
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;

  & svg {
    color: var(--color-green-700);
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }
`;

function ReviewerGuideModal() {
  return (
    <GuideContainer>
      <div>
        <Heading as="h2">Project Architecture & Features</Heading>
        <p style={{ color: "var(--color-grey-500)", fontSize: "1.4rem", marginTop: "0.4rem" }}>
          The Alpine Haven — Luxury Resort Management Dashboard (Portfolio Edition)
        </p>
      </div>

      <IntroBox>
        <strong>⚡ 100% Zero-Friction & Ephemeral Sandbox:</strong>
        <p style={{ marginTop: "0.4rem" }}>
          Feel free to test creating cabins, modifying bookings, or editing settings. All changes update live across the dashboard and tables, and automatically restore to original defaults upon page refresh.
        </p>
      </IntroBox>

      <Section>
        <SectionTitle>
          <HiOutlineCodeBracket /> Key Architecture & Tech Stack
        </SectionTitle>
        <TechGrid>
          {portfolioConfig.techStack.map((tech) => (
            <TechCard key={tech.name}>
              <strong>{tech.name}</strong>
              <span>{tech.desc}</span>
            </TechCard>
          ))}
        </TechGrid>
      </Section>

      <Section>
        <SectionTitle>
          <HiOutlineSparkles /> Implemented Capabilities to Review
        </SectionTitle>
        <FeatureList>
          {portfolioConfig.keyFeatures.map((feat, idx) => (
            <FeatureItem key={idx}>
              <HiOutlineCheckCircle />
              <span>{feat}</span>
            </FeatureItem>
          ))}
        </FeatureList>
      </Section>
    </GuideContainer>
  );
}

export default ReviewerGuideModal;
