import { Calculator, RefreshCw, FileText, Calendar, Zap, Sparkles, Bot, LucideIcon } from 'lucide-react';

interface CategoryIconProps {
  slug: string;
  className?: string;
}

const iconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  converter: RefreshCw,
  text: FileText,
  date: Calendar,
  generator: Zap,
  formatter: Sparkles,
  ai: Bot,
};

export default function CategoryIcon({ slug, className = "w-8 h-8" }: CategoryIconProps) {
  const Icon = iconMap[slug] || Calculator;
  return <Icon className={className} />;
}
