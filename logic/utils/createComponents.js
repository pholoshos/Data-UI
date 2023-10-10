// AllComponents.js

// Create a Table Component
const createTable = (data) => {
  if (!Array.isArray(data)) {
    return "";
  }

  const headers = data[0] ? Object.keys(data[0]) : [];
  const tableRows = data.map((item, index) => {
    const rowCells = headers
      .map((header) => `<td>${item[header]}</td>`)
      .join("");
    return `<tr>${rowCells}</tr>`;
  });

  const tableHTML = `
      <table>
        <thead>
          <tr>
            ${headers.map((header) => `<th>${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${tableRows.join("")}
        </tbody>
      </table>
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
    .map((link) => `<a href="${link.url}">${link.text}</a>`)
    .join("");

  const navBarHTML = `
      <nav>
        ${navLinks}
      </nav>
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
      <button onclick="${onClick}">${label}</button>
    `;

  return buttonHTML;
};

// Create a Form Component
const createForm = (fields) => {
  const formFields = fields
    .map(
      (field) => `
      <label for="${field.name}">${field.label}</label>
      <input type="${field.type}" id="${field.name}" name="${field.name}">
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
