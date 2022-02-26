<script lang="ts">
  import { link } from "svelte-spa-router";
  import { talk, channel, channels, setChannel, sort } from "../../store/talk";
</script>

<style lang="scss">
  .sidebar {
    display: block;
    width: 300px;
    z-index: 1000;
    margin-right: 20px;
    .inner {
      position: relative;
      transform: translate(0);
      transform: translateZ(0);
      will-change: position, transform;
      .content-wrap {
        position: static;
        padding-bottom: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
        width: 300px;
        overflow-y: auto;
        .sidebar-content {
          .sidebar-menu {
            border-top: 1px solid #ebeef1;
            padding: 9px 16px 8px;
            .sidebar-menu-title {
              padding-bottom: 8px;
              line-height: 15px;
              font-size: 12px;
              color: #7b858e;
            }
            .sidebar-menu-list {
              list-style: none;
              .sidebar-menu-item {
                line-height: 17px;
                font-size: 14px;
                color: #1e2022;
                border-radius: 4px;
                &.active {
                  border-radius: 4px;
                  background: #f8f9fa;
                  color: #16ae81;
                }
                div {
                  cursor: pointer;
                  padding: 8px 12px 7px;
                  display: block;
                }
              }
            }
          }
        }
        .content-header {
          padding: 16px;
          .login-button {
            display: block;
            padding: 11px 0 10px;
            line-height: 17px;
            font-size: 14px;
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

<div class="sidebar">
  <div class="inner">
    <div class="content-wrap">
      <div class="content-header">
        <a href="/login" use:link class="login-button">로그인</a>
      </div>
      {#if $channel}
        <div class="sidebar-content">
          <div class="sidebar-menu">
            <div class="sidebar-menu-title">홈</div>
            <ul class="sidebar-menu-list">
              <li
                class="sidebar-menu-item {$channel.id === 'all' &&
                    'active'}"
              >
                <div on:click={() => setChannel($talk.id, 'all', 'new')}>전체</div>
              </li>
            </ul>
          </div>
          {#each $channels as group}
            <div class="sidebar-menu">
              <div class="sidebar-menu-title">{group.displayGroup}</div>
              <ul class="sidebar-menu-list">
                {#each group.child as viewChannel}
                  <li
                    class="sidebar-menu-item {viewChannel.id ===
                        $channel.id && 'active'}"
                  >
                    <div on:click={() => setChannel($talk.id, viewChannel.id, 'new')}>{viewChannel.display_name}</div>
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
