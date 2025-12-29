import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Dummy JavaScript Basics questions
const questions = [
  {
    id: 1,
    question: "What is the correct way to declare a variable in JavaScript?",
    options: [
      "variable x = 5;",
      "var x = 5;",
      "v x = 5;",
      "declare x = 5;",
    ],
    correctAnswer: 1,
    explanation: "The 'var' keyword is used to declare variables in JavaScript.",
  },
  {
    id: 2,
    question: "Which of the following is NOT a JavaScript data type?",
    options: [
      "String",
      "Boolean",
      "Float",
      "Undefined",
    ],
    correctAnswer: 2,
    explanation: "JavaScript has Number (not Float), String, Boolean, Null, Undefined, Symbol, and BigInt.",
  },
  {
    id: 3,
    question: "What will be the output of: console.log(typeof null);",
    options: [
      "null",
      "undefined",
      "object",
      "boolean",
    ],
    correctAnswer: 2,
    explanation: "This is a known quirk in JavaScript - typeof null returns 'object'.",
  },
  {
    id: 4,
    question: "What does the '===' operator do in JavaScript?",
    options: [
      "Checks for equality without type conversion",
      "Checks for equality with type conversion",
      "Assigns a value",
      "Checks if both values are null",
    ],
    correctAnswer: 0,
    explanation: "The '===' operator is a strict equality operator that checks both value and type without type conversion.",
  },
  {
    id: 5,
    question: "What is the result of: [1, 2, 3].push(4);",
    options: [
      "[1, 2, 3, 4]",
      "4",
      "[4]",
      "undefined",
    ],
    correctAnswer: 1,
    explanation: "The push() method returns the new length of the array, which is 4.",
  },
  {
    id: 6,
    question: "Which method is used to remove the last element from an array?",
    options: [
      "pop()",
      "shift()",
      "remove()",
      "delete()",
    ],
    correctAnswer: 0,
    explanation: "The pop() method removes and returns the last element from an array.",
  },
  {
    id: 7,
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has no parameters",
      "A function that has access to variables in its outer scope",
      "A way to close a browser tab",
      "A method to stop code execution",
    ],
    correctAnswer: 1,
    explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope.",
  },
  {
    id: 8,
    question: "What will be the output: let x = '5' + 3; console.log(x);",
    options: [
      "8",
      "53",
      "undefined",
      "Error",
    ],
    correctAnswer: 1,
    explanation: "When using '+' with a string and number, JavaScript converts the number to a string and concatenates them.",
  },
  {
    id: 9,
    question: "What is the purpose of 'use strict' in JavaScript?",
    options: [
      "Makes code run faster",
      "Enables strict mode which catches common coding errors",
      "Forces all variables to be constants",
      "Disables all error checking",
    ],
    correctAnswer: 1,
    explanation: "'use strict' enables strict mode, which helps catch common coding errors and prevents certain unsafe actions.",
  },
  {
    id: 10,
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The current function",
      "The current object or context",
      "The parent object",
      "The global object only",
    ],
    correctAnswer: 1,
    explanation: "'this' refers to the object that is executing the current function, and its value depends on how the function is called.",
  },
];

export default function JavaScriptTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const navigate = useNavigate();
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (showResults) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    const score = Math.round((correctCount / questions.length) * 100);
    
    toast({
      title: "Test Completed!",
      description: `You scored ${score}% (${correctCount}/${questions.length} correct)`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResults) {
    const correctCount = selectedAnswers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    const score = Math.round((correctCount / questions.length) * 100);

    return (
      <AppLayout>
        <div className="p-8 max-w-4xl mx-auto">
          <GlassCard>
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-chart-4 to-chart-5 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-background" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Test Completed!
              </h1>
              <p className="text-muted-foreground">
                JavaScript Basics Assessment
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-lg bg-chart-4/10 border border-chart-4/30">
                <p className="text-sm text-muted-foreground mb-1">Score</p>
                <p className="text-3xl font-bold text-chart-4">{score}%</p>
              </div>
              <div className="p-6 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-muted-foreground mb-1">Correct</p>
                <p className="text-3xl font-bold text-primary">{correctCount}/{questions.length}</p>
              </div>
              <div className="p-6 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-sm text-muted-foreground mb-1">Incorrect</p>
                <p className="text-3xl font-bold text-accent">{questions.length - correctCount}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                Review Answers
              </h2>
              {questions.map((q, index) => {
                const selected = selectedAnswers[index];
                const isCorrect = selected === q.correctAnswer;
                
                return (
                  <div
                    key={q.id}
                    className={cn(
                      "p-4 rounded-lg border",
                      isCorrect
                        ? "bg-chart-4/10 border-chart-4/30"
                        : "bg-destructive/10 border-destructive/30"
                    )}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-chart-4 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-foreground mb-2">
                          {index + 1}. {q.question}
                        </p>
                        <div className="space-y-1">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={cn(
                                "text-sm p-2 rounded",
                                optIndex === q.correctAnswer
                                  ? "bg-chart-4/20 text-chart-4 font-medium"
                                  : optIndex === selected && !isCorrect
                                  ? "bg-destructive/20 text-destructive"
                                  : "text-muted-foreground"
                              )}
                            >
                              {optIndex === q.correctAnswer && "✓ "}
                              {optIndex === selected && !isCorrect && "✗ "}
                              {option}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/skill-lab")}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Skill Lab
              </Button>
              <Button
                variant="gradient"
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers(new Array(questions.length).fill(-1));
                  setTimeRemaining(15 * 60);
                }}
                className="flex-1"
              >
                Retake Test
              </Button>
            </div>
          </GlassCard>
        </div>
      </AppLayout>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <AppLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/skill-lab")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 border border-destructive/30">
            <Clock className="w-4 h-4 text-destructive" />
            <span className="font-mono font-medium text-destructive">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <GlassCard>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-display font-semibold text-foreground flex-1">
                {currentQ.question}
              </h2>
            </div>

            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer",
                      selectedAnswers[currentQuestion] === index
                        ? "bg-primary/10 border-primary/30"
                        : "bg-secondary/30 border-border/40 hover:border-primary/20"
                    )}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-normal"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <div className="flex gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={cn(
                    "w-8 h-8 rounded text-xs font-medium transition-all",
                    index === currentQuestion
                      ? "bg-primary text-primary-foreground"
                      : selectedAnswers[index] !== -1
                      ? "bg-chart-4/20 text-chart-4 border border-chart-4/30"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {currentQuestion === questions.length - 1 ? (
              <Button
                variant="gradient"
                onClick={handleSubmit}
                disabled={selectedAnswers[currentQuestion] === -1}
              >
                Submit Test
              </Button>
            ) : (
              <Button
                variant="gradient"
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === -1}
              >
                Next
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}

