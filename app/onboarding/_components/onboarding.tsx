"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z, ZodError } from "zod";

type OnboardingForm = {
  primaryLanguage: string;
  yearsExperience: number;
  preferredTools: string[];
  areasOfInterest: string[];
  githubUrl: string;
  onboardingStep: number;
  onboardingComplete: boolean;
};

const onboardingSchema = z.object({
  primaryLanguage: z.string().min(1, "Required"),
  yearsExperience: z.number().min(0, "Required"),
  preferredTools: z.array(z.string()),
  areasOfInterest: z.array(z.string()),
  githubUrl: z.string().url().optional(),
});

const tools = [
  "React",
  "Vue",
  "Angular",
  "Rust",
  "Docker",
  "Node.js",
  "Python",
  "Go",
];
const interests = [
  "Frontend",
  "Backend",
  "DevOps",
  "ML",
  "Mobile",
  "Security",
  "Data Science",
];

const steps = [
  "Primary Language",
  "Years of Experience",
  "Preferred Tools",
  "Areas of Interest",
  "GitHub/Portfolio URL",
  "Preview & Submit",
];

type OnBoardingProps = {
  session: Session | null;
};

const OnBoarding = ({ session }: OnBoardingProps) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<OnboardingForm>({
    primaryLanguage: "",
    yearsExperience: 0,
    preferredTools: [],
    areasOfInterest: [],
    githubUrl: "",
    onboardingStep: 0,
    onboardingComplete: false,
  });
  const [error, setError] = useState("");

  // Fetch onboarding status on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/user/onboarding", {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.onboardingComplete) {
          router.replace("/dashboard");
        } else {
          setForm((prev) => ({ ...prev, ...data }));
        }
      })
      .finally(() => setLoading(false));
  }, [router, session?.user?.token]);

  // Save progress to backend
  const saveProgress = async (updates: Partial<OnboardingForm>) => {
    setSaving(true);
    await fetch("http://localhost:8080/api/user/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...form, ...updates, onboardingStep: step }),
    });
    setSaving(false);
  };

  // Handle next step
  const next = async () => {
    setError("");
    try {
      if (step === 0)
        onboardingSchema
          .pick({ primaryLanguage: true })
          .parse({ primaryLanguage: form.primaryLanguage });
      if (step === 1)
        onboardingSchema
          .pick({ yearsExperience: true })
          .parse({ yearsExperience: form.yearsExperience });
      if (step === 2)
        onboardingSchema
          .pick({ preferredTools: true })
          .parse({ preferredTools: form.preferredTools });
      if (step === 3)
        onboardingSchema
          .pick({ areasOfInterest: true })
          .parse({ areasOfInterest: form.areasOfInterest });
      if (step === 4 && form.githubUrl)
        onboardingSchema
          .pick({ githubUrl: true })
          .parse({ githubUrl: form.githubUrl });
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        setError(e.errors?.[0]?.message || "Please fill out this step");
      } else {
        setError("Please fill out this step");
      }
      return;
    }
    await saveProgress({});
    setStep((s) => s + 1);
  };

  // Handle previous step
  const prev = () => setStep((s) => Math.max(0, s - 1));

  // Handle skip
  const skip = async () => {
    setSaving(true);
    await fetch("http://localhost:8080/api/user/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ onboardingComplete: true }),
    });
    setSaving(false);
    router.replace("/dashboard");
  };

  // Handle submit
  const submit = async () => {
    setSaving(true);
    await fetch("http://localhost:8080/api/user/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...form, onboardingComplete: true }),
    });
    setSaving(false);
    router.replace("/dashboard");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-card rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Developer Onboarding</h2>
        <Button variant="ghost" onClick={skip} disabled={saving}>
          Skip
        </Button>
      </div>
      <Progress value={((step + 1) / steps.length) * 100} className="mb-4" />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 text-lg font-semibold">{steps[step]}</div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {step === 0 && (
            <div className="space-y-2">
              <Label htmlFor="primaryLanguage">
                Primary Programming Language
              </Label>
              <Input
                id="primaryLanguage"
                value={form.primaryLanguage}
                onChange={(e) =>
                  setForm((f) => ({ ...f, primaryLanguage: e.target.value }))
                }
                placeholder="e.g. JavaScript, Python, Go"
              />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <Label htmlFor="yearsExperience">Years of Experience</Label>
              <Input
                id="yearsExperience"
                type="number"
                min={0}
                value={form.yearsExperience}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    yearsExperience: Number(e.target.value),
                  }))
                }
                placeholder="e.g. 3"
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <Label>Preferred Tools/Frameworks</Label>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Checkbox
                    key={tool}
                    checked={form.preferredTools.includes(tool)}
                    onCheckedChange={(checked) => {
                      setForm((f) => ({
                        ...f,
                        preferredTools: checked
                          ? [...f.preferredTools, tool]
                          : f.preferredTools.filter((t) => t !== tool),
                      }));
                    }}
                    id={tool}
                  />
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <Label>Areas of Interest</Label>
              <div className="flex flex-wrap gap-2">
                {interests.map((area) => (
                  <Checkbox
                    key={area}
                    checked={form.areasOfInterest.includes(area)}
                    onCheckedChange={(checked) => {
                      setForm((f) => ({
                        ...f,
                        areasOfInterest: checked
                          ? [...f.areasOfInterest, area]
                          : f.areasOfInterest.filter((a) => a !== area),
                      }));
                    }}
                    id={area}
                  />
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub or Portfolio URL</Label>
              <Input
                id="githubUrl"
                value={form.githubUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, githubUrl: e.target.value }))
                }
                placeholder="https://github.com/yourname"
              />
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-lg">Review your details:</div>
              <ul className="list-disc ml-6">
                <li>Primary Language: {form.primaryLanguage}</li>
                <li>Years of Experience: {form.yearsExperience}</li>
                <li>Preferred Tools: {form.preferredTools.join(", ")}</li>
                <li>Areas of Interest: {form.areasOfInterest.join(", ")}</li>
                <li>GitHub/Portfolio: {form.githubUrl}</li>
              </ul>
              <div className="text-green-600 font-semibold">
                Welcome, {form.primaryLanguage} dev!
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prev}
          disabled={step === 0 || saving}
        >
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={next} disabled={saving}>
            Next
          </Button>
        ) : (
          <Button onClick={submit} disabled={saving}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
