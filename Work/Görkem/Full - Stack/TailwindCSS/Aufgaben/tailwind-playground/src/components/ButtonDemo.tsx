
const variants = [
  { name: "Primary", className: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-400 text-white" },
  { name: "Secondary", className: "bg-gray-300 hover:bg-gray-400 focus:ring-gray-400 text-gray-900" },
  { name: "Success", className: "bg-green-500 hover:bg-green-600 focus:ring-green-400 text-white" },
  { name: "Danger", className: "bg-red-500 hover:bg-red-600 focus:ring-red-400 text-white" },
];

const sizes = [
  { name: "Small", className: "px-3 py-1 text-sm" },
  { name: "Medium", className: "px-4 py-2 text-base" },
  { name: "Large", className: "px-6 py-3 text-lg" },
];

export default function ButtonDemo() {
    return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Button Demo</h2>
      <div className="space-y-6">
        {sizes.map((size) => (
          <div key={size.name}>
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">{size.name}</h3>
            <div className="flex gap-4 flex-wrap">
              {variants.map((variant) => (
                <button
                  key={variant.name}
                  className={`rounded shadow focus:outline-none focus:ring-2 transition ${variant.className} ${size.className}`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
