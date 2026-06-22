import app from "./app";
import "dotenv/config";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
