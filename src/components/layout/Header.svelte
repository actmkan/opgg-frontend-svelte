<script lang="ts">
  import { link, push } from "svelte-spa-router";
  import { authToken } from "../../store/auth";
  import { login, logout } from "../../api/auth";
  import { get } from "svelte/store";

  let loading = false;
  let isLogin = false;

  authToken.subscribe((v) => {
    isLogin = !!v;
  });

  const onLogout = () => {
    if (!loading) {
      loading = true;
      logout()
        .then(() => {
          authToken.set(null);
        })
        .catch(() => {
          authToken.set(null);
        })
        .then(() => {
          loading = false;
        });
    }
  };
</script>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;
  }
  .layout-header {
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    background-image: linear-gradient(94deg, #1ea1f7, #46cfa7);
    box-sizing: border-box;
    header {
      max-width: 1044px;
      margin: 0 auto;
      .header-left {
        float: left;
      }
      .header-right {
        float: right;
      }
      .logo {
        .logo-image {
          width: 183px;
          height: 22px;
          margin-top: 18px;
          background: url(https://talk.op.gg/images/img-logo-opggtalk@2x.png?7bb66ec9b0a374a06ba021708598698f);
          background-size: 100%;
          margin-left: 0;
        }
      }
      .header-login-button {
        display: inline-block;
        margin-top: 12px;
        text-align: center;
        min-width: 80px;
        line-height: 15px;
        font-size: 12px;
        color: #fff;
        padding: 8px 0 7px;
        vertical-align: top;
        border-radius: 4px;
        background-color: transparent;
        border: 1px solid #dddfe4;
      }
    }
  }
</style>

<div class="layout-header">
  <header>
    <div class="header-left">
      <a use:link="{'/'}" href="{'#'}" class="logo">
        <div class="logo-image"></div>
      </a>
    </div>
    <div class="header-right">
      {#if isLogin}
        <a on:click="{onLogout}" href="{'#'}" class="header-login-button"
          >로그아웃</a
        >
      {:else}
        <a use:link="{'/login'}" href="{'#'}" class="header-login-button"
          >로그인</a
        >
      {/if}
    </div>
  </header>
</div>
