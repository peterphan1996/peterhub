import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { defineCustomElements as deckDeckGoElement } from "@deckdeckgo/highlight-code/dist/loader";
import markdownStyles from "./markdown-styles.module.css";

deckDeckGoElement();

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      return <CodeSnippet fields={node.data.target.fields} />;
    },
  },
};

const CodeSnippet = ({ fields }) => {
  delete fields.title;
  return (
    <div>
      {Object.entries(fields).map(([language, code]) => {
        return (
          <deckgo-highlight-code language={language} key={language}>
            <code slot="code">{code}</code>
          </deckgo-highlight-code>
        );
      })}
    </div>
  );
};

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className={markdownStyles.markdown}>
        {documentToReactComponents(content, options)}
      </div>
    </div>
  );
}
