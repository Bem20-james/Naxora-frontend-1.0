export const drawerWidth = 240;
export const layoutPad = 32;
export const layoutMargin = 6;
export const navHeight = 80;

interface StepConfig {
  label: string;
  description: string;
}

export const STEPS: StepConfig[] = [
  {
    label: "Select Country",
    description: "Where are you based?",
  },
  {
    label: "Select Role",
    description: "Tell us who you are.",
  },
  {
    label: "Basic Information",
    description: "Let's get to know you.",
  },
  {
    label: "Create Password",
    description: "Keep your account secure.",
  },
  {
    label: "Verify Email",
    description: "One last step to confirm.",
  },
];
