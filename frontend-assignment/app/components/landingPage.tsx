"use client";

import { useState, useCallback } from "react";
import mockData from "../mock-data.json";

export const landingPageStyles = {
  fullPageDarkWrapper:
    "min-h-screen min-h-dvh w-full flex flex-col items-center justify-start overflow-y-auto bg-[#2d2d2d] text-zinc-100 px-3 py-6 pb-16 sm:px-4 sm:py-8 sm:pb-8",
  headerRow: "w-full max-w-2xl flex items-center justify-between mb-4 sm:mb-6 px-2",
  pageTitle: "text-base sm:text-lg font-medium text-zinc-200",
  devModeBadge: "flex h-6 w-6 items-center justify-center rounded bg-emerald-500/20 text-emerald-400 text-xs",
  centeredIconAboveCard: "flex justify-center mb-3 sm:mb-4",
  topIconBox:
    "flex shrink-0 items-center justify-center rounded-lg border border-zinc-500/40 bg-zinc-700/50 shadow-sm p-1",
  contentCard:
    "w-full max-w-[calc(100vw-1.5rem)] sm:max-w-2xl rounded-xl sm:rounded-2xl bg-zinc-100 border border-zinc-300/80 overflow-hidden shadow-xl",
  contentCardInner: "flex flex-col p-5 sm:p-8 sm:p-10",
  filterPillResume: "inline-block rounded-full bg-rose-500/20 text-rose-600 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium",
  filterPillJob: "inline-block rounded-full bg-purple-600/15 text-purple-600 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium",
  headlineDark: "text-lg sm:text-xl md:text-2xl font-semibold text-zinc-800 leading-tight",
  subtextMuted: "text-sm sm:text-base text-zinc-600 mt-1",
  centerContent: "flex flex-col items-center justify-center text-center px-1",
  primaryButton:
    "min-w-[140px] min-h-[48px] rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 px-6 py-3 text-base font-semibold " +
    "text-white shadow-md hover:from-zinc-600 hover:to-zinc-800 focus:outline-none focus:ring-2 " +
    "focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 transition-all touch-manipulation",
  jobsCountText: "text-zinc-500 text-xs sm:text-sm text-center mb-3 sm:mb-4",
  jobCardList: "flex flex-col gap-3 w-full",
  jobCard:
    "rounded-xl bg-zinc-100 border border-zinc-300/80 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 shadow-sm w-full",
  jobCardAvatar:
    "h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white",
  jobCardBody: "flex-1 min-w-0",
  jobTitle: "text-sm sm:text-base font-semibold text-zinc-800",
  jobTitleHighlight: "text-purple-600",
  companyName: "text-xs sm:text-sm text-zinc-600 mt-0.5",
  jobMetaRow: "flex flex-wrap items-center gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500",
  applyButtonWrapper: "shrink-0 flex flex-col items-stretch sm:items-end gap-1",
  applyButton:
    "rounded-lg bg-zinc-800 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white min-h-[44px] hover:bg-zinc-700 flex items-center justify-center gap-2 touch-manipulation",
  postedAgo: "text-xs text-zinc-400",
  dragDropZone:
    "mt-4 sm:mt-6 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 py-6 sm:py-10 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-400 transition-colors min-h-[100px]",
  dragDropIcon: "text-zinc-400",
  dragDropLabel: "text-xs sm:text-sm text-zinc-500",
};

export const lightPageStyles = {
  wrap:
    "min-h-screen min-h-dvh w-full flex flex-col items-center justify-start overflow-auto px-3 py-6 pb-16 sm:px-4 sm:py-8 sm:pb-8 " +
    "bg-gradient-to-b from-neutral-200 via-[#e5e4e8] to-neutral-200",
  jobsPageWrap:
    "h-dvh min-h-dvh w-full flex flex-col items-center overflow-hidden px-3 py-6 pb-4 sm:px-4 sm:py-8 " +
    "bg-gradient-to-b from-neutral-200 via-[#e5e4e8] to-neutral-200",
  main: "flex flex-col items-center gap-4 sm:gap-6 w-full max-w-lg flex-shrink-0 px-1",
  mainWide: "flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl flex-shrink-0 px-2 sm:px-4",
  mainWideScrollable:
    "flex flex-col items-center gap-4 sm:gap-6 w-full max-w-2xl flex-1 min-h-0 px-2 sm:px-4",
  jobCardListScroll:
    "flex flex-col gap-3 w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden [-webkit-overflow-scrolling:touch]",
  card:
    "w-full max-w-[calc(100vw-1.5rem)] sm:max-w-none rounded-xl sm:rounded-2xl bg-white/95 border border-zinc-200/80 overflow-hidden backdrop-blur-sm " +
    "shadow-[0_4px_24px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)]",
  cardInner: "flex flex-col p-5 sm:p-8 sm:p-10",
  centerContent: "flex flex-col items-center justify-center text-center px-1",
  filterPillPurple: "inline-block rounded-full bg-purple-600/15 text-purple-600 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium",
  headline: "text-lg sm:text-xl md:text-2xl font-semibold text-zinc-800 leading-tight",
  subtext: "text-sm sm:text-base text-zinc-600 mt-1",
  subtextBold: "font-semibold text-zinc-800",
  primaryButton:
    "min-w-[140px] min-h-[48px] rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 px-6 py-3 text-base font-semibold " +
    "text-white shadow-md hover:from-zinc-600 hover:to-zinc-800 focus:outline-none focus:ring-2 " +
    "focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 transition-all touch-manipulation",
  iconBox: "flex justify-center mb-3 sm:mb-4",
  iconBoxInner: "flex shrink-0 items-center justify-center rounded-lg border border-black/20 bg-white shadow-sm p-1",
  jobsCountText: "text-zinc-500 text-xs sm:text-sm text-center mb-3 sm:mb-4",
  jobCardList: "flex flex-col gap-3 w-full",
  jobCard:
    "rounded-xl bg-white/95 border border-zinc-200/80 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 shadow-sm w-full",
  jobCardAvatar:
    "h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white",
  jobCardBody: "flex-1 min-w-0",
  jobTitle: "text-sm sm:text-base font-semibold text-zinc-800",
  jobTitleHighlight: "text-purple-600",
  companyName: "text-xs sm:text-sm text-zinc-600 mt-0.5",
  jobMetaRow: "flex flex-wrap items-center gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-500",
  applyButtonWrapper: "shrink-0 flex flex-col items-stretch sm:items-end gap-1",
  applyButton:
    "rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white min-h-[44px] hover:from-zinc-600 hover:to-zinc-800 flex items-center justify-center gap-2 touch-manipulation",
  postedAgo: "text-xs text-zinc-400",
  dragDropZone:
    "mt-4 sm:mt-6 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 py-6 sm:py-10 px-4 sm:px-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-400 transition-colors min-h-[120px]",
  dragDropLabel: "text-xs sm:text-sm text-zinc-500",
  detailBackLink: "text-xs sm:text-sm text-zinc-600 hover:text-zinc-800 underline mb-2 inline-block touch-manipulation",
  detailSectionHeading: "text-sm sm:text-base font-semibold text-zinc-800 mt-4 sm:mt-6 mb-2",
  detailBodyText: "text-xs sm:text-sm text-zinc-600 leading-relaxed",
  detailList: "list-disc list-inside text-xs sm:text-sm text-zinc-600 space-y-1 ml-2",
  skillPill: "rounded-full px-2 py-0.5 sm:px-3 sm:py-1 text-xs font-medium",
  notificationCard:
    "w-full max-w-[calc(100vw-1.5rem)] sm:max-w-none rounded-xl sm:rounded-2xl bg-white overflow-hidden shadow-lg " +
    "border-l-4 border-t-4 border-l-blue-500 border-t-blue-500 border-r border-b border-zinc-200",
  notificationDropdown:
    "w-full max-w-md mt-4 rounded-lg border border-zinc-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-zinc-800 min-h-[44px] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
  planModal:
    "box-border w-full max-w-[1048px] rounded-2xl sm:rounded-3xl border-0 p-4 sm:p-6 md:p-8 flex flex-col items-center " +
    "bg-white/60 backdrop-blur-[40px] shadow-xl",
  planOptionsRow: "flex flex-col md:flex-row gap-4 sm:gap-6 w-full mt-4 sm:mt-6",
  planCard:
    "box-border flex-1 min-w-0 rounded-2xl sm:rounded-3xl border-2 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center min-h-0 md:min-h-[320px] " +
    "bg-white/40 backdrop-blur-sm w-full md:w-auto",
  planCardBlue: "border-blue-500",
  planCardGreen: "border-green-500",
  planCardIcon: "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg border-2 border-zinc-800 bg-white mb-3 sm:mb-4",
  planCardIconDark: "flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-zinc-800 mb-3 sm:mb-4",
  planPrice: "text-xl sm:text-2xl font-bold text-zinc-800",
  planBenefit: "text-xs sm:text-sm text-zinc-600 mt-1 sm:mt-2",
};

const NOTIFICATION_FREQUENCY_OPTIONS = mockData.notificationFrequencyOptions as readonly string[];


function LandingTopIcon() {
  return (
    <div className={landingPageStyles.centeredIconAboveCard}>
      <div className={landingPageStyles.topIconBox} aria-hidden>
        <img
          src="/Group-117.svg"
          alt=""
          // width={161}
          height={116}
          className="h-12 w-auto object-contain"
        />
      </div>
    </div>
  );
}

function LightTopIcon() {
  return (
    <div className={lightPageStyles.iconBox}>
      <div className={lightPageStyles.iconBoxInner} aria-hidden>
        <img
          src="/Group-117.svg"
          alt=""
          // width={161}
          height={116}
          className="h-12 w-auto object-contain"
        />
      </div>
    </div>
  );
}

function NotificationBellIcon() {
  return (
    <div className="flex justify-center mb-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-zinc-800 bg-white shadow-sm"
        aria-hidden
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-800"
          aria-hidden
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
    </div>
  );
}

function RupeeTopIcon() {
  return (
    <div className="flex justify-center mb-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-zinc-800 bg-white shadow-sm overflow-hidden"
        aria-hidden
      >
        <img src="/rupeeicon.svg" alt="" className="h-6 w-auto object-contain" />
      </div>
    </div>
  );
}

type JobListingItem = {
  id: string;
  companyDisplayName: string;
  companyInitials: string;
  companyAvatarBgColor: string;
  jobTitleFull: string;
  jobTitleHighlightPart: string;
  locationOrWorkType: string;
  experienceRange: string;
  applyButtonLabel: string;
  applyButtonIcon: "web" | "linkedin";
  postedTimeAgo: string;
};

export type JobDetail = JobListingItem & {
  skillTags: string[];
  applyButtonFullLabel: string;
  aboutTheRole: string;
  keyResponsibilities: string[];
  mustHaveSkills: string[];
};

const mockJobList: JobListingItem[] = mockData.jobList as JobListingItem[];

export const mockJobDetails: Record<string, JobDetail> = mockData.jobDetails as Record<string, JobDetail>;

type JobCardProps = {
  companyDisplayName: string;
  companyInitials: string;
  companyAvatarBgColor: string;
  jobTitleFull: string;
  jobTitleHighlightPart: string;
  locationOrWorkType: string;
  experienceRange: string;
  applyButtonLabel: string;
  applyButtonIcon: "web" | "linkedin";
  postedTimeAgo: string;
  onApply: () => void;
  onJobClick?: () => void;
  useLightStyles?: boolean;
};

function JobCard({
  companyDisplayName,
  companyInitials,
  companyAvatarBgColor,
  jobTitleFull,
  jobTitleHighlightPart,
  locationOrWorkType,
  experienceRange,
  applyButtonLabel,
  applyButtonIcon,
  postedTimeAgo,
  onApply,
  onJobClick,
  useLightStyles = false,
}: JobCardProps) {
  const titleBeforeHighlight = jobTitleFull.replace(jobTitleHighlightPart, "").trim();
  const showHighlight = jobTitleHighlightPart.length > 0;
  const s = useLightStyles ? lightPageStyles : landingPageStyles;

  return (
    <article
      className={`${s.jobCard} ${onJobClick ? "cursor-pointer" : ""}`}
      role={onJobClick ? "button" : undefined}
      tabIndex={onJobClick ? 0 : undefined}
      onClick={onJobClick}
      onKeyDown={(e) => {
        if (onJobClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onJobClick();
        }
      }}
    >
      <div className={`${s.jobCardAvatar} ${companyAvatarBgColor}`}>
        {companyInitials}
      </div>
      <div className={s.jobCardBody}>
        <h3 className={s.jobTitle}>
          {titleBeforeHighlight}
          {showHighlight && (
            <span className={s.jobTitleHighlight}> {jobTitleHighlightPart}</span>
          )}
        </h3>
        <p className={s.companyName}>{companyDisplayName}</p>
        <div className={s.jobMetaRow}>
          <span aria-label="Location or work type">{locationOrWorkType}</span>
          <span aria-hidden>·</span>
          <span aria-label="Experience">{experienceRange}</span>
        </div>
      </div>
      <div
        className={s.applyButtonWrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onApply();
          }}
          className={s.applyButton}
          aria-label={`Apply to ${jobTitleFull} at ${companyDisplayName}`}
        >
          {applyButtonIcon === "linkedin" && <span className="text-xs">in</span>}
          {applyButtonIcon === "web" && <span className="text-xs">W:</span>}
          {applyButtonLabel}
        </button>
        <span className={s.postedAgo}>{postedTimeAgo}</span>
      </div>
    </article>
  );
}


type ResumeUploadCardProps = {
  currentFilterLabel: string;
  fileInputId?: string;
};

function ResumeUploadCard({ currentFilterLabel, fileInputId = "resume-file-input" }: ResumeUploadCardProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const headlineText = "Drop your resume";
  const subtextText = "I'll map your skills, roles, and companies.";
  const dragDropPlaceholderText = "Drag & drop here";
  const uploadButtonLabel = "Upload";

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setSelectedFile(fileList[0]);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const onUploadClick = useCallback(() => {
    if (selectedFile) {
      console.log("Uploading:", selectedFile.name);
    }
  }, [selectedFile]);

  return (
    <article className={landingPageStyles.contentCard}>
      <div className={landingPageStyles.contentCardInner}>
        <div className={landingPageStyles.centerContent}>
          {currentFilterLabel && (
            <span className={landingPageStyles.filterPillResume}>{currentFilterLabel}</span>
          )}
          <h2 className={landingPageStyles.headlineDark}>{headlineText}</h2>
          <p className={landingPageStyles.subtextMuted}>{subtextText}</p>
        </div>

        <div
          role="button"
          tabIndex={0}
          className={landingPageStyles.dragDropZone}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => document.getElementById(fileInputId)?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              document.getElementById(fileInputId)?.click();
            }
          }}
          style={isDraggingOver ? { borderColor: "var(--tw-color-zinc-400)" } : undefined}
          aria-label="Drop your resume or click to choose file"
        >
          <input
            id={fileInputId}
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => handleFileSelect(e.target.files)}
            aria-hidden
          />
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={landingPageStyles.dragDropIcon}
            aria-hidden
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <span className={landingPageStyles.dragDropLabel}>{dragDropPlaceholderText}</span>
          {selectedFile && (
            <span className="text-xs text-zinc-600 font-medium">{selectedFile.name}</span>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onUploadClick}
            className={landingPageStyles.primaryButton}
          >
            {uploadButtonLabel}
          </button>
        </div>
      </div>
    </article>
  );
}


type ResumePageProps = {
  role: string;
  experience: string;
  onResumeUploaded: () => void;
};

export function ResumePage({ role, experience, onResumeUploaded }: ResumePageProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const filterLabelPart1 = role || "";
  const filterLabelPart2 = experience || "";
  const headlineText = "Drop your resume";
  const subtextPart1 = "I'll map your ";
  const subtextBold = "skills, roles, and companies.";
  const dragDropPlaceholderText = "Drag & drop here";
  const uploadButtonLabel = "Upload";

  const handleFileSelect = useCallback((fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setSelectedFile(fileList[0]);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDraggingOver(false);
  }, []);

  const onUploadClick = useCallback(() => {
    if (selectedFile) console.log("Uploading:", selectedFile.name);
    onResumeUploaded();
  }, [selectedFile, onResumeUploaded]);

  return (
    <div className={lightPageStyles.wrap}>
      <main className={lightPageStyles.main}>
        <LightTopIcon />

        <article className={lightPageStyles.card}>
          <div className={lightPageStyles.cardInner}>
            <div className={lightPageStyles.centerContent}>
              {(filterLabelPart1 || filterLabelPart2) && (
                <p className="mb-2">
                  <span className="inline-block rounded-full bg-purple-600/10 px-4 py-1.5 text-sm font-medium">
                    <span className="text-purple-600">{filterLabelPart1}</span>
                    {filterLabelPart2 && (
                      <span className="text-red-600"> {filterLabelPart2}</span>
                    )}
                  </span>
                </p>
              )}
              <h2 className={lightPageStyles.headline}>{headlineText}</h2>
              <p className={lightPageStyles.subtext}>
                {subtextPart1}
                <span className={lightPageStyles.subtextBold}>{subtextBold}</span>
              </p>
            </div>

            <div
              role="button"
              tabIndex={0}
              className={lightPageStyles.dragDropZone}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => document.getElementById("resume-page-file-input")?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("resume-page-file-input")?.click();
                }
              }}
              style={isDraggingOver ? { borderColor: "var(--tw-color-zinc-400)" } : undefined}
              aria-label="Drop your resume or click to choose file"
            >
              <input
                id="resume-page-file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={(e) => handleFileSelect(e.target.files)}
                aria-hidden
              />
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-zinc-400"
                aria-hidden
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              <span className={lightPageStyles.dragDropLabel}>{dragDropPlaceholderText}</span>
              {selectedFile && (
                <span className="text-xs text-zinc-600 font-medium">{selectedFile.name}</span>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={onUploadClick}
                className={lightPageStyles.primaryButton}
              >
                {uploadButtonLabel}
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}


type CompanyPageProps = {
  totalJobsCount?: number;
  jobs?: JobListingItem[];
  onApplyToJob?: (job: JobListingItem) => void;
  onJobClick?: (job: JobListingItem) => void;
};

export function CompanyPage({
  totalJobsCount = 242,
  jobs = mockJobList,
  onApplyToJob,
  onJobClick,
}: CompanyPageProps) {
  const jobsCountLabel = `${totalJobsCount} Jobs found`;

  return (
    <div className={lightPageStyles.jobsPageWrap}>
      <main className={lightPageStyles.mainWideScrollable}>
        <LightTopIcon />

        <p className={`${lightPageStyles.jobsCountText} flex-shrink-0`}>{jobsCountLabel}</p>

        <div className={lightPageStyles.jobCardListScroll}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              companyDisplayName={job.companyDisplayName}
              companyInitials={job.companyInitials}
              companyAvatarBgColor={job.companyAvatarBgColor}
              jobTitleFull={job.jobTitleFull}
              jobTitleHighlightPart={job.jobTitleHighlightPart}
              locationOrWorkType={job.locationOrWorkType}
              experienceRange={job.experienceRange}
              applyButtonLabel={job.applyButtonLabel}
              applyButtonIcon={job.applyButtonIcon}
              postedTimeAgo={job.postedTimeAgo}
              onApply={() => onApplyToJob?.(job)}
              onJobClick={onJobClick ? () => onJobClick(job) : undefined}
              useLightStyles
            />
          ))}
        </div>
      </main>
    </div>
  );
}

type JobDetailPageProps = {
  jobId: string;
  totalJobsCount?: number;
  onBack: () => void;
  onApplyClick?: () => void;
};

export function JobDetailPage({
  jobId,
  totalJobsCount = 242,
  onBack,
  onApplyClick,
}: JobDetailPageProps) {
  const job = mockJobDetails[jobId];
  if (!job) {
    return (
      <div className={lightPageStyles.wrap}>
        <main className={lightPageStyles.mainWide}>
          <button type="button" onClick={onBack} className={lightPageStyles.detailBackLink}>
            ← Back to jobs
          </button>
          <p className="text-zinc-600">Job not found.</p>
        </main>
      </div>
    );
  }

  const titleBeforeHighlight = job.jobTitleFull.replace(job.jobTitleHighlightPart, "").trim();
  const showHighlight = job.jobTitleHighlightPart.length > 0;
  const jobsCountLabel = `${totalJobsCount} Jobs found`;

  return (
    <div className={`${lightPageStyles.wrap} overflow-auto`}>
      <main className={`${lightPageStyles.mainWide} pb-12`}>
        <LightTopIcon />
        <p className={lightPageStyles.jobsCountText}>{jobsCountLabel}</p>

        <button
          type="button"
          onClick={onBack}
          className={lightPageStyles.detailBackLink}
          aria-label="Back to job list"
        >
          ← Back to jobs
        </button>

        <article className={lightPageStyles.card}>
          <div className={lightPageStyles.cardInner}>
            <div className="flex flex-wrap items-start gap-3 sm:gap-4 border-b border-zinc-200 pb-4 sm:pb-6">
              <div className={`${lightPageStyles.jobCardAvatar} ${job.companyAvatarBgColor}`}>
                {job.companyInitials}
              </div>
              <div className="flex-1 min-w-0 basis-full sm:basis-0">
                <h1 className={lightPageStyles.jobTitle}>
                  {titleBeforeHighlight}
                  {showHighlight && (
                    <span className={lightPageStyles.jobTitleHighlight}> {job.jobTitleHighlightPart}</span>
                  )}
                </h1>
                <p className={lightPageStyles.companyName}>{job.companyDisplayName}</p>
                <div className={lightPageStyles.jobMetaRow}>
                  <span>{job.locationOrWorkType}</span>
                  <span aria-hidden>·</span>
                  <span>{job.experienceRange}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {job.skillTags.map((tag, i) => (
                  <span
                    key={i}
                    className={`${lightPageStyles.skillPill} ${
                      i % 2 === 0 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className={`${lightPageStyles.applyButtonWrapper} w-full sm:w-auto`}>
                <button
                  type="button"
                  onClick={() => onApplyClick?.()}
                  className={`${lightPageStyles.applyButton} w-full sm:w-auto`}
                  aria-label={`${job.applyButtonFullLabel}`}
                >
                  {job.applyButtonFullLabel}
                </button>
                <span className={lightPageStyles.postedAgo}>{job.postedTimeAgo}</span>
              </div>
            </div>

            <div className="pt-2">
              <h2 className={lightPageStyles.detailSectionHeading}>About the Role:</h2>
              <p className={lightPageStyles.detailBodyText}>{job.aboutTheRole}</p>

              <h2 className={lightPageStyles.detailSectionHeading}>Key Responsibilities</h2>
              <ul className={lightPageStyles.detailList}>
                {job.keyResponsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <h2 className={lightPageStyles.detailSectionHeading}>Must-Have Skills</h2>
              <ul className={lightPageStyles.detailList}>
                {job.mustHaveSkills.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

type NotificationPreferencesPageProps = {
  onContinue: () => void;
};

export function NotificationPreferencesPage({ onContinue }: NotificationPreferencesPageProps) {
  const [frequency, setFrequency] = useState<string>(NOTIFICATION_FREQUENCY_OPTIONS[0]);

  const headingText = "Should I give you a nudge when there's something you should see?";
  const subtextPart1 = "I can ";
  const subtextHighlight = "send gentle notifications";
  const subtextPart2 = " for updates, reminders, and things you care about.";
  const continueButtonLabel = "Continue";

  return (
    <div className={lightPageStyles.wrap}>
      <main className={lightPageStyles.main}>
        <NotificationBellIcon />

        <article
          className={lightPageStyles.notificationCard}
          style={{
            boxShadow:
              "4px 0 0 0 rgb(59 130 246), 0 4px 0 0 rgb(59 130 246), 6px 4px 12px -2px rgba(147, 51, 234, 0.2)",
          }}
        >
          <div className={lightPageStyles.cardInner}>
            <div className={lightPageStyles.centerContent}>
              <h2 className={lightPageStyles.headline}>{headingText}</h2>
              <p className={lightPageStyles.subtext}>
                {subtextPart1}
                <span className="text-purple-500 font-medium">{subtextHighlight}</span>
                {subtextPart2}
              </p>
            </div>

            <div className="flex flex-col items-center w-full mt-4">
              <label htmlFor="notification-frequency" className="sr-only">
                Notification frequency
              </label>
              <select
                id="notification-frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className={lightPageStyles.notificationDropdown}
                aria-label="When to send notifications"
              >
                {NOTIFICATION_FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onContinue}
                className={lightPageStyles.primaryButton}
              >
                {continueButtonLabel}
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}

type PlanSelectionPageProps = {
  onContinue: () => void;
};

export function PlanSelectionPage({ onContinue }: PlanSelectionPageProps) {
  const freeBenefits = mockData.planBenefits.free;
  const paidBenefits = mockData.planBenefits.paid;

  return (
    <div className={lightPageStyles.wrap}>
      <main className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[1048px] flex-shrink-0 px-3 sm:px-4 pb-8">
        <article className={lightPageStyles.planModal}>
          <RupeeTopIcon />

          <div className={lightPageStyles.planOptionsRow}>
            <div className={`${lightPageStyles.planCard} ${lightPageStyles.planCardBlue}`}>
              <div className={lightPageStyles.planCardIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-zinc-600" aria-hidden>
                  <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="5" r="1.5" fill="currentColor" />
                  <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="5" cy="19" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                  <circle cx="19" cy="19" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <p className={lightPageStyles.planPrice}>₹0</p>
              {freeBenefits.map((line, i) => (
                <p key={i} className={lightPageStyles.planBenefit}>
                  {line}
                </p>
              ))}
            </div>
            <div className={`${lightPageStyles.planCard} ${lightPageStyles.planCardGreen}`}>
              <div className={lightPageStyles.planCardIconDark}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden>
                  <path
                    d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className={lightPageStyles.planPrice}>₹399</p>
              {paidBenefits.map((line, i) => (
                <p key={i} className={lightPageStyles.planBenefit}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center w-full">
            <button type="button" onClick={onContinue} className={lightPageStyles.primaryButton}>
              Continue
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}

type ResumeUploadSectionProps = {
  currentFilterLabel: string;
  showDevBadge?: boolean;
};

export function ResumeUploadSection({
  currentFilterLabel,
  showDevBadge = false,
}: ResumeUploadSectionProps) {
  return (
    <div className={landingPageStyles.fullPageDarkWrapper}>
      <header className={landingPageStyles.headerRow}>
        <h1 className={landingPageStyles.pageTitle}>Landing Page</h1>
        {showDevBadge && (
          <span className={landingPageStyles.devModeBadge} aria-hidden>
            &lt;/&gt;
          </span>
        )}
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center">
        <LandingTopIcon />
        <ResumeUploadCard currentFilterLabel={currentFilterLabel} />
      </main>
    </div>
  );
}


type JobListingsSectionProps = {
  totalJobsCount: number;
  showDevBadge?: boolean;
  jobs?: JobListingItem[];
  onApplyToJob?: (job: JobListingItem) => void;
};

export function JobListingsSection({
  totalJobsCount,
  showDevBadge = true,
  jobs = mockJobList,
  onApplyToJob,
}: JobListingsSectionProps) {
  const jobsCountLabel = `${totalJobsCount} Jobs found`;

  return (
    <div className={landingPageStyles.fullPageDarkWrapper}>
      <header className={landingPageStyles.headerRow}>
        <h1 className={landingPageStyles.pageTitle}>Landing Page</h1>
        {showDevBadge && (
          <span className={landingPageStyles.devModeBadge} aria-hidden>
            &lt;/&gt;
          </span>
        )}
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center">
        <LandingTopIcon />

        <p className={landingPageStyles.jobsCountText}>{jobsCountLabel}</p>

        <div className={landingPageStyles.jobCardList}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              companyDisplayName={job.companyDisplayName}
              companyInitials={job.companyInitials}
              companyAvatarBgColor={job.companyAvatarBgColor}
              jobTitleFull={job.jobTitleFull}
              jobTitleHighlightPart={job.jobTitleHighlightPart}
              locationOrWorkType={job.locationOrWorkType}
              experienceRange={job.experienceRange}
              applyButtonLabel={job.applyButtonLabel}
              applyButtonIcon={job.applyButtonIcon}
              postedTimeAgo={job.postedTimeAgo}
              onApply={() => onApplyToJob?.(job)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}


type PostOnboardingViewProps = {
  role: string;
  experience: string;
  company: string;
  totalJobsCount?: number;
  jobs?: JobListingItem[];
  onApplyToJob?: (job: JobListingItem) => void;
};

export function PostOnboardingView({
  role,
  experience,
  company,
  totalJobsCount = 242,
  jobs = mockJobList,
  onApplyToJob,
}: PostOnboardingViewProps) {
  const filterLabelFromOnboarding = [role, experience].filter(Boolean).join(" ") || undefined;
  const jobsCountLabel = `${totalJobsCount} Jobs found`;

  return (
    <div className={`${landingPageStyles.fullPageDarkWrapper} justify-start overflow-auto py-8`}>
      <header className={landingPageStyles.headerRow}>
        <h1 className={landingPageStyles.pageTitle}>Landing Page</h1>
        <span className={landingPageStyles.devModeBadge} aria-hidden>
          &lt;/&gt;
        </span>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center gap-8 pb-12">
        <LandingTopIcon />

        <ResumeUploadCard
          currentFilterLabel={filterLabelFromOnboarding ?? ""}
          fileInputId="post-onboarding-resume-input"
        />

        <p className={landingPageStyles.jobsCountText}>{jobsCountLabel}</p>

        <div className={landingPageStyles.jobCardList}>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              companyDisplayName={job.companyDisplayName}
              companyInitials={job.companyInitials}
              companyAvatarBgColor={job.companyAvatarBgColor}
              jobTitleFull={job.jobTitleFull}
              jobTitleHighlightPart={job.jobTitleHighlightPart}
              locationOrWorkType={job.locationOrWorkType}
              experienceRange={job.experienceRange}
              applyButtonLabel={job.applyButtonLabel}
              applyButtonIcon={job.applyButtonIcon}
              postedTimeAgo={job.postedTimeAgo}
              onApply={() => onApplyToJob?.(job)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
