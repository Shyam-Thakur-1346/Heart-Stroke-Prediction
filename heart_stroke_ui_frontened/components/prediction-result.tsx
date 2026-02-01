"use client";

import { Heart, AlertTriangle, Shield, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface PredictionResultProps {
  risk: number | null;
  isLoading: boolean;
}

export function PredictionResult({ risk, isLoading }: PredictionResultProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12">
        <div className="relative">
          <div className="h-32 w-32 animate-pulse rounded-full bg-primary/20" />
          <Heart className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-pulse text-primary" />
        </div>
        <p className="animate-pulse text-lg font-medium text-muted-foreground">
          Analyzing your heart health...
        </p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-primary"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (risk === null) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center">
        <div className="rounded-full bg-muted p-6">
          <Activity className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Ready to Assess
        </h3>
        <p className="max-w-sm text-muted-foreground">
          Enter your health parameters and click &quot;Predict Risk&quot; to receive
          your personalized heart health assessment.
        </p>
      </div>
    );
  }

  const getRiskLevel = () => {
    if (risk < 30) return { level: "Low", color: "text-green-600", bg: "bg-green-100" };
    if (risk < 60) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bg: "bg-red-100" };
  };

  const { level, color, bg } = getRiskLevel();

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          className={cn(
            "relative flex h-40 w-40 items-center justify-center rounded-full",
            "transition-all duration-1000",
            risk < 30 ? "bg-green-100" : risk < 60 ? "bg-yellow-100" : "bg-red-100"
          )}
        >
          <svg className="absolute inset-0 h-40 w-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000",
                risk < 30 ? "text-green-500" : risk < 60 ? "text-yellow-500" : "text-red-500"
              )}
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - risk / 100)}`}
            />
          </svg>
          <div className="z-10 flex flex-col items-center">
            <span className={cn("text-4xl font-bold", color)}>{risk}%</span>
            <span className="text-sm text-muted-foreground">Risk Score</span>
          </div>
        </div>

        <div className={cn("flex items-center gap-2 rounded-full px-4 py-2", bg)}>
          {risk < 30 ? (
            <Shield className={cn("h-5 w-5", color)} />
          ) : risk < 60 ? (
            <Activity className={cn("h-5 w-5", color)} />
          ) : (
            <AlertTriangle className={cn("h-5 w-5", color)} />
          )}
          <span className={cn("font-semibold", color)}>{level} Risk</span>
        </div>
      </div>

      <div className="space-y-3 rounded-xl bg-muted/50 p-4">
        <h4 className="font-semibold text-foreground">Recommendations</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {risk < 30 ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Continue maintaining your healthy lifestyle
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Regular check-ups every 6-12 months recommended
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">•</span>
                Keep up with regular exercise and balanced diet
              </li>
            </>
          ) : risk < 60 ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                Consider consulting a healthcare professional
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                Monitor blood pressure and cholesterol regularly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                Implement lifestyle modifications as needed
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Please consult a cardiologist as soon as possible
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Regular monitoring of cardiac health is essential
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Consider immediate lifestyle changes and medication review
              </li>
            </>
          )}
        </ul>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        This assessment is for informational purposes only and should not replace
        professional medical advice.
      </p>
    </div>
  );
}
