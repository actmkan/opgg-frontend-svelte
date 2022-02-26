<script lang="ts">
    import {
        article,
        commentPagination,
        comments,
        commentSort,
        fetchComments,
        onLike,
        setCommentSort,
    } from "../../store/talk";
    import { authToken } from "../../store/auth";
    import { createComment } from "../../api/talk";
    import { get } from "svelte/store";

    let commentText = "";
    let replyCommentText = "";
    let selectedParentId = null;
    let isLogin = false;

    const writeComment = (articleId, parentId, content, imageId) => {
        if (content.length < 2 || content.length > 1000) {
            alert("2자 이상, 1000자 이하로 입력해주세요.");
            return;
        }

        createComment(articleId, parentId, content, imageId)
            .then((r) => {
                console.log(r);

                commentText = "";
                replyCommentText = "";
                selectedParentId = null;

                const articleInfo: any = get(article);
                fetchComments(articleInfo.talk_id, articleInfo.channel_id, articleId, 1);
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
                alert("서버에서 댓글 목록을 불러오는데 실패 했습니다.");
                window.location.reload();
            });
    };

    authToken.subscribe((v) => {
        isLogin = !!v;
    });
</script>

<style lang="scss">
    .comment-list-wrap {
        margin-top: 8px;
        margin-bottom: 8px;
        border-top: 1px solid #ebeef1;
        background: #fff;
        line-height: 18px;
        font-size: 14px;
        color: #7b858e;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        .comment-header {
            position: relative;
            padding: 16px;
            .comment-title {
                display: inline;
                line-height: 21px;
                font-size: 18px;
                color: #1e2022;
            }
            .comment-count {
                line-height: 18px;
                font-size: 14px;
                color: #7b858e;
                em {
                    color: #16ae81;
                    font: inherit;
                }
            }
        }
        .comment-content-wrap {
            .comment-sort {
                border-bottom: 1px solid #dddfe4;
                padding: 0 16px;
                .comment-sort-list {
                    list-style: none;
                    display: flex;
                    .comment-sort-item {
                        cursor: pointer;
                        padding: 15px 16px 11px;
                        line-height: 19px;
                        font-size: 16px;
                        color: #1e2022;
                        border-bottom: 3px solid transparent;
                        &.active {
                            border-bottom: 3px solid #46cfa7;
                            color: #16ae81;
                        }
                    }
                }
            }
            .comment-list {
                list-style: none;
                .comment-item {
                    position: relative;
                    border-top: 1px solid #dddfe4;
                    &:first-child {
                        border-top: 0;
                    }
                    .comment {
                        position: relative;
                        padding: 12px 12px 12px 64px;
                        &.reply {
                            background: #f8f9fa;
                            padding-left: 92px;
                            &::before {
                                position: absolute;
                                top: 12px;
                                left: 64px;
                                content: "";
                                width: 12px;
                                height: 12px;
                                border-left: 1px solid #c5cbd0;
                                border-bottom: 1px solid #c5cbd0;
                            }
                        }
                        .comment-vote {
                            position: absolute;
                            left: 0;
                            top: 12px;
                            width: 64px;
                            text-align: center;
                            .comment-vote-button {
                                background: none;
                                cursor: pointer;
                                font-family: inherit;
                                border: 0;
                                padding: 0;
                                width: 16px;
                                height: 16px;
                                background-repeat: no-repeat;
                                background-position: 0 0;
                                background-size: 16px;
                                line-height: 999px;
                                vertical-align: top;
                                overflow: hidden;
                                margin-top: 4px;
                                &.up {
                                    background-image: url(https://talk.op.gg/images/icon-vote-up@2x.png);
                                    &.on {
                                        background-image: url(https://talk.op.gg/images/icon_vote_up_on@2x.png);
                                    }
                                }
                                &.down {
                                    background-image: url(https://talk.op.gg/images/icon-vote-down@2x.png);
                                    &.on {
                                        background-image: url(https://talk.op.gg/images/icon_vote_down_on@2x.png);
                                    }
                                }
                            }
                        }
                        .comment-meta {
                            line-height: 17px;
                            font-size: 14px;
                            color: #7b858e;
                            .comment-name {
                                font-weight: 700;
                                color: #1e2022;
                                word-wrap: break-word;
                                word-break: break-all;
                            }
                            .comment-date {
                                &::after {
                                    display: inline-block;
                                    content: "";
                                    height: 12px;
                                    border-left: 1px solid #ebeef1;
                                    margin-left: 4px;
                                    padding-left: 8px;
                                }
                            }
                        }
                        .comment-content {
                            margin-top: 8px;
                            line-height: 20px;
                            font-size: 14px;
                            color: #1e2022;
                            word-wrap: break-word;
                            word-break: break-all;
                            overflow: auto;
                            max-height: 400px;
                        }
                        .comment-button {
                            margin-top: 8px;
                            .comment-button-item {
                                cursor: pointer;
                                line-height: 17px;
                                font-size: 14px;
                                color: #7b858e;
                                > img {
                                    margin-right: 8px;
                                    vertical-align: middle;
                                    width: 16px;
                                    height: 16px;
                                }
                                > span {
                                    vertical-align: middle;
                                }
                            }
                        }
                    }
                }
            }
        }
        .comment-more {
            cursor: pointer;
            margin-top: 8px;
            text-align: center;
            background-color: #fff;
            width: 100%;
            height: 56px;
            line-height: 56px;
            font-size: 16px;
            color: #7b858e;
        }
        .comment-write {
            background: #f8f9fa;
            padding: 24px 16px;
            .comment-write-inner {
                background-color: #fff;
                border: 1px solid #dddfe4;
                .comment-write-content {
                    margin: 8px 16px 0;
                    padding-bottom: 16px;
                    padding-top: 5px;
                    > textarea {
                        overflow: hidden;
                        overflow-wrap: break-word;
                        display: block;
                        width: 100%;
                        z-index: 1;
                        min-height: 40px;
                        line-height: 20px;
                        font-size: 14px;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        resize: none;
                        border: none;
                        outline: none;
                        font-family: Helvetica, Arial, Malgun Gothic, sans-serif;
                    }
                }
                .comment-write-footer {
                    position: relative;
                    border-top: 1px solid #dddfe4;
                    min-height: 42px;
                    box-sizing: border-box;
                    padding-right: 186px;
                    .comment-write-addition {
                        position: relative;
                        vertical-align: top;
                        white-space: nowrap;
                    }
                    .comment-write-length {
                        font-size: 14px;
                        line-height: 17px;
                        color: #7b858e;
                        position: absolute;
                        right: 120px;
                        bottom: 12px;
                    }
                    .comment-write-submit {
                        cursor: pointer;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 92px;
                        padding: 10px 9px;
                        line-height: 20px;
                        font-size: 16px;
                        border-radius: 0;
                        border-color: #46cfa7;
                        background-color: #46cfa7;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>

<section class="comment-list-wrap">
    <div class="comment-header">
        <h2 class="comment-title">댓글</h2>
        {#if $article}
            <span class="comment-count"> 총 <em>{$article.comment_count}</em> 개 </span>
        {/if}
    </div>
    {#if isLogin}
        <div class="comment-write">
            <div class="comment-write-inner">
                <div class="comment-write-content">
                    <textarea
                        name="content"
                        maxlength="1000"
                        placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                        bind:value={commentText} />
                </div>
                <div class="comment-write-footer">
                    <div class="comment-write-addition" />
                    <div class="comment-write-length">({commentText.length}/1000)</div>
                    <div
                        class="comment-write-submit"
                        on:click={() => writeComment($article.id, null, commentText, null)}>
                        작성
                    </div>
                </div>
            </div>
        </div>
    {/if}
    {#if $comments}
        <div class="comment-content-wrap">
            <div class="comment-sort">
                <ul class="comment-sort-list">
                    <li
                        class={`comment-sort-item ${$commentSort === "top" ? "active" : ""}`}
                        on:click={() => setCommentSort("top")}>
                        인기순
                    </li>
                    <li
                        class={`comment-sort-item ${$commentSort === "new" ? "active" : ""}`}
                        on:click={() => setCommentSort("new")}>
                        최신순
                    </li>
                </ul>
            </div>
            <ul class="comment-list">
                {#each $comments as comment}
                    <li class="comment-item">
                        <div class="comment">
                            <div class="comment-vote">
                                <button
                                    class={`comment-vote-button up ${comment.on_like ? "on" : ""}`}
                                    on:click={() => onLike("COMMENT", comment.id, "LIKE")} />
                                <div class="comment-vote-count">
                                    {comment.like_count - comment.unlike_count}
                                </div>
                                <button
                                    class={`comment-vote-button down ${
                                        comment.on_unlike ? "on" : ""
                                    }`}
                                    on:click={() => onLike("COMMENT", comment.id, "UNLIKE")} />
                            </div>
                            <div class="comment-meta">
                                <span class="comment-name">{comment.user_nickname}</span>
                                <span class="comment-date">{comment.created_at_string}</span>
                            </div>
                            <div class="comment-content">
                                {comment.content}
                            </div>
                            {#if isLogin}
                                <div class="comment-button">
                                    <div
                                        class="comment-button-item"
                                        on:click={() => (selectedParentId = comment.id)}>
                                        <img
                                            src="https://talk.op.gg/images/icon-reply@2x.png"
                                            alt="" />
                                        <span>답글 쓰기</span>
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </li>
                    {#if selectedParentId === comment.id}
                        <li class="comment-item">
                            <div class="comment reply">
                                <div class="comment-write">
                                    <div class="comment-write-inner">
                                        <div class="comment-write-content">
                                            <textarea
                                                name="content"
                                                maxlength="1000"
                                                placeholder="주제와 무관한 댓글, 타인의 권리를 침해하거나 명예를 훼손하는 게시물은 별도의 통보 없이 제재를 받을 수 있습니다."
                                                bind:value={replyCommentText} />
                                        </div>
                                        <div class="comment-write-footer">
                                            <div class="comment-write-addition" />
                                            <div class="comment-write-length">
                                                ({replyCommentText.length}/1000)
                                            </div>
                                            <div
                                                class="comment-write-submit"
                                                on:click={() =>
                                                    writeComment(
                                                        $article.id,
                                                        selectedParentId,
                                                        replyCommentText,
                                                        null
                                                    )}>
                                                작성
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    {/if}
                    {#each comment.childes as child}
                        <li class="comment-item">
                            <div class="comment reply">
                                <div class="comment-meta">
                                    <span class="comment-name">{child.user_nickname}</span>
                                    <span class="comment-date">{child.created_at_string}</span>
                                </div>
                                <div class="comment-content">
                                    {child.content}
                                </div>
                            </div>
                        </li>
                    {/each}
                {/each}
            </ul>
        </div>
        {#if $commentPagination.currentPage < $commentPagination.lastPage}
            <div
                class="comment-more"
                on:click={() =>
                    fetchComments(
                        $article.talk_id,
                        $article.channel_id,
                        $article.id,
                        $commentPagination.currentPage + 1
                    )}>
                댓글 더보기
            </div>
        {/if}
    {/if}
</section>
