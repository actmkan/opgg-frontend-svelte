<script lang="ts">
    import TalkInfo from "../components/talk/TalkInfo.svelte";
    import Sidebar from "../components/talk/Sidebar.svelte";
    import {
        commentPagination,
        comments,
        commentSort,
        fetchArticle,
        fetchChannels,
        fetchComments,
        fetchTalk,
        setChannel,
    } from "../store/talk";
    import ArticleView from "../components/talk/ArticleView.svelte";
    import { DEFAULT_PAGINATION } from "../constants";
    import CommentList from "../components/talk/CommentList.svelte";

    export let params = { talkId: null, channelId: null, articleId: null };

    //TODO:: 새로고침시 작동안함
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sort = urlParams.get("sort") || "new";

    const init = async () => {
        await comments.set([]);
        await commentPagination.set(DEFAULT_PAGINATION);
        await commentSort.set("top");
        await fetchTalk(params.talkId);
        await fetchChannels(params.talkId);
        await setChannel(params.talkId, params.channelId, sort, false);
        await fetchArticle(params.talkId, params.channelId, params.articleId);
        await fetchComments(params.talkId, params.channelId, params.articleId, 1);
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
            <ArticleView />
            <CommentList />
        </div>
    </div>
</div>
