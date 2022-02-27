<script lang="ts">
    import { pop, push } from "svelte-spa-router";
    import { article, channel, channelRows, fetchArticle } from "../../store/talk";
    import { get } from "svelte/store";
    import { createArticle, updateArticle } from "../../api/talk";
    import { hasPermission } from "../../utils";

    export let params = { talkId: null, channelId: null, articleId: null };

    let talkId = parseInt(params.talkId) || null;
    let channelId = parseInt(params.channelId) || null;
    let articleId = parseInt(params.articleId) || null;

    let editMode = false;
    let title = "";
    let content = "";

    const init = async () => {
        if (articleId) {
            await fetchArticle(talkId, channelId, articleId);

            article.subscribe((articleInfo: any) => {
                title = articleInfo.title;
                content = articleInfo.content;
                editMode = true;
            });
        }
    };

    const writeArticle = () => {
        if (title.length < 2 || title.length > 50) {
            alert("제목은 2자 이상, 50자 이하로 입력해주세요.");
            return;
        }
        if (content.length < 2 || content.length > 10000) {
            alert("글 내용을 2자 이상, 10,000자 이하로 입력해주세요.");
            return;
        }

        if (editMode) {
            updateArticle(talkId, channelId, articleId, title, content)
                .then(() => {
                    title = "";
                    content = "";
                    push(`/talk/${talkId}/${channelId}/${articleId}`);
                })
                .catch((e) => {
                    if (
                        e.response.status === 429 ||
                        e.response.status === 400 ||
                        e.response.status === 401
                    ) {
                        alert(e.response.data.message);
                        return;
                    }
                    alert("서버에서 작성정보를 불러오는데 실패 했습니다.");
                    window.location.reload();
                });
        } else {
            createArticle(talkId, channelId, title, content)
                .then(() => {
                    title = "";
                    content = "";
                    channelId = null;

                    const channelInfo: any = get(channel);
                    push(`/talk/${channelInfo.talk_id}/${channelInfo.id}?sort=new`);
                })
                .catch((e) => {
                    if (
                        e.response.status === 429 ||
                        e.response.status === 400 ||
                        e.response.status === 401
                    ) {
                        alert(e.response.data.message);
                        return;
                    }
                    alert("서버에서 작성정보를 불러오는데 실패 했습니다.");
                    window.location.reload();
                });
        }
    };

    init();
</script>

<style lang="scss">
    .article-write {
        .article-write-form {
            margin-top: 0;
            padding: 16px;
            z-index: 0;
            border-top: 1px solid #ebeef1;
            background: #f8f9fa;
            line-height: 18px;
            font-size: 14px;
            color: #7b858e;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
            .article-write-header {
                position: static;
                background: #fff;
                text-align: left;
                padding: 18px 0 17px;
                padding-bottom: 0;
                padding-top: 8px;
                .article-write-title {
                    line-height: 21px;
                    font-size: 18px;
                    color: #1e2022;
                    font-weight: 700;
                }
            }
            .article-write-input {
                margin-top: 16px;
                &.mt24 {
                    margin-top: 24px;
                }
                .article-write-input-text {
                    display: block;
                    width: 100%;
                    z-index: 1;
                    background-color: #fff;
                    border: 1px solid #dddfe4;
                    padding: 10px 16px 9px;
                    line-height: 19px;
                    font-size: 16px;
                    color: #1e2022;
                    box-sizing: border-box;
                }
                .article-write-input-textarea {
                    display: block;
                    width: 100%;
                    background-color: #fff;
                    border: 1px solid #dddfe4;
                    padding: 10px 16px 9px;
                    line-height: 19px;
                    height: 500px;
                    font-size: 16px;
                    color: #1e2022;
                    box-sizing: border-box;
                    overflow-wrap: break-word;

                    z-index: 1;
                    min-height: 40px;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    resize: none;
                    outline: none;
                    font-family: Helvetica, Arial, Malgun Gothic, sans-serif;
                }
                .article-write-label {
                    display: block;
                    position: relative;
                    .article-write__select {
                        position: relative;
                        border: 1px solid #dddfe4;
                        border-radius: 4px;
                        margin: 0;
                        padding: 10px 38px 9px 15px;
                        line-height: 19px;
                        font-size: 16px;
                        color: #1e2022;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background: url(https://talk.op.gg/images/icon-dropdown-down@2x.png);
                        background-color: #fff;
                        background-size: 24px;
                        background-position: top 8px right 8px;
                        background-repeat: no-repeat;
                    }
                }
            }
        }
        .article-write-buttons {
            position: static;
            .article-write__button {
                margin-top: 16px;
                line-height: 19px;
                font-size: 16px;
                cursor: pointer;
                border-radius: 4px;
                width: 154px;
                height: 48px;

                &.left {
                    float: left;
                    color: #7b858e;
                    background-color: #fff;
                    border: 1px solid #dddfe4;
                }
                &.right {
                    float: right;
                    color: #fff;
                    background-color: #46cfa7;
                    border: none;
                }
            }
        }
    }
</style>

<section class="article-write">
    <div class="article-write-form">
        <div class="article-write-header">
            <div class="article-write-title">글쓰기</div>
        </div>
        {#if channelId}
            <div class="article-write-input mt24">
                <label class="article-write-label">
                    <select class="article-write__select" bind:value={channelId}>
                        <option value hidden>채널 선택</option>
                        {#each $channelRows as channel}
                            {#if channel.permissions && hasPermission(channel.permissions["ARTICLE_CREATE"].grade_id)}
                                <option value={channel.id}>{channel.display_name}</option>
                            {/if}
                        {/each}
                    </select>
                </label>
            </div>
            <div class="article-write-input">
                <input class="article-write-input-text" placeholder="제목" bind:value={title} />
            </div>

            <div class="article-write-input">
                <textarea
                    class="article-write-input-textarea"
                    maxlength="10000"
                    placeholder="불법촬영물등을 게재할 경우 전기통신사업법 제22조의5제1항에 따라 삭제·접속차단 등의 조치가 취해질 수 있으며 관련 법률에 따라 처벌받을 수 있습니다."
                    bind:value={content} />
            </div>
        {/if}
    </div>

    <div class="article-write-buttons">
        <button class="article-write__button left" on:click={() => pop()}>취소</button>
        <button class="article-write__button right" on:click={writeArticle}>작성완료</button>
    </div>
</section>
