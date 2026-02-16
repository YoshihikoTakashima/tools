'use client';

import { Calendar, TrendingUp, Users, Star } from 'lucide-react';

interface HolidayData {
  date: string;
  name: string;
  day: string;
  isSubstitute?: boolean;
}

interface LongWeekendData {
  name: string;
  period: string;
  days: number;
  icon: string;
  color: string;
}

interface BusinessDaysData {
  month: string;
  days: number;
  holidays: string;
}

interface RokuyoData {
  name: string;
  reading: string;
  meaning: string;
  color: string;
  icon: string;
}

export default function Calendar2026Article({ locale }: { locale: string }) {
  const isJapanese = locale === 'ja';

  // 祝日データ
  const holidaysByMonth: { [key: string]: HolidayData[] } = {
    '1月': [
      { date: '1日', name: '元日', day: '木' },
      { date: '12日', name: '成人の日', day: '月' },
    ],
    '2月': [
      { date: '11日', name: '建国記念の日', day: '水' },
      { date: '23日', name: '天皇誕生日', day: '月' },
    ],
    '3月': [
      { date: '20日', name: '春分の日', day: '金' },
    ],
    '4月': [
      { date: '29日', name: '昭和の日', day: '水' },
    ],
    '5月': [
      { date: '3日', name: '憲法記念日', day: '日' },
      { date: '4日', name: 'みどりの日', day: '月' },
      { date: '5日', name: 'こどもの日', day: '火' },
      { date: '6日', name: '振替休日', day: '水', isSubstitute: true },
    ],
    '7月': [
      { date: '20日', name: '海の日', day: '月' },
    ],
    '8月': [
      { date: '11日', name: '山の日', day: '火' },
    ],
    '9月': [
      { date: '21日', name: '敬老の日', day: '月' },
      { date: '22日', name: '国民の休日', day: '火', isSubstitute: true },
      { date: '23日', name: '秋分の日', day: '水' },
    ],
    '10月': [
      { date: '12日', name: 'スポーツの日', day: '月' },
    ],
    '11月': [
      { date: '3日', name: '文化の日', day: '火' },
      { date: '23日', name: '勤労感謝の日', day: '月' },
    ],
  };

  // 連休データ
  const longWeekends: LongWeekendData[] = [
    { name: 'ゴールデンウィーク', period: '5/2(土)〜5/6(水)', days: 5, icon: '🌸', color: 'from-pink-500 to-rose-500' },
    { name: 'シルバーウィーク', period: '9/19(土)〜9/23(水)', days: 5, icon: '🍂', color: 'from-orange-500 to-amber-500' },
    { name: '年末年始', period: '12/27(日)〜1/4(月)', days: 9, icon: '🎍', color: 'from-blue-500 to-indigo-500' },
  ];

  // 営業日数データ
  const businessDays: BusinessDaysData[] = [
    { month: '1月', days: 20, holidays: '元日、成人の日' },
    { month: '2月', days: 18, holidays: '建国記念の日、天皇誕生日' },
    { month: '3月', days: 21, holidays: '春分の日' },
    { month: '4月', days: 21, holidays: '昭和の日' },
    { month: '5月', days: 17, holidays: 'GW（4日間）' },
    { month: '6月', days: 22, holidays: 'なし' },
    { month: '7月', days: 22, holidays: '海の日' },
    { month: '8月', days: 20, holidays: '山の日' },
    { month: '9月', days: 19, holidays: 'シルバーウィーク（3日間）' },
    { month: '10月', days: 21, holidays: 'スポーツの日' },
    { month: '11月', days: 19, holidays: '文化の日、勤労感謝の日' },
    { month: '12月', days: 22, holidays: 'なし' },
  ];

  // 六曜データ
  const rokuyoData: RokuyoData[] = [
    { name: '大安', reading: 'たいあん', meaning: '最も縁起が良い日。結婚式や新規事業の開始に最適', color: 'text-red-600 dark:text-red-400', icon: '◎' },
    { name: '友引', reading: 'ともびき', meaning: '慶事に良い日。葬儀は避けられる', color: 'text-blue-600 dark:text-blue-400', icon: '○' },
    { name: '先勝', reading: 'せんしょう', meaning: '午前中が吉、午後は凶', color: 'text-green-600 dark:text-green-400', icon: '△' },
    { name: '先負', reading: 'せんぷ', meaning: '午前中は凶、午後は吉', color: 'text-yellow-600 dark:text-yellow-400', icon: '△' },
    { name: '仏滅', reading: 'ぶつめつ', meaning: '大凶日とされるが、新しいことを始めるには良いという解釈も', color: 'text-gray-600 dark:text-gray-400', icon: '×' },
    { name: '赤口', reading: 'しゃっこう', meaning: '正午の前後1時間のみ吉', color: 'text-orange-600 dark:text-orange-400', icon: '▲' },
  ];

  const maxBusinessDays = Math.max(...businessDays.map(d => d.days));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヘッダーセクション */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            2026年カレンダー完全ガイド
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          2026年の祝日一覧、連休情報、営業日数、六曜カレンダーを完全網羅。
          ゴールデンウィークやシルバーウィークの日程、月別の営業日数も詳しく解説します。
        </p>
      </header>

      {/* 年間概要セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          2026年の年間概要
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">16日</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">国民の祝日</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl border border-green-200 dark:border-green-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">3回</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">大型連休</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">242日</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">年間営業日数</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">6種類</div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">六曜</div>
          </div>
        </div>
      </section>

      {/* 祝日一覧セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          2026年の祝日一覧
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(holidaysByMonth).map(([month, holidays]) => (
            <div key={month} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                {month}
              </h3>
              <div className="space-y-2">
                {holidays.map((holiday, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${holiday.isSubstitute ? 'text-orange-600 dark:text-orange-400' : 'text-red-600 dark:text-red-400'}`}>
                        {holiday.date}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({holiday.day})
                      </span>
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {holiday.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 連休まとめセクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          2026年の連休まとめ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {longWeekends.map((weekend, index) => (
            <div key={index} className="group">
              <div className={`bg-gradient-to-br ${weekend.color} p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl mb-3">{weekend.icon}</div>
                <h3 className="text-xl font-bold mb-2">{weekend.name}</h3>
                <p className="text-sm opacity-90 mb-3">{weekend.period}</p>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">{weekend.days}</div>
                  <div className="text-sm">連休</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 営業日数セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          2026年の月別営業日数
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="space-y-3">
            {businessDays.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {data.month}
                </div>
                <div className="flex-1">
                  <div className="relative h-8 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full transition-all"
                      style={{ width: `${(data.days / maxBusinessDays) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <span className="text-sm font-semibold text-white z-10">{data.days}日</span>
                    </div>
                  </div>
                </div>
                <div className="w-48 text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                  {data.holidays}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">年間営業日数</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">242日</span>
            </div>
          </div>
        </div>
      </section>

      {/* 六曜セクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          2026年の六曜カレンダー
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          六曜（ろくよう）は、日本の伝統的な暦注の一つで、冠婚葬祭の日取りを決める際に参考にされています。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rokuyoData.map((rokuyo, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${rokuyo.color} font-bold`}>{rokuyo.icon}</div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className={`text-xl font-bold ${rokuyo.color}`}>{rokuyo.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({rokuyo.reading})</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{rokuyo.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTAセクション */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">便利な2026年カレンダーツール</h2>
          <p className="mb-6 opacity-90">
            祝日の自動表示、六曜フィルター、営業日計算など、便利な機能が満載のカレンダーツールを無料で提供しています。
          </p>
          <a
            href="https://tools.realize-inc.co.jp/ja/tool/calendar"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            カレンダーツールを使う
          </a>
        </div>
      </section>

      {/* FAQセクション */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          よくある質問
        </h2>
        <div className="space-y-4">
          {[
            {
              q: '2026年のゴールデンウィークは何連休ですか？',
              a: '2026年のゴールデンウィークは、5月2日（土）〜6日（水）の5連休です。5月3日が日曜日のため、振替休日が5月6日（水）に設定されます。'
            },
            {
              q: '2026年に5連休以上の連休はありますか？',
              a: 'はい、2026年にはゴールデンウィーク（5連休）とシルバーウィーク（9月19日〜23日、5連休）の2回、5連休があります。また、年末年始は土日を含めると最大9連休となります。'
            },
            {
              q: '2026年の営業日は何日ですか？',
              a: '2026年の営業日（土日祝日を除く）は、年間で242日です。月別では、6月と12月が22日で最も多く、5月が17日で最も少なくなっています。'
            },
          ].map((faq, index) => (
            <details key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 group">
              <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* まとめセクション */}
      <section>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">まとめ</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            2026年は、ゴールデンウィークとシルバーウィークの2回の5連休があり、年間の営業日は242日となります。
            祝日や六曜を考慮したスケジュール管理には、当サイトの
            <a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">カレンダーツール</a>
            をぜひご活用ください。
          </p>
        </div>
      </section>
    </div>
  );
}
