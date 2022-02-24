<script lang="ts">
  import { getChannels, getTalk, getTalks } from "../api/talk";
  import { link } from "svelte-spa-router";

  export let params = { talkId: null, channelId: null, category: "hot" };

  let talk = null;
  let channels = [];
  let channelRows = [];
  let channel = {};

  $: params.channelId, setChannel();
  $: channelRows, setChannel();

  const setChannel = () => {
    channel = {};
    channelRows.map((c) => {
      if (c?.id === parseInt(params.channelId)) {
        channel = c;
      }
    });

    if (params.channelId === "all") {
      params.category = "hot";
    } else {
      params.category = "new";
    }

    console.log(channel);
  };

  getTalk(params.talkId)
    .then((r) => {
      talk = r.data.data;
    })
    .catch(() => {
      alert("서버에서 톡 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });

  getChannels(params.talkId)
    .then((r) => {
      const groups = [...new Set(r.data.data.map((channel) => channel.group))];

      groups.map((group) => {
        const attr = {
          group,
          displayGroup: null,
          child: [],
        };
        const arr = r.data.data.filter((channel) => channel.group === group);
        attr.displayGroup = arr[0].display_group;
        attr.child = arr;
        channels.push(attr);
      });

      channelRows = r.data.data;
      channels = [...channels];
    })
    .catch(() => {
      alert("서버에서 채널 목록 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });
</script>

<style lang="scss">
  .container {
    background: #ebeef1;
    overflow: hidden;
    .talk-info {
      display: block;
      position: relative;
      height: 200px;
      background: #fff;
      .talk-info-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-position: 50% 30%;
        &::after {
          content: "";
          background-image: linear-gradient(
            180deg,
            rgba(51, 56, 60, 0.5),
            rgba(0, 0, 0, 0.5)
          );
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .content {
        position: relative;
        max-width: 1044px;
        margin: 0 auto;
        .info-content {
          padding-top: 75px;
          display: inline-block;
          position: relative;
          padding-left: 24px;
          white-space: nowrap;
          a {
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          .logo-image {
            margin-top: 0;
            height: 60px;
            float: left;
            margin-right: 8px;
          }
          .logo-text {
            margin-top: 0;
            line-height: 39px;
            font-weight: 600;
            font-size: 32px;
            color: #fff;
          }
        }
      }
    }
    .talk-content {
      margin: 0 auto;
      margin-top: -40px;
      display: flex;
      position: relative;
      max-width: 1044px;
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
                    a {
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
      > .content {
        float: right;
        box-sizing: border-box;
        width: 728px;
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
                &.active {
                  color: #16ae81;
                }
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
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<div class="container">
  <div class="talk-info">
    {#if talk}
      <div
        class="talk-info-background"
        style="background-image: {`url(${talk?.banner_image.url})`}"
      ></div>
      <div class="content">
        <div class="info-content">
          <a href="{`/talk/${talk.id}/all`}" use:link>
            <img
              src="{talk?.logo_image.url}"
              class="logo-image"
              alt="로고이미지"
            />
            <span class="logo-text">{talk?.display_name}</span>
          </a>
        </div>
      </div>
    {/if}
  </div>
  <div class="talk-content">
    <div class="sidebar">
      <div class="inner">
        <div class="content-wrap">
          <div class="content-header">
            <a href="/login" use:link class="login-button">로그인</a>
          </div>
          <div class="sidebar-content">
            <div class="sidebar-menu">
              <div class="sidebar-menu-title">홈</div>
              <ul class="sidebar-menu-list">
                <li
                  class="sidebar-menu-item {params.channelId === 'all' &&
                    'active'}"
                >
                  <a href="{`/talk/${params.talkId}/all`}" use:link>전체</a>
                </li>
              </ul>
            </div>
            {#each channels as group}
              <div class="sidebar-menu">
                <div class="sidebar-menu-title">{group.displayGroup}</div>
                <ul class="sidebar-menu-list">
                  {#each group.child as channel}
                    <li
                      class="sidebar-menu-item {channel.id.toString() ===
                        params.channelId && 'active'}"
                    >
                      <a
                        href="{`/talk/${params.talkId}/${channel.id}`}"
                        use:link>{channel.display_name}</a
                      >
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="sub-header">
        <div class="sub-header-info">
          <div class="sub-header-title">
            <a href="{`/talk/${params.talkId}/${params.channelId}`}" use:link
              >{channel?.display_name || "전체"}</a
            >
          </div>
          {#if channel?.permissions && channel.permissions["ARTICLE_CREATE"].has}
            <div class="sub-header-button">톡작성</div>
          {/if}
        </div>
        <div class="sub-link">
          <ul class="sub-link-list">
            <li class="sub-link-item">
              <div
                class="{`link-button ${
                  params.category === 'hot' ? 'active' : ''
                }}`}"
              >
                <img
                  src="{`https://talk.op.gg/images/icon-hot${
                    params.category === 'hot' ? '-on' : ''
                  }@2x.png`}"
                  alt="인기"
                />
                <span>인기</span>
              </div>
            </li>
            <li class="sub-link-item">
              <div class="link-button">
                <img
                  src="https://talk.op.gg/images/icon-new@2x.png"
                  alt="최신"
                />
                <span>최신</span>
              </div>
            </li>
            <li class="sub-link-item">
              <div class="link-button">
                <img
                  src="https://talk.op.gg/images/icon-top@2x.png"
                  alt="TOP"
                />
                <span>TOP</span>
              </div>
            </li>
            <li class="sub-link-item">
              <div class="link-button">
                <img
                  src="https://talk.op.gg/images/icon-boost@2x.png"
                  alt="10추"
                />
                <span>10추</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
