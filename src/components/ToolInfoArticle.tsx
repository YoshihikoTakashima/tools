'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import InfoModal from './InfoModal';

interface ArticleSection {
  title: string;
  content: string;
  note?: string;
  example?: string;
  list?: string[];
}

interface ToolInfoArticleProps {
  buttonLabel: string;
  articleTitle: string;
  sections: ArticleSection[];
}

export default function ToolInfoArticle({ buttonLabel, articleTitle, sections }: ToolInfoArticleProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <>
      {/* インフォボタン */}
      <button
        onClick={() => setIsInfoOpen(true)}
        className="ml-2 p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label={buttonLabel}
        title={buttonLabel}
      >
        <Info className="w-5 h-5" />
      </button>

      {/* SEO用の記事コンテンツ - 常にDOMに存在 */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={articleTitle}
      >
        <article className="prose dark:prose-invert max-w-none">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-lg font-bold mb-3">{section.title}</h2>
              <p className="mb-2 leading-relaxed">{section.content}</p>

              {section.example && (
                <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm my-3">
                  {section.example}
                </div>
              )}

              {section.note && (
                <p className="mb-4 leading-relaxed text-sm text-gray-600 dark:text-gray-400">
                  {section.note}
                </p>
              )}

              {section.list && (
                <ul className="list-disc list-inside space-y-2 mb-4">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {!section.note && !section.list && !section.example && (
                <div className="mb-4" />
              )}
            </section>
          ))}
        </article>
      </InfoModal>
    </>
  );
}
