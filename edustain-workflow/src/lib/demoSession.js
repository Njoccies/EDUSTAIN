import { initializeMemberProgress } from "./memberLevel.js";

const MEMBER_KEY = "edustain-connect-demo-member";
const WELCOME_KEY = "edustain-connect-demo-welcome";
const QUICK_NAVIGATOR_SEEN_KEY = "edustain-connect-quick-nav-seen";
const QUICK_NAVIGATOR_ANSWERS_KEY = "edustain-connect-quick-nav-answers";
const AUTH_SESSION_KEY = "edustain-connect-demo-auth";

function getStoredSessionAuth() {
  return window.sessionStorage.getItem(AUTH_SESSION_KEY);
}

export function saveDemoMember(memberData) {
  const payload = {
    ...memberData,
    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem(MEMBER_KEY, JSON.stringify(payload));
  localStorage.setItem(WELCOME_KEY, "pending");
  localStorage.removeItem(QUICK_NAVIGATOR_SEEN_KEY);
  localStorage.removeItem(QUICK_NAVIGATOR_ANSWERS_KEY);
  initializeMemberProgress();
  window.sessionStorage.setItem(AUTH_SESSION_KEY, payload.email);
}

export function getDemoMember() {
  const rawValue = localStorage.getItem(MEMBER_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function isDemoMemberAuthenticated() {
  const member = getDemoMember();
  if (!member) {
    return false;
  }

  return getStoredSessionAuth() === member.email;
}

export function loginDemoMember({ email, password }) {
  const member = getDemoMember();

  if (!member) {
    return {
      ok: false,
      error: "Es gibt noch keinen Demo-Zugang. Bitte registriere dich zuerst.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const storedEmail = member.email.trim().toLowerCase();

  if (normalizedEmail !== storedEmail || password !== member.password) {
    return {
      ok: false,
      error: "E-Mail oder Passwort stimmen nicht mit dem Demo-Zugang ueberein.",
    };
  }

  window.sessionStorage.setItem(AUTH_SESSION_KEY, member.email);

  return { ok: true };
}

export function logoutDemoMember() {
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
}

export function consumeWelcomeBanner() {
  const welcomeState = localStorage.getItem(WELCOME_KEY);
  if (welcomeState !== "pending") {
    return false;
  }

  localStorage.setItem(WELCOME_KEY, "shown");
  return true;
}

export function shouldShowQuickNavigator() {
  return localStorage.getItem(QUICK_NAVIGATOR_SEEN_KEY) !== "shown";
}

export function markQuickNavigatorSeen() {
  localStorage.setItem(QUICK_NAVIGATOR_SEEN_KEY, "shown");
}

export function saveQuickNavigatorAnswers(answers, options = {}) {
  const { markSeen = true } = options;
  localStorage.setItem(QUICK_NAVIGATOR_ANSWERS_KEY, JSON.stringify(answers));
  if (markSeen) {
    markQuickNavigatorSeen();
  }
}

export function getQuickNavigatorAnswers() {
  const rawValue = localStorage.getItem(QUICK_NAVIGATOR_ANSWERS_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function resetQuickNavigator() {
  localStorage.removeItem(QUICK_NAVIGATOR_SEEN_KEY);
  localStorage.removeItem(QUICK_NAVIGATOR_ANSWERS_KEY);
}
