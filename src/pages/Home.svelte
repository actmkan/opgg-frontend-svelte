<script lang="ts">
    import { getTalks } from "../api/talk";
    import { link } from "svelte-spa-router";

    let talks = [];

    getTalks()
        .then((r) => {
            talks = r.data.data;
        })
        .catch(() => {
            alert("서버에서 톡 목록을 불러오는데 실패 했습니다.");
            window.location.reload();
        });
</script>

<style lang="scss">
    .container {
        padding: 40px 0 90px;
        background: #33383c;
        color: #fff;
        .talk-list {
            max-width: 1044px;
            margin: 0 auto;
            ol {
                margin: 0;
                padding: 0;
                border: 0;
                vertical-align: baseline;
                list-style: none;
                .talk-item {
                    display: inline-block;
                    margin-left: 16px;
                    position: relative;
                    margin-top: 16px;
                    color: #fff;
                    border-radius: 4px;
                    overflow: hidden;
                    h2 {
                        color: #fff;
                        position: absolute;
                        top: 32px;
                        left: 32px;
                        line-height: 39px;
                        font-size: 32px;
                    }
                    .item-image {
                        width: 500px;
                        height: 240px;
                        background-size: cover;
                        background-position: 50%;
                        position: relative;
                        margin-top: 16px;
                        border-radius: 4px;
                        overflow: hidden;
                        &::after {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-image: linear-gradient(0deg, transparent, #000);
                            content: "";
                        }
                    }
                }
            }
        }
    }
</style>

<div class="container">
    <div class="talk-list">
        <ol>
            {#each talks as talk}
                <li class="talk-item">
                    <a href={`/talk/${talk.id}/all`} use:link>
                        <div
                            class="item-image"
                            style="background-image: {`url(${talk?.banner_image.url})`}" />
                        <h2>{talk.display_name}</h2>
                    </a>
                </li>
            {/each}
        </ol>
    </div>
</div>
