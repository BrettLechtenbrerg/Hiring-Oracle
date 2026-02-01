"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  FileDown,
  Printer,
  Search,
  Briefcase,
  MessageSquareMore,
  ClipboardCheck,
  CalendarRange,
  ChevronRight,
  Star,
} from "lucide-react";
import { HelpButton } from "@/components/help/help-button";

interface Position {
  id: string;
  title: string;
  department: string;
  reportsTo: string;
  type: string;
  responsibilities: string[];
  requiredSkills: string[];
  brandValues: string[];
  interviewQuestions: { category: string; question: string }[];
  evaluationCriteria: { name: string; weight: number }[];
  onboarding: { phase: string; tasks: string[] }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const DEPARTMENTS = ["Front Desk", "Instruction", "Sales", "Marketing", "Operations", "Management", "Finance", "Facilities", "Other"];

const POSITION_TYPES = ["Full-Time", "Part-Time", "Contract", "Seasonal", "Internship"];

const DEFAULT_VALUES = [
  "Integrity & Honesty",
  "Student-First Mindset",
  "Continuous Improvement",
  "Team Collaboration",
  "Positive Energy",
  "Accountability",
  "Respect for All",
  "Excellence in Everything",
];

const QUESTION_BANK: Record<string, string[]> = {
  "Behavioral": [
    "Tell me about a time you went above and beyond for a customer or student.",
    "Describe a situation where you had to handle a difficult person. What did you do?",
    "Give me an example of when you had to adapt quickly to a change at work.",
    "Tell me about a time you made a mistake. How did you handle it?",
    "Describe a situation where you had to work with someone you didn't get along with.",
  ],
  "Culture Fit": [
    "What does integrity mean to you in the workplace?",
    "How do you handle it when you disagree with a manager's decision?",
    "What kind of team environment brings out your best work?",
    "Describe your ideal manager. What qualities do they have?",
    "What motivates you beyond a paycheck?",
  ],
  "Scenario": [
    "A parent is upset because their child didn't earn a belt promotion. How do you handle it?",
    "You notice a coworker consistently showing up late. What do you do?",
    "A student gets injured during class. Walk me through your response.",
    "You're working the desk alone and three things happen at once: phone rings, walk-in arrives, student has a question. How do you prioritize?",
    "A long-time student says they want to cancel their membership. What's your approach?",
  ],
  "Technical": [
    "What experience do you have with CRM or scheduling software?",
    "Describe your approach to following standard operating procedures.",
    "How do you stay organized when managing multiple tasks or responsibilities?",
    "What's your experience with cash handling and point-of-sale systems?",
    "How comfortable are you with social media posting and community management?",
  ],
};

const TEMPLATES: Omit<Position, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Front Desk Associate",
    department: "Front Desk",
    reportsTo: "Program Director",
    type: "Part-Time",
    responsibilities: [
      "Greet all students and visitors with enthusiasm and professionalism",
      "Answer phones and respond to inquiries within 2 rings",
      "Process enrollments, payments, and schedule changes in GHL",
      "Maintain clean and organized front desk and lobby area",
      "Execute opening and closing procedures per SOP",
      "Track daily attendance and flag at-risk students",
    ],
    requiredSkills: ["Customer service", "Phone etiquette", "Basic computer skills", "Multitasking", "Cash handling"],
    brandValues: ["Student-First Mindset", "Positive Energy", "Accountability"],
    interviewQuestions: [],
    evaluationCriteria: [
      { name: "Customer Service", weight: 30 },
      { name: "Communication", weight: 25 },
      { name: "Culture Fit", weight: 25 },
      { name: "Technical Skills", weight: 20 },
    ],
    onboarding: [
      { phase: "First 30 Days", tasks: ["Complete all SOPs training", "Shadow experienced front desk staff for 1 week", "Learn GHL and POS system", "Memorize student greeting protocol", "Pass front desk quiz (90%+)"] },
      { phase: "Days 31-60", tasks: ["Handle desk independently during off-peak hours", "Process 10 enrollments with supervision", "Lead opening or closing procedures solo", "Complete phone script training", "First performance check-in with manager"] },
      { phase: "Days 61-90", tasks: ["Handle desk independently during peak hours", "Train on retention call procedures", "Demonstrate all emergency protocols", "90-day performance review", "Set goals for next quarter"] },
    ],
    notes: "Ideal candidate has experience in customer-facing roles. Martial arts experience is a plus but not required.",
  },
  {
    title: "Head Instructor",
    department: "Instruction",
    reportsTo: "Owner / Program Director",
    type: "Full-Time",
    responsibilities: [
      "Lead group classes for all age groups and skill levels",
      "Develop and maintain curriculum aligned with school standards",
      "Conduct belt testing and evaluations",
      "Mentor and train assistant instructors",
      "Maintain student engagement and retention through quality instruction",
      "Participate in community events and demonstrations",
    ],
    requiredSkills: ["Black belt (2nd degree or higher)", "Teaching experience (2+ years)", "Youth development", "Curriculum design", "Leadership"],
    brandValues: ["Excellence in Everything", "Continuous Improvement", "Student-First Mindset"],
    interviewQuestions: [],
    evaluationCriteria: [
      { name: "Teaching Ability", weight: 30 },
      { name: "Student Engagement", weight: 25 },
      { name: "Leadership", weight: 20 },
      { name: "Culture Fit", weight: 15 },
      { name: "Technical Skill", weight: 10 },
    ],
    onboarding: [
      { phase: "First 30 Days", tasks: ["Observe all current classes for 1 week", "Review complete curriculum guide", "Co-teach with current instructor for 2 weeks", "Meet all students by name", "Complete school philosophy training"] },
      { phase: "Days 31-60", tasks: ["Lead classes independently", "Conduct first belt testing under supervision", "Complete first parent communication round", "Develop 1 new drill or exercise per week", "First performance check-in"] },
      { phase: "Days 61-90", tasks: ["Full class schedule ownership", "Lead first community demo or event", "Begin mentoring assistant instructors", "90-day comprehensive review", "Create quarterly curriculum plan"] },
    ],
    notes: "This role is the heart of the school. The right instructor transforms student lives.",
  },
  {
    title: "Program Director",
    department: "Management",
    reportsTo: "Owner",
    type: "Full-Time",
    responsibilities: [
      "Oversee all daily operations and staff management",
      "Drive enrollment, retention, and revenue targets",
      "Hire, train, and develop team members",
      "Execute marketing and community outreach initiatives",
      "Manage student and parent relationships",
      "Report weekly on KPIs to owner",
    ],
    requiredSkills: ["Management experience (3+ years)", "Sales and enrollment", "Team leadership", "P&L understanding", "CRM proficiency"],
    brandValues: ["Accountability", "Team Collaboration", "Integrity & Honesty", "Excellence in Everything"],
    interviewQuestions: [],
    evaluationCriteria: [
      { name: "Leadership", weight: 25 },
      { name: "Business Acumen", weight: 25 },
      { name: "Culture Fit", weight: 20 },
      { name: "Communication", weight: 15 },
      { name: "Problem Solving", weight: 15 },
    ],
    onboarding: [
      { phase: "First 30 Days", tasks: ["Complete full operations manual review", "Meet all staff 1-on-1", "Shadow current operations for 2 weeks", "Learn all technology platforms (GHL, POS, etc.)", "Review last 6 months of financials and KPIs"] },
      { phase: "Days 31-60", tasks: ["Take over daily operations management", "Conduct first team meeting independently", "Implement 1 process improvement", "Complete first enrollment cycle", "Build relationships with top 20 families"] },
      { phase: "Days 61-90", tasks: ["Full operational ownership", "Present first monthly P&L analysis to owner", "Complete first hiring cycle (if needed)", "90-day comprehensive review", "Set Q2 goals and strategy"] },
    ],
    notes: "This person runs the school day-to-day so the owner can focus on growth and vision.",
  },
];

const STORAGE_KEY = "hiring-oracle-data";
type TabId = "positions" | "questions" | "evaluation" | "onboarding";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export default function HiringOraclePage() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [activePos, setActivePos] = useState<Position | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("positions");
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setPositions(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }, [positions, loaded]);

  const handleSave = useCallback(() => {
    if (!activePos) return;
    const updated = { ...activePos, updatedAt: new Date().toISOString() };
    setPositions((prev) => {
      const exists = prev.find((p) => p.id === updated.id);
      if (exists) return prev.map((p) => (p.id === updated.id ? updated : p));
      return [...prev, updated];
    });
    setActivePos(updated);
    setEditMode(false);
  }, [activePos]);

  const handleDelete = useCallback((id: string) => {
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setActivePos(null);
    setEditMode(false);
  }, []);

  const handleNew = () => {
    const now = new Date().toISOString();
    const pos: Position = {
      id: generateId(), title: "", department: "Front Desk", reportsTo: "", type: "Full-Time",
      responsibilities: [""], requiredSkills: [""], brandValues: [],
      interviewQuestions: [], evaluationCriteria: [
        { name: "Culture Fit", weight: 25 }, { name: "Technical Skills", weight: 25 },
        { name: "Communication", weight: 25 }, { name: "Leadership", weight: 25 },
      ],
      onboarding: [
        { phase: "First 30 Days", tasks: [""] },
        { phase: "Days 31-60", tasks: [""] },
        { phase: "Days 61-90", tasks: [""] },
      ],
      notes: "", createdAt: now, updatedAt: now,
    };
    setActivePos(pos);
    setEditMode(true);
    setActiveTab("positions");
  };

  const handleTemplate = (tmpl: (typeof TEMPLATES)[number]) => {
    const now = new Date().toISOString();
    const pos: Position = { ...tmpl, id: generateId(), createdAt: now, updatedAt: now };
    setActivePos(pos);
    setEditMode(true);
    setActiveTab("positions");
  };

  const generateQuestions = () => {
    if (!activePos) return;
    const questions: { category: string; question: string }[] = [];
    Object.entries(QUESTION_BANK).forEach(([cat, qs]) => {
      const shuffled = [...qs].sort(() => Math.random() - 0.5);
      shuffled.slice(0, 3).forEach((q) => questions.push({ category: cat, question: q }));
    });
    if (activePos.brandValues.length > 0) {
      activePos.brandValues.forEach((v) => {
        questions.push({ category: "Values", question: `Tell me about a time you demonstrated "${v}" in a work setting.` });
      });
    }
    setActivePos({ ...activePos, interviewQuestions: questions });
  };

  const exportPosition = (pos: Position) => {
    const lines = [
      `POSITION: ${pos.title}`, `Department: ${pos.department}`, `Reports To: ${pos.reportsTo}`, `Type: ${pos.type}`, "",
      "RESPONSIBILITIES:", ...pos.responsibilities.map((r, i) => `  ${i + 1}. ${r}`), "",
      "REQUIRED SKILLS:", ...pos.requiredSkills.map((s) => `  - ${s}`), "",
      "BRAND VALUES:", ...pos.brandValues.map((v) => `  - ${v}`), "",
      "INTERVIEW QUESTIONS:", ...pos.interviewQuestions.map((q, i) => `  ${i + 1}. [${q.category}] ${q.question}`), "",
      "EVALUATION CRITERIA:", ...pos.evaluationCriteria.map((c) => `  - ${c.name}: ${c.weight}%`), "",
      "ONBOARDING PLAN:", ...pos.onboarding.flatMap((p) => [`\n  ${p.phase}:`, ...p.tasks.map((t) => `    - ${t}`)]), "",
      `NOTES: ${pos.notes}`,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Position-${pos.title.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateListItem = (list: string[], index: number, value: string): string[] => {
    return list.map((item, i) => (i === index ? value : item));
  };

  const filtered = positions.filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: "positions", label: "Position", icon: Briefcase },
    { id: "questions", label: "Interview", icon: MessageSquareMore },
    { id: "evaluation", label: "Evaluation", icon: ClipboardCheck },
    { id: "onboarding", label: "Onboarding", icon: CalendarRange },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-200">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Hiring Oracle</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Hire character, train skill</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HelpButton />
            <a href="https://masters-edge-portal.vercel.app" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Portal</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel */}
          <div className="lg:w-72 shrink-0 no-print">
            <div className="space-y-4">
              <button onClick={handleNew} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium hover:from-teal-700 hover:to-cyan-700 transition-all shadow-lg shadow-teal-200 cursor-pointer">
                <Plus className="w-4 h-4" /> New Position
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search positions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>

              <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                {filtered.length === 0 && loaded && (
                  <p className="text-sm text-gray-400 text-center py-4">{positions.length === 0 ? "No positions yet." : "No matches."}</p>
                )}
                {filtered.map((pos) => (
                  <button key={pos.id} onClick={() => { setActivePos(pos); setEditMode(false); setActiveTab("positions"); }} className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${activePos?.id === pos.id ? "border-teal-500 bg-teal-50 shadow-sm" : "border-gray-200 bg-white hover:border-teal-300"}`}>
                    <h3 className="font-medium text-sm text-gray-900 truncate">{pos.title}</h3>
                    <span className="text-xs text-gray-400">{pos.department} &bull; {pos.type}</span>
                  </button>
                ))}
              </div>

              <div className="border-t pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Templates</h3>
                <div className="space-y-1.5">
                  {TEMPLATES.map((tmpl, i) => (
                    <button key={i} onClick={() => handleTemplate(tmpl)} className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-teal-50 text-gray-600 hover:text-teal-700 transition-colors cursor-pointer truncate">
                      {tmpl.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 min-w-0">
            {!activePos ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-teal-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Build Your Hiring System</h2>
                <p className="text-gray-500 max-w-md">Create positions, generate interview questions, build evaluation scorecards, and plan onboarding — all aligned with your brand values.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Tab Bar */}
                <div className="flex border-b border-gray-200 no-print overflow-x-auto">
                  {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${activeTab === tab.id ? "border-teal-600 text-teal-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                      <tab.icon className="w-4 h-4" /> {tab.label}
                    </button>
                  ))}
                  <div className="ml-auto flex items-center gap-2 px-4">
                    {editMode ? (
                      <button onClick={handleSave} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 cursor-pointer"><Save className="w-3.5 h-3.5" /> Save</button>
                    ) : (
                      <>
                        <button onClick={() => setEditMode(true)} className="px-3 py-1.5 rounded-lg text-sm text-teal-600 hover:bg-teal-50 cursor-pointer">Edit</button>
                        <button onClick={() => exportPosition(activePos)} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 cursor-pointer"><FileDown className="w-4 h-4" /></button>
                        <button onClick={() => window.print()} className="p-1.5 rounded-lg text-gray-400 hover:text-teal-600 cursor-pointer"><Printer className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(activePos.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Position Tab */}
                  {activeTab === "positions" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Job Title</label>
                          {editMode ? <input type="text" value={activePos.title} onChange={(e) => setActivePos({ ...activePos, title: e.target.value })} className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" /> : <p className="mt-1 text-sm font-medium">{activePos.title || "—"}</p>}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                          {editMode ? <select value={activePos.department} onChange={(e) => setActivePos({ ...activePos, department: e.target.value })} className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500">{DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}</select> : <p className="mt-1 text-sm">{activePos.department}</p>}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Reports To</label>
                          {editMode ? <input type="text" value={activePos.reportsTo} onChange={(e) => setActivePos({ ...activePos, reportsTo: e.target.value })} className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" /> : <p className="mt-1 text-sm">{activePos.reportsTo || "—"}</p>}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase">Position Type</label>
                          {editMode ? <select value={activePos.type} onChange={(e) => setActivePos({ ...activePos, type: e.target.value })} className="mt-1 w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500">{POSITION_TYPES.map((t) => <option key={t}>{t}</option>)}</select> : <p className="mt-1 text-sm">{activePos.type}</p>}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Key Responsibilities</label>
                          {editMode && <button onClick={() => setActivePos({ ...activePos, responsibilities: [...activePos.responsibilities, ""] })} className="text-xs text-teal-600 font-medium cursor-pointer">+ Add</button>}
                        </div>
                        <div className="mt-2 space-y-2">
                          {activePos.responsibilities.map((r, i) => editMode ? (
                            <div key={i} className="flex items-center gap-2">
                              <input type="text" value={r} onChange={(e) => setActivePos({ ...activePos, responsibilities: updateListItem(activePos.responsibilities, i, e.target.value) })} className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                              <button onClick={() => setActivePos({ ...activePos, responsibilities: activePos.responsibilities.filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          ) : (
                            <div key={i} className="flex items-start gap-2 text-sm"><ChevronRight className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />{r}</div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-gray-500 uppercase">Required Skills</label>
                          {editMode && <button onClick={() => setActivePos({ ...activePos, requiredSkills: [...activePos.requiredSkills, ""] })} className="text-xs text-teal-600 font-medium cursor-pointer">+ Add</button>}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activePos.requiredSkills.map((s, i) => editMode ? (
                            <div key={i} className="flex items-center gap-1">
                              <input type="text" value={s} onChange={(e) => setActivePos({ ...activePos, requiredSkills: updateListItem(activePos.requiredSkills, i, e.target.value) })} className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 w-40" />
                              <button onClick={() => setActivePos({ ...activePos, requiredSkills: activePos.requiredSkills.filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          ) : (
                            <span key={i} className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">Brand Values Alignment</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {DEFAULT_VALUES.map((v) => (
                            <button key={v} onClick={() => { if (!editMode) return; const has = activePos.brandValues.includes(v); setActivePos({ ...activePos, brandValues: has ? activePos.brandValues.filter((bv) => bv !== v) : [...activePos.brandValues, v] }); }} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${editMode ? "cursor-pointer" : ""} ${activePos.brandValues.includes(v) ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                              <Star className={`inline w-3 h-3 mr-1 ${activePos.brandValues.includes(v) ? "fill-white" : ""}`} />{v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Questions Tab */}
                  {activeTab === "questions" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Interview Questions</h3>
                        <button onClick={generateQuestions} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 cursor-pointer">
                          <MessageSquareMore className="w-4 h-4" /> Generate Questions
                        </button>
                      </div>
                      {activePos.interviewQuestions.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-8">Click &quot;Generate Questions&quot; to create interview questions based on this position and your brand values.</p>
                      ) : (
                        <div className="space-y-3">
                          {Object.entries(activePos.interviewQuestions.reduce<Record<string, string[]>>((acc, q) => { if (!acc[q.category]) acc[q.category] = []; acc[q.category].push(q.question); return acc; }, {})).map(([cat, qs]) => (
                            <div key={cat} className="rounded-xl border border-gray-200 p-4">
                              <h4 className="text-sm font-semibold text-teal-700 mb-3">{cat} Questions</h4>
                              <div className="space-y-2">
                                {qs.map((q, i) => (
                                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-teal-500 font-bold shrink-0">{i + 1}.</span>{q}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Evaluation Tab */}
                  {activeTab === "evaluation" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Candidate Evaluation Scorecard</h3>
                      <div className="rounded-xl border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left px-4 py-3 font-semibold text-gray-600">Criteria</th>
                              <th className="text-center px-4 py-3 font-semibold text-gray-600 w-20">Weight</th>
                              <th className="text-center px-4 py-3 font-semibold text-gray-600 w-28">Score (1-5)</th>
                              <th className="text-center px-4 py-3 font-semibold text-gray-600 w-24">Weighted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {activePos.evaluationCriteria.map((c, i) => (
                              <tr key={i} className="border-t border-gray-100">
                                <td className="px-4 py-3">{editMode ? <input type="text" value={c.name} onChange={(e) => { const criteria = [...activePos.evaluationCriteria]; criteria[i] = { ...criteria[i], name: e.target.value }; setActivePos({ ...activePos, evaluationCriteria: criteria }); }} className="w-full px-2 py-1 text-sm rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" /> : c.name}</td>
                                <td className="px-4 py-3 text-center">{editMode ? <input type="number" value={c.weight} onChange={(e) => { const criteria = [...activePos.evaluationCriteria]; criteria[i] = { ...criteria[i], weight: parseInt(e.target.value) || 0 }; setActivePos({ ...activePos, evaluationCriteria: criteria }); }} className="w-16 px-2 py-1 text-sm text-center rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" /> : `${c.weight}%`}</td>
                                <td className="px-4 py-3 text-center"><span className="text-gray-400">___</span></td>
                                <td className="px-4 py-3 text-center"><span className="text-gray-400">___</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-400">Print this scorecard and fill in scores during the interview. Score 1-5 for each criteria, then multiply by weight.</p>
                    </div>
                  )}

                  {/* Onboarding Tab */}
                  {activeTab === "onboarding" && (
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">30/60/90 Day Onboarding Plan</h3>
                      {activePos.onboarding.map((phase, pi) => (
                        <div key={pi} className="rounded-xl border border-gray-200 p-4">
                          <h4 className="text-sm font-semibold text-teal-700 mb-3 flex items-center gap-2">
                            <CalendarRange className="w-4 h-4" /> {phase.phase}
                          </h4>
                          <div className="space-y-2">
                            {phase.tasks.map((t, ti) => editMode ? (
                              <div key={ti} className="flex items-center gap-2">
                                <input type="text" value={t} onChange={(e) => { const ob = [...activePos.onboarding]; ob[pi] = { ...ob[pi], tasks: ob[pi].tasks.map((task, idx) => idx === ti ? e.target.value : task) }; setActivePos({ ...activePos, onboarding: ob }); }} className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                <button onClick={() => { const ob = [...activePos.onboarding]; ob[pi] = { ...ob[pi], tasks: ob[pi].tasks.filter((_, idx) => idx !== ti) }; setActivePos({ ...activePos, onboarding: ob }); }} className="text-gray-400 hover:text-red-500 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            ) : (
                              <div key={ti} className="flex items-start gap-2 text-sm">
                                <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                                {t}
                              </div>
                            ))}
                            {editMode && (
                              <button onClick={() => { const ob = [...activePos.onboarding]; ob[pi] = { ...ob[pi], tasks: [...ob[pi].tasks, ""] }; setActivePos({ ...activePos, onboarding: ob }); }} className="text-xs text-teal-600 font-medium cursor-pointer">+ Add Task</button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t bg-white/60 backdrop-blur-sm mt-auto no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-gray-400">
          The Master&apos;s Edge Business Program &bull; Total Success AI
        </div>
      </footer>
    </div>
  );
}
