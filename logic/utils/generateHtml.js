const createHTMLPage = (contents,pageName,navbar) => {
  // Create a basic HTML structure with head and body elements
  const htmlString = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pageName}</title>
        </head>
        <body>
            <div>${navbar}</div>
            <div>${contents.join("")}</div>
        </body>
      </html>
    `;
  return htmlString;
};

const updateContentArray = (newContent, oldArray) => {
  const updatedArray = [...oldArray, newContent];
  return updatedArray;
};

const getPageType = (page,data= [])=>{
    return data.find((d)=>d.name == page);
}

module.exports = { createHTMLPage,updateContentArray,getPageType };
