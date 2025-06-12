
const colors = [
  { name: "red", class: "bg-red-500" },
  { name: "green", class: "bg-green-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "yellow", class: "bg-yellow-400" },
  { name: "purple", class: "bg-purple-500" },
  { name: "gray", class: "bg-gray-400" },
];

export default function ColorDemo() {
  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Farb-Demo (Tailwind CSS)
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`${color.class} hover:brightness-110 dark:brightness-90 text-white text-center p-6 rounded shadow transition`}
          >
            <p className="capitalize font-medium">{color.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}