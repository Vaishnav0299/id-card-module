import React from 'react';
import goaSunsetBg from '../assets/goa_sunset_bg.png';

/**
 * BuilderPassCard — Pure vector/CSS rendered Hacker House Goa Builder Pass.
 * Clean, state-of-the-art design with ZERO text overlap or image artifact bugs.
 */
export const BuilderPassCard = React.forwardRef(function BuilderPassCard(
  {
    name = '',
    craft = '',
    assignedTitle = '',
    teamName = '',
    teamId = '',
    passType = 'BUILDER PASS',
    photoUrl = null,
    scale = 1,
    offsetX = 0,
    offsetY = 0,
    passCode = 'FIG-2026-8619',
  },
  ref
) {
  const displayName = name.trim() || 'Deva Bokare';
  const displayCraft = craft.trim() || 'Full stack developer & UI/UX Designer';
  const displayTitle = assignedTitle.trim() || 'Vector Architect';
  const displayTeam = teamName.trim() || 'Wave Hackers';
  const displayTeamId = teamId.trim() || 'HHG-709';

  return (
    <div ref={ref} className="pass-card-container">
      {/* ── Goa Sunset Card Background & Ambient Glows ────────────────── */}
      <div
        className="card-bg-overlay"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 18, 26, 0.72) 0%, rgba(14, 32, 36, 0.85) 60%, rgba(10, 18, 26, 0.96) 100%), url(${goaSunsetBg})`,
        }}
      />
      <div className="card-ambient-glow" />
      <div className="card-sun-glow" />

      {/* ── Top Header ─────────────────────────────────────────────────── */}
      <div className="card-header">
        <div className="card-event-badge">🌴 HACKER HOUSE GOA 🌴</div>
        <div className="card-event-title">2026 · {passType.toUpperCase()}</div>

        {/* Team ID Badge */}
        <div className="card-team-chip">
          <span className="card-team-label">TEAM:</span>
          <span className="card-team-val">{displayTeam}</span>
          <span className="card-team-id">#{displayTeamId}</span>
        </div>
      </div>

      {/* ── Photo Frame Slot ───────────────────────────────────────────── */}
      <div className="card-photo-slot">
        {photoUrl ? (
          <div className="card-photo-wrapper">
            <img
              src={photoUrl}
              alt={displayName}
              className="card-photo-img"
              style={{
                transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
              }}
              crossOrigin="anonymous"
            />
          </div>
        ) : (
          <div className="card-photo-empty">
            <span style={{ fontSize: 44, marginBottom: 6 }}>👤</span>
            <span className="card-photo-empty-text">UPLOAD PORTRAIT</span>
            <span className="card-photo-empty-sub">JPG · PNG · WEBP · HEIC</span>
          </div>
        )}
      </div>

      {/* ── Details Panel ──────────────────────────────────────────────── */}
      <div className="card-info-box">
        <div className="card-user-name">{displayName}</div>
        <div className="card-user-craft">⚡ {displayCraft}</div>
        <div className="card-user-title">✦ {displayTitle}</div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="card-footer">
          <div className="card-code-block">
            <span className="card-code">{passCode}</span>
          </div>
          <div className="card-barcode-lines" title="Event Verification Code">
            <span /><span /><span /><span /><span /><span /><span /><span />
          </div>
          <span className="card-hashtag">#FRAMEINGOA</span>
        </div>
      </div>
    </div>
  );
});

