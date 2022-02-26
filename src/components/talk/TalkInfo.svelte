<script lang="ts">
  import { link } from "svelte-spa-router";
  import { talk } from "../../store/talk";
</script>

<style lang="scss">
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
</style>

<div class="talk-info">
  {#if $talk}
    <div
      class="talk-info-background"
      style="background-image: {`url(${$talk?.banner_image.url})`}"
    ></div>
    <div class="content">
      <div class="info-content">
        <a href="{`/talk/${$talk.id}/all`}" use:link>
          <img
            src="{$talk?.logo_image.url}"
            class="logo-image"
            alt="로고이미지"
          />
          <span class="logo-text">{$talk.display_name}</span>
        </a>
      </div>
    </div>
  {/if}
</div>
