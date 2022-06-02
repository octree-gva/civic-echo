import type { NextPage } from "next";
import { useReducer, useMemo, useRef } from "react";
import Box from "@mui/material/Box";
import Topbar from "../../containers/Topbar";
import * as pageUtils from "../../lib/pageUtils";
import usePersonStore from "../../stores/person";
import Email from "../../containers/Questions/Email";
import Npa from "../../containers/Questions/Npa";
import { useRouter } from "next/router";
import Wrapper from "../../containers/Questions/Wrapper";

const ANIMATE_CLASSES =
  "animate__animated animate__faster animate__fadeInRight";
const ANIMATE_ANIMATION_CLASS = "animate__fadeOutLeft";
const STEPS = [Email, Npa];

interface Props {}

const PersonalPage: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const cardRef = useRef();
  const [stepIndex, nextStepIndex] = useReducer(i => i + 1, 0);
  const person = usePersonStore(s => s.person);
  const Steps = useMemo(
    () =>
      STEPS.filter((step, index) => {
        if (index === 0 && person.email) return false;
        else if (index === 1 && person.npa) return false;
        else return true;
      }),
    []
  ); // eslint-disable-line react-hooks/exhaustive-deps
  const CurrentStep = Steps[stepIndex];

  const onNextStep = () => {
    if (stepIndex < Steps.length - 1) {
      cardRef.current?.classList.add(ANIMATE_ANIMATION_CLASS);
      setTimeout(() => {
        nextStepIndex();
        cardRef.current?.classList.remove(ANIMATE_ANIMATION_CLASS);
      }, 500);
    } else router.push(`/${router.query.lang}/send${window.location.search}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: { md: "secondary.light" } }}
      minHeight="100vh"
    >
      <Topbar />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Wrapper ref={cardRef} className={ANIMATE_CLASSES}>
          <CurrentStep onNext={onNextStep} />
        </Wrapper>
      </Box>
    </Box>
  );
};

export const getStaticProps = pageUtils.getStaticProps;
export const getStaticPaths = pageUtils.getStaticPaths;

export default PersonalPage;
