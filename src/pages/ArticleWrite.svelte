<script lang="ts">
    import TalkInfo from "../components/talk/TalkInfo.svelte";
    import Sidebar from "../components/talk/Sidebar.svelte";
    import { fetchChannels, fetchTalk, setChannel, sort } from "../store/talk";
    import ArticleWriteForm from "../components/talk/ArticleWriteForm.svelte";
    import { get } from "svelte/store";

    export let params = { talkId: null, channelId: null, articleId: null };

    console.log(params);
    const init = async () => {
        await fetchTalk(params.talkId);
        await fetchChannels(params.talkId);
        await setChannel(params.talkId, params.channelId, get(sort), false);
        // await fetchArticle(params.talkId, params.channelId, params.articleId);
        // await fetchComments(params.talkId, params.channelId, params.articleId, 1);
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
            <ArticleWriteForm params={params} />
        </div>
    </div>
</div>
