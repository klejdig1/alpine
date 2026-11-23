import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const EmblemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05));
`;

const BrandTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.22rem;
  text-transform: uppercase;
  color: var(--color-grey-800);
  margin-top: 1rem;
  font-family: "Poppins", sans-serif;
  line-height: 1.2;
`;

const BrandSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.28rem;
  text-transform: uppercase;
  color: var(--color-brand-600);
  margin-top: 0.3rem;
  line-height: 1;
`;

function Logo() {
  return (
    <StyledLogo to="/dashboard">
      <EmblemWrapper>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="peakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand-500)" />
              <stop offset="100%" stopColor="var(--color-brand-700)" />
            </linearGradient>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Background rounded badge */}
          <rect
            width="64"
            height="64"
            rx="18"
            fill="var(--color-brand-50)"
          />

          {/* Morning Sun */}
          <circle cx="44" cy="22" r="7.5" fill="url(#sunGrad)" opacity="0.95" />

          {/* Distant Peak */}
          <path
            d="M22 20L38 48H6L22 20Z"
            fill="var(--color-brand-200)"
          />

          {/* Primary Majestic Mountain */}
          <path
            d="M36 15L56 48H16L36 15Z"
            fill="url(#peakGrad)"
          />

          {/* Snowcap crest */}
          <path
            d="M36 15L42 25L38 23.5L36 26.5L34 23.5L30 25L36 15Z"
            fill="var(--color-grey-0)"
          />

          {/* Forest Pine tree in foreground */}
          <path
            d="M26 36L29 42H23L26 36Z"
            fill="var(--color-green-700)"
          />
          <path
            d="M26 40L30.5 48H21.5L26 40Z"
            fill="var(--color-green-700)"
          />
        </svg>
      </EmblemWrapper>

      <BrandTitle>ALPINE HAVEN</BrandTitle>
      <BrandSubtitle>LUXURY CHALETS & RESORT</BrandSubtitle>
    </StyledLogo>
  );
}

export default Logo;
