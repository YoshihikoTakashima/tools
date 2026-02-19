'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';
import { Calculator, DollarSign, Settings, BarChart3, Info, Check, RefreshCcw } from 'lucide-react';

interface ModelData {
  id: string;
  provider: string;
  name: string;
  inputPrice: number;
  outputPrice: number;
  note?: string;
}

// 最新の価格データ (100万トークンあたりのドル価格, 2026年2月時点)
const MODEL_DATA: ModelData[] = [
  // OpenAI - GPTシリーズ
  {
    id: 'gpt-4.1',
    provider: 'OpenAI',
    name: 'GPT-4.1',
    inputPrice: 2.00,
    outputPrice: 8.00,
  },
  {
    id: 'gpt-4.1-mini',
    provider: 'OpenAI',
    name: 'GPT-4.1 mini',
    inputPrice: 0.40,
    outputPrice: 1.60,
  },
  {
    id: 'gpt-4o',
    provider: 'OpenAI',
    name: 'GPT-4o',
    inputPrice: 2.50,
    outputPrice: 10.00,
  },
  {
    id: 'gpt-4o-mini',
    provider: 'OpenAI',
    name: 'GPT-4o mini',
    inputPrice: 0.15,
    outputPrice: 0.60,
  },
  // OpenAI - 推論モデル
  {
    id: 'o3',
    provider: 'OpenAI',
    name: 'o3',
    inputPrice: 2.00,
    outputPrice: 8.00,
  },
  {
    id: 'o4-mini',
    provider: 'OpenAI',
    name: 'o4-mini',
    inputPrice: 1.10,
    outputPrice: 4.40,
  },
  // Google - Geminiシリーズ
  {
    id: 'gemini-2.5-pro',
    provider: 'Google',
    name: 'Gemini 2.5 Pro',
    inputPrice: 1.25,
    outputPrice: 10.00,
    note: '< 200k tokens',
  },
  {
    id: 'gemini-2.5-flash',
    provider: 'Google',
    name: 'Gemini 2.5 Flash',
    inputPrice: 0.30,
    outputPrice: 2.50,
    note: '< 200k tokens',
  },
  // Anthropic - Claudeシリーズ
  {
    id: 'claude-opus-4.5',
    provider: 'Anthropic',
    name: 'Claude Opus 4.5',
    inputPrice: 5.00,
    outputPrice: 25.00,
  },
  {
    id: 'claude-sonnet-4.5',
    provider: 'Anthropic',
    name: 'Claude Sonnet 4.5',
    inputPrice: 3.00,
    outputPrice: 15.00,
  },
  {
    id: 'claude-haiku-4.5',
    provider: 'Anthropic',
    name: 'Claude Haiku 4.5',
    inputPrice: 1.00,
    outputPrice: 5.00,
  },
];

interface Preset {
  nameKey: string;
  descKey: string;
  input: number;
  output: number;
  requests: number;
}

const PRESETS: Preset[] = [
  {
    nameKey: 'presets.chatbot.name',
    descKey: 'presets.chatbot.desc',
    input: 500,
    output: 300,
    requests: 10000,
  },
  {
    nameKey: 'presets.summarize.name',
    descKey: 'presets.summarize.desc',
    input: 8000,
    output: 500,
    requests: 1000,
  },
  {
    nameKey: 'presets.rag.name',
    descKey: 'presets.rag.desc',
    input: 3000,
    output: 800,
    requests: 5000,
  },
  {
    nameKey: 'presets.creative.name',
    descKey: 'presets.creative.desc',
    input: 1000,
    output: 2000,
    requests: 500,
  },
];

export default function AiCostSimulator() {
  const t = useTranslations('tools.ai-cost-simulator');

  const [selectedModelId, setSelectedModelId] = useState('gpt-4.1');
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerMonth, setRequestsPerMonth] = useState(1000);
  const [exchangeRate, setExchangeRate] = useState(150);

  const calculateCost = (modelId: string, input: number, output: number, reqs: number) => {
    const model = MODEL_DATA.find(m => m.id === modelId);
    if (!model) return 0;
    const inputCostPerReq = (input * model.inputPrice) / 1000000;
    const outputCostPerReq = (output * model.outputPrice) / 1000000;
    return (inputCostPerReq + outputCostPerReq) * reqs;
  };

  const currentCostUsd = calculateCost(selectedModelId, inputTokens, outputTokens, requestsPerMonth);
  const currentCostJpy = currentCostUsd * exchangeRate;

  const formatCurrency = (val: number, currency: string) => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(val);
    }
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(val);
  };

  const applyPreset = (preset: Preset) => {
    setInputTokens(preset.input);
    setOutputTokens(preset.output);
    setRequestsPerMonth(preset.requests);
  };

  const selectedModel = MODEL_DATA.find(m => m.id === selectedModelId);

  const getProviderColor = (provider: string) => {
    if (provider === 'OpenAI') return 'bg-green-500';
    if (provider === 'Anthropic') return 'bg-orange-500';
    return 'bg-blue-500';
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
              content: '',
              list: [
                t('article.section2.feature1'),
                t('article.section2.feature2'),
                t('article.section2.feature3'),
                t('article.section2.feature4'),
              ],
            },
            {
              title: t('article.section3.title'),
              content: '',
              list: [
                t('article.section3.use1'),
                t('article.section3.use2'),
                t('article.section3.use3'),
                t('article.section3.use4'),
              ],
            },
            {
              title: t('article.section4.title'),
              content: t('article.section4.content'),
            },
          ]}
        />
      }
    >
      <div className="space-y-8">

        {/* 為替レート設定 */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 px-4 py-2.5 rounded-xl text-sm">
          <span className="text-gray-500 dark:text-gray-400 font-medium">USD/JPY:</span>
          <input
            type="number"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(Number(e.target.value))}
            className="w-20 bg-transparent border-b border-gray-300 dark:border-gray-500 focus:border-blue-500 focus:outline-none text-right font-mono text-gray-900 dark:text-white"
          />
          <span className="text-gray-500 dark:text-gray-400">{t('yen')}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 左カラム: 入力 */}
          <div className="lg:col-span-5 space-y-6">

            {/* モデル選択 */}
            <section className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Settings size={16} /> {t('model')}
              </label>
              <div className="relative">
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium text-gray-900 dark:text-white"
                >
                  {MODEL_DATA.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.provider} - {model.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                  <RefreshCcw size={16} />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex justify-between px-1">
                <span>{t('inputUnitPrice')}: ${selectedModel?.inputPrice}/1M</span>
                <span>{t('outputUnitPrice')}: ${selectedModel?.outputPrice}/1M</span>
              </div>
            </section>

            {/* パラメータ設定 */}
            <section className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl space-y-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t('usageSettings')}</h2>
                <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded font-medium">
                  {t('tokenNote')}
                </div>
              </div>

              {/* 入力トークン */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">{t('inputTokensPerRequest')}</label>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{inputTokens.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="128000"
                  step="100"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex gap-2 mt-2">
                  {[500, 2000, 10000, 100000].map(val => (
                    <button
                      key={val}
                      onClick={() => setInputTokens(val)}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* 出力トークン */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">{t('outputTokensPerRequest')}</label>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{outputTokens.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="8000"
                  step="10"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* 月間リクエスト数 */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">{t('monthlyRequests')}</label>
                  <span className="text-sm font-mono font-bold text-gray-900 dark:text-white">{requestsPerMonth.toLocaleString()} {t('times')}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="100000"
                  step="100"
                  value={requestsPerMonth}
                  onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <div className="mt-3 flex items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-600">
                  <span className="text-xs text-gray-400 dark:text-gray-500 mr-2">{t('directInput')}:</span>
                  <input
                    type="number"
                    value={requestsPerMonth}
                    onChange={(e) => setRequestsPerMonth(Number(e.target.value))}
                    className="bg-transparent text-sm w-full outline-none font-mono text-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>
            </section>

            {/* プリセット */}
            <section>
              <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                {t('scenarioPresets')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {PRESETS.map(preset => (
                  <button
                    key={preset.nameKey}
                    onClick={() => applyPreset(preset)}
                    className="text-left p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
                  >
                    <div className="font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                      {t(preset.nameKey)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {t(preset.descKey)}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 右カラム: 結果 */}
          <div className="lg:col-span-7 space-y-6">

            {/* メイン結果カード */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 dark:from-blue-950 dark:to-blue-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <DollarSign size={18} />
                  <span className="text-sm font-medium tracking-wide">{t('estimatedMonthlyCost')}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mt-4">
                  <div className="text-5xl font-bold tracking-tight">
                    {formatCurrency(currentCostJpy, 'JPY')}
                  </div>
                  <div className="text-xl opacity-70 font-mono">
                    ({formatCurrency(currentCostUsd, 'USD')})
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-blue-700/50 pt-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-blue-300 mb-1">{t('totalInputTokens')}</div>
                    <div className="font-mono text-lg">{(inputTokens * requestsPerMonth / 1000000).toFixed(2)}M</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-blue-300 mb-1">{t('totalOutputTokens')}</div>
                    <div className="font-mono text-lg">{(outputTokens * requestsPerMonth / 1000000).toFixed(2)}M</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 比較テーブル */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-700/30">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <BarChart3 size={18} className="text-gray-500 dark:text-gray-400" />
                  {t('modelComparison')}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{t('sameConditions')}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-3 font-medium">{t('tableModel')}</th>
                      <th className="px-6 py-3 font-medium text-right">{t('tableCost')}</th>
                      <th className="px-6 py-3 font-medium text-right hidden sm:table-cell">{t('tableComparison')} {selectedModel?.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {MODEL_DATA
                      .map(model => {
                        const cost = calculateCost(model.id, inputTokens, outputTokens, requestsPerMonth);
                        return { ...model, cost, costJpy: cost * exchangeRate };
                      })
                      .sort((a, b) => a.cost - b.cost)
                      .map((model) => {
                        const isSelected = model.id === selectedModelId;
                        const diffRatio = currentCostUsd > 0 ? model.cost / currentCostUsd : 0;

                        return (
                          <tr
                            key={model.id}
                            onClick={() => setSelectedModelId(model.id)}
                            className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/60 dark:bg-blue-900/20' : ''}`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {isSelected && <Check size={16} className="text-blue-600 dark:text-blue-400" />}
                                <div className={`w-1 h-8 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                <div>
                                  <div className={`font-semibold ${isSelected ? 'text-blue-900 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {model.name}
                                  </div>
                                  <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${getProviderColor(model.provider)}`}></span>
                                    {model.provider}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className={`font-bold ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                {formatCurrency(model.costJpy, 'JPY')}
                              </div>
                              <div className="text-xs text-gray-400 dark:text-gray-500">
                                {formatCurrency(model.cost, 'USD')}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right hidden sm:table-cell">
                              <div className="text-xs font-mono">
                                {diffRatio === 1 ? (
                                  <span className="text-gray-400 dark:text-gray-500">-</span>
                                ) : diffRatio < 1 ? (
                                  <span className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded">
                                    {(diffRatio * 100).toFixed(0)}%
                                  </span>
                                ) : (
                                  <span className="text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded">
                                    {(diffRatio * 100).toFixed(0)}%
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/30 text-xs text-center text-gray-500 dark:text-gray-400">
                {t('clickToApply')}
              </div>
            </div>

            {/* 注意事項 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
              <Info className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-1">{t('notesTitle')}</p>
                <ul className="list-disc pl-4 space-y-1 opacity-90">
                  <li>{t('note1')}</li>
                  <li>{t('note2')}</li>
                  <li>{t('note3')}</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
