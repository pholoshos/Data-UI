const express = require("express");
const {
  createHTMLPage,
  updateContentArray,
  getPageType,
} = require("../logic/utils/generateHtml");
const {
  createForm,
  createCard,
  createTable,
  createList,
  createButton,
  createNavBar,
} = require("../logic/utils/createComponents");
const router = express.Router();

// Example data array containing pages and their content
const pageDataArray = [
  {
    name: "Page1",
    type: "table",
    content: [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
    ],
  },
  {
    name: "Page2",
    type: "list",
    content: ["Item 1", "Item 2", "Item 3"],
  },
  // Add more pages and content types as needed
];

router.get("data/:data",(req,res)=>{
  res.send('data');
})


router.get("/:page", (req, res) => {
  const requestedPage = req.params.page;

  const pageOptions = {
    ...req.query,
  };

  console.log(pageOptions);
  const formFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
  ];

  const pageContent = getPageContent({
    page: requestedPage,
    options: pageOptions,
  });

  const navData = pageDataArray.map((d)=>{
    return {text:d.name,url : `/${d.name}?showEdit=true&showDownload=true&showFilter=true`}
  })

  const html = createHTMLPage(
    pageContent,
    requestedPage,
    createNavBar(navData)
  );

  if (html) {
    res.send(html);
  } else {
    res.status(404).send("Page not found");
  }
});

const getPageContent = ({ page, options }) => {
  const { type = "", content } = getPageType(page, pageDataArray);
  let contents = [];

  if (options) {
    // Add universal components based on options
    if (!!options.showFilter) {
      // Add a filter component
      contents.push(
        createForm([{ name: "Search", label: "Search", type: "text" }])
      );
    }
    if (!!options.showEdit) {
      // Add an edit component
      contents.push(createButton("Edit", () => {}));
    }

    if (!!options.showDownload) {
      // Add a download component
      contents.push(createButton("Download", () => {}));
    }
    if (!!options.showDelete) {
      // Add a delete component
      contents.push(createButton("Delete", () => {}));
    }
    if (!!options.showCreate) {
      // Add a create component
      contents.push(createButton("Create", () => {}));
    }
  }

  switch (type) {
    case "table":
      contents.push(
        createTable([
          { name: "John", age: 30, city: "New York" },
          { name: "Alice", age: 25, city: "Los Angeles" },
          { name: "Bob", age: 35, city: "Chicago" },
          { name: "Eva", age: 28, city: "San Francisco" },
          { name: "Mike", age: 32, city: "Miami" },
        ])
      );
      break;
    case "list":
      // Create a list component with options.items
      if (options && options.items) {
        contents.push(createList(options.items));
      } else {
        // If items are not provided, create an empty list
        contents.push(createList([]));
      }
      break;
    // Add more cases for other page types if needed

    default:
      // Handle unsupported page types
      contents.push("Unsupported Page Type: ");
      break;
  }

  return contents;
};

module.exports = router;
