import { Mail } from "lucide-react";

export function PlatformUsageSection() {
  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-3xl mb-6">
        Nutzung der Plattform in eurem WSA Bildungsprogramm
      </h2>
      
      <p className="mb-6">
        Ihr möchtet als Schulträger, Kultusministerium, Verein, NGO o. ä. die Plattform für euer Projekt/Programm zum Whole School Approach nutzen oder uns bei der Weiterentwicklung unterstützen? Dann kontaktiert uns!
      </p>
      
      <div className="mb-6">
        <p className="mb-2"><strong>EDUSTAIN</strong></p>
        <p className="mb-1">
          E-Mail: <a href="mailto:support@edustainconnect.org" className="text-[#0077b6] hover:underline">support@edustainconnect.org</a>
        </p>
        <p className="mb-4">
          Webseite: <a href="https://www.edustain.org" className="text-[#0077b6] hover:underline" target="_blank" rel="noopener noreferrer">www.edustain.org</a>
        </p>
        <p className="mb-6">
          Fortbildungen | Workshops | Vorträge | Coaching
        </p>
      </div>
      
      <button className="border border-gray-400 px-6 py-2 hover:bg-gray-50 flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Kontaktiere uns
      </button>
    </section>
  );
}
