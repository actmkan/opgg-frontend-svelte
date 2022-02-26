<script lang="ts">
  import { link } from "svelte-spa-router";
  import { articles, pagination, fetchArticles } from "../../store/talk";
</script>

<style lang="scss">
  .article-list{
    margin-top: 0;
    border-top: 1px solid #ebeef1;
    background: #f8f9fa;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    .article-list-item{
      min-height: 40px;
      position: relative;
      display: table;
      table-layout: fixed;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid #ebeef1;
      background: #f8f9fa;
      padding: 8px 0;
      &:first-child{
        border-top: none;
      }
      &.notice{
        background: #ecf8ff;
        .article-list-item-vote{
          text-align: center !important;
          width: 82px !important;
          padding-left: 8px !important;
        }
        .post-title{
          color: #1ea1f7 !important;
          font-weight: 700;
        }
      }
      .article-list-item-vote{
        width: 70px;
        padding-left: 20px;
        text-align: left;
        vertical-align: middle;
        display: table-cell;
        > img{
          margin-right: 4px;
          vertical-align: middle;
        }
        > div{
          display: inline;
          margin-top: 5px;
          vertical-align: middle;
          line-height: 17px;
          font-size: 14px;
          color: #7b858e;
        }
      }
      .article-list-item-content{
        vertical-align: middle;
        display: flex;
        .article-list-item-info{
          flex: 1;
          .article-list-item-title{
            display: flex;
            overflow: auto;
            vertical-align: top;
            line-height: 23px;
            font-size: 14px;
            max-width: 480px;
            color: #1e2022;
            word-break: break-all;
            .post-title{
              display: block;
              max-width: 350px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              padding-right: 5px;
            }
            > em {
              color: #16ae81;
            }
          }
        }
        .article-list-item-meta{
          margin-top: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: table-cell;
          width: 212px;
          table-layout: fixed;
          .article-list-item-meta-item{
            width: 80px;
            padding-left: 0;
            padding-right: 8px;
            display: table-cell;
            line-height: 18px;
            font-size: 14px;
            color: #98a0a7;
          }
          .article-list-item-meta-item-author{
            width: 80px;
            padding-right: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100px;
            display: table-cell;
            padding-left: 0;
            line-height: 18px;
            font-size: 14px;
            color: #98a0a7;
          }
        }
      }
    }
    .article-list-paging{
      border-top: 1px solid #ebeef1;
      display: table;
      width: 100%;
      .article-list-paging-content{
        text-align: center;
        padding: 12px 16px;
        .article-list-paging-list {
          position: relative;
          list-style: none;
          .article-list-paging-item{
            margin: 0;
            padding: 0;
            border: 0;
            vertical-align: middle;
            min-width: 32px;
            display: inline-block;
            &.article-list-paging-item-next, .article-list-paging-item-prev {
              float: none;
              position: relative;
              z-index: 1;
            }
            &:first-child {
              margin-left: 0;
            }

            .article-list-paging-button{
              cursor: pointer;
              margin-left: 0;
              display: inline-block;
              box-sizing: border-box;
              text-align: center;
              line-height: 17px;
              font-size: 14px;
              color: #7b858e;
              border-radius: 4px;
              background-color: #fff;
              border: 1px solid #dddfe4;
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              img{
                vertical-align: middle;
              }
              span{
                vertical-align: middle;
              }
              &.prev{
                padding: 7px 16px 7px 7px;
              }
              &.next{
                padding: 7px 7px 7px 16px;
              }
            }
          }
        }
      }
    }
  }
</style>


<section class="article-list">
  {#each $articles as article}
    <article class={`article-list-item ${article.is_notice ? 'notice' : ''}`}>
      <div class="article-list-item-vote">
        {#if article.is_notice}
          <img src="https://talk.op.gg/images/icon_notice@2x.png" alt="" width="24" height="24">
        {:else}
          <img src="https://talk.op.gg/images/icon-vote-up.png" alt="">
          <div>{article.like_count - article.unlike_count}</div>
        {/if}
      </div>
      <div class="article-list-item-content">
        <a href={`/talk/${article.talk_id}/${article.channel_id}/${article.id}`} use:link class="article-list-item-info">
          <div class="article-list-item-title">
            <span class="post-title">{article.title}</span>
            {#if article.comment_count > 0}
              <em>[{article.comment_count}]</em>
            {/if}
          </div>
        </a>
        <div class="article-list-item-meta">
          <div class="article-list-item-meta-item">
            <span>{article.created_at_string}</span>
          </div>
          <div class="article-list-item-meta-item-author">
            <span>{article.user_nickname}</span>
          </div>
        </div>
      </div>
    </article>
  {/each}

  {#if $pagination}
    <section class="article-list-paging">
      <div class="article-list-paging-content">
        <ul class="article-list-paging-list">
          {#if $pagination.currentPage > 1}
            <li class="article-list-paging-item article-list-paging-item-prev">
              <div class="article-list-paging-button prev"
                   on:click={() => fetchArticles($pagination.currentPage - 1)}>
                <img src="https://talk.op.gg/images/icon-arrow-left@2x.png" width="24" alt="">
                <span>이전</span>
              </div>
            </li>
          {/if}
          {#if $pagination.currentPage < $pagination.lastPage}
            <li class="article-list-paging-item article-list-paging-item-next"
                on:click={() => fetchArticles($pagination.currentPage + 1)}>
              <div class="article-list-paging-button next">
                <span>다음</span><img src="https://talk.op.gg/images/icon-arrow-right@2x.png" width="24" alt="">
              </div>
            </li>
          {/if}
        </ul>
      </div>
    </section>
  {/if}
</section>
