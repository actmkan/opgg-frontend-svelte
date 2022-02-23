<script lang="ts">
  import { login } from "../api/auth";
  import { push } from "svelte-spa-router";
  import { authToken } from "../store/auth";

  let email: string = "admin@op.gg";
  let password: string = "password";
  let loading = false;
  let error = false;
  let errormessage = "";

  const accounts = [
    "iron@op.gg",
    "bronze@op.gg",
    "silver@op.gg",
    "gold@op.gg",
    "platinum@op.gg",
    "diamond@op.gg",
    "master@op.gg",
    "grandmaster@op.gg",
    "challenger@op.gg",
  ];

  const onLogin = (testEmail) => {
    if (!loading) {
      loading = true;
      login(testEmail || email, password)
        .then((r) => {
          authToken.set(r.data.token);
          push("/");
        })
        .catch((e) => {
          alert("해당 요청으로 알맞은 회원정보를 찾을 수 업습니다.");
        })
        .then(() => {
          loading = false;
        });
    }
  };
</script>

<style lang="scss">
  .container {
    min-height: 100%;
    background-color: #f3f5f7;
    .login-wrap {
      position: relative;
      min-width: 320px;
      min-height: 100%;
      padding: 50px 0 50px;
      .login-card {
        position: relative;
        margin: 0 auto;
        width: 450px;
        min-height: 600px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        .login-card-inner {
          margin: 0 40px;
          padding-bottom: 40px;

          .logo {
            padding-top: 48px;
            text-align: center;
            margin-bottom: 42px;
            .logo-image {
              width: 128px;
              height: 32px;
            }
          }
          .login {
            h2 {
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
            }
            input {
              margin-top: 10px;
              position: relative;
              padding: 10px 10px 11px;
              border: 0;
              border-bottom: 1px solid #dddfe4;
              font-weight: 400;
              font-size: 16px;
              line-height: 19px;
              width: 100%;
            }
            .test-user-login-button {
              margin-top: 12px;
              width: 100%;
              background-color: #3c5a99;
              line-height: 20px;
              font-size: 16px;
              border-radius: 3px;
              display: inline-block;
              text-decoration: none;
              color: #fff;
              border: 0;
              height: 56px;
            }
            .user-login-button {
              margin-top: 12px;
              width: 100%;
              background-color: #1ea1f7;
              line-height: 20px;
              font-size: 16px;
              border-radius: 3px;
              display: inline-block;
              text-decoration: none;
              color: #fff;
              border: 0;
              height: 56px;
            }
          }
        }
      }
    }
  }
</style>

<div class="container">
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-card-inner">
        <div class="logo">
          <img
            class="logo-image"
            src="https://member.op.gg/img_opgglogo.1924961d.svg"
            alt="OP.GG"
          />
        </div>
        <div class="login">
          <h2>이메일 로그인</h2>
          <div class="login-form">
            <input type="text" name="email" bind:value="{email}" />
            <input type="password" name="password" bind:value="{password}" />
            <button type="button" class="user-login-button" on:click="{() => onLogin(null)}">로그인</button>
          </div>
          <h2>테스트계정 로그인</h2>
          {#each accounts as account}
            <button
              type="button"
              class="test-user-login-button"
              on:click="{() => onLogin(account)}">{account} 로그인</button
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
