import { Edit } from "lucide-react";

export function BNEProviderSection() {
  return (
    <section className="py-12 border-t border-gray-200">
      <h2 className="text-3xl mb-6">
        Ihr seid Anbieter eines BNE Lernorts für Schulen oder bietet BNE Dienstleitungen für Schulen an?
      </h2>
      
      <p className="mb-4">
        Wir wollen auf dieser Plattform demnächst auch BNE Anbieter mit Schulen vernetzen.
      </p>
      
      <p className="mb-6">
        Wenn ihr als BNE Anbieter Interesse zur Aufnahme auf die Plattform habt, merkt euch hier unverbindlich vor. Wir melden uns dann mit weiteren Informationen bei euch, sobald wir soweit sind.
      </p>
      
      <button className="border border-gray-400 px-6 py-2 hover:bg-gray-50 flex items-center gap-2">
        <Edit className="w-4 h-4" />
        unverbindliche Vormerkung
      </button>
    </section>
  );
}
