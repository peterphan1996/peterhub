import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS } from "@contentful/rich-text-types";
import { defineCustomElements as deckDeckGoElement } from "@deckdeckgo/highlight-code/dist/loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

import markdownStyles from "./markdown-styles.module.css";

deckDeckGoElement();

function code(text) {
  text.shift(); // shift first empty element
  const language = text.shift();

  const value = text.reduce((acc, cur, idx) => {
    if (typeof cur !== "string" && cur.type === "br") {
      return `${acc}${idx > 0 ? "\n" : ""}`; // Remove the first \n at every code block
    }

    return acc + cur;
  }, "");

  return (
    <SyntaxHighlighter language={language} style={okaidia}>
      {value}
    </SyntaxHighlighter>
  );
}

export const options = {
  renderMark: {
    [MARKS.CODE]: code,
  },

  renderText: (text) => {
    const res = text.split("\n").reduce((children, textSegment, index) => {
      /* eslint-disable react/no-array-index-key */
      return [...children, index > 0 ? <br key={index} /> : "", textSegment];
    }, []);
    return res;
  },
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
