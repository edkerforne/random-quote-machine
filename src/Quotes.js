/* Requests all quotes from the API and
 * invokes a callback function on success
 */
export const getAllQuotes = callback => {
  const url = "https://type.fit/api/quotes";

  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", () => {
    if (req.status >= 200 && req.status < 400) {
      callback(req.responseText);
    } else {
      console.error(`${req.status} ${req.statusText} ${req.responseURL}`);
    }
  });
  req.addEventListener("error", () => {
    console.error(`Network error with URL ${url}`);
  });
  req.send(null);
};
