const createHTMLPage = (contents, pageName, sidebar) => {
  // Create a basic HTML structure with head and body elements
  const htmlString = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${pageName}</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.css" rel="stylesheet" />
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
            <style>
              /* Add custom styles for Gmail-like sidebar */
              .sidebar {
                width: 250px;
                box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
              }

              .content {
                width:100%
              }
            </style>
          </head>
          <body class="bg-gray-100" >

          <div class="bg-gray-100 flex">
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-4 py-8 overflow-y-auto bg-gray-400 dark:bg-gray-800">
                    <h1 class="text-4xl text-gray-700 font-bold">Data-UI</h1>
                    ${sidebar}
                </div>
            </aside>
            <div  class="p-4 sm:ml-64 content">
              ${contents.join("")}
            </div>
          </div>
          <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </footer>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
          </body>
        </html>
      `;
  return htmlString;
};

const updateContentArray = (newContent, oldArray) => {
  const updatedArray = [...oldArray, newContent];
  return updatedArray;
};

const getPageType = (page, data = []) => {
  return data.find((d) => d.name == page);
};

module.exports = { createHTMLPage, updateContentArray, getPageType };
