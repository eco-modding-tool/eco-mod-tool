type CodeBlockProps = {
  code: string;
  filename: string;
};

export default function CodeBlock({ code, filename }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  const download = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="code-block">
      <div className="code-block-toolbar">
        <span className="code-block-filename">{filename}</span>
        <div className="code-block-actions">
          <button onClick={copyToClipboard}>Copier</button>
          <button onClick={download}>Télécharger .cs</button>
        </div>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
