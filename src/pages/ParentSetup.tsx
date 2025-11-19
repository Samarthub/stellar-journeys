import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp, AgeGroup } from "@/contexts/AppContext";
import { toast } from "sonner";

const INTERESTS = [
  "History",
  "Animals",
  "Fruits",
  "Coding",
  "Maths",
  "Drawing",
  "Space",
  "Vegetables",
  "Science",
  "Music",
];

export default function ParentSetup() {
  const [childName, setChildName] = useState("");
  const [ageGroup, setAgeGroup] = useState<AgeGroup>("8-10");
  const [interests, setInterests] = useState<string[]>([]);
  const { addChild, state } = useApp();
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!childName) {
      toast.error("Please enter your child's name");
      return;
    }

    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }

    const childId = Date.now().toString();
    addChild({
      id: childId,
      name: childName,
      ageGroup,
      interests,
    });

    toast.success(`${childName}'s profile created!`);
    navigate("/parent/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Welcome, {state.parentName}!</CardTitle>
          <CardDescription className="text-base">
            Let's set up your child's learning profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="childName" className="text-sm font-medium">
                Child's Name
              </label>
              <Input
                id="childName"
                type="text"
                placeholder="Enter child's name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="ageGroup" className="text-sm font-medium">
                Age Group
              </label>
              <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as AgeGroup)}>
                <SelectTrigger id="ageGroup">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-7">5-7 years</SelectItem>
                  <SelectItem value="8-10">8-10 years</SelectItem>
                  <SelectItem value="11-12">11-12 years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Child's Interests</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTERESTS.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={interests.includes(interest)}
                      onCheckedChange={() => toggleInterest(interest)}
                    />
                    <label
                      htmlFor={interest}
                      className="text-sm cursor-pointer select-none"
                    >
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
