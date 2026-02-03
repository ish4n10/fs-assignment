"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import {
  ResumePage,
  CompanyPage,
  JobDetailPage,
  NotificationPreferencesPage,
  PlanSelectionPage,
} from "@/app/components/landingPage";

const STEPS = [
  {
    id: 1,
    question: "👋 Hey, What can I call you?",
    placeholder: "John Doe",
    key: "name" as const,
  },
  {
    id: 2,
    question: (name: string) => (
      <>
        Nice to meet you{" "}
        <span className={cssSheets.highlight}>
          {name || "—"}
        </span>
        , what specific role are you looking for?
      </>
    ),
    placeholder: "",
    key: "role" as const,
  },
  {
    id: 3,
    question: "Okay what is your experience? ⭐",
    placeholder: "Product manager roles in bangalore less than 3 years experience",
    key: "experience" as const,
  },
  {
    id: 4,
    question: "What is your company preference",
    placeholder: "Startups in Fintech",
    key: "company" as const,
  },
] as const;

function TopIcon() {
  return (
    <div className={cssSheets.iconBox} aria-hidden>
      <img
        src="/Group-117.svg"
        alt=""
        // width={161}
        height={116}
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export default function LandingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [currentInput, setCurrentInput] = useState("");
  const [viewState, setViewState] = useState<"onboarding" | "resume" | "company">("onboarding");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [showNotificationPreferences, setShowNotificationPreferences] = useState(false);
  const [showPlanSelection, setShowPlanSelection] = useState(false);

  const currentStepConfig = STEPS[step - 1];

  const displayTag = () => {
    if (step === 3) return role ? `${role}` : null;
    if (step === 4) return [role, experience].filter(Boolean).join(" ") || null;
    return null;
  };

  const canProceed = () => {
    const v = currentInput.trim();
    if (step === 1) return v.length > 0;
    if (step === 2) return v.length > 0;
    return true;
  };

  const handleEnter = useCallback(() => {
    const v = currentInput.trim();
    if (step === 1) {
      setName(v);
      setCurrentInput("");
      setStep(2);
    } else if (step === 2) {
      setRole(v);
      setCurrentInput("");
      setStep(3);
    } else if (step === 3) {
      setExperience(v);
      setCurrentInput("");
      setStep(4);
    } else if (step === 4) {
      setCompany(v);
      setCurrentInput("");
      setViewState("resume");
    }
  }, [step, currentInput]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (canProceed()) handleEnter();
    }
  };

  const tag = displayTag();

  if (viewState === "resume") {
    return (
      <ResumePage
        role={role}
        experience={experience}
        onResumeUploaded={() => setViewState("company")}
      />
    );
  }

  if (viewState === "company") {
    if (selectedJobId && showPlanSelection) {
      return (
        <PlanSelectionPage
          onContinue={() => {
            setShowPlanSelection(false);
            setSelectedJobId(null);
          }}
        />
      );
    }
    if (selectedJobId && showNotificationPreferences) {
      return (
        <NotificationPreferencesPage
          onContinue={() => {
            setShowNotificationPreferences(false);
            setShowPlanSelection(true);
          }}
        />
      );
    }
    if (selectedJobId) {
      return (
        <JobDetailPage
          jobId={selectedJobId}
          totalJobsCount={242}
          onBack={() => setSelectedJobId(null)}
          onApplyClick={() => setShowNotificationPreferences(true)}
        />
      );
    }
    return (
      <CompanyPage
        totalJobsCount={242}
        onJobClick={(job) => setSelectedJobId(job.id)}
      />
    );
  }

  return (
    <div className={cssSheets.wrap}>
      <main className={cssSheets.main}>
        <TopIcon />

        <article className={cssSheets.card}>
          <div className={cssSheets.cardInner}>
            <div className={cssSheets.block}>
              {tag && (
                <div className={cssSheets.center}>
                  <span className={cssSheets.pill}>{tag}</span>
                </div>
              )}
              <h2 className={cssSheets.title}>
                {typeof currentStepConfig.question === "function"
                  ? currentStepConfig.question(name)
                  : currentStepConfig.question}
              </h2>
              <div className={cssSheets.center}>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={currentStepConfig.placeholder}
                  className={cssSheets.inp}
                  aria-label={
                    step === 1 ? "Your name" : step === 2 ? "Role" : step === 3 ? "Experience" : "Company preference"
                  }
                  autoFocus
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={cssSheets.btnWrap}>
              <button
                type="button"
                onClick={handleEnter}
                disabled={!canProceed()}
                className={cssSheets.btn}
              >
                Enter
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

export const cssSheets = {
  wrap:
    "min-h-screen min-h-dvh w-full flex flex-col items-center justify-start overflow-auto px-3 py-6 pb-16 sm:py-8 sm:pb-8 " +
    "bg-gradient-to-b from-neutral-200 via-[#e5e4e8] to-neutral-200",
  main: "flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg flex-shrink-0 px-1",
  card:
    "w-full max-w-[calc(100vw-1.5rem)] rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/80 overflow-hidden backdrop-blur-sm " +
    "shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)]",
  cardInner: "flex flex-col p-5 sm:p-8 sm:p-10",
  block: "flex flex-col gap-4 sm:gap-5 text-center",
  center: "flex justify-center",
  pill: "inline-block rounded-full bg-purple-600/15 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-purple-600",
  title: "text-lg sm:text-xl md:text-2xl font-medium text-zinc-800 leading-snug px-1",
  inp:
    "w-full max-w-md border-0 border-b border-zinc-300 bg-transparent px-0 pb-2 text-center " +
    "text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none focus:ring-0 text-base sm:text-lg min-h-[44px]",
  btnWrap: "mt-6 sm:mt-8 flex justify-center",
  btn:
    "min-w-[140px] min-h-[48px] rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 px-6 py-3 text-base font-semibold " +
    "text-white shadow-md hover:from-zinc-600 hover:to-zinc-800 focus:outline-none focus:ring-2 " +
    "focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation",
  highlight: "text-purple-600 font-medium",
  iconBox:
    "flex shrink-0 items-center justify-center rounded-lg border border-black/20 bg-white shadow-sm p-1",
}; 