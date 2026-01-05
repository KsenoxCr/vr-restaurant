import {
  Ban,
  ChefHat,
  CircleCheckBig,
  Clock4,
  Eye,
  SoupIcon as LucideSoupIcon,
  X,
} from "lucide-react";

export function ClockIcon() {
  return <Clock4 className="w-14 h-14" />;
}

export function EyeIcon() {
  return (
    <div className="p-4 rounded-full bg-dark-gray text-light-gray">
      <Eye className="w-14 h-14" />
    </div>
  );
}

export function ChefHatIcon() {
  return (
    <div className="p-4 rounded-full bg-dark-gray text-light-gray">
      <ChefHat className="w-14 h-14" />
    </div>
  );
}

export function SoupIcon() {
  return (
    <div className="p-4 rounded-full bg-dark-gray text-accent">
      <LucideSoupIcon className="w-14 h-14" />
    </div>
  );
}

export function CircleCheckIcon() {
  return (
    <div className="p-4 rounded-full bg-dark-gray text-accent">
      <CircleCheckBig className="w-14 h-14" />
    </div>
  );
}

export function BanIcon() {
  return (
    <div className="p-4 rounded-full text-danger bg-dark-gray">
      <Ban className="w-14 h-14" />
    </div>
  );
}

export function XIcon() {
  return (
    <div className="p-3 rounded-full bg-dark-gray text-light-gray">
      <X className="w-16 h-16" />
    </div>
  );
}
