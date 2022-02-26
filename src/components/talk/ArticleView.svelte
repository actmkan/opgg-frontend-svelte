<script lang="ts">
    import { pop, push } from "svelte-spa-router";
    import { article, channel, onLike } from "../../store/talk";
    import { deleteArticle } from "../../api/talk";

    const onDelete = () => {
        if (confirm("해당 글을 정말 삭제하시겠습니까?")) {
            deleteArticle($article.id)
                .then(() => {
                    pop();
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
                    alert("서버에서 글 정보를 불러오는데 실패 했습니다.");
                    window.location.reload();
                });
        }
    };
</script>

<style lang="scss">
    .article-view {
        margin-top: 0;
        border-top: 1px solid #ebeef1;
        background: #f8f9fa;
        line-height: 18px;
        font-size: 14px;
        color: #7b858e;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        .article-header {
            padding: 24px;
            border-bottom: 1px solid #ebeef1;
            .article-title {
                line-height: 36px;
                font-size: 24px;
                color: #1e2022;
                word-wrap: break-word;
                word-break: break-all;
                overflow: auto;
            }
            .article-meta {
                margin-top: 9px;
                line-height: 17px;
                height: 17px;
                font-size: 14px;
                color: #7b858e;
                .article-meta-list {
                    float: left;
                    margin-top: 0;
                    .article-meta-item {
                        display: inline-block;
                        line-height: 18px;
                        font-size: 14px;
                        color: #98a0a7;
                        padding-left: 8px;
                        margin-left: 8px;
                        border-left: 1px solid #dddfe4;
                        &:first-child {
                            padding-left: 0;
                            margin-left: 0;
                            border-left: none;
                        }
                    }
                    &.right {
                        float: right;
                    }
                }
            }
            .article-action {
                margin-top: 16px;
                .article-action__item {
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 15px;
                    font-size: 12px;
                    padding: 8px 15px 7px;
                    border-radius: 4px;
                    cursor: pointer;
                    &:first-child {
                        margin-left: 0;
                    }
                    &.delete {
                        border: 1px solid #f95b54;
                        background: #fff;
                        color: #f95b54;
                    }
                    &.edit {
                        color: inherit;
                        background-color: #fff;
                        border: 1px solid #dddfe4;
                    }
                }
            }
        }
        .article-content-wrap {
            position: relative;
            overflow: auto;
            .article-content {
                width: 100%;
                box-sizing: border-box;
                padding: 24px;
                line-height: 24px;
                font-size: 16px;
                color: #1e2022;
                word-wrap: break-word;
                word-break: break-word;
            }
        }
        .article-box {
            border-top: 1px solid #ebeef1;
            border-bottom: 1px solid #ebeef1;
            text-align: center;
            .article-vote {
                display: inline-block;
                vertical-align: middle;
                width: 250px;
                padding: 12px 0;
            }
        }
        .article-ward {
            display: inline-block;
            vertical-align: middle;
            padding: 12px 0;
        }
        .article-button {
            padding: 12px;
            display: inline-block;
            line-height: 17px;
            font-size: 14px;
            height: 17px;
            cursor: pointer;
            color: #1e2022;
            background-color: #fff;
            border: 1px solid #dddfe4;
            border-radius: 4px;
            margin-left: 0;
            &.like {
                min-width: 88px;
            }
            &.ml {
                margin-left: 8px;
            }
            .article-button-icon {
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                background-position: 0 0;
                background-size: 16px;
                line-height: 999px;
                vertical-align: top;
                overflow: hidden;
                display: inline-block;
                margin-top: 1px;
                transition: all 0.5s;
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
                &.ward {
                    background-image: url(https://talk.op.gg/images/icon_ward.png);
                    &.on {
                        background-image: url(https://talk.op.gg/images/icon_ward_on.png);
                    }
                }
            }
            .article-button-count {
                display: inline-block;
                transition: all 0.3s;
            }
        }
    }
</style>

<section class="article-view">
    {#if $article}
        <div class="article-header">
            <div class="article-title">{$article.title}</div>
            <div class="article-meta">
                <div class="article-meta-list">
                    <div class="article-meta-item">
                        <span>{$channel.display_name}</span>
                    </div>
                    <div class="article-meta-item">
                        <span>{$article.created_at_string}</span>
                    </div>
                    <div class="article-meta-item">
                        <span>{$article.user_nickname}</span>
                    </div>
                </div>
                <div class="article-meta-list right">
                    <div class="article-meta-item">
                        <span>조회 {$article.view_count}</span>
                    </div>
                    <div class="article-meta-item">
                        <span>댓글 {$article.comment_count}</span>
                    </div>
                    <div class="article-meta-item">
                        <span>추천 {$article.like_count - $article.unlike_count}</span>
                    </div>
                </div>
            </div>
            {#if $article.same_writer}
                <div class="article-action">
                    <div class="article-action__item delete" on:click={onDelete}>삭제</div>
                    <div
                        class="article-action__item edit"
                        on:click={() =>
                            push(
                                `/talk/${$article.talk_id}/${$article.channel_id}/${$article.id}/write`
                            )}>
                        수정
                    </div>
                </div>
            {/if}
        </div>
        <div class="article-content-wrap">
            <div class="article-content">
                {$article.content}
            </div>
        </div>
        <div class="article-box">
            <div class="article-vote">
                <div
                    class="article-button like"
                    on:click={() => onLike("ARTICLE", $article.id, "LIKE")}>
                    <div class={`article-button-icon up ${$article.on_like ? "on" : ""}`} />
                    <div class="article-button-count">{$article.like_count}</div>
                </div>
                <div
                    class="article-button like ml"
                    on:click={() => onLike("ARTICLE", $article.id, "UNLIKE")}>
                    <div class={`article-button-icon down ${$article.on_unlike ? "on" : ""}`} />
                    <div class="article-button-count">-{$article.unlike_count}</div>
                </div>
            </div>
            <!--            <div class="article-ward">-->
            <!--                <div class="article-button">-->
            <!--                    <div class={`article-button-icon ward ${$article.has_ward ? "on" : ""}`} />-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    {/if}
</section>
