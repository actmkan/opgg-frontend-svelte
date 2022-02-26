<script lang="ts">
  import { link } from "svelte-spa-router";
  import { channel, sort, setSort, searchType, searchText, onSearch } from "../../store/talk";
</script>

<style lang="scss">
  .sub-header {
    position: relative;
    margin-bottom: 8px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    .sub-header-info {
      padding-top: 18px;
      padding-bottom: 17px;
      .sub-header-title {
        padding-left: 16px;
        line-height: 21px;
        font-size: 18px;
        color: #1e2022;
        font-weight: 700;
      }
      .sub-header-button {
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 16px;
        margin-right: 16px;
        width: 75px;
        display: block;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        border-color: #46cfa7;
        background-color: #46cfa7;
        color: #fff;
        text-align: center;
      }
    }
    .sub-link {
      display: inline-block;
      .sub-link-list {
        padding: 0 16px;
        white-space: nowrap;
        list-style: none;
        .sub-link-item {
          margin-left: 28px;
          display: inline-block;
          line-height: 17px;
          font-size: 14px;
          color: #7b858e;
          &:first-child {
            margin-left: 0;
          }
          .link-button {
            cursor: pointer;
            padding: 10px 2px 14px;
            > img {
              margin-right: 4px;
              width: 24px;
              height: auto;
              vertical-align: middle;
            }
            > span {
              vertical-align: middle;
              line-height: 24px;
            }
            &.active {
              color: #16ae81;
            }
          }
        }
      }
    }

  }
  .sub-header-search{
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 6px;
    form{
      display: flex;
      position: relative;
      .sub-header-search-select{
        display: inline-block;
        width: 122px;
        padding: 9px 0 8px 15px;
        box-sizing: border-box;
        border: 1px solid #ebeef1;
        background: #fff;
        border-radius: 4px 0 0 4px;
        line-height: 17px;
        font-size: 14px;
        color: #98a0a7;
        background: url(https://talk.op.gg/images/icon-dropdown-down@2x.png?53a59ffc060ec3c4ef848ca47e37255f);
        background-size: 24px;
        background-position: top 5px right 5px;
        background-repeat: no-repeat;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
      }
      .sub-header-search-input{
        display: inline-block;
        border: none;
        width: 200px;
        box-sizing: border-box;
        padding: 10px 32px 9px 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background-color: #ebeef1;
        line-height: 17px;
        font-size: 14px;
        z-index: 1;
      }
      .sub-header-search-button{
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: 0;
        cursor: pointer;
        z-index: 2;
      }
    }

  }
</style>

<div class="sub-header">
  {#if $channel}
    <div class="sub-header-info">
      <div class="sub-header-title">
        <a href="{`/talk/${$channel.talk_id}/${$channel.id}`}" use:link
        >{$channel.display_name || "전체"}</a
        >
      </div>
      {#if $channel.permissions && $channel.permissions["ARTICLE_CREATE"].has}
        <div class="sub-header-button">톡작성</div>
      {/if}
    </div>
    <div class="sub-link">
      <ul class="sub-link-list">
        <li class="sub-link-item">
          <div
            class="{`link-button ${
                  $sort === 'hot' ? 'active' : ''
                }`}"
            on:click={() => setSort('hot')}
          >
            <img
              src="{`https://talk.op.gg/images/icon-hot${
                    $sort === 'hot' ? '-on' : ''
                  }@2x.png`}"
              alt="인기"
            />
            <span>인기</span>
          </div>
        </li>
        <li class="sub-link-item">
          <div
            class="{`link-button ${
                  $sort === 'new' ? 'active' : ''
                }`}"
            on:click={() => setSort('new')}
          >
            <img
              src="{`https://talk.op.gg/images/icon-new${
                    $sort === 'new' ? '-on' : ''
                  }@2x.png`}"
              alt="최신"
            />
            <span>최신</span>
          </div>
        </li>
        <li class="sub-link-item">
          <div
            class="{`link-button ${
                  $sort === 'top' ? 'active' : ''
                }`}"
            on:click={() => setSort('top')}
          >
            <img
              src="{`https://talk.op.gg/images/icon-top${
                    $sort === 'top' ? '-on' : ''
                  }@2x.png`}"
              alt="TOP"
            />
            <span>TOP</span>
          </div>
        </li>
        <li class="sub-link-item">
          <div
            class="{`link-button ${
                  $sort === 'boost' ? 'active' : ''
                }`}"
            on:click={() => setSort('boost')}
          >
            <img
              src="{`https://talk.op.gg/images/icon-boost${
                    $sort === 'boost' ? '-on' : ''
                  }@2x.png`}"
              alt="10추"
            />
            <span>10추</span>
          </div>
        </li>
      </ul>
    </div>

  {/if}
  <div class="sub-header-search">
    <form class="sub-search">
      <label>
        <select class="sub-header-search-select" bind:value={$searchType}>
          <option value="title">제목</option>
          <option value="user_name">작성자</option>
        </select>
      </label>
      <input type="text" class="sub-header-search-input" placeholder="검색" bind:value={$searchText} on:keypress.enter={onSearch}>
      <button class="sub-header-search-button" on:click={onSearch}><img src="https://talk.op.gg/images/icon-search@2x.png" width="24" alt="검색"></button>
    </form>
  </div>
</div>
