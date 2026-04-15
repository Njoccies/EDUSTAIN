export function HeroSection() {
  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Colorful radial burst background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            radial-gradient(circle at 65% 50%, 
              transparent 0%, 
              transparent 8%,
              #4a5568 8%, #4a5568 9%,
              #0077b6 9%, #0077b6 11%,
              #8b4513 11%, #8b4513 13%,
              #1e40af 13%, #1e40af 15%,
              #047857 15%, #047857 17%,
              #fbbf24 17%, #fbbf24 19%,
              #ea580c 19%, #ea580c 21%,
              #7c2d12 21%, #7c2d12 23%,
              #be123c 23%, #be123c 25%,
              #0e7490 25%, #0e7490 27%,
              #4338ca 27%, #4338ca 29%,
              #059669 29%, #059669 31%,
              #65a30d 31%, #65a30d 33%,
              #eab308 33%, #eab308 35%,
              #fb923c 35%, #fb923c 37%,
              #dc2626 37%, #dc2626 39%,
              #e11d48 39%, #e11d48 41%,
              #db2777 41%, #db2777 43%,
              #c026d3 43%, #c026d3 45%,
              #0ea5e9 45%, #0ea5e9 47%,
              #0891b2 47%, #0891b2 49%,
              #06b6d4 49%, #06b6d4 51%,
              #14b8a6 51%, #14b8a6 53%,
              #10b981 53%, #10b981 55%,
              #84cc16 55%, #84cc16 57%,
              #facc15 57%, #facc15 59%,
              #fbbf24 59%, #fbbf24 61%,
              #f59e0b 61%, #f59e0b 63%,
              #f97316 63%, #f97316 65%,
              #ef4444 65%, #ef4444 67%,
              #f43f5e 67%, #f43f5e 69%,
              #ec4899 69%, #ec4899 71%,
              #a855f7 71%, #a855f7 73%,
              #8b5cf6 73%, #8b5cf6 75%,
              #6366f1 75%, #6366f1 77%,
              #3b82f6 77%, #3b82f6 79%,
              #0284c7 79%, #0284c7 81%,
              #0e7490 81%, #0e7490 83%,
              #0d9488 83%, #0d9488 85%,
              #059669 85%, #059669 87%,
              #65a30d 87%, #65a30d 89%,
              #a16207 89%, #a16207 91%,
              #92400e 91%, #92400e 93%,
              #78350f 93%, #78350f 95%,
              #4a5568 95%, #4a5568 97%,
              transparent 97%
            )
          `
        }}
      />
      
      {/* Text overlay */}
      <div className="relative z-10 flex items-center h-full px-8">
        <div className="max-w-[1200px] mx-auto w-full">
          <div className="max-w-[500px]">
            <h1 className="text-white text-4xl leading-tight">
              Schule vernetzen · Zukunft gestalten<br />
              Nachhaltig wirken
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}