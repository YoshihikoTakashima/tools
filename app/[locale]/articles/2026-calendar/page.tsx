import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const dynamic = 'force-static';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'ja') {
    return {
      title: '2026年カレンダー完全ガイド｜祝日・連休・営業日・六曜を徹底解説',
      description: '2026年の祝日一覧、連休情報、営業日数、六曜カレンダーを完全網羅。ゴールデンウィークやシルバーウィークの日程、月別の営業日数も詳しく解説します。',
    };
  }

  return {
    title: '2026 Calendar Complete Guide | Holidays, Business Days, and Rokuyō',
    description: 'Complete guide to 2026 Japanese holidays, long weekends, business days count, and rokuyō calendar. Detailed monthly breakdown and planning information.',
  };
}

export default async function Calendar2026Article({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  if (locale === 'ja') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>2026年カレンダー完全ガイド｜祝日・連休・営業日・六曜を徹底解説</h1>

          <p>
            2026年のカレンダーをお探しですか？この記事では、2026年の祝日一覧、連休情報、営業日数、六曜カレンダーまで、すべての情報を網羅的にご紹介します。
            スケジュール管理やプロジェクト計画にぜひご活用ください。
          </p>

          <h2>2026年の祝日一覧</h2>
          <p>2026年は年間で16日間の国民の祝日があります。月別に一覧でご紹介します。</p>

          <h3>1月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1月1日</td>
                <td>元日</td>
                <td>木曜日</td>
              </tr>
              <tr>
                <td>1月12日</td>
                <td>成人の日</td>
                <td>月曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>2月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2月11日</td>
                <td>建国記念の日</td>
                <td>水曜日</td>
              </tr>
              <tr>
                <td>2月23日</td>
                <td>天皇誕生日</td>
                <td>月曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>3月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3月20日</td>
                <td>春分の日</td>
                <td>金曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>4月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4月29日</td>
                <td>昭和の日</td>
                <td>水曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>5月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5月3日</td>
                <td>憲法記念日</td>
                <td>日曜日</td>
              </tr>
              <tr>
                <td>5月4日</td>
                <td>みどりの日</td>
                <td>月曜日</td>
              </tr>
              <tr>
                <td>5月5日</td>
                <td>こどもの日</td>
                <td>火曜日</td>
              </tr>
              <tr>
                <td>5月6日</td>
                <td>振替休日</td>
                <td>水曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>7月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7月20日</td>
                <td>海の日</td>
                <td>月曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>8月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>8月11日</td>
                <td>山の日</td>
                <td>火曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>9月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9月21日</td>
                <td>敬老の日</td>
                <td>月曜日</td>
              </tr>
              <tr>
                <td>9月22日</td>
                <td>国民の休日</td>
                <td>火曜日</td>
              </tr>
              <tr>
                <td>9月23日</td>
                <td>秋分の日</td>
                <td>水曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>10月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10月12日</td>
                <td>スポーツの日</td>
                <td>月曜日</td>
              </tr>
            </tbody>
          </table>

          <h3>11月</h3>
          <table>
            <thead>
              <tr>
                <th>日付</th>
                <th>祝日名</th>
                <th>曜日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>11月3日</td>
                <td>文化の日</td>
                <td>火曜日</td>
              </tr>
              <tr>
                <td>11月23日</td>
                <td>勤労感謝の日</td>
                <td>月曜日</td>
              </tr>
            </tbody>
          </table>

          <h2>2026年の連休まとめ</h2>
          <p>2026年の主な連休をご紹介します。旅行や帰省の計画にご活用ください。</p>

          <h3>年末年始（2025年12月27日〜2026年1月4日）</h3>
          <p>
            土日を含めると最大9連休となります。元日が木曜日のため、年明けは比較的短めの休暇となります。
          </p>

          <h3>ゴールデンウィーク（5月2日〜6日）</h3>
          <p>
            <strong>5連休</strong>（土日含む）。5月3日が日曜日のため振替休日が5月6日（水）に設定され、5日間の連続した休みとなります。
          </p>

          <h3>シルバーウィーク（9月19日〜23日）</h3>
          <p>
            <strong>5連休</strong>（土日含む）。敬老の日、国民の休日、秋分の日が連続し、貴重な秋の大型連休となります。
          </p>

          <h3>その他の3連休</h3>
          <ul>
            <li><strong>1月10日〜12日</strong>（成人の日）</li>
            <li><strong>2月21日〜23日</strong>（天皇誕生日）</li>
            <li><strong>3月20日〜22日</strong>（春分の日）</li>
            <li><strong>7月18日〜20日</strong>（海の日）</li>
            <li><strong>10月10日〜12日</strong>（スポーツの日）</li>
            <li><strong>11月21日〜23日</strong>（勤労感謝の日）</li>
          </ul>

          <h2>2026年の営業日数</h2>
          <p>
            ビジネスパーソンやプロジェクト管理者にとって重要な営業日数の情報です。土日祝日を除いた実稼働日数を月別にご紹介します。
          </p>

          <h3>年間営業日数：242日</h3>
          <p>2026年は、土日祝日を除いた営業日が年間で242日となります。</p>

          <h3>月別営業日数</h3>
          <table>
            <thead>
              <tr>
                <th>月</th>
                <th>営業日数</th>
                <th>備考</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1月</td>
                <td>20日</td>
                <td>元日、成人の日</td>
              </tr>
              <tr>
                <td>2月</td>
                <td>18日</td>
                <td>建国記念の日、天皇誕生日</td>
              </tr>
              <tr>
                <td>3月</td>
                <td>21日</td>
                <td>春分の日</td>
              </tr>
              <tr>
                <td>4月</td>
                <td>21日</td>
                <td>昭和の日</td>
              </tr>
              <tr>
                <td>5月</td>
                <td>17日</td>
                <td>GW（4日間の祝日）</td>
              </tr>
              <tr>
                <td>6月</td>
                <td>22日</td>
                <td>祝日なし</td>
              </tr>
              <tr>
                <td>7月</td>
                <td>22日</td>
                <td>海の日</td>
              </tr>
              <tr>
                <td>8月</td>
                <td>20日</td>
                <td>山の日</td>
              </tr>
              <tr>
                <td>9月</td>
                <td>19日</td>
                <td>シルバーウィーク（3日間の祝日）</td>
              </tr>
              <tr>
                <td>10月</td>
                <td>21日</td>
                <td>スポーツの日</td>
              </tr>
              <tr>
                <td>11月</td>
                <td>19日</td>
                <td>文化の日、勤労感謝の日</td>
              </tr>
              <tr>
                <td>12月</td>
                <td>22日</td>
                <td>祝日なし</td>
              </tr>
            </tbody>
          </table>

          <p>
            特に5月と9月は連休の影響で営業日が少なくなるため、プロジェクトの納期設定には注意が必要です。
          </p>

          <h2>2026年の六曜カレンダー</h2>
          <p>
            六曜（ろくよう）は、日本の伝統的な暦注の一つで、冠婚葬祭の日取りを決める際に参考にされています。
          </p>

          <h3>六曜とは？</h3>
          <p>六曜は以下の6種類があり、それぞれに意味があります：</p>

          <dl>
            <dt><strong>大安（たいあん）</strong></dt>
            <dd>最も縁起が良い日とされ、結婚式や新規事業の開始に最適です。「大いに安し」という意味で、何事においても吉とされています。</dd>

            <dt><strong>友引（ともびき）</strong></dt>
            <dd>「友を引く」という意味から、葬儀は避けられる日です。ただし、結婚式などの慶事には良い日とされています。午前と午後は吉、正午は凶とされます。</dd>

            <dt><strong>先勝（せんしょう/さきがち）</strong></dt>
            <dd>「先んずれば勝つ」という意味で、午前中が吉、午後は凶とされています。物事は午前中に済ませるのが良いとされる日です。</dd>

            <dt><strong>先負（せんぷ/さきまけ）</strong></dt>
            <dd>先勝の反対で、午前中は凶、午後は吉とされています。急がず、慌てず、控えめに過ごすのが良いとされる日です。</dd>

            <dt><strong>仏滅（ぶつめつ）</strong></dt>
            <dd>「仏も滅するような大凶日」とされ、結婚式や新規事業の開始は避けられることが多い日です。ただし、「物滅」として、古いものを捨てて新しいことを始めるには良いという解釈もあります。</dd>

            <dt><strong>赤口（しゃっこう/しゃっく）</strong></dt>
            <dd>正午の前後1時間のみ吉で、それ以外は凶とされる日です。「赤」は火や血を連想させるため、火事や刃物に注意すべき日とされています。</dd>
          </dl>

          <h3>六曜の決まり方</h3>
          <p>
            六曜は旧暦の月と日の合計数を6で割った余りで決まります。そのため、規則的な周期で巡ってきます。
          </p>

          <h2>便利な2026年カレンダーツール</h2>
          <p>
            当サイトでは、2026年のカレンダーを見やすく表示し、さらに便利な機能を提供する<a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline">無料のカレンダーツール</a>をご用意しています。
          </p>

          <h3>主な機能</h3>
          <ul>
            <li><strong>祝日の自動表示</strong>：日本の祝日が赤色で表示され、一目で確認できます</li>
            <li><strong>六曜の表示・フィルター</strong>：各日の六曜が表示され、大安や仏滅などで絞り込みも可能です</li>
            <li><strong>営業日計算</strong>：開始日と終了日をクリックするだけで、期間内の営業日数を自動計算します</li>
            <li><strong>年・月の切り替え</strong>：2024年から2030年まで対応し、簡単に月を移動できます</li>
            <li><strong>ダークモード対応</strong>：目に優しいダークモードで夜間でも快適に使用できます</li>
          </ul>

          <p>
            プロジェクトの納期管理、イベントの日程調整、結婚式の日取り決めなど、様々な場面でご活用いただけます。
            ぜひ<a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline">カレンダーツール</a>をお試しください。
          </p>

          <h2>よくある質問</h2>

          <h3>Q1. 2026年のゴールデンウィークは何連休ですか？</h3>
          <p>
            A. 2026年のゴールデンウィークは、5月2日（土）〜6日（水）の5連休です。5月3日が日曜日のため、振替休日が5月6日（水）に設定されます。
          </p>

          <h3>Q2. 2026年に5連休以上の連休はありますか？</h3>
          <p>
            A. はい、2026年にはゴールデンウィーク（5連休）とシルバーウィーク（9月19日〜23日、5連休）の2回、5連休があります。
            また、年末年始は土日を含めると最大9連休となります。
          </p>

          <h3>Q3. 2026年の営業日は何日ですか？</h3>
          <p>
            A. 2026年の営業日（土日祝日を除く）は、年間で242日です。月別では、6月と12月が22日で最も多く、5月が17日で最も少なくなっています。
          </p>

          <h3>Q4. 六曜はどのように決まりますか？</h3>
          <p>
            A. 六曜は旧暦の月と日の合計数を6で割った余りで決まります。0なら大安、1なら友引、2なら先勝、3なら先負、4なら仏滅、5なら赤口となります。
          </p>

          <h3>Q5. 大安の日に結婚式を挙げたいのですが、どうやって探せますか？</h3>
          <p>
            A. 当サイトの<a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline">カレンダーツール</a>では、六曜フィルター機能を使って大安の日だけを表示できます。
            さらに、土日祝日と組み合わせて検索することも可能です。
          </p>

          <h3>Q6. 営業日の計算方法を教えてください</h3>
          <p>
            A. 営業日は、カレンダー上の日数から土曜日、日曜日、祝日を除いた日数です。
            当サイトのカレンダーツールでは、開始日と終了日をクリックするだけで自動的に営業日数を計算できます。
          </p>

          <h3>Q7. 2026年の春分の日と秋分の日はいつですか？</h3>
          <p>
            A. 2026年の春分の日は3月20日（金）、秋分の日は9月23日（水）です。いずれも天文観測に基づいて決定されます。
          </p>

          <h3>Q8. スマートフォンでもカレンダーツールは使えますか？</h3>
          <p>
            A. はい、当サイトのカレンダーツールは完全レスポンシブデザインで、スマートフォンやタブレットでも快適にご利用いただけます。
          </p>

          <h2>まとめ</h2>
          <p>
            2026年は、ゴールデンウィークとシルバーウィークの2回の5連休があり、年間の営業日は242日となります。
            祝日や六曜を考慮したスケジュール管理には、当サイトの<a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline">カレンダーツール</a>をぜひご活用ください。
          </p>

          <p>
            営業日計算機能や六曜フィルター機能を使えば、プロジェクトの納期設定や冠婚葬祭の日程調整もスムーズに行えます。
            ブックマークしていつでもご利用ください。
          </p>
        </article>
      </div>
    );
  }

  // English version
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <h1>2026 Japan Calendar Complete Guide | Holidays, Business Days, and Rokuyō</h1>

        <p>
          Looking for the 2026 Japan calendar? This comprehensive guide covers all Japanese national holidays,
          long weekends, business days count, and traditional rokuyō calendar information for 2026.
          Perfect for schedule planning and project management.
        </p>

        <h2>2026 National Holidays</h2>
        <p>Japan observes 16 national holidays in 2026. Here's the complete list by month:</p>

        <h3>January</h3>
        <ul>
          <li><strong>January 1 (Thu)</strong> - New Year's Day</li>
          <li><strong>January 12 (Mon)</strong> - Coming of Age Day</li>
        </ul>

        <h3>February</h3>
        <ul>
          <li><strong>February 11 (Wed)</strong> - National Foundation Day</li>
          <li><strong>February 23 (Mon)</strong> - Emperor's Birthday</li>
        </ul>

        <h3>March</h3>
        <ul>
          <li><strong>March 20 (Fri)</strong> - Vernal Equinox Day</li>
        </ul>

        <h3>April - May (Golden Week)</h3>
        <ul>
          <li><strong>April 29 (Wed)</strong> - Showa Day</li>
          <li><strong>May 3 (Sun)</strong> - Constitution Memorial Day</li>
          <li><strong>May 4 (Mon)</strong> - Greenery Day</li>
          <li><strong>May 5 (Tue)</strong> - Children's Day</li>
          <li><strong>May 6 (Wed)</strong> - Substitute Holiday</li>
        </ul>

        <h3>July - September</h3>
        <ul>
          <li><strong>July 20 (Mon)</strong> - Marine Day</li>
          <li><strong>August 11 (Tue)</strong> - Mountain Day</li>
          <li><strong>September 21 (Mon)</strong> - Respect for the Aged Day</li>
          <li><strong>September 22 (Tue)</strong> - National Holiday</li>
          <li><strong>September 23 (Wed)</strong> - Autumnal Equinox Day</li>
        </ul>

        <h3>October - November</h3>
        <ul>
          <li><strong>October 12 (Mon)</strong> - Sports Day</li>
          <li><strong>November 3 (Tue)</strong> - Culture Day</li>
          <li><strong>November 23 (Mon)</strong> - Labor Thanksgiving Day</li>
        </ul>

        <h2>2026 Long Weekends</h2>

        <h3>Golden Week (May 2-6)</h3>
        <p>
          <strong>5 consecutive days off</strong> including weekends. With May 3 falling on Sunday,
          a substitute holiday is designated for May 6 (Wednesday).
        </p>

        <h3>Silver Week (September 19-23)</h3>
        <p>
          <strong>5 consecutive days off</strong> including weekends. A rare autumn long weekend
          with three consecutive holidays.
        </p>

        <h2>2026 Business Days Count</h2>
        <p>
          Total business days (excluding weekends and holidays): <strong>242 days</strong>
        </p>

        <p>
          May has the fewest business days (17 days) due to Golden Week, while June and December
          have the most (22 days each).
        </p>

        <h2>Rokuyō Traditional Calendar</h2>
        <p>
          Rokuyō (六曜) is a traditional Japanese calendar system used for selecting auspicious dates
          for weddings and other important events. The six days cycle through: Taian (most auspicious),
          Tomobiki, Sensh, Senbu, Butsumetsu (inauspicious), and Shakk.
        </p>

        <h2>Use Our Calendar Tool</h2>
        <p>
          Check out our <a href="https://tools.realize-inc.co.jp/ja/tool/calendar" className="text-blue-600 dark:text-blue-400 hover:underline">free calendar tool</a> with:
        </p>
        <ul>
          <li>Automatic holiday highlighting</li>
          <li>Rokuyō display and filtering</li>
          <li>Business days calculator</li>
          <li>Dark mode support</li>
        </ul>

        <p>
          Perfect for project planning, event scheduling, and deadline management.
        </p>
      </article>
    </div>
  );
}
