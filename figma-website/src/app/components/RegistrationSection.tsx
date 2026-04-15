import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    schoolName: "",
    bundesland: "",
    projektgruppe: "",
    andereProjektgruppe: "",
    consent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-4xl mb-6">Registrierung</h2>
      
      <p className="mb-8">
        Du möchtest mit deiner Schule Teil der Whole School Approach Community werden oder bist bereits in einem unserer Partnerprojekte aktiv? Dann registriere dich hier kostenfrei
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-6">
            <ChevronRight className="w-5 h-5" />
            <h3 className="text-xl">Registrierung</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Dein Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Vor- und Nachname"
                className="border border-gray-300 px-3 py-2 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Deine Position / Rolle
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Deine Position / Rolle"
                className="border border-gray-300 px-3 py-2 w-full"
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                E-Mail-Adresse <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-Mail-Adresse"
                className="border border-gray-300 px-3 py-2 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Name eurer Schule / Organisation <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Name eurer Schule / Organisation"
                className="border border-gray-300 px-3 py-2 w-full"
                required
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Bundesland <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <select
                  name="bundesland"
                  value={formData.bundesland}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 w-full appearance-none pr-8 text-gray-500"
                  required
                >
                  <option value="">Bitte wählen ...</option>
                  <option value="baden-wuerttemberg">Baden-Württemberg</option>
                  <option value="bayern">Bayern</option>
                  <option value="berlin">Berlin</option>
                  <option value="brandenburg">Brandenburg</option>
                  <option value="bremen">Bremen</option>
                  <option value="hamburg">Hamburg</option>
                  <option value="hessen">Hessen</option>
                  <option value="mecklenburg-vorpommern">Mecklenburg-Vorpommern</option>
                  <option value="niedersachsen">Niedersachsen</option>
                  <option value="nordrhein-westfalen">Nordrhein-Westfalen</option>
                  <option value="rheinland-pfalz">Rheinland-Pfalz</option>
                  <option value="saarland">Saarland</option>
                  <option value="sachsen">Sachsen</option>
                  <option value="sachsen-anhalt">Sachsen-Anhalt</option>
                  <option value="schleswig-holstein">Schleswig-Holstein</option>
                  <option value="thueringen">Thüringen</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Projektgruppe
              </label>
              <div className="relative">
                <select
                  name="projektgruppe"
                  value={formData.projektgruppe}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 w-full appearance-none pr-8 text-gray-500"
                >
                  <option value="">Nimmst du an einem unserer Partnerprojekte teil?</option>
                  <option value="projekt1">Projekt 1</option>
                  <option value="projekt2">Projekt 2</option>
                  <option value="projekt3">Projekt 3</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 w-4 h-4 pointer-events-none text-gray-500" />
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Andere Projektgruppe
              </label>
              <input
                type="text"
                name="andereProjektgruppe"
                value={formData.andereProjektgruppe}
                onChange={handleChange}
                placeholder="Falls deine Projektgruppe nicht aufgelistet ist, kannst du sie hier nennen"
                className="border border-gray-300 px-3 py-2 w-full"
              />
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4 items-start">
              <label className="text-right pt-3">
                Einverständniserklärung <span className="text-red-600">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 border-gray-300"
                    required
                  />
                  <span className="text-sm">
                    Ich erkläre mich mit der Speicherung und Verarbeitung meiner Daten durch diese Website einverstanden. Weitere Informationen zu den verarbeiteten personenbezogenen Daten, Ihrem Recht auf Widerruf, Widerspruch, Auskunft, Berichtigung und Löschung finden Sie in der Datenschutzerklärung.
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="border border-gray-400 px-6 py-2 hover:bg-gray-50 flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4" />
                Jetzt registrieren
              </button>
            </div>
          </div>
        </div>

        <p className="text-sm text-center">
          <span className="text-red-600">*</span> Bitte füllen Sie mindestens alle markierten Felder aus.
        </p>
      </form>
    </section>
  );
}
