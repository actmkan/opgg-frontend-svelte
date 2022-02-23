import Home from "./pages/Home.svelte";
import Login from "./pages/Login.svelte";
import Talk from "./pages/Talk.svelte";

const routes = {
  "/": Home,
  "/login": Login,
  "/talk/:talkId/:channelId": Talk,
};

export default routes;
