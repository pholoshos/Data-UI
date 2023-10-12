// AllComponents.js

// Create a Table Component
const createTable = (data) => {
  if (!Array.isArray(data)) {
    return "";
  }

  const headers = data[0] ? Object.keys(data[0]) : [];
  const tableRows = data.map((item, index) => {
    const rowCells = headers
      .map((header) => `<td class=" px-5 py-3">${item[header]}</td>`)
      .join("");
    return `<tr class="border-b hover:bg-gray-100">${rowCells}</tr>`;
  });

  const tableHTML = `
        <div class="relative overflow-x-auto">
          <table class="w-full round-lg text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr class="hover:bg-gray-100">
                ${headers
                  .map(
                    (header) =>
                      `<th scope="col" class="px-6 py-4">${header}</th>`
                  )
                  .join("")}
              </tr>
            </thead>
            <tbody class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              ${tableRows.join("")}
            </tbody>
            <tfoot>
              <tr class="px-6 py-4 hover:bg-gray-100">
                <td colspan="${headers.length}" class="text-right pr-4 py-3">
                  Total Count: ${data.length}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      `;

  return tableHTML;
};

// Create a List Component
const createList = (items) => {
  if (!Array.isArray(items)) {
    return "";
  }

  const listItems = items.map((item) => `<li>${item}</li>`).join("");

  const listHTML = `
      <ul>
        ${listItems}
      </ul>
    `;

  return listHTML;
};

// Create a Navbar Component
const createNavBar = (links) => {
  if (!Array.isArray(links)) {
    return "";
  }

  const navLinks = links
    .map(
      (link) => `<li>
    <a href="${link.url}" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-500 dark:hover:bg-gray-700 group">
        <svg class="w-3 h-3 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="14" fill="currentColor" viewBox="0 0 20 14">
            <path d="M18.7 4.531 14.866.84A2.985 2.985 0 0 0 12.784 0H1.969A1.987 1.987 0 0 0 0 2v10a1.987 1.987 0 0 0 1.969 2h10.736a3.004 3.004 0 0 0 2.221-.983l3.912-4.309a3.023 3.023 0 0 0-.138-4.177Z"/>
        </svg>
        
  		<span class="ml-3">${link.text}</span>

    </a>
</li>`
    )
    .join("");

  const navBarHTML = `
    <ul class="space-y-2 font-medium">

        <div class="p-4 mb-4 mt-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
            <span class="font-medium">${links.length}</span>  Dynamic Pages
        </div>
        ${navLinks}

    </ul>
    `;

  return navBarHTML;
};

// Create a Card Component
const createCard = (title, content) => {
  const cardHTML = `
      <div class="card">
        <div class="card-title">${title}</div>
        <div class="card-content">${content}</div>
      </div>
    `;

  return cardHTML;
};

// Create a Button Component
const createButton = (label, onClick) => {
  const buttonHTML = `
      <button onclick="${onClick}" type="button" class="py-2.5 my-4 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">${label}</button>
    `;

  return buttonHTML;
};

// Create a Form Component
const createForm = (fields) => {
  const formFields = fields
    .map(
      (field) => `
      <label for="${field.name}">${field.label}</label>
      <input  type="${field.type}" id="${field.name}" name="${field.name}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    `
    )
    .join("");

  const formHTML = `
      <form>
        ${formFields}
      </form>
    `;

  return formHTML;
};

// Export all the components
module.exports = {
  createTable,
  createList,
  createNavBar,
  createCard,
  createButton,
  createForm,
};
