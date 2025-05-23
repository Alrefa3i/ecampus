"use client";
import { icons } from "lucide-react";

export const Icon = ({
  name,
  size,
  className,
}: {
  name: keyof typeof icons;

  size: number;
  className?: string;
}) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon size={size} className={className} />;
};
