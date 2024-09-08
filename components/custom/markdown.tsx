import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className="space-y-3"
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        ol: (props) => <ol className="list-inside list-decimal" {...props} />,
        a: (props) => (
          <a
            className="text-blue-500 underline hover:text-blue-700"
            target="_blank"
            {...props}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
