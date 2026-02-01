"use client";

import React from "react"

import { useState } from "react";
import { User, Heart, Activity, Droplets, Zap, TrendingUp, Gauge, HeartPulse, PersonStanding, Baseline as ChartLine } from "lucide-react";
import { CustomSlider } from "@/components/ui/custom-slider";
import { CustomSelect } from "@/components/ui/custom-select";
import { CustomNumberInput } from "@/components/ui/custom-number-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormData {
  age: number;
  sex: string;
  chestPain: string;
  restingBP: number;
  cholesterol: number;
  fastingBS: string;
  restingECG: string;
  maxHR: number;
  exerciseAngina: string;
  oldpeak: number;
  stSlope: string;
}

interface PredictionFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: 40,
    sex: "M",
    chestPain: "ATA",
    restingBP: 120,
    cholesterol: 200,
    fastingBS: "0",
    restingECG: "Normal",
    maxHR: 150,
    exerciseAngina: "N",
    oldpeak: 1.0,
    stSlope: "Up",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <User className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Personal Information
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSlider
            label="Age"
            value={formData.age}
            onChange={(v) => updateField("age", v)}
            min={18}
            max={100}
            unit=" years"
            icon={<User className="h-4 w-4" />}
          />

          <CustomSelect
            label="Biological Sex"
            value={formData.sex}
            onChange={(v) => updateField("sex", v)}
            options={[
              { value: "M", label: "Male" },
              { value: "F", label: "Female" },
            ]}
            icon={<PersonStanding className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Cardiac Symptoms */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Cardiac Symptoms
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSelect
            label="Chest Pain Type"
            value={formData.chestPain}
            onChange={(v) => updateField("chestPain", v)}
            options={[
              { value: "ATA", label: "Atypical Angina (ATA)" },
              { value: "NAP", label: "Non-Anginal Pain (NAP)" },
              { value: "TA", label: "Typical Angina (TA)" },
              { value: "ASY", label: "Asymptomatic (ASY)" },
            ]}
            icon={<HeartPulse className="h-4 w-4" />}
          />

          <CustomSelect
            label="Exercise-Induced Angina"
            value={formData.exerciseAngina}
            onChange={(v) => updateField("exerciseAngina", v)}
            options={[
              { value: "N", label: "No" },
              { value: "Y", label: "Yes" },
            ]}
            icon={<Activity className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Vital Signs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <Gauge className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Vital Signs
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomNumberInput
            label="Resting Blood Pressure"
            value={formData.restingBP}
            onChange={(v) => updateField("restingBP", v)}
            min={80}
            max={200}
            unit=" mm Hg"
            icon={<Gauge className="h-4 w-4" />}
          />

          <CustomNumberInput
            label="Cholesterol"
            value={formData.cholesterol}
            onChange={(v) => updateField("cholesterol", v)}
            min={100}
            max={600}
            unit=" mg/dL"
            icon={<Droplets className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSlider
            label="Max Heart Rate"
            value={formData.maxHR}
            onChange={(v) => updateField("maxHR", v)}
            min={60}
            max={220}
            unit=" bpm"
            icon={<HeartPulse className="h-4 w-4" />}
          />

          <CustomSelect
            label="Fasting Blood Sugar > 120 mg/dL"
            value={formData.fastingBS}
            onChange={(v) => updateField("fastingBS", v)}
            options={[
              { value: "0", label: "No (< 120 mg/dL)" },
              { value: "1", label: "Yes (> 120 mg/dL)" },
            ]}
            icon={<Zap className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* ECG Results */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <ChartLine className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold text-foreground">
            ECG Results
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <CustomSelect
            label="Resting ECG"
            value={formData.restingECG}
            onChange={(v) => updateField("restingECG", v)}
            options={[
              { value: "Normal", label: "Normal" },
              { value: "ST", label: "ST-T Wave Abnormality" },
              { value: "LVH", label: "Left Ventricular Hypertrophy" },
            ]}
            icon={<Activity className="h-4 w-4" />}
          />

          <CustomSelect
            label="ST Slope"
            value={formData.stSlope}
            onChange={(v) => updateField("stSlope", v)}
            options={[
              { value: "Up", label: "Upsloping" },
              { value: "Flat", label: "Flat" },
              { value: "Down", label: "Downsloping" },
            ]}
            icon={<TrendingUp className="h-4 w-4" />}
          />
        </div>

        <CustomSlider
          label="Oldpeak (ST Depression)"
          value={formData.oldpeak}
          onChange={(v) => updateField("oldpeak", v)}
          min={0}
          max={6}
          step={0.1}
          icon={<ChartLine className="h-4 w-4" />}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-6 text-lg font-semibold",
          "bg-primary text-primary-foreground",
          "transition-all duration-300",
          "hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/25",
          "active:scale-[0.98]",
          "disabled:hover:scale-100"
        )}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Heart className="h-5 w-5 animate-pulse" />
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Predict Risk
          </span>
        )}
      </Button>
    </form>
  );
}
