import './index.css'

function App() {
  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start space-y-20 py-10">
      <div className="flex flex-col items-center space-y-6">
        <p className="text-blue-500 font-semibold py-2 px-6">Ice Cube "hello"</p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200">
          Save
        </button>
        <h2 className='m-20 bg-blue-700 hover:bg-blue-500 text-white font-semibold cursor-pointer'>nah, i'd react</h2>
        <p>now we have to do tailwindcss template eventually with variables</p>
      </div>
      <div className='bg-branda'>
      whats up
      </div>
      <ImportantClasses />
      <SelectorTypes />
      <Layout />	
      <FlexGridBoxAlignment/>
    </div>
    
  )
}

// Layout component for Tailwind CSS Cheat Sheet
function Layout() {
  return (
    <div className="p-6 space-y-12">

      {/* 1. Breakpoints */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Breakpoints</h2>
        <div className="bg-red-400 sm:bg-green-400 md:bg-blue-400 lg:bg-yellow-400 xl:bg-purple-400 p-6 text-white text-center rounded">
          Resize the window to see background color change by breakpoint.
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="bg-red-400 sm:bg-green-400 md:bg-blue-400 lg:bg-yellow-400 xl:bg-purple-400 p-6 text-white text-center rounded">
  Resize the window to see background color change by breakpoint.
</div>`}</code>
        </pre>
        <p className="mt-2">
          This box changes background color at different Tailwind breakpoints:<br />
          <code>bg-red-400</code> is default.<br />
          <code>sm:bg-green-400</code> applies on small screens and up.<br />
          <code>md:bg-blue-400</code> on medium and larger.<br />
          <code>lg:bg-yellow-400</code> on large and larger.<br />
          <code>xl:bg-purple-400</code> on extra large screens and bigger.<br />
          This shows how responsive prefixes style elements at different screen sizes.
        </p>
      </section>

      {/* 2. Box-sizing */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Box-sizing</h2>
        <div className="w-40 p-4 border border-gray-600 box-border mb-2">
          box-border (includes padding in width)
        </div>
        <div className="w-40 p-4 border border-gray-600 box-content">
          box-content (width excludes padding)
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="w-40 p-4 border box-border mb-2">
  box-border (includes padding in width)
</div>
<div className="w-40 p-4 border box-content">
  box-content (width excludes padding)
</div>`}</code>
        </pre>
        <p className="mt-2">
          <code>box-border</code> includes padding and border inside the element's total width.<br />
          <code>box-content</code> applies width only to the content, padding and border are added outside.<br />
          This affects how the element’s size is calculated.
        </p>
      </section>

      {/* 3. Container */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Container</h2>
        <div className="container mx-auto p-4 border border-gray-600 bg-gray-50">
          This container is centered and responsive with padding.
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="container mx-auto p-4 border bg-gray-50">
  This container is centered and responsive with padding.
</div>`}</code>
        </pre>
        <p className="mt-2">
          <code>container</code> sets a responsive max-width based on breakpoints.<br />
          <code>mx-auto</code> centers the container horizontally.<br />
          <code>p-4</code> adds padding inside the container.<br />
          This creates a centered and adaptable content area.
        </p>
      </section>

      {/* 4. Overflow */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Overflow</h2>
        <div className="w-48 h-24 border border-gray-600 overflow-auto p-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="w-48 h-24 border overflow-auto p-2">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</div>`}</code>
        </pre>
        <p className="mt-2">
          <code>overflow-auto</code> makes the container scrollable if content exceeds size.<br />
          Fixed width and height (<code>w-48 h-24</code>) mean overflow triggers scrollbars.<br />
          This controls how extra content is displayed inside a box.
        </p>
      </section>

    </div>
  )
}



function FlexGridBoxAlignment() {
  return (
    <div className="p-6 space-y-12 max-w-5xl mx-auto">

      {/* 1. Display */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Display</h2>
        <div className="flex space-x-4 mb-4">
          <div className="block bg-green-200 p-4">block</div>
          <div className="inline-block bg-yellow-200 p-4">inline-block</div>
          <div className="flex bg-blue-500 p-4 text-white">flex container</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{`<div className="block bg-green-200 p-4">block</div>
<div className="inline-block bg-yellow-200 p-4">inline-block</div>
<div className="flex bg-blue-500 p-4 text-white">flex container</div>`}</code>
        </pre>
        <p className="mt-2">
          <code>block</code> takes full width, <code>inline-block</code> fits content inline, <code>flex</code> creates a flex container.
        </p>
      </section>

      {/* 2. Flex-direction */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Flex-direction</h2>
        <div className="flex flex-col bg-blue-100 p-4 space-y-2 mb-4 max-w-xs">
          <div className="bg-blue-600 text-white p-2 rounded">Column 1</div>
          <div className="bg-blue-700 text-white p-2 rounded">Column 2</div>
          <div className="bg-blue-800 text-white p-2 rounded">Column 3</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{`<div className="flex flex-col">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>flex-col</code> stacks flex items vertically.</p>
      </section>

      {/* 3. Flex-wrap */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Flex-wrap</h2>
        <div className="flex flex-wrap bg-green-100 p-4 gap-2 max-w-xs">
          <div className="bg-green-600 text-white p-2 w-24 rounded">Box 1</div>
          <div className="bg-green-700 text-white p-2 w-24 rounded">Box 2</div>
          <div className="bg-green-800 text-white p-2 w-24 rounded">Box 3</div>
          <div className="bg-green-900 text-white p-2 w-24 rounded">Box 4</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
          <code>{`<div className="flex flex-wrap">
  <div className="w-24">Box 1</div>
  <div className="w-24">Box 2</div>
  <div className="w-24">Box 3</div>
  <div className="w-24">Box 4</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>flex-wrap</code> allows wrapping flex items to new lines.</p>
      </section>

      {/* 4. Flex-grow */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Flex-grow</h2>
        <div className="flex bg-purple-100 p-4 gap-2 max-w-lg">
          <div className="bg-purple-600 p-2 text-white rounded flex-grow" style={{ flexGrow: 1 }}>Grow 1</div>
          <div className="bg-purple-700 p-2 text-white rounded flex-grow" style={{ flexGrow: 2 }}>Grow 2</div>
          <div className="bg-purple-800 p-2 text-white rounded flex-grow" style={{ flexGrow: 1 }}>Grow 1</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="flex">
  <div style={{ flexGrow: 1 }}>Grow 1</div>
  <div style={{ flexGrow: 2 }}>Grow 2</div>
  <div style={{ flexGrow: 1 }}>Grow 1</div>
</div>`}</code>
        </pre>
        <p className="mt-2">
          <code>flex-grow</code> defines how much a flex item grows relative to siblings.
        </p>
      </section>

      {/* 5. Order */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Order</h2>
        <div className="flex bg-pink-100 p-4 gap-2 max-w-lg">
          <div className="bg-pink-600 p-2 text-white rounded order-2">Order 2</div>
          <div className="bg-pink-700 p-2 text-white rounded order-1">Order 1</div>
          <div className="bg-pink-800 p-2 text-white rounded order-3">Order 3</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="flex">
  <div className="order-2">Order 2</div>
  <div className="order-1">Order 1</div>
  <div className="order-3">Order 3</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>order</code> changes the visual order of flex items without changing the HTML.</p>
      </section>

      {/* 6. Grid-template-columns */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grid-template-columns</h2>
        <div className="grid grid-cols-3 gap-2 bg-yellow-100 p-4 text-center text-white max-w-md rounded">
          <div className="bg-yellow-600 p-2 rounded">1</div>
          <div className="bg-yellow-700 p-2 rounded">2</div>
          <div className="bg-yellow-800 p-2 rounded">3</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="grid grid-cols-3 gap-2">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>grid-template-columns</code> defines the number of columns in a grid.</p>
      </section>

      {/* 7. Grid-column (start / end) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grid-column (start / end)</h2>
        <div className="grid grid-cols-4 gap-2 bg-yellow-100 p-4 text-center text-white max-w-md rounded">
          <div className="bg-yellow-600 p-2 rounded col-span-2">Span 2 cols</div>
          <div className="bg-yellow-700 p-2 rounded">1 col</div>
          <div className="bg-yellow-800 p-2 rounded">1 col</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="grid grid-cols-4 gap-2">
  <div className="col-span-2">Span 2 cols</div>
  <div>1 col</div>
  <div>1 col</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>grid-column</code> lets an item span multiple columns.</p>
      </section>

      {/* 8. Gap */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Gap</h2>
        <div className="grid grid-cols-3 gap-6 bg-teal-100 p-4 text-center text-white max-w-md rounded">
          <div className="bg-teal-600 p-2 rounded">Gap 6</div>
          <div className="bg-teal-700 p-2 rounded">Gap 6</div>
          <div className="bg-teal-800 p-2 rounded">Gap 6</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="grid grid-cols-3 gap-6">
  <div>Gap 6</div>
  <div>Gap 6</div>
  <div>Gap 6</div>
</div>`}</code>
        </pre>
        <p className="mt-2">Sets the spacing between grid or flex items.</p>
      </section>

      {/* 9. Align-items */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Align-items</h2>
        <div className="flex items-center h-24 bg-red-100 p-4 gap-4 max-w-lg">
          <div className="bg-red-600 text-white p-2 rounded h-12 w-12 flex items-center justify-center">A</div>
          <div className="bg-red-700 text-white p-2 rounded h-16 w-16 flex items-center justify-center">B</div>
          <div className="bg-red-800 text-white p-2 rounded h-8 w-8 flex items-center justify-center">C</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="flex items-center">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>align-items</code> centers flex items vertically inside the container.</p>
      </section>

      {/* 10. Justify-content */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Justify-content</h2>
        <div className="flex justify-between bg-purple-200 p-4 gap-4 max-w-lg rounded">
          <div className="bg-purple-700 text-white p-2 rounded w-16 text-center">Left</div>
          <div className="bg-purple-700 text-white p-2 rounded w-16 text-center">Center</div>
          <div className="bg-purple-700 text-white p-2 rounded w-16 text-center">Right</div>
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-4">
          <code>{`<div className="flex justify-between">
  <div>Left</div>
  <div>Center</div>
  <div>Right</div>
</div>`}</code>
        </pre>
        <p className="mt-2"><code>justify-content</code> spaces flex items horizontally.</p>
      </section>
      {/* 11. align-self */}
<section>
  <h2 className="text-2xl font-semibold mb-2">Align-self</h2>
  <div className="flex bg-purple-100 p-4" style={{ height: 100 }}>
    <div className="bg-purple-400 p-2 text-white self-start">Start</div>
    <div className="bg-purple-600 p-2 text-white self-center">Center</div>
    <div className="bg-purple-800 p-2 text-white self-end">End</div>
  </div>
  <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2">
    <code>{`<div className="flex" style={{ height: 100 }}>
  <div className="self-center">Center</div>
  <div className="self-end">End</div>
</div>`}</code>
  </pre>
  <p className="mt-2">
    <code>align-self</code> overrides <code>align-items</code> for a single flex item.
  </p>
</section>

{/* 12. place-content */}
<section>
  <h2 className="text-2xl font-semibold mb-2">Place-content</h2>
  <div className="grid place-content-center bg-gray-200" style={{ height: 120, width: 300 }}>
    <div className="bg-gray-600 text-white p-4">Centered content</div>
  </div>
  <pre className="bg-gray-100 p-4 rounded overflow-x-auto mt-2">
    <code>{`<div className="grid place-content-center" style={{ height: 120, width: 300 }}>
  <div>Centered content</div>
</div>`}</code>
  </pre>
  <p className="mt-2">
    <code>place-content</code> aligns the entire grid content block both vertically and horizontally.
  </p>
</section>

    </div>
  );
}


function ImportantClasses() {
  return (
    <div className="flex flex-col items-center bg-blue-500 p-10 rounded-lg shadow-md text-white space-y-10">
      <h3 className="text-2xl font-bold text-amber-300">Important Classes</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>layout</li>
        <li className="text-red-300 bg-orange-500">bg-red-500</li>
        <li className="text-green-300">bg-green-500</li>
        <li className="text-yellow-300">bg-yellow-500</li>
      </ul>
    </div>
  )
}

function SelectorTypes() {
  return (
    <>
       <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md m-10">
      <div className="bg-amber-200 -mx-6 px-6 py-4 mt-0 mb-0">
        <h1 className="text-center text-5xl font-bold m-0">Selector Types in tailwindcss</h1>
      </div>
      
      <table className="min-w-full border-collapse border border-gray-300 text-left">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border border-gray-300 px-4 py-2">Selector Type</th>
            <th className="border border-gray-300 px-4 py-2">CSS Syntax Example</th>
            <th className="border border-gray-300 px-4 py-2">Tailwind Arbitrary Variant Syntax Example</th>
            <th className="border border-gray-300 px-4 py-2">Use Case / Explanation</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Type Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>div</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[div]:text-red-500</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets all &lt;div&gt; elements</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Class Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>.btn</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[.btn]:bg-blue-500</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets elements with class <code>btn</code></td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">ID Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>#header</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[#header]:p-4</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets element with id <code>header</code></td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Universal Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>*</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[*]:m-2</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets all elements</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Child Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>div &gt; *</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>"[{">"}*]"":m-4</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets all direct children of a div</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Descendant Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>div p</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[div p]:text-green-500</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets all &lt;p&gt; inside &lt;div&gt; at any depth</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Adjacent Sibling</td>
            <td className="border border-gray-300 px-4 py-2"><code>h1 + p</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[h1+p]:mt-2</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets &lt;p&gt; immediately following &lt;h1&gt;</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">General Sibling</td>
            <td className="border border-gray-300 px-4 py-2"><code>h1 ~ p</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[h1~p]:mt-2</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets all &lt;p&gt; siblings after &lt;h1&gt;</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Attribute Selector</td>
            <td className="border border-gray-300 px-4 py-2"><code>[type="text"]</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[[type="text"]]:border</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets elements with attribute <code>type="text"</code></td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Pseudo-class</td>
            <td className="border border-gray-300 px-4 py-2"><code>:hover</code></td>
            <td className="border border-gray-300 px-4 py-2">hover:bg-blue-500 (standard Tailwind)</td>
            <td className="border border-gray-300 px-4 py-2">Applies style on hover state</td>
          </tr>
          <tr className="even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">Pseudo-class (custom)</td>
            <td className="border border-gray-300 px-4 py-2"><code>:nth-child(2)</code></td>
            <td className="border border-gray-300 px-4 py-2"><code>[:nth-child(2)]:text-red-500</code></td>
            <td className="border border-gray-300 px-4 py-2">Targets the 2nd child element</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App