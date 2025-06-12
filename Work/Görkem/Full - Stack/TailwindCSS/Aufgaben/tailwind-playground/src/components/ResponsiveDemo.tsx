
export default function ResponsiveDemo() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 my-8 text-left">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Responsive Demo
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Die Farbe und das Layout ändern sich je nach Bildschirmgröße:
      </p>
      <div className="
        bg-blue-200
        sm:bg-green-200
        md:bg-yellow-200
        lg:bg-red-400
        xl:bg-purple-200
        text-black
        p-6 rounded mb-4
        transition-colors-500
      ">
        <span className="block sm:inline">xs: Blau</span>
        <span className="hidden sm:inline md:hidden"> | sm: Grün</span>
        <span className="hidden md:inline lg:hidden"> | md: Gelb</span>
        <span className="hidden lg:inline xl:hidden"> | lg: Rot</span>
        <span className="hidden xl:inline"> | xl: Lila</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="text-center">Block 1</p>
        </div>
        <div className="flex-1 bg-gray-100 dark:bg-gray-700 p-4 rounded">
          <p className="text-center">Block 2</p>
        </div>
      </div>
    </section>
  );
}