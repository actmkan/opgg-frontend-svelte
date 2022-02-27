<script lang="ts">
    import TalkInfo from "../components/talk/TalkInfo.svelte";
    import Sidebar from "../components/talk/Sidebar.svelte";
    import SubHeader from "../components/talk/SubHeader.svelte";
    import ArticleList from "../components/talk/ArticleList.svelte";
    import { articles, fetchChannels, fetchTalk, pagination, setChannel } from "../store/talk";
    import { DEFAULT_PAGINATION } from "../constants";

    export let params = { talkId: null, channelId: null };

    //TODO:: 새로고침시 작동안함
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sort = urlParams.get("sort") || "new";

    const init = async () => {
        await articles.set([]);
        await pagination.set(DEFAULT_PAGINATION);
        await fetchTalk(params.talkId);
        await fetchChannels(params.talkId);
        await setChannel(params.talkId, params.channelId, sort);
    };

    init();
</script>

<style lang="scss">
    .container {
        background: #ebeef1;
        overflow: hidden;
        .talk-content {
            margin: 0 auto;
            margin-top: -40px;
            display: flex;
            position: relative;
            max-width: 1044px;
            > .content {
                float: right;
                box-sizing: border-box;
                width: 728px;
            }
        }
    }
</style>

<div class="container">
    <TalkInfo />
    <div class="talk-content">
        <Sidebar />
        <div class="content">
            <SubHeader />
            <ArticleList />
        </div>
    </div>
</div>
