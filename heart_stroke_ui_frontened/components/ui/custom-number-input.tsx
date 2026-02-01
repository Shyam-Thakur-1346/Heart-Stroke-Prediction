"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomNumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
}

export function CustomNumberInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  icon,
}: CustomNumberInputProps) {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="group space-y-2">
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-primary transition-transform duration-300 group-hover:scale-110">
            {icon}
          </span>
        )}
        <label className="text-sm font-medium text-foreground">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg border border-input bg-background",
            "transition-all duration-200",
            "hover:border-primary hover:bg-accent/50 hover:text-primary",
            "active:scale-95",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <Minus className="h-4 w-4" />
        </button>
        <div className="relative flex-1">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className={cn(
              "h-11 w-full rounded-lg border border-input bg-background px-4 text-center text-sm font-medium",
              "ring-offset-background transition-all duration-200",
              "hover:border-primary",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            )}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {unit}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg border border-input bg-background",
            "transition-all duration-200",
            "hover:border-primary hover:bg-accent/50 hover:text-primary",
            "active:scale-95",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>
          Min: {min}
          {unit}
        </span>
        <span>
          Max: {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
