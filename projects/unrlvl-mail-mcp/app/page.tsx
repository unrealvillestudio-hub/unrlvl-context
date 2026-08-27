export default function Home() {
  return (
    <main style={{ fontFamily: 'ui-monospace, monospace', padding: '2rem', lineHeight: 1.6 }}>
      <h1>unrlvl-mail-mcp</h1>
      <p>MCP de correo de clientes de UNRLVL. Solo lectura.</p>
      <ul>
        <li>Endpoint MCP: <code>/api/mcp/mcp</code></li>
        <li>Tools: <code>list_brand_mailboxes</code>, <code>search_messages</code>, <code>get_message</code></li>
        <li>Carpetas: INBOX, SENT, SPAM. Papelera excluida.</li>
        <li>Sin tools de escritura. Sin persistencia de contenido.</li>
      </ul>
    </main>
  );
}
