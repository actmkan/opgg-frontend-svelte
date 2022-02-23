<script lang="ts">
  import { getChannels, getTalk, getTalks } from "../api/talk";
  import { link } from "svelte-spa-router";

  export let params = {talkId: null, channelId: null}

  let talk = null;
  let channels = [];

  getTalk(params.talkId)
    .then((r) => {
      talk = r.data.data;
    })
    .catch(() => {
      alert("서버에서 톡 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });

  console.log(channels)
  getChannels(params.talkId)
    .then((r) => {
      const groups = [...new Set(r.data.data.map(channel => channel.group))];

      groups.map(group => {
        const attr = {
          group,
          displayGroup: null,
          child: []
        };
        const arr = r.data.data.filter(channel => channel.group === group);
        attr.displayGroup = arr[0].display_group;
        attr.child = arr;
        channels.push(attr);
      })

      channels = [...channels]
    })
    .catch(() => {
      alert("서버에서 채널 목록 정보를 불러오는데 실패 했습니다.");
      window.location.reload();
    });

  console.log(channels)

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
      .talk-info-background{
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
                          180deg,rgba(51,56,60,.5),rgba(0,0,0,.5));
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      .content{
        position: relative;
        max-width: 1044px;
        margin: 0 auto;
        .info-content{
          padding-top: 75px;
          display: inline-block;
          position: relative;
          padding-left: 24px;
          white-space: nowrap;
          a{
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          .logo-image{
            margin-top: 0;
            height: 60px;
            float: left;
            margin-right: 8px;
          }
          .logo-text{
            margin-top: 0;
            line-height: 39px;
            font-weight: 600;
            font-size: 32px;
            color: #fff;
          }
        }
      }
    }
    .talk-content{
      margin: 0 auto;
      margin-top: -40px;
      position: relative;
      max-width: 1044px;
      .sidebar{
        display: block;
        width: 300px;
        z-index: 1000;
        .inner{
          position: relative;
          transform: translate(0);
          transform: translateZ(0);
          will-change: position,transform;
          .content-wrap{
            position: static;
            padding-bottom: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #fff;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
            width: 300px;
            overflow-y: auto;
            .sidebar-content{
              .sidebar-menu{
                border-top: 1px solid #ebeef1;
                padding: 9px 16px 8px;
                .sidebar-menu-title{
                  padding-bottom: 8px;
                  line-height: 15px;
                  font-size: 12px;
                  color: #7b858e;
                }
                .sidebar-menu-list{
                  list-style: none;
                  .sidebar-menu-item{
                    line-height: 17px;
                    font-size: 14px;
                    color: #1e2022;
                    border-radius: 4px;
                    &.active{
                      border-radius: 4px;
                      background: #f8f9fa;
                      color: #16ae81;
                    }
                    a{
                      padding: 8px 12px 7px;
                      display: block;
                    }
                  }
                }
              }
            }
            .content-header{
              padding: 16px;
              .login-button{
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
    }
  }
</style>

<div class="container">
  <div class="talk-info">
    {#if talk}
    <div class="talk-info-background"
         style="background-image: {`url(${talk?.banner_image.url})`}"></div>
      <div class="content">
        <div class="info-content">
          <a href={`/talk/${talk.id}/all`} use:link>
            <img src="{talk?.logo_image.url}" class="logo-image" alt="로고이미지"/>
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
                <li class="sidebar-menu-item {params.channelId === 'all' && 'active'}">
                  <a href="{`/talk/${params.talkId}/all`}" use:link>전체</a>
                </li>
              </ul>
            </div>
            {#each channels as group}
              <div class="sidebar-menu">
                <div class="sidebar-menu-title">{group.displayGroup}</div>
                <ul class="sidebar-menu-list">
                  {#each group.child as channel}
                    <li class="sidebar-menu-item {channel.id.toString() === params.channelId && 'active'}">
                      <a href="{`/talk/${params.talkId}/${channel.id}`}" use:link>{channel.display_name}</a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</div>
