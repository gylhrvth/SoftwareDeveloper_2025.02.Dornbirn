export default function Introduction() {
  return (
    <section className="py-20 bg-[#1f2937]/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#30e3ca]">
            Computing Since 1982
          </h1>
          <p className="text-lg text-[#e0e7ef] mb-8">
            RetroTech Systems specializes in vintage computing experiences and hardware restoration. From 8-bit wonders to beige box classics, we keep the pixels big and the nostalgia flowing. Insert coin to continue.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-[#30e3ca] text-[#181824] hover:bg-[#30e3ca]/80 px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Press Start
            </button>
            <button className="border border-[#a259f7] text-[#a259f7] hover:bg-[#a259f7]/10 px-6 py-3 rounded-lg transition-colors cursor-pointer">
              Load Program
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}