'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ToolLayout from '../ToolLayout';
import ToolInfoArticle from '../ToolInfoArticle';
import { japaneseHolidays } from '@/src/data/holidays';

interface CalendarViewProps {
  initialYear: number;
  locale: string;
}

export default function CalendarView({ initialYear, locale }: CalendarViewProps) {
  const t = useTranslations('tools.calendar');
  const tc = useTranslations('common');
  const router = useRouter();

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRokuyo, setSelectedRokuyo] = useState<string | null>(null);

  // Update selectedYear when initialYear changes (when navigating to different year URLs)
  useEffect(() => {
    setSelectedYear(initialYear);
  }, [initialYear]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number): string => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isToday = (year: number, month: number, day: number): boolean => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const getRokuyo = (month: number, day: number): string => {
    const rokuyoNames = ['先勝', '友引', '先負', '仏滅', '大安', '赤口'];
    const index = (month + day) % 6;
    return rokuyoNames[index];
  };

  const isRokuyoMatch = (year: number, month: number, day: number): boolean => {
    if (!selectedRokuyo) return false;
    return getRokuyo(month + 1, day) === selectedRokuyo;
  };

  const isInRange = (year: number, month: number, day: number): boolean => {
    if (!selectionStart || !selectionEnd) return false;
    const date = new Date(year, month, day);
    const start = new Date(Math.min(selectionStart.getTime(), selectionEnd.getTime()));
    const end = new Date(Math.max(selectionStart.getTime(), selectionEnd.getTime()));
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    date.setHours(12, 0, 0, 0);
    return date >= start && date <= end;
  };

  const isStartDate = (year: number, month: number, day: number): boolean => {
    if (!selectionStart || selectionEnd) return false;
    return (
      selectionStart.getFullYear() === year &&
      selectionStart.getMonth() === month &&
      selectionStart.getDate() === day
    );
  };

  const isBusinessDay = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return false; // Weekend
    const dateKey = formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
    return !japaneseHolidays[dateKey]; // Not a holiday
  };

  const calculateBusinessDays = (): number => {
    if (!selectionStart || !selectionEnd) return 0;
    const start = new Date(Math.min(selectionStart.getTime(), selectionEnd.getTime()));
    const end = new Date(Math.max(selectionStart.getTime(), selectionEnd.getTime()));
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      if (isBusinessDay(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  };

  const handleDateClick = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);

    if (!selectionStart) {
      // First click: set start date
      setSelectionStart(date);
      setSelectionEnd(null);
      setShowPopup(false);
    } else if (!selectionEnd) {
      // Second click: set end date and show popup
      setSelectionEnd(date);
      setShowPopup(true);
    } else {
      // Third click: reset and start new selection
      setSelectionStart(date);
      setSelectionEnd(null);
      setShowPopup(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const renderMonth = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${month}-${i}`} className="aspect-square p-0.5"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(year, month, day);
      const holiday = japaneseHolidays[dateKey];
      const today = isToday(year, month, day);
      const inRange = isInRange(year, month, day);
      const startDateOnly = isStartDate(year, month, day);
      const rokuyoMatch = isRokuyoMatch(year, month, day);
      const dayOfWeek = (firstDay + day - 1) % 7;
      const isSunday = dayOfWeek === 0;
      const isSaturday = dayOfWeek === 6;
      const rokuyo = getRokuyo(month + 1, day);

      days.push(
        <div
          key={`${month}-${day}`}
          className={`aspect-square p-0.5 text-center border border-gray-200 dark:border-gray-700 cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 ${
            rokuyoMatch ? 'bg-purple-200 dark:bg-purple-700/50 border-purple-500 border-2' :
            inRange ? 'bg-yellow-200 dark:bg-yellow-700/40 border-yellow-500 border-2' :
            startDateOnly ? 'bg-green-200 dark:bg-green-700/50 border-green-500 border-2' :
            today ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-500' :
            holiday ? 'bg-red-50 dark:bg-red-900/20' : ''
          }`}
          onClick={() => handleDateClick(year, month, day)}
        >
          <div
            className={`text-xs font-medium ${
              rokuyoMatch ? 'text-purple-900 dark:text-purple-100 font-bold' :
              isSunday || holiday ? 'text-red-600 dark:text-red-400' :
              isSaturday ? 'text-blue-600 dark:text-blue-400' :
              'text-gray-900 dark:text-gray-100'
            }`}
            title={`${holiday || rokuyo}${holiday ? ` (${rokuyo})` : ''}`}
          >
            {day}
          </div>
        </div>
      );
    }

    return days;
  };

  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];

  const weekDays = [
    t('weekdays.sunday'),
    t('weekdays.monday'),
    t('weekdays.tuesday'),
    t('weekdays.wednesday'),
    t('weekdays.thursday'),
    t('weekdays.friday'),
    t('weekdays.saturday'),
  ];

  const handlePrevYear = () => {
    const newYear = selectedYear - 1;
    router.push(`/${locale}/tool/calendar/${newYear}`);
  };

  const handleNextYear = () => {
    const newYear = selectedYear + 1;
    router.push(`/${locale}/tool/calendar/${newYear}`);
  };

  const handleToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    router.push(`/${locale}/tool/calendar`);
  };

  const handleYearChange = (year: number) => {
    const currentYear = new Date().getFullYear();
    if (year === currentYear) {
      router.push(`/${locale}/tool/calendar`);
    } else {
      router.push(`/${locale}/tool/calendar/${year}`);
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
      <div className="space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrevYear}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
            >
              ◀
            </button>
            <button
              onClick={handleToday}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
            >
              {t('today')}
            </button>
            <button
              onClick={handleNextYear}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
            >
              ▶
            </button>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Year Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {selectedYear}年
        </h2>

        {/* Rokuyo Filter Tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {['先勝', '友引', '先負', '仏滅', '大安', '赤口'].map((rokuyo) => (
            <button
              key={rokuyo}
              onClick={() => setSelectedRokuyo(selectedRokuyo === rokuyo ? null : rokuyo)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRokuyo === rokuyo
                  ? 'bg-purple-600 text-white border-2 border-purple-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {rokuyo}
            </button>
          ))}
          {selectedRokuyo && (
            <button
              onClick={() => setSelectedRokuyo(null)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white hover:bg-red-600"
            >
              クリア
            </button>
          )}
        </div>

        {/* 12 Months Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, month) => (
            <div
              key={month}
              className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
            >
              {/* Month name */}
              <h3 className="text-lg font-bold text-center mb-2 text-gray-900 dark:text-white">
                {month + 1}月
              </h3>

              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-0 mb-1">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className={`text-center text-xs font-bold p-0.5 ${
                      index === 0 ? 'text-red-600 dark:text-red-400' :
                      index === 6 ? 'text-blue-600 dark:text-blue-400' :
                      'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-0">
                {renderMonth(selectedYear, month)}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 border border-blue-500 rounded"></div>
            <span>{t('legend.today')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-50 dark:bg-red-900/20 border border-gray-200 dark:border-gray-700 rounded"></div>
            <span>{t('legend.holiday')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 font-bold">日</span>
            <span>{t('legend.sunday')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">土</span>
            <span>{t('legend.saturday')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 dark:bg-green-700/50 border border-green-500 border-2 rounded"></div>
            <span>{t('legend.startDate')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 dark:bg-yellow-700/40 border border-yellow-500 border-2 rounded"></div>
            <span>{t('legend.selected')}</span>
          </div>
        </div>

        {/* Business Days Popup */}
        {showPopup && selectionStart && selectionEnd && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div
              className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-auto shadow-2xl border-2 border-blue-500 dark:border-blue-400 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('popup.title')}
                </h3>
                <button
                  onClick={closePopup}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('popup.dateRange')}
                  </div>
                  <div className="text-lg text-gray-900 dark:text-white">
                    {new Date(Math.min(selectionStart.getTime(), selectionEnd.getTime())).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {' ～ '}
                    {new Date(Math.max(selectionStart.getTime(), selectionEnd.getTime())).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('popup.businessDays')}
                  </div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {calculateBusinessDays()}
                    <span className="text-lg ml-2">{t('popup.days')}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    {t('popup.note')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
