<script lang="ts">
  import { link } from "svelte-spa-router";
  import { article, channel, comments } from "../../store/talk";
</script>

<style lang="scss">
  .article-view{
    margin-top: 0;
    border-top: 1px solid #ebeef1;
    background: #f8f9fa;
    line-height: 18px;
    font-size: 14px;
    color: #7b858e;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    .article-header{
      padding: 24px;
      border-bottom: 1px solid #ebeef1;
      .article-title{
        line-height: 36px;
        font-size: 24px;
        color: #1e2022;
        word-wrap: break-word;
        word-break: break-all;
        overflow: auto;
      }
      .article-meta{
        margin-top: 9px;
        line-height: 17px;
        height: 17px;
        font-size: 14px;
        color: #7b858e;
        .article-meta-list{
          float: left;
          margin-top: 0;
          .article-meta-item{
            display: inline-block;
            line-height: 18px;
            font-size: 14px;
            color: #98a0a7;
            padding-left: 8px;
            margin-left: 8px;
            border-left: 1px solid #dddfe4;
            &:first-child{
              padding-left: 0;
              margin-left: 0;
              border-left: none;
            }
          }
          &.right{
            float: right;
          }
        }
      }
    }
    .article-content-wrap{
      position: relative;
      overflow: auto;
      .article-content{
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
    .article-box{
      border-top: 1px solid #ebeef1;
      border-bottom: 1px solid #ebeef1;
      text-align: center;
      .article-vote{
        display: inline-block;
        vertical-align: middle;
        width: 250px;
        padding: 12px 0;
      }
    }
    .article-ward{
      display: inline-block;
      vertical-align: middle;
      padding: 12px 0;
    }
    .article-button{
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
      &.like{
        min-width: 88px;
      }
      &.ml{
        margin-left: 8px;
      }
      .article-button-icon{
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
        transition: all .5s;
        &.up{
          background-image: url(https://talk.op.gg/images/icon-vote-up@2x.png);
          &.on{
            background-image: url(https://talk.op.gg/images/icon-vote-up_on@2x.png);
          }
        }
        &.down{
          background-image: url(https://talk.op.gg/images/icon-vote-down@2x.png);
          &.on{
            background-image: url(https://talk.op.gg/images/icon-vote-down_on@2x.png);
          }
        }
        &.ward{
          background-image: url(https://talk.op.gg/images/icon_ward.png);
          &.on{
            background-image: url(https://talk.op.gg/images/icon_ward_on.png);
          }
        }
      }
      .article-button-count{
        display: inline-block;
        transition: all .3s;
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
            <span>댓글 {$comments.length}</span>
          </div>
          <div class="article-meta-item">
            <span>추천 {$article.like_count - $article.unlike_count}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="article-content-wrap">
      <div class="article-content">
        {$article.content}
      </div>
    </div>
    <div class="article-box">
      <div class="article-vote">
        <div class="article-button like">
          <div class="article-button-icon up"></div>
          <div class="article-button-count">{$article.like_count}</div>
        </div>
        <div class="article-button like ml">
          <div class="article-button-icon down"></div>
          <div class="article-button-count">-{$article.unlike_count}</div>
        </div>
      </div>
      <div class="article-ward">
        <div class="article-button">
          <div class={`article-button-icon ward ${$article.has_ward ? 'on':''}`}></div>
        </div>
      </div>
    </div>
  {/if}
</section>
