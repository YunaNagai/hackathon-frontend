export default function Login() {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>ログイン</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />
        <button>ログイン</button>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/register">新規登録はこちら</a>
      </p>
    </div>
  );
}