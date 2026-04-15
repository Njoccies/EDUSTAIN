import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WelcomeSection } from "./components/WelcomeSection";
import { RegistrationSection } from "./components/RegistrationSection";
import { BNEProviderSection } from "./components/BNEProviderSection";
import { PlatformUsageSection } from "./components/PlatformUsageSection";
import { NavigationSystemSection } from "./components/NavigationSystemSection";
import { PartnersSection } from "./components/PartnersSection";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <main className="max-w-[960px] mx-auto px-8">
        <WelcomeSection />
        <RegistrationSection />
        <BNEProviderSection />
        <PlatformUsageSection />
        <NavigationSystemSection />
      </main>
      <PartnersSection />
    </div>
  );
}
