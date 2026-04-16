const MEMBER_PROGRESS_KEY = "edustain-connect-member-progress";

const TIERS = ["Bronze", "Silber", "Gold", "Platin", "Master"];
const SUBLEVELS_PER_TIER = 5;
const POINTS_PER_LEVEL = 50;

const EVENT_POINTS = {
  registration: 90,
  firstLogin: 55,
  quickNavigator: 80,
  partnerDirectory: 65,
  projectPlanner: 120,
};

const EVENT_LABELS = {
  registration: "Registrierung abgeschlossen",
  firstLogin: "Erster Login erfolgt",
  quickNavigator: "Quick Navigator genutzt",
  partnerDirectory: "Partnerverzeichnis erkundet",
  projectPlanner: "Projektleitfaden ausgefuellt",
};

function createEmptyProgress() {
  return {
    points: 0,
    events: Object.keys(EVENT_POINTS).reduce((accumulator, key) => {
      accumulator[key] = false;
      return accumulator;
    }, {}),
  };
}

function normalizeProgress(progress) {
  const base = createEmptyProgress();

  if (!progress || typeof progress !== "object") {
    return base;
  }

  return {
    points: typeof progress.points === "number" ? progress.points : 0,
    events: {
      ...base.events,
      ...(progress.events ?? {}),
    },
  };
}

function saveProgress(progress) {
  localStorage.setItem(MEMBER_PROGRESS_KEY, JSON.stringify(progress));
}

export function getMemberProgress() {
  const rawValue = localStorage.getItem(MEMBER_PROGRESS_KEY);
  if (!rawValue) {
    return createEmptyProgress();
  }

  try {
    return normalizeProgress(JSON.parse(rawValue));
  } catch {
    return createEmptyProgress();
  }
}

export function initializeMemberProgress() {
  const base = createEmptyProgress();
  saveProgress(base);
  awardMemberProgress("registration");
  return awardMemberProgress("firstLogin");
}

export function awardMemberProgress(eventId) {
  const current = getMemberProgress();
  const points = EVENT_POINTS[eventId];

  if (!points || current.events[eventId]) {
    return { progress: current, updated: false };
  }

  const next = {
    points: current.points + points,
    events: {
      ...current.events,
      [eventId]: true,
    },
  };

  saveProgress(next);

  return { progress: next, updated: true };
}

export function getLevelFromPoints(points) {
  const totalLevels = TIERS.length * SUBLEVELS_PER_TIER;
  const levelIndex = Math.min(Math.floor(points / POINTS_PER_LEVEL), totalLevels - 1);
  const tierIndex = Math.floor(levelIndex / SUBLEVELS_PER_TIER);
  const stage = (levelIndex % SUBLEVELS_PER_TIER) + 1;
  const tierLabel = TIERS[tierIndex];
  const tierId = tierLabel.toLowerCase();
  const nextLevelIndex = levelIndex + 1 < totalLevels ? levelIndex + 1 : null;
  const nextThreshold = nextLevelIndex === null ? null : nextLevelIndex * POINTS_PER_LEVEL;
  const levelStart = levelIndex * POINTS_PER_LEVEL;

  let nextLabel = null;
  if (nextLevelIndex !== null) {
    const nextTier = TIERS[Math.floor(nextLevelIndex / SUBLEVELS_PER_TIER)];
    const nextStage = (nextLevelIndex % SUBLEVELS_PER_TIER) + 1;
    nextLabel = `${nextTier} ${nextStage}`;
  }

  return {
    tierId,
    tierLabel,
    stage,
    label: `${tierLabel} ${stage}`,
    progressPercent:
      nextThreshold === null
        ? 100
        : Math.min(((points - levelStart) / POINTS_PER_LEVEL) * 100, 100),
    pointsToNextLevel: nextThreshold === null ? 0 : Math.max(nextThreshold - points, 0),
    nextLabel,
  };
}

export function getProgressHighlights(progress) {
  return Object.entries(progress.events)
    .filter(([, isUnlocked]) => isUnlocked)
    .map(([eventId]) => EVENT_LABELS[eventId])
    .filter(Boolean);
}
