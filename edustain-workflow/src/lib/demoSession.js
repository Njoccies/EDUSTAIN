const MEMBER_KEY = "edustain-connect-demo-member";
const WELCOME_KEY = "edustain-connect-demo-welcome";
const QUICK_NAVIGATOR_SEEN_KEY = "edustain-connect-quick-nav-seen";
const QUICK_NAVIGATOR_ANSWERS_KEY = "edustain-connect-quick-nav-answers";

export function saveDemoMember(memberData) {
  const payload = {
    ...memberData,
    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem(MEMBER_KEY, JSON.stringify(payload));
  localStorage.setItem(WELCOME_KEY, "pending");
  localStorage.removeItem(QUICK_NAVIGATOR_SEEN_KEY);
  localStorage.removeItem(QUICK_NAVIGATOR_ANSWERS_KEY);
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

export function saveQuickNavigatorAnswers(answers) {
  localStorage.setItem(QUICK_NAVIGATOR_ANSWERS_KEY, JSON.stringify(answers));
  markQuickNavigatorSeen();
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
