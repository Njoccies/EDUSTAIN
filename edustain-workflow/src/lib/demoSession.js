const MEMBER_KEY = "edustain-connect-demo-member";
const WELCOME_KEY = "edustain-connect-demo-welcome";

export function saveDemoMember(memberData) {
  const payload = {
    ...memberData,
    registeredAt: new Date().toISOString(),
  };

  localStorage.setItem(MEMBER_KEY, JSON.stringify(payload));
  localStorage.setItem(WELCOME_KEY, "pending");
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
