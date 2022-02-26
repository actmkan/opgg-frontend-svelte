import Home from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Talk from "./pages/Talk.svelte";
import Article from "./pages/Article.svelte";
import ArticleWrite from "./pages/ArticleWrite.svelte";

const routes = {
    "/": Home,
    "/login": Login,
    "/talk/:talkId/:channelId": Talk,
    "/talk/:talkId/:channelId/write": ArticleWrite,
    "/talk/:talkId/:channelId/:articleId": Article,
    "/talk/:talkId/:channelId/:articleId/write": ArticleWrite,
};

export default routes;
