import { useState, useEffect, useRef } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const T = {
  gold: "#C8963E",
  goldLight: "#E8B86D",
  goldPale: "#F5DFA8",
  ink: "#0D0D0D",
  forest: "#1A2B1F",
  rust: "#8B3A2A",
  sky: "#0A1628",
  jade: "#1C3D2E",
};

const SLIDE_DURATION = 10000;
const TRANSITION_MS = 680;

// ─────────────────────────────────────────────────────────────────────────────
// KEYFRAMES
// ─────────────────────────────────────────────────────────────────────────────
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeSlideOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-20px); }
`;
const glowBreath = keyframes`
  0%,100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.08); }
`;
const logoSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const logoSpinReverse = keyframes`
  from { transform: rotate(360deg); }
  to   { transform: rotate(0deg); }
`;
const ringRotate = keyframes`
  from { transform: translate(-50%,-50%) rotate(0deg); }
  to   { transform: translate(-50%,-50%) rotate(360deg); }
`;
const ringRotateReverse = keyframes`
  from { transform: translate(-50%,-50%) rotate(360deg); }
  to   { transform: translate(-50%,-50%) rotate(0deg); }
`;
const centerPulse = keyframes`
  0%,100% { box-shadow: 0 0 40px rgba(200,150,62,0.45), 0 0 80px rgba(200,150,62,0.18); }
  50%      { box-shadow: 0 0 65px rgba(200,150,62,0.7),  0 0 120px rgba(200,150,62,0.28); }
`;
const livePulse = keyframes`
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.65); }
`;
const barGrow = keyframes`
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 0.75; }
`;
const gridShift = keyframes`
  from { background-position: 0 0; }
  to   { background-position: 36px 36px; }
`;
const auroraMove = keyframes`
  0%,100% { transform: scaleX(1) scaleY(1); }
  50%      { transform: scaleX(1.12) scaleY(1.35); }
`;
const particleFloat = keyframes`
  0%   { transform: translateY(60px) scale(0); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-120%) scale(0.3); opacity: 0; }
`;
const progressFill = keyframes`
  from { width: 0%; }
  to   { width: 100%; }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SHARED LAYOUT
// ─────────────────────────────────────────────────────────────────────────────

const FlowRoot = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100vh",
  minHeight: "100vh",
  overflow: "hidden",
  borderRadius: "0px",
  fontFamily: "'Outfit', sans-serif",
});

const SlideLayer = styled(Box, {
  shouldForwardProp: (p) => p !== "animDir",
})<{ animDir: "in" | "out" | "idle" }>(({ animDir }) => ({
  position: "absolute",
  inset: 0,
  ...(animDir === "in" && {
    animation: `${fadeSlideIn}  ${TRANSITION_MS}ms cubic-bezier(0.16,1,0.3,1) both`,
  }),
  ...(animDir === "out" && {
    animation: `${fadeSlideOut} ${TRANSITION_MS}ms ease both`,
  }),
}));

const SlideGrid = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "center",
});

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: { md: "10px", lg: "11px" },
        letterSpacing: "4px",
        color: T.gold,
        textTransform: "uppercase",
        fontWeight: 600,
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

function Headline({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: { md: 36, lg: 48, xl: 56 },
        fontWeight: 300,
        color: "#fff",
        lineHeight: 1.08,
        letterSpacing: "-0.5px",
        mb: 3,
      }}
    >
      {children}
    </Typography>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontSize: { md: 13, lg: 14 },
        fontWeight: 300,
        color: "rgba(255,255,255,0.42)",
        lineHeight: 1.85,
      }}
    >
      {children}
    </Typography>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 1 — WELCOME
// ─────────────────────────────────────────────────────────────────────────────
function Slide1() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ps: HTMLDivElement[] = [];
    for (let i = 0; i < 28; i++) {
      const p = document.createElement("div");
      const s = Math.random() * 3 + 1;
      Object.assign(p.style, {
        position: "absolute",
        borderRadius: "50%",
        background: T.gold,
        width: `${s}px`,
        height: `${s}px`,
        left: `${Math.random() * 100}%`,
        bottom: "0",
        animation: `${particleFloat} ${Math.random() * 10 + 7}s linear infinite`,
        animationDelay: `-${Math.random() * 15}s`,
        opacity: `${Math.random() * 0.35 + 0.08}`,
        pointerEvents: "none",
      });
      el.appendChild(p);
      ps.push(p);
    }
    return () => ps.forEach((p) => p.remove());
  }, []);

  const stats = [
    { val: "10K+", label: "Creators" },
    { val: "500+", label: "Brands" },
    { val: "54", label: "Countries" },
  ];

  return (
    <Box ref={ref} sx={{ position: "absolute", inset: 0 }}>
      {/* bg */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
        radial-gradient(ellipse 120% 60% at 50% 100%, rgba(200,150,62,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 80% 40% at 15% 15%,  rgba(100,140,200,0.12) 0%, transparent 50%),
        linear-gradient(160deg, #0A1628 0%, #0D1F35 55%, #071018 100%)
      `,
        }}
      />
      {/* adinkra crosshatch */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
        repeating-linear-gradient(45deg,  rgba(200,150,62,1) 0px, rgba(200,150,62,1) 1px, transparent 1px, transparent 30px),
        repeating-linear-gradient(-45deg, rgba(200,150,62,1) 0px, rgba(200,150,62,1) 1px, transparent 1px, transparent 30px)
      `,
        }}
      />
      {/* glow orb */}
      <Box
        sx={{
          position: "absolute",
          width: "65%",
          aspectRatio: "1",
          borderRadius: "50%",
          bottom: "-30%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(200,150,62,0.13), transparent 70%)",
          animation: `${glowBreath} 6s ease-in-out infinite`,
        }}
      />

      <SlideGrid sx={{ px: { md: 5, lg: 7 }, gap: 4 }}>
        {/* LEFT */}
        <Box>
          {/* logomark */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Box
                component="svg"
                viewBox="0 0 54 54"
                sx={{
                  width: "100%",
                  height: "100%",
                  animation: `${logoSpin} 18s linear infinite`,
                }}
              >
                <circle
                  cx="27"
                  cy="27"
                  r="26"
                  stroke="rgba(200,150,62,0.4)"
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx="27"
                  cy="27"
                  r="19"
                  stroke="rgba(200,150,62,0.25)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="27"
                  cy="27"
                  r="12"
                  stroke="rgba(200,150,62,0.35)"
                  strokeWidth="1"
                  fill="none"
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  inset: 9,
                  borderRadius: "50%",
                  background: T.gold,
                  animation: `${logoSpinReverse} 18s linear infinite`,
                }}
              />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: { md: 18, lg: 22 },
                letterSpacing: "6px",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
              }}
            >
              Nexora
            </Typography>
          </Box>

          <Eyebrow>The Platform</Eyebrow>
          <Headline>
            The{" "}
            <Box
              component="em"
              sx={{ fontStyle: "italic", color: T.goldLight }}
            >
              All-in-One
            </Box>
            <Box component="strong" sx={{ fontWeight: 600, display: "block" }}>
              Growth
            </Box>
            Platform
          </Headline>
          <Box
            sx={{
              width: 36,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
              my: 2.5,
            }}
          />
          <Body>
            For African Creators &amp; Brands
            <br />
            who are ready to scale.
          </Body>
        </Box>

        {/* RIGHT — stat cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {stats.map((s, i) => (
            <Box
              key={i}
              sx={{
                p: "18px 22px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(200,150,62,${0.1 + i * 0.06})`,
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: { md: 32, lg: 40 },
                  fontWeight: 600,
                  color: T.goldLight,
                  lineHeight: 1,
                }}
              >
                {s.val}
              </Typography>
              <Typography
                sx={{
                  fontSize: 9,
                  letterSpacing: "3px",
                  color: "rgba(255,255,255,0.28)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </SlideGrid>

      {/* concentric arcs — decorative bottom-right */}
      {[340, 250, 160].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            pointerEvents: "none",
            width: size,
            height: size,
            bottom: -(size * 0.55),
            right: -(size * 0.25),
            borderRadius: "50%",
            border: `1px solid rgba(200,150,62,${0.07 + i * 0.05})`,
          }}
        />
      ))}
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 2 — FOR CREATORS
// ─────────────────────────────────────────────────────────────────────────────
function Slide2() {
  const features = [
    {
      icon: "🎯",
      bg: "rgba(200,150,62,0.1)",
      title: "Campaign Management",
      desc: "Run and track brand deals in one place",
    },
    {
      icon: "📊",
      bg: "rgba(139,58,42,0.15)",
      title: "Market Intelligence",
      desc: "Data-driven insights on your audience",
    },
    {
      icon: "💰",
      bg: "rgba(28,61,46,0.2)",
      title: "Monetise Better",
      desc: "Multiple revenue streams, unified",
    },
  ];

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
        radial-gradient(ellipse 100% 50% at 100% 0%, rgba(139,58,42,0.35) 0%, transparent 55%),
        radial-gradient(ellipse 80%  60% at 0% 100%, rgba(28,61,46,0.4)   0%, transparent 60%),
        #0D0D0D
      `,
        }}
      />

      {/* spinning geometric */}
      <Box
        sx={{
          position: "absolute",
          top: "8%",
          right: "4%",
          width: { md: 130, lg: 160 },
          height: { md: 130, lg: 160 },
          animation: `${logoSpin} 25s linear infinite`,
          opacity: 0.11,
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 120 120"
          sx={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r="40"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 6"
          />
          <circle
            cx="60"
            cy="60"
            r="24"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
          />
          <line
            x1="5"
            y1="60"
            x2="115"
            y2="60"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
          <line
            x1="60"
            y1="5"
            x2="60"
            y2="115"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
        </Box>
      </Box>

      <SlideGrid sx={{ px: { md: 5, lg: 7 }, gap: 5 }}>
        {/* LEFT */}
        <Box>
          <Eyebrow>For Creators</Eyebrow>
          <Headline>
            Grow
            <br />
            <Box
              component="span"
              sx={{ color: T.goldLight, fontStyle: "italic" }}
            >
              Without
            </Box>
            <br />
            Limits
          </Headline>
          <Body>
            Empower your craft with tools built for the African creative economy
            — campaign management, monetisation, and real market intelligence.
          </Body>
        </Box>

        {/* RIGHT — feature cards */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {features.map((f) => (
            <Box
              key={f.title}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: "16px 20px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(10px)",
                transition: "border-color 0.3s",
                "&:hover": { borderColor: "rgba(200,150,62,0.22)" },
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {f.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.88)",
                    fontWeight: 500,
                    mb: "3px",
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.42)",
                    fontWeight: 300,
                  }}
                >
                  {f.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </SlideGrid>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 3 — FOR BRANDS
// ─────────────────────────────────────────────────────────────────────────────
function Slide3() {
  const barHeights = [38, 62, 50, 82, 68, 90, 74];
  const metrics = [
    { val: "4.2M", label: "Total Reach" },
    { val: "8.7%", label: "Engagement" },
    { val: "₦12M", label: "Campaign ROI" },
  ];

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
        radial-gradient(ellipse 120% 50% at 50% -10%, rgba(200,150,62,0.2)  0%, transparent 55%),
        radial-gradient(ellipse 80%  80% at -10% 110%, rgba(200,150,62,0.1) 0%, transparent 50%),
        linear-gradient(170deg, #1A2B1F 0%, #0F1C14 100%)
      `,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
        linear-gradient(rgba(200,150,62,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200,150,62,0.04) 1px, transparent 1px)
      `,
          backgroundSize: "36px 36px",
          animation: `${gridShift} 30s linear infinite`,
        }}
      />

      <SlideGrid sx={{ px: { md: 5, lg: 7 }, gap: 5 }}>
        {/* LEFT */}
        <Box>
          <Eyebrow>For Brands</Eyebrow>
          <Headline>
            Full
            <br />
            <Box
              component="em"
              sx={{ fontStyle: "italic", color: T.goldLight }}
            >
              Visibility,
            </Box>
            <br />
            Real Results
          </Headline>
          <Body>
            Give your marketing team complete oversight — find the right
            creators, track performance, and scale campaigns with speed and
            trust.
          </Body>
        </Box>

        {/* RIGHT — dashboard mockup */}
        <Box
          sx={{
            borderRadius: "18px",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(200,150,62,0.15)",
            p: { md: "20px", lg: "24px" },
            backdropFilter: "blur(20px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                letterSpacing: "2.5px",
                color: "rgba(255,255,255,0.28)",
                textTransform: "uppercase",
              }}
            >
              Campaign Overview
            </Typography>
            <Box
              sx={{
                px: "10px",
                py: "4px",
                borderRadius: "20px",
                background: "rgba(200,150,62,0.12)",
                border: "1px solid rgba(200,150,62,0.2)",
              }}
            >
              <Typography
                sx={{ fontSize: 9, letterSpacing: "1px", color: T.goldLight }}
              >
                ● Live
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: "6px",
              height: { md: 80, lg: 100 },
              mb: 2,
            }}
          >
            {barHeights.map((h, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  borderRadius: "4px 4px 0 0",
                  background: `linear-gradient(to top, ${T.gold}, ${T.goldPale})`,
                  height: `${h}%`,
                  transformOrigin: "bottom",
                  animation: `${barGrow} 1.4s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.08}s both`,
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: "10px" }}>
            {metrics.map((m) => (
              <Box
                key={m.label}
                sx={{
                  flex: 1,
                  p: "12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: { md: 20, lg: 24 },
                    fontWeight: 600,
                    color: T.goldLight,
                  }}
                >
                  {m.val}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 9,
                    letterSpacing: "1.5px",
                    color: "rgba(255,255,255,0.24)",
                    textTransform: "uppercase",
                    mt: "3px",
                  }}
                >
                  {m.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </SlideGrid>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 4 — DATA INTELLIGENCE
// ─────────────────────────────────────────────────────────────────────────────
function Slide4() {
  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
        radial-gradient(ellipse 80%  60% at 80% 20%, rgba(60,80,200,0.2)   0%, transparent 55%),
        radial-gradient(ellipse 100% 50% at 20% 80%, rgba(200,150,62,0.15) 0%, transparent 55%),
        #06060A
      `,
        }}
      />

      <SlideGrid sx={{ px: { md: 5, lg: 7 }, gap: 5 }}>
        {/* LEFT */}
        <Box>
          <Eyebrow>Data Intelligence</Eyebrow>
          <Headline>
            Know
            <br />
            <Box
              component="em"
              sx={{ fontStyle: "italic", color: T.goldLight }}
            >
              Your Market,
            </Box>
            <br />
            Scale Fast
          </Headline>
          <Body>
            Access the most comprehensive data on African digital audiences.
            Make decisions backed by real-time market intelligence — not
            guesswork.
          </Body>
        </Box>

        {/* RIGHT — orbit */}
        <Box sx={{ position: "relative", height: { md: 280, lg: 340 } }}>
          {[
            {
              size: "42%",
              anim: `${ringRotate} 12s linear infinite`,
              border: "rgba(200,150,62,0.22)",
            },
            {
              size: "62%",
              anim: `${ringRotateReverse} 20s linear infinite`,
              border: "rgba(200,150,62,0.13)",
            },
            {
              size: "88%",
              anim: `${ringRotate} 32s linear infinite`,
              border: "rgba(200,150,62,0.07)",
            },
          ].map((r, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: r.size,
                aspectRatio: "1",
                borderRadius: "50%",
                border: `1px solid ${r.border}`,
                animation: r.anim,
              }}
            />
          ))}

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: { md: 70, lg: 84 },
              height: { md: 70, lg: 84 },
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.gold}, ${T.goldPale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: { md: 11, lg: 13 },
              letterSpacing: "1.5px",
              color: T.ink,
              fontWeight: 700,
              animation: `${centerPulse} 3s ease-in-out infinite`,
              zIndex: 10,
            }}
          >
            NEXORA
          </Box>

          {[
            {
              sz: 12,
              left: "21%",
              bg: "radial-gradient(circle at 35% 35%, #fff, rgba(200,150,62,0.8))",
              sh: "0 0 12px rgba(200,150,62,0.6)",
              anim: `${ringRotate} 12s linear infinite`,
            },
            {
              sz: 10,
              left: "31%",
              bg: "radial-gradient(circle at 35% 35%, #8ad4ff, rgba(60,120,255,0.8))",
              sh: "0 0 10px rgba(60,120,255,0.5)",
              anim: `${ringRotateReverse} 20s linear infinite`,
            },
            {
              sz: 8,
              left: "44%",
              bg: "radial-gradient(circle at 35% 35%, #ffd4a8, rgba(200,80,40,0.8))",
              sh: "0 0 10px rgba(200,80,40,0.4)",
              anim: `${ringRotate} 32s linear infinite`,
            },
          ].map((p, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: "50%",
                left: `calc(50% - ${p.left})`,
                width: p.sz,
                height: p.sz,
                mt: `-${p.sz / 2}px`,
                borderRadius: "50%",
                background: p.bg,
                boxShadow: p.sh,
                transformOrigin: `${p.left} center`,
                animation: p.anim,
              }}
            />
          ))}
        </Box>
      </SlideGrid>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 5 — MISSION
// ─────────────────────────────────────────────────────────────────────────────
function Slide5() {
  const collabs = [
    {
      avatars: [
        { l: "A", bg: `linear-gradient(135deg, ${T.rust}, ${T.gold})` },
        { l: "K", bg: `linear-gradient(135deg, ${T.jade}, #2E6B4A)` },
        { l: "Z", bg: `linear-gradient(135deg, ${T.sky},  #1A3A5C)` },
      ],
      title: "Brand × Creator Match",
      desc: "AI-powered partnerships",
    },
    {
      avatars: [
        { l: "M", bg: "linear-gradient(135deg, #4A2080, #8040C0)" },
        { l: "F", bg: "linear-gradient(135deg, #804020, #C06030)" },
      ],
      title: "Campaign Live",
      desc: "Realtime collaboration",
    },
  ];

  return (
    <Box sx={{ position: "absolute", inset: 0 }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
        radial-gradient(ellipse 120% 60% at 50% 110%, rgba(200,150,62,0.22) 0%, transparent 55%),
        radial-gradient(ellipse 60%  40% at 90% 10%,  rgba(139,58,42,0.2)   0%, transparent 50%),
        #0A0A0A
      `,
        }}
      />

      {[
        {
          bottom: 0,
          bg: `linear-gradient(90deg, transparent, rgba(200,150,62,0.22), transparent)`,
          dur: "8s",
          dl: "0s",
        },
        {
          bottom: 50,
          bg: `linear-gradient(90deg, transparent, rgba(139,58,42,0.18), transparent)`,
          dur: "11s",
          dl: "-3s",
        },
      ].map((a, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 220,
            bottom: a.bottom,
            borderRadius: "50%",
            filter: "blur(60px)",
            mixBlendMode: "screen",
            background: a.bg,
            animation: `${auroraMove} ${a.dur} ease-in-out infinite`,
            animationDelay: a.dl,
          }}
        />
      ))}

      {/* adinkra motif */}
      <Box
        sx={{
          position: "absolute",
          right: "-3%",
          top: "4%",
          width: { md: 220, lg: 280 },
          height: { md: 220, lg: 280 },
          opacity: 0.05,
          animation: `${logoSpin} 40s linear infinite`,
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 200 200"
          sx={{ width: "100%", height: "100%" }}
        >
          <circle
            cx="100"
            cy="100"
            r="95"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5 8"
          />
          <circle
            cx="100"
            cy="100"
            r="45"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="20"
            stroke="rgba(200,150,62,1)"
            strokeWidth="1"
            fill="rgba(200,150,62,0.08)"
          />
          <line
            x1="5"
            y1="100"
            x2="195"
            y2="100"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
          <line
            x1="100"
            y1="5"
            x2="100"
            y2="195"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
          <line
            x1="32"
            y1="32"
            x2="168"
            y2="168"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
          <line
            x1="168"
            y1="32"
            x2="32"
            y2="168"
            stroke="rgba(200,150,62,1)"
            strokeWidth="0.5"
          />
        </Box>
      </Box>

      <SlideGrid sx={{ px: { md: 5, lg: 7 }, gap: 5 }}>
        {/* LEFT */}
        <Box>
          <Eyebrow>Our Mission</Eyebrow>
          <Headline>
            Where
            <br />
            Africa
            <br />
            <Box
              component="em"
              sx={{ fontStyle: "italic", color: T.goldLight }}
            >
              Connects
            </Box>
            <br />
            &amp; Grows
          </Headline>
          <Body>
            Building the most powerful, data-driven platform where African
            creators and brands collaborate with speed, trust, and creativity.
          </Body>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {collabs.map((c) => (
            <Box
              key={c.title}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: "16px 20px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Box sx={{ display: "flex" }}>
                {c.avatars.map((av, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: "2px solid rgba(0,0,0,0.45)",
                      ml: i === 0 ? 0 : "-9px",
                      background: av.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {av.l}
                  </Box>
                ))}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {c.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.42)",
                  }}
                >
                  {c.desc}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  ml: "auto",
                  flexShrink: 0,
                  boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                  animation: `${livePulse} 2s ease-in-out infinite`,
                }}
              />
            </Box>
          ))}

          <Box
            sx={{
              p: "20px",
              borderRadius: "14px",
              border: `1px solid rgba(200,150,62,0.2)`,
              background: "rgba(200,150,62,0.04)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: { md: 14, lg: 16 },
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgba(255,255,255,0.48)",
                lineHeight: 1.65,
              }}
            >
              "Empowering African creators and brands to{" "}
              <Box component="span" sx={{ color: T.goldLight }}>
                scale digital campaigns
              </Box>{" "}
              with speed, trust, and creativity."
            </Typography>
          </Box>
        </Box>
      </SlideGrid>

      {/* gold accent line */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${T.gold} 30%, ${T.goldPale} 50%, ${T.gold} 70%, transparent)`,
          opacity: 0.45,
        }}
      />
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5];

// ─────────────────────────────────────────────────────────────────────────────

export default function OnboardingFlow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (next: number) => {
    if (transitioning || next === current) return;
    setTransitioning(true);
    setPrev(current);
    setTimeout(() => {
      setCurrent(next);
      setPrev(null);
      setTransitioning(false);
    }, TRANSITION_MS);
  };

  const advance = () => goTo((current + 1) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(advance, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, transitioning]);

  const CurrentSlide = SLIDES[current];
  const PrevSlide = prev !== null ? SLIDES[prev] : null;

  return (
    <FlowRoot>
      {/* Outgoing slide */}
      {PrevSlide && (
        <SlideLayer key={`out-${prev}`} animDir="out">
          <PrevSlide />
        </SlideLayer>
      )}

      {/* Incoming slide */}
      <SlideLayer key={`in-${current}`} animDir={transitioning ? "in" : "idle"}>
        <CurrentSlide />
      </SlideLayer>

      {/* ── Bottom HUD ──────────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          px: { md: 5, lg: 7 },
          pb: { md: 3, lg: 4 },
          pt: 8,
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Progress dots */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {SLIDES.map((_, i) => (
            <Box
              key={i}
              onClick={() => goTo(i)}
              sx={{
                position: "relative",
                height: 3,
                width: i === current ? 36 : 10,
                borderRadius: 2,
                background: "rgba(255,255,255,0.14)",
                cursor: "pointer",
                overflow: "hidden",
                transition: "width 0.4s ease",
                flexShrink: 0,
              }}
            >
              {/* active — animated fill */}
              {i === current && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: T.gold,
                    borderRadius: 2,
                    animation: `${progressFill} ${SLIDE_DURATION}ms linear both`,
                  }}
                />
              )}
              {/* completed */}
              {i < current && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: `rgba(200,150,62,0.4)`,
                    borderRadius: 2,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </FlowRoot>
  );
}
