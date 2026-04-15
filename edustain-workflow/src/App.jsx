import { useEffect, useRef, useState } from "react";
import MemberAreaPage from "./components/MemberAreaPage.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import WorkflowHeader from "./components/WorkflowHeader.jsx";
import WebsiteHome from "./components/WebsiteHome.jsx";
import { NAV_TABS } from "./data/workflowSiteContent.js";
import ProjectsPlannerTab from "./ProjectsPlannerTab.jsx";

function normalizePath(pathname) {
  if (pathname === "/registrierung") {
    return "/registrierung";
  }
  if (pathname === "/mitgliederbereich") {
    return "/mitgliederbereich";
  }
  return "/";
}

export default function EdustainConnect() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));
  const [activeTab, setActiveTab] = useState("wsa");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingSectionId, setPendingSectionId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const welcomeRef = useRef(null);
  const registrationRef = useRef(null);
  const navigationRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname));
      setMobileMenuOpen(false);
      setPendingSectionId(null);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (pathname === "/registrierung") {
      document.title = "Registrierung | EDUSTAIN-Connect";
      return;
    }
    if (pathname === "/mitgliederbereich") {
      document.title = "Mitgliederbereich | EDUSTAIN-Connect";
      return;
    }
    document.title = "EDUSTAIN-Connect";
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || !pendingSectionId || activeTab === "projekte") {
      return;
    }

    let target = null;
    if (pendingSectionId === "welcome") {
      target = welcomeRef.current;
    }
    if (pendingSectionId === "registration") {
      target = registrationRef.current;
    }
    if (pendingSectionId === "navigation") {
      target = navigationRef.current;
    }

    if (!target) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingSectionId(null);
    }, 30);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab, pathname, pendingSectionId]);

  const navigateTo = (path) => {
    const normalizedPath = normalizePath(path);
    if (normalizedPath === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setPathname(normalizedPath);
    setMobileMenuOpen(false);
    setPendingSectionId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (id) => {
    if (pathname !== "/") {
      navigateTo("/");
    }

    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === "projekte") {
      setPendingSectionId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const selectedTab = NAV_TABS.find((tab) => tab.id === id);
    setPendingSectionId(selectedTab?.section ?? "welcome");
  };

  return (
    <div className="workflow-app">
      <WorkflowHeader
        tabs={NAV_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((current) => !current)}
        scrolled={scrolled}
        onHomeClick={() => {
          setActiveTab("wsa");
          navigateTo("/");
        }}
        onMembersClick={() => navigateTo("/mitgliederbereich")}
        onRegistrationClick={() => navigateTo("/registrierung")}
        showTabs={pathname === "/"}
      />

      {pathname === "/registrierung" ? (
        <RegistrationPage
          onNavigateHome={() => navigateTo("/")}
          onNavigateMembers={() => navigateTo("/mitgliederbereich")}
        />
      ) : pathname === "/mitgliederbereich" ? (
        <MemberAreaPage
          onNavigateHome={() => navigateTo("/")}
          onNavigateRegistration={() => navigateTo("/registrierung")}
        />
      ) : activeTab === "projekte" ? (
        <ProjectsPlannerTab />
      ) : (
        <WebsiteHome
          welcomeRef={welcomeRef}
          registrationRef={registrationRef}
          navigationRef={navigationRef}
          onOpenProjects={() => handleTabChange("projekte")}
          onOpenRegistration={() => navigateTo("/registrierung")}
          onOpenMembers={() => navigateTo("/mitgliederbereich")}
        />
      )}
    </div>
  );
}
