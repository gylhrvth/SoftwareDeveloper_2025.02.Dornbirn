
const Box = ({ label }: { label: string }) => (
  <div className="bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 text-sm font-semibold px-4 py-2 rounded">
    {label}
  </div>
);

const SpacingDemo = () => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 my-8 text-left w-fit">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Spacing Demo (Margin / Padding / Gap)
      </h2>

      {/* Margin Demo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Margin</h3>
        <div className="flex bg-gray-100 dark:bg-gray-700 p-4">
          <Box label="m-0" />
          <Box label="ml-4" />
          <div className="ml-4">
            <Box label="ml-4" />
          </div>
        </div>
      </div>

      {/* Padding Demo */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Padding</h3>
        <div className="bg-gray-100 dark:bg-gray-700 p-0 mb-2">
          <Box label="p-0" />
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 mb-2">
          <Box label="p-4" />
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 px-6 py-2">
          <Box label="px-6 py-2" />
        </div>
      </div>

      {/* Gap Demo (z.B. für Grid oder Flex) */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Gap</h3>
        <div className="flex gap-2 mb-2">
          <Box label="gap-2" />
          <Box label="gap-2" />
          <Box label="gap-2" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Box label="grid + gap-4" />
          <Box label="grid + gap-4" />
          <Box label="grid + gap-4" />
        </div>
      </div>
    </section>
  );
};

export default SpacingDemo;