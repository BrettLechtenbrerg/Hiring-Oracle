"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  Users,
  FileText,
  MessageSquareMore,
  ClipboardCheck,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: FileText,
    color: "from-teal-500 to-cyan-600",
    title: "Step 1: Create a Position",
    subtitle: "Define the role you need to fill",
    description:
      "Click 'New Position' and fill in the job title, department, key responsibilities, required skills, and how this role connects to your brand values. Templates are pre-loaded for common positions.",
    tip: "Always tie responsibilities back to your brand values — it helps attract people who fit your culture.",
  },
  {
    icon: MessageSquareMore,
    color: "from-cyan-500 to-teal-600",
    title: "Step 2: Generate Interview Questions",
    subtitle: "Culture-fit + skills-based questions",
    description:
      "Each position auto-generates interview questions across categories: Behavioral, Technical, Culture Fit, and Scenario-Based. Add your own custom questions too.",
    tip: "The best interview question is one the candidate can't prepare a fake answer for. Focus on past behavior.",
  },
  {
    icon: ClipboardCheck,
    color: "from-emerald-500 to-teal-600",
    title: "Step 3: Evaluate & Onboard",
    subtitle: "Score candidates and plan their first 90 days",
    description:
      "Use the evaluation scorecard to rate candidates objectively. Once hired, the 30/60/90 day onboarding plan gives your new team member a clear path to success.",
    tip: "Great onboarding reduces turnover by 82%. The first 90 days determine if a new hire stays or leaves.",
  },
];

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <HelpCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Help</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              Hiring Oracle Guide
            </DialogTitle>
            <DialogDescription>
              Hire character, train skill.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 -mx-6 px-6 space-y-4 py-4">
            <div className="rounded-lg bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/40 dark:to-cyan-950/40 border border-teal-200 dark:border-teal-800 p-5 space-y-3">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Hiring That Fits Your Culture
              </h3>
              <p className="text-sm text-teal-800 dark:text-teal-200">
                The Hiring Oracle helps you build positions that align with your
                brand values, generate questions that reveal character, and
                create onboarding plans that set new hires up for success.
              </p>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                <div className="flex items-start gap-2 rounded-md bg-teal-50 p-3">
                  <Lightbulb className="h-4 w-4 text-teal-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-teal-800">{step.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
