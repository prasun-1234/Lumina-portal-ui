

export  const extractInnerText = (htmlString) => {
   const tempDiv = document.createElement('div');
   tempDiv.innerHTML = htmlString;
   return tempDiv.textContent || tempDiv.innerText || '';
};