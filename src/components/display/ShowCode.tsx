type CodeBlockProps = {
  code: string;
};

export default function CodeBlock({ code }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="code-block">
      <pre>
        <code>{code}</code>
      </pre>
      <button onClick={copyToClipboard}>Copier</button>
    </div>
  );
}
