"use client";

import { useState } from "react";
import { Heart, Info, Sparkles } from "lucide-react";
import { SakuraParticles } from "@/components/sakura-particles";
import { PredictionForm } from "@/components/prediction-form";
import { PredictionResult } from "@/components/prediction-result";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

export default function HomePage() {
  const [risk, setRisk] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setRisk(null);

    try {
  const response = await fetch(
    "https://heart-stroke-prediction-8old.onrender.com/predict", // ✅ Render backend
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: data.age,
        sex: data.sex === "M" ? 1 : 0,
        cp: ["ATA", "NAP", "TA", "ASY"].indexOf(data.chestPain),
        trestbps: data.restingBP,
        chol: data.cholesterol,
        fbs: data.fastingBS === "1" ? 1 : 0,
        restecg: ["Normal", "ST", "LVH"].indexOf(data.restingECG),
        thalach: data.maxHR,
        exang: data.exerciseAngina === "Y" ? 1 : 0,
        oldpeak: data.oldpeak,
        slope: ["Up", "Flat", "Down"].indexOf(data.stSlope),
        ca: 0,
        thal: 1,
      }),
    }
  );

  const result = await response.json();
  console.log("API RESULT:", result);

  if (result.prediction !== undefined) {
    setRisk(result.probability);
  } else {
    alert("API Error: " + result.error);
  }
} catch (error) {
  console.error("Fetch error:", error);
  alert("Cannot connect to backend.");
}
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <SakuraParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Health Assessment
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <span className="text-primary">Cardio</span>Zen
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Discover your heart health with our serene AI-powered risk assessment.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className={cn("overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm")}>
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      Health Parameters
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Enter your medical data for assessment
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className={cn("sticky top-8 overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm")}>
              <CardHeader className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-foreground">
                      Risk Assessment
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your personalized results
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <PredictionResult risk={risk} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card className="mt-6 border-border/50 bg-muted/30 backdrop-blur-sm">
              <CardContent className="flex items-start gap-3 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  This tool provides an estimate only. Always consult a doctor.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
