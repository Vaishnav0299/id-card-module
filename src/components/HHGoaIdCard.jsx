import React from 'react';
import hhGoaLogo from '../assets/hh_goa_logo.png';

// ── Builder Title Map (role → fun titles) ─────────────────────────────────────
export const BUILDER_TITLE_MAP = {
  'Frontend':         ['Making Pixels Dance 🎨', 'CSS Wizard in Paradise 🌺', 'UI Artisan by the Sea ✨'],
  'Backend':          ['Serving APIs with Coconut 🥥', 'Taming Servers at Sunset 🌅', 'Node Whisperer 🌊'],
  'Full Stack':       ['Full Stack, Full Vibes 🌊', 'End-to-End in the Sand 🏖️', 'Shipping Everything 🚀'],
  'Mobile':           ['Apps Like a Beach Breeze 🌬️', 'Native in Nature 📱', 'Mobile Mafia 🌴'],
  'ML / AI':          ['Teaching Machines to Surf 🤖', 'Gradients & Sunsets 📊', 'AI by the Arabian Sea 🌊'],
  'Blockchain / Web3':['On-chain & Off the Grid 🔗', 'Decentralized in Goa ⛓️', 'Web3 Surfer 🏄'],
  'Design':           ['Crafting Beauty in Goa 🎨', 'Pixels with Purpose 🌺', 'Design Alchemist ✨'],
  'Product':          ['Shipping in Paradise 🌴', 'Vision + Execution 🎯', 'PM by Day, Surfer by Night 🏄'],
  'DevOps / Infra':   ['Infrastructure as Chill 🛠️', 'CI/CD on the Beach ⚙️', 'Cloud Surfer ☁️'],
  'Security':         ['Hacking the Hackerhouse 🔐', 'Red Teaming at Red Sunsets 🌅', 'Sec by the Sea 🛡️'],
  'default':          ['Building in Paradise 🌴', 'Shipping Dreams by the Sea 🌊', 'Code & Coconuts 🥥'],
};

export function getBuilderTitle(role) {
  const titles = BUILDER_TITLE_MAP[role] || BUILDER_TITLE_MAP['default'];
  return titles[Math.floor(Math.random() * titles.length)];
}

// ── HH Goa 2026 Builder ID Card ───────────────────────────────────────────────
// Dimensions: 900 × 500 px  |  All decoration is pure CSS — zero SVG
export const HHGoaIdCard = React.forwardRef(function HHGoaIdCard(
  { name, role, builderTitle, xHandle, photoUrl },
  ref
) {
  const displayName     = name        || 'Your Name';
  const displayRole     = role        || 'Builder';
  const displayTitle    = builderTitle || 'Building in Paradise 🌴';
  const displayXHandle  = xHandle     ? (xHandle.startsWith('@') ? xHandle : `@${xHandle}`) : null;

  return (
    <div
      ref={ref}
      id="hh-goa-card"
      style={{
        width: '900px',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #060d1e 0%, #091828 50%, #060d1e 100%)',
        fontFamily: "'Outfit', 'Inter', ui-sans-serif, system-ui, sans-serif",
        color: '#ffffff',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* ── Background dot-grid ─────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(0,212,170,0.07) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* ── Teal glow blob top-left ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: -80, left: -60,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,170,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Gold glow blob bottom-right ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: -100, right: -60,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,209,102,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Coral top-right accent stripe ──────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 220, height: 220, pointerEvents: 'none',
        background: 'linear-gradient(225deg, rgba(255,107,107,0.18) 0%, transparent 65%)',
      }} />

      {/* ── Bottom wave bar ────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 52,
        background: 'linear-gradient(90deg, rgba(0,212,170,0.25) 0%, rgba(255,209,102,0.12) 50%, rgba(255,107,107,0.18) 100%)',
        borderTop: '1px solid rgba(0,212,170,0.2)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            hh.fun · goa · 2026
          </span>
          <div style={{
            padding: '4px 14px', borderRadius: 20,
            background: 'rgba(255,209,102,0.15)',
            border: '1px solid rgba(255,209,102,0.35)',
            fontSize: 12, fontWeight: 800,
            color: '#ffd166', letterSpacing: '0.08em',
          }}>
            #FrameInGoa
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* LEFT PANEL: Photo                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 290,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
        background: 'linear-gradient(180deg, rgba(0,212,170,0.08) 0%, rgba(0,212,170,0.04) 100%)',
        borderRight: '1px solid rgba(0,212,170,0.15)',
        paddingBottom: 52,
      }}>
        {/* Photo frame with teal ring */}
        <div style={{
          width: 172, height: 172, borderRadius: '50%',
          padding: 4,
          background: 'linear-gradient(135deg, #00d4aa, #ffd166, #ff6b6b)',
          boxShadow: '0 0 40px rgba(0,212,170,0.35), 0 0 80px rgba(0,212,170,0.1)',
          flexShrink: 0,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            overflow: 'hidden',
            background: '#0d2035',
            border: '3px solid #060d1e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Builder"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                crossOrigin="anonymous"
              />
            ) : (
              <span style={{ fontSize: 56, lineHeight: 1 }}>👤</span>
            )}
          </div>
        </div>

        {/* Builder badge pill */}
        <div style={{
          padding: '5px 18px', borderRadius: 20,
          background: 'rgba(0,212,170,0.12)',
          border: '1px solid rgba(0,212,170,0.3)',
          fontSize: 11, fontWeight: 800,
          color: '#00d4aa', letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          BUILDER
        </div>

        {/* Palm decorations */}
        <div style={{
          position: 'absolute', bottom: 60, left: 12,
          fontSize: 22, opacity: 0.35, userSelect: 'none',
        }}>🌴</div>
        <div style={{
          position: 'absolute', bottom: 60, right: 12,
          fontSize: 18, opacity: 0.25, userSelect: 'none',
        }}>🌊</div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* RIGHT PANEL: Info                                                 */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'absolute', left: 290, top: 0, right: 0, bottom: 52,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '28px 40px 20px 40px',
        gap: 0,
      }}>
        {/* Event logo + branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <img
            src={hhGoaLogo}
            alt="HH Goa 2026"
            style={{ height: 54, width: 'auto', objectFit: 'contain' }}
            crossOrigin="anonymous"
          />
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#00d4aa', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              HACKER HOUSE
            </span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#ffd166', letterSpacing: '0.06em', lineHeight: 1 }}>
              GOA 2026
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, rgba(0,212,170,0.5) 0%, rgba(255,209,102,0.3) 50%, transparent 100%)',
          marginBottom: 18,
        }} />

        {/* Builder Name */}
        <h2 style={{
          margin: 0,
          fontSize: displayName.length > 16 ? 30 : displayName.length > 12 ? 36 : 42,
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textTransform: 'uppercase',
        }}>
          {displayName}
        </h2>

        {/* Role chip */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, userSelect: 'none' }}>⚡</span>
          <span style={{
            fontSize: 15, fontWeight: 700,
            color: '#00d4aa', letterSpacing: '0.04em',
          }}>
            {displayRole}
          </span>
        </div>

        {/* Builder Title */}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, userSelect: 'none', opacity: 0.7 }}>✦</span>
          <span style={{
            fontSize: 14, fontWeight: 600,
            color: 'rgba(255,255,255,0.65)',
            fontStyle: 'italic',
            letterSpacing: '0.01em',
          }}>
            {displayTitle}
          </span>
        </div>

        {/* X handle */}
        {displayXHandle && (
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 13, fontWeight: 900, color: 'rgba(255,255,255,0.5)',
              fontFamily: 'serif', letterSpacing: '0.02em',
            }}>𝕏</span>
            <span style={{
              fontSize: 14, fontWeight: 700,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.02em',
            }}>
              {displayXHandle}
            </span>
          </div>
        )}

        {/* Corner palm decoration */}
        <div style={{
          position: 'absolute', top: 16, right: 24,
          fontSize: 28, opacity: 0.12, userSelect: 'none',
        }}>🌴</div>
        <div style={{
          position: 'absolute', bottom: 16, right: 20,
          fontSize: 20, opacity: 0.1, userSelect: 'none',
        }}>🌊</div>
      </div>

      {/* ── Vertical separator glow ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', left: 290, top: 20, bottom: 72, width: 1,
        background: 'linear-gradient(180deg, transparent, rgba(0,212,170,0.4) 30%, rgba(0,212,170,0.4) 70%, transparent)',
        pointerEvents: 'none',
      }} />
    </div>
  );
});
