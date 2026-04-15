import { ImageWithFallback } from "./figma/ImageWithFallback";

export function PartnersSection() {
  return (
    <section className="bg-gray-100 py-16 mt-12">
      <div className="max-w-[960px] mx-auto px-8">
        <h2 className="text-3xl mb-12">Unsere akademischen Partner</h2>
        
        <div className="flex items-center justify-center gap-16">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="text-[#c41e3a] text-2xl mb-2">
                <svg viewBox="0 0 200 80" className="w-48 h-auto">
                  <text x="100" y="40" textAnchor="middle" fill="#c41e3a" className="text-4xl font-light">LEUPHANA</text>
                  <text x="100" y="65" textAnchor="middle" fill="#c41e3a" className="text-xs tracking-wider">UNIVERSITÄT LÜNEBURG</text>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center h-32">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1651534400798-e9657f587140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmVzY28lMjBjaGFpciUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzYyNTUzODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="UNESCO Chair"
              className="h-24 w-auto object-contain"
            />
          </div>
          
          <div className="flex items-center justify-center h-32">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1630393340959-840ab8e16ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjZXJ0aWZpY2F0aW9uJTIwYmFkZ2V8ZW58MXx8fHwxNzc2MjU1Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Zertifizierte Bildungsträger"
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
