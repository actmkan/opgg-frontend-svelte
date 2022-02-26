import Home from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Talk from "./pages/Talk.svelte";
import Article from "./pages/Article.svelte";

const routes = {
  "/": Home,
  "/login": Login,
  "/talk/:talkId/:channelId": Talk,
  "/talk/:talkId/:channelId/:articleId": Article,
};

export default routes;
