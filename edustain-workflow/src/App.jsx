import { useEffect, useRef, useState } from "react";
import MemberAreaPage from "./components/MemberAreaPage.jsx";
import PartnerSearchPage from "./components/PartnerSearchPage.jsx";
import ProjectCatalogPage from "./components/ProjectCatalogPage.jsx";
import QuickNavigatorModal from "./components/QuickNavigatorModal.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import SchoolProfilePage from "./components/SchoolProfilePage.jsx";
import WorkflowHeader from "./components/WorkflowHeader.jsx";
import WebsiteHome from "./components/WebsiteHome.jsx";
import { NAV_TABS } from "./data/workflowSiteContent.js";
import {
  getQuickNavigatorAnswers,
  markQuickNavigatorSeen,
  resetQuickNavigator,
  saveQuickNavigatorAnswers,
} from "./lib/demoSession.js";
import { awardMemberProgress } from "./lib/memberLevel.js";
import ProjectsPlannerTab from "./ProjectsPlannerTab.jsx";

function normalizePath(pathname) {
  if (pathname === "/registrierung") {
    return "/registrierung";
  }
  if (pathname === "/mitgliederbereich") {
    return "/mitgliederbereich";
  }
  if (pathname === "/partner") {
    return "/partner";
  }
  return "/";
}

export default function EdustainConnect() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));
  const [activeTab, setActiveTab] = useState("wsa");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingSectionId, setPendingSectionId] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [quickNavAnswers, setQuickNavAnswers] = useState(() => getQuickNavigatorAnswers());
  const [quickNavigatorOpen, setQuickNavigatorOpen] = useState(false);
  const [quickNavigatorSource, setQuickNavigatorSource] = useState("homepage");
  const [projectsView, setProjectsView] = useState("catalog");

  const welcomeRef = useRef(null);
  const partnersRef = useRef(null);
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
    if (pathname === "/partner") {
      document.title = "Partner | EDUSTAIN-Connect";
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
    if (pendingSectionId === "partners") {
      target = partnersRef.current;
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

  const navigateHome = () => {
    setActiveTab("wsa");
    navigateTo("/");
  };

  const handleTabChange = (id) => {
    if (pathname !== "/") {
      navigateTo("/");
    }

    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === "projekte") {
      setProjectsView("catalog");
      setPendingSectionId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (id === "schule") {
      setPendingSectionId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const selectedTab = NAV_TABS.find((tab) => tab.id === id);
    setPendingSectionId(selectedTab?.section ?? "welcome");
  };

  const openQuickNavigator = (source, options = {}) => {
    const { restart = false } = options;

    if (restart) {
      resetQuickNavigator();
      setQuickNavAnswers(null);
    }

    setQuickNavigatorSource(source);
    setQuickNavigatorOpen(true);
  };

  const handleQuickNavigatorClose = () => {
    if (quickNavigatorSource === "member") {
      markQuickNavigatorSeen();
    }

    setQuickNavigatorOpen(false);
  };

  const handleQuickNavigatorComplete = (answers) => {
    const shouldMarkSeen = quickNavigatorSource === "member";

    saveQuickNavigatorAnswers(answers, { markSeen: shouldMarkSeen });
    awardMemberProgress("quickNavigator");
    setQuickNavAnswers(answers);
    setQuickNavigatorOpen(false);
  };

  return (
    <div className="workflow-app">
      {quickNavigatorOpen && (
        <QuickNavigatorModal
          initialAnswers={quickNavAnswers}
          onClose={handleQuickNavigatorClose}
          onComplete={handleQuickNavigatorComplete}
        />
      )}

      <WorkflowHeader
        tabs={NAV_TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((current) => !current)}
        scrolled={scrolled}
        onHomeClick={navigateHome}
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
          onOpenQuickNavigator={() => openQuickNavigator("member")}
          onRestartQuickNavigator={() => openQuickNavigator("member", { restart: true })}
          quickNavAnswers={quickNavAnswers}
        />
      ) : pathname === "/partner" ? (
        <PartnerSearchPage onNavigateHome={navigateHome} />
      ) : activeTab === "schule" ? (
        <SchoolProfilePage
          onNavigateRegistration={() => navigateTo("/registrierung")}
          onOpenProjects={() => handleTabChange("projekte")}
        />
      ) : activeTab === "projekte" ? (
        projectsView === "catalog" ? (
          <ProjectCatalogPage
            currentView={projectsView}
            onChangeView={setProjectsView}
            onNavigateHome={navigateHome}
          />
        ) : (
          <ProjectsPlannerTab
            currentView={projectsView}
            onChangeView={setProjectsView}
          />
        )
      ) : (
        <WebsiteHome
          welcomeRef={welcomeRef}
          partnersRef={partnersRef}
          navigationRef={navigationRef}
          onOpenProjects={() => handleTabChange("projekte")}
          onOpenRegistration={() => navigateTo("/registrierung")}
          onOpenQuickNavigator={() => openQuickNavigator("homepage", { restart: true })}
          onOpenPartners={() => navigateTo("/partner")}
        />
      )}
    </div>
  );
}
