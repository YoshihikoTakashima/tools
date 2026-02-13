'use client';

import React, { useState, useEffect, useRef } from 'react';
import { History, Trash2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';

export default function HistoryCalculator() {
  const t = useTranslations('tools.history-calculator');
  const [input, setInput] = useState('');
  const [calculationSteps, setCalculationSteps] = useState<(number | string)[]>([]);
  const [history, setHistory] = useState<Array<{
    expression: string;
    result: string;
    formattedExpression: string;
    formattedResult: string;
    id: number;
  }>>([]);
  const [lastCalculated, setLastCalculated] = useState(false);

  const historyEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    if (!input) {
      setCalculationSteps([]);
      return;
    }
    const steps = getCalculationSteps(input);
    setCalculationSteps(steps);
  }, [input]);

  const getCalculationSteps = (expression: string): (number | string)[] => {
    try {
      if (!expression) return [];
      const tokens = expression.split(/([+\-*/])/).map(t => t.trim()).filter(t => t !== "");
      if (tokens.length === 0) return [];

      let currentVal = parseFloat(tokens[0]);
      if (isNaN(currentVal)) return [];
      const steps: (number | string)[] = [];

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextValStr = tokens[i + 1];
        if (nextValStr === undefined) break;
        const nextVal = parseFloat(nextValStr);
        if (isNaN(nextVal)) break;

        switch (operator) {
          case '+': currentVal += nextVal; break;
          case '-': currentVal -= nextVal; break;
          case '*': currentVal *= nextVal; break;
          case '/':
            if (nextVal === 0) {
                steps.push('Error');
                return steps;
            }
            currentVal /= nextVal;
            break;
          default: break;
        }
        const rounded = isFinite(currentVal) ? Math.round(currentVal * 100000000) / 100000000 : 'Error';
        steps.push(rounded);
      }
      return steps;
    } catch (e) {
      return [];
    }
  };

  const formatNumber = (numStr: number | string | undefined | null): string => {
    if (numStr === undefined || numStr === null || numStr === '') return '';
    if (String(numStr) === 'Error') return 'Error';
    const parts = String(numStr).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

  const formatExpression = (expr: string): string => {
    return expr.split(/([+\-*/])/).map(token => {
      if (['+', '-', '*', '/'].includes(token)) {
        const opMap: Record<string, string> = { '*': '×', '/': '÷', '+': '+', '-': '-' };
        return ` ${opMap[token]} `;
      }
      return formatNumber(token);
    }).join('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === inputRef.current) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEqual();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            clearAll();
        }
        return;
      }

      const key = e.key;
      if (/[0-9]/.test(key)) handleInput(key);
      if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) handleInput(key);
      if (key === 'Enter') handleEqual();
      if (key === 'Backspace') handleDelete();
      if (key === 'Escape') clearAll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, lastCalculated, calculationSteps]);

  const handleInput = (val: string) => {
    const inputEl = inputRef.current;

    if (lastCalculated) {
      if (['+', '-', '*', '/'].includes(val)) {
        setInput(input + val);
        setLastCalculated(false);
        setTimeout(() => {
            if (inputEl) {
                inputEl.focus();
                inputEl.setSelectionRange(input.length + 1, input.length + 1);
            }
        }, 0);
      } else {
        setInput(val);
        setLastCalculated(false);
        setCalculationSteps([]);
        setTimeout(() => {
            if (inputEl) {
                inputEl.focus();
                inputEl.setSelectionRange(1, 1);
            }
        }, 0);
      }
      return;
    }

    if (inputEl) {
        const start = inputEl.selectionStart || input.length;
        const end = inputEl.selectionEnd || input.length;

        const prevChar = input[start - 1];
        if (['+', '-', '*', '/'].includes(val) && ['+', '-', '*', '/'].includes(prevChar)) {
             const newValue = input.slice(0, start - 1) + val + input.slice(end);
             setInput(newValue);
             setTimeout(() => {
                inputEl.setSelectionRange(start, start);
                inputEl.focus();
             }, 0);
        } else {
             const newValue = input.slice(0, start) + val + input.slice(end);
             setInput(newValue);
             setTimeout(() => {
                inputEl.setSelectionRange(start + val.length, start + val.length);
                inputEl.focus();
             }, 0);
        }
    } else {
        setInput(prev => prev + val);
    }
  };

  const handleDelete = () => {
    if (lastCalculated) {
      clearAll();
      return;
    }

    const inputEl = inputRef.current;
    if (inputEl) {
        const start = inputEl.selectionStart || 0;
        const end = inputEl.selectionEnd || 0;

        if (start === end) {
            if (start === 0) return;
            const newValue = input.slice(0, start - 1) + input.slice(start);
            setInput(newValue);
            setTimeout(() => {
                inputEl.setSelectionRange(start - 1, start - 1);
                inputEl.focus();
            }, 0);
        } else {
            const newValue = input.slice(0, start) + input.slice(end);
            setInput(newValue);
            setTimeout(() => {
                inputEl.setSelectionRange(start, start);
                inputEl.focus();
            }, 0);
        }
    } else {
        setInput((prev) => prev.slice(0, -1));
    }
  };

  const clearAll = () => {
    setInput('');
    setCalculationSteps([]);
    setLastCalculated(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleEqual = () => {
    if (!input) return;

    let finalResult = '';
    if (calculationSteps.length > 0) {
        finalResult = String(calculationSteps[calculationSteps.length - 1]);
    } else {
        const steps = getCalculationSteps(input);
        if (steps.length > 0) {
            finalResult = String(steps[steps.length - 1]);
        } else if (input && !/[+\-*/]/.test(input)) {
            finalResult = input;
        }
    }

    if (!finalResult || finalResult === 'Error') return;

    setHistory((prev) => [
      ...prev,
      {
        expression: input,
        result: finalResult,
        formattedExpression: formatExpression(input),
        formattedResult: formatNumber(finalResult),
        id: Date.now()
      }
    ]);

    setInput(finalResult);
    setCalculationSteps([]);
    setLastCalculated(true);

    setTimeout(() => {
        if(inputRef.current) {
            inputRef.current.setSelectionRange(finalResult.length, finalResult.length);
        }
    }, 0);
  };

  const loadHistoryItem = (item: typeof history[0]) => {
    setInput(item.expression);
    setCalculationSteps([]);
    setLastCalculated(false);
    setTimeout(() => {
        if(inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(item.expression.length, item.expression.length);
        }
    }, 0);
  };

  const deleteHistoryItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    { label: 'C', action: clearAll, type: 'action' },
    { label: '(', action: () => handleInput('('), type: 'secondary' },
    { label: ')', action: () => handleInput(')'), type: 'secondary' },
    { label: '÷', action: () => handleInput('/'), type: 'operator' },
    { label: '7', action: () => handleInput('7'), type: 'number' },
    { label: '8', action: () => handleInput('8'), type: 'number' },
    { label: '9', action: () => handleInput('9'), type: 'number' },
    { label: '×', action: () => handleInput('*'), type: 'operator' },
    { label: '4', action: () => handleInput('4'), type: 'number' },
    { label: '5', action: () => handleInput('5'), type: 'number' },
    { label: '6', action: () => handleInput('6'), type: 'number' },
    { label: '-', action: () => handleInput('-'), type: 'operator' },
    { label: '1', action: () => handleInput('1'), type: 'number' },
    { label: '2', action: () => handleInput('2'), type: 'number' },
    { label: '3', action: () => handleInput('3'), type: 'number' },
    { label: '+', action: () => handleInput('+'), type: 'operator' },
    { label: '0', action: () => handleInput('0'), type: 'number' },
    { label: '.', action: () => handleInput('.'), type: 'number' },
    { label: 'BS', action: handleDelete, type: 'action' },
    { label: '=', action: handleEqual, type: 'equal' },
  ];

  const getButtonStyle = (type: string) => {
    const baseStyle = "h-12 text-base font-medium rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm select-none";
    switch (type) {
      case 'number': return `${baseStyle} bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600`;
      case 'operator': return `${baseStyle} bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 border border-indigo-100 dark:border-indigo-800`;
      case 'action': return `${baseStyle} bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-100 dark:border-red-800`;
      case 'secondary': return `${baseStyle} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600`;
      case 'equal': return `${baseStyle} bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200`;
      default: return baseStyle;
    }
  };

  return (
    <ToolLayout
      title={t('name')}
      description={t('description')}
      headerExtra={
        <ToolInfoArticle
          buttonLabel={t('infoButtonLabel')}
          articleTitle={t('article.title')}
          sections={[
            {
              title: t('article.section1.title'),
              content: t('article.section1.content'),
            },
            {
              title: t('article.section2.title'),
              content: t('article.section2.content'),
            },
            {
              title: t('article.section3.title'),
              content: t('article.section3.content'),
            },
            {
              title: t('article.section4.title'),
              content: '',
              list: [
                t('article.section4.use1'),
                t('article.section4.use2'),
                t('article.section4.use3'),
                t('article.section4.use4'),
              ],
            },
            {
              title: t('article.section5.title'),
              content: t('article.section5.content'),
            },
            {
              title: t('article.section6.title'),
              content: t('article.section6.content'),
            },
          ]}
        />
      }
    >
      <div className="flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
        {/* 履歴セクション - 上部の空きスペース、下から上に追加 */}
        <div className="flex-1 overflow-y-auto mb-4">
          {history.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-600">
                <History size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">履歴はありません</p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 sticky top-0 z-10">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 text-sm">
                  <History size={16} />
                  履歴
                </h3>
                <button
                  onClick={clearHistory}
                  className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                  title="履歴をすべて削除"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3 space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                    className="relative w-full bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all cursor-pointer group"
                  >
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
                    >
                      <X size={12} />
                    </button>
                    <div className="flex flex-col items-end pr-6">
                      <div className="text-xs text-gray-400 mb-1">
                        {item.formattedExpression} =
                      </div>
                      <div className="text-base font-semibold text-gray-700 dark:text-gray-200">
                        {item.formattedResult}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={historyEndRef} />
              </div>
            </div>
          )}
        </div>

        {/* 計算機セクション - 下部固定 */}
        <div className="flex-none bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* ディスプレイ */}
          <div className="p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="relative w-full mb-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                inputMode="none"
                className="w-full text-right text-gray-800 dark:text-white text-3xl font-bold bg-transparent border-none outline-none caret-indigo-500 p-0 m-0"
                placeholder="0"
                autoComplete="off"
              />
            </div>
            <div className="text-lg font-medium text-gray-400 dark:text-gray-500 min-h-[1.5rem] transition-all text-right w-full flex justify-end gap-3 overflow-x-auto">
              {calculationSteps.length > 0 && calculationSteps.map((step, idx) => (
                <span key={idx} className="opacity-80 whitespace-nowrap">
                  {formatNumber(step)}
                </span>
              ))}
            </div>
          </div>

          {/* ボタングリッド */}
          <div className="p-3 bg-gray-50 dark:bg-gray-900">
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.action}
                  className={getButtonStyle(btn.type)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
