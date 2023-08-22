const app = require("./server.js");
const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
