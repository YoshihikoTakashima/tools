import { Calculator, RefreshCw, FileText, Calendar, Zap, Sparkles, LucideIcon } from 'lucide-react';

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
};

export default function CategoryIcon({ slug, className = "w-8 h-8" }: CategoryIconProps) {
  const Icon = iconMap[slug] || Calculator;
  return <Icon className={className} />;
}
