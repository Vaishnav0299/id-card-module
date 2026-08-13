import React, { useState, useRef, useCallback } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { BuilderPassCard } from '../components/BuilderPassCard';

const TITLES = [
  'Vector Architect',
  'Full Stack Surfer',
  'AI Whisperer',
  'Protocol Engineer',
  'Code & Coconuts 🥥',
  'Infrastructure Artisan',
  'Neural Navigator',
  'Pixel Alchemist',
  'Shipping in Paradise 🌴',
  'Rust Voyager',
];

function getRandomTitle() {
  return TITLES[Math.floor(Math.random() * TITLES.length)];
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Generates a deterministic Team Serial ID for a given Team Name.
 * Teammates with the same Team Name get the exact same Team Serial ID.
 */
function generateTeamSerialId(str) {
  if (!str || !str.trim()) return 'HHG-709';
  const cleanStr = str.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleanStr.length; i++) {
    hash = (hash << 5) - hash + cleanStr.charCodeAt(i);
    hash |= 0;
  }
  const serialNum = (Math.abs(hash) % 900) + 100;
  return `HHG-${serialNum}`;
}

const PASS_TYPES = ['BUILDER PASS', 'VIP PASS', 'HACKER PASS', 'MENTOR PASS'];

export default function HHGoaGeneratorPage() {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [name, setName] = useState('deva bokare');
  const [craft, setCraft] = useState('Full stack developer & UI/UX Designer');
  const [teamName, setTeamName] = useState('Wave Hackers');
  const [teamId, setTeamId] = useState(() => generateTeamSerialId('Wave Hackers'));
  const [passType, setPassType] = useState('BUILDER PASS');
  const [assignedTitle, setAssignedTitle] = useState('Vector Architect');

  // Photo Position & Scale Controls
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Video Background State
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const passRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-generate Team Serial ID when Team Name changes
  const handleTeamNameChange = (e) => {
    const val = e.target.value;
    setTeamName(val);
    if (val.trim()) {
      setTeamId(generateTeamSerialId(val));
    }
  };

  // Random Pass Code
  const [passCode] = useState(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `FIG-2026-${randomNum}`;
  });

  const handleRandomTeamId = () => {
    const num = Math.floor(100 + Math.random() * 900);
    setTeamId(`HHG-${num}`);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  // ── Photo Upload Handler ──────────────────────────────────────────────────
  const handleFile = useCallback(async (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const isValid = validTypes.includes(file.type) || file.name.match(/\.(jpe?g|png|webp|heic|heif)$/i);
    if (!isValid) {
      setError('Please upload a JPG, PNG, WEBP, or HEIC photo.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Photo must be under 20 MB.');
      return;
    }
    setError('');
    try {
      const dataUrl = await readFileAsDataURL(file);
      setPhotoUrl(dataUrl);
      // Reset scale and position on new upload
      setScale(1);
      setOffsetX(0);
      setOffsetY(0);
    } catch {
      setError('Could not read that file. Please try another photo.');
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  // ── Position & Scale Helpers ──────────────────────────────────────────────
  const handleNudge = (dx, dy) => {
    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);
  };

  const handleResetPosition = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  // ── Export Download (PDF ID / PNG / JPG) ──────────────────────────────────
  const handleDownload = useCallback(async (format = 'png') => {
    if (!passRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const exportOptions = {
        pixelRatio: 3,
        cacheBust: true,
        backgroundColor: '#0a141b',
      };

      const sanitizedName = (name || 'Builder').trim().replace(/\s+/g, '-');

      if (format === 'pdf') {
        const dataUrl = await toPng(passRef.current, exportOptions);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [900, 540],
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, 900, 540);
        pdf.save(`FrameInGoa-ID-Pass-${sanitizedName}.pdf`);
      } else if (format === 'jpeg' || format === 'jpg') {
        const dataUrl = await toJpeg(passRef.current, { ...exportOptions, quality: 0.96 });
        const link = document.createElement('a');
        link.download = `FrameInGoa-ID-Pass-${sanitizedName}.jpg`;
        link.href = dataUrl;
        link.click();
      } else {
        const dataUrl = await toPng(passRef.current, exportOptions);
        const link = document.createElement('a');
        link.download = `FrameInGoa-ID-Pass-${sanitizedName}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Export error:', err);
      setError(`Failed to export ${format.toUpperCase()}. Please try again.`);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, name]);

  // Social Post Generator & Share Modal State
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImageDataUrl, setShareImageDataUrl] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [modalToast, setModalToast] = useState('');

  // ── Open Share Modal with Customized Short Post & Image ──────────────────
  const openShareModal = useCallback(async () => {
    if (!passRef.current) return;
    try {
      const dataUrl = await toPng(passRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a141b' });
      setShareImageDataUrl(dataUrl);

      const defaultMessage = `Heading to Hacker House Goa 2026 as a ${craft || 'Builder'}! 🌴🚀\nBuilding with ${teamName || 'team'} in paradise. 🌊\n\nCheck out my official Builder Pass!\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa #LiftUpLabs #BuildInParadise`;
      setPostMessage(defaultMessage);
      setModalToast('');
      setShowShareModal(true);
    } catch (err) {
      console.error('Share modal capture error:', err);
      setError('Could not generate share preview. Please try again.');
    }
  }, [craft, teamName]);

  // ── Share to X with Pass Image & Post Text ────────────────────────────────
  const handleShareX = useCallback(async () => {
    const text = postMessage || `Heading to Hacker House Goa 2026 as a ${craft || 'Builder'}! 🌴🚀\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa #LiftUpLabs`;

    // Try Web Share API with File Attachment
    if (passRef.current && navigator.share && navigator.canShare) {
      try {
        const dataUrl = shareImageDataUrl || await toPng(passRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a141b' });
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `FrameInGoa-Pass-${(name || 'Builder').replace(/\s+/g, '-')}.png`, { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Hacker House Goa 2026 Builder Pass',
            text: text,
            files: [file],
          });
          return;
        }
      } catch (err) {
        console.log('Web share fallback triggered:', err);
      }
    }

    // Desktop Fallback: Copy Post Text + Download Image + Open X
    try {
      await navigator.clipboard.writeText(text);
      setModalToast('Post text copied & pass image downloaded! Paste text & attach image on X.');
    } catch {
      // Ignore clipboard error
    }

    // Trigger Image Download for Attachment
    if (shareImageDataUrl || passRef.current) {
      const link = document.createElement('a');
      link.download = `FrameInGoa-Pass-${(name || 'Builder').replace(/\s+/g, '-')}.png`;
      link.href = shareImageDataUrl || await toPng(passRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a141b' });
      link.click();
    }

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  }, [postMessage, craft, shareImageDataUrl, name]);

  // ── Share to LinkedIn with Pass Image & Post Text ─────────────────────────
  const handleShareLinkedIn = useCallback(async () => {
    const text = postMessage || `Heading to Hacker House Goa 2026 as a ${craft || 'Builder'}! 🌴🚀\n\n#FrameInGoa #HHGoa2026 #HackerHouseGoa #LiftUpLabs`;

    // Copy Post Text to Clipboard
    try {
      await navigator.clipboard.writeText(text);
      setModalToast('Post text copied & pass image downloaded! Paste text & attach image on LinkedIn.');
    } catch {
      // Ignore clipboard error
    }

    // Trigger Image Download for Attachment
    if (shareImageDataUrl || passRef.current) {
      const link = document.createElement('a');
      link.download = `FrameInGoa-Pass-${(name || 'Builder').replace(/\s+/g, '-')}.png`;
      link.href = shareImageDataUrl || await toPng(passRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a141b' });
      link.click();
    }

    const shareUrl = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      '_blank',
      'noopener,noreferrer'
    );
  }, [postMessage, craft, shareImageDataUrl, name]);

  // ── Copy Post Text ────────────────────────────────────────────────────────
  const handleCopyPostText = async () => {
    try {
      await navigator.clipboard.writeText(postMessage);
      setModalToast('Post text with hashtags copied to clipboard! ✓');
      setTimeout(() => setModalToast(''), 3000);
    } catch {
      setModalToast('Failed to copy text.');
    }
  };

  // ── Copy Link ─────────────────────────────────────────────────────────────
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-bg">
      <div className="grain"></div>

      {/* ── TOP HEADER ─────────────────────────────────────────────────── */}
      <header className="top-header">
        <div className="script-title">Hacker House Goa 2026</div>
        <div className="script-sub">Build your tropical pass</div>
      </header>

      {/* ── MARQUEE BANNER ─────────────────────────────────────────────── */}
      <div className="marquee-banner">
        <div className="marquee-track">
          <span>
            HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp; HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp; HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp;&nbsp;
          </span>
          <span>
            HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp; HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp; HACKER HOUSE GOA 2026 &nbsp;·&nbsp; <b>#FRAMEINGOA</b> &nbsp;·&nbsp; BUILDER PASS &nbsp;·&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* ── MAIN STAGE ─────────────────────────────────────────────────── */}
      <div className="main-stage">
        {/* Left Column: Steps Form */}
        <div className="form-panel">
          <div className="section-heading">
            Craft your <em>identity.</em>
          </div>

          {/* 01 UPLOAD IDENTITY */}
          <div className="step-item">
            <div className="step-tag">
              <span>01</span> UPLOAD IDENTITY
            </div>

            <div
              className="upload-box"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="upload-icon">📸</div>
              <div className="upload-text">
                {photoUrl ? 'Swap portrait' : 'Upload portrait'}
              </div>
              <div className="upload-sub">JPG · PNG · WEBP · HEIC</div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,.heic,.heif"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {error && (
              <p style={{ color: 'var(--sunset-coral)', fontSize: 12, marginTop: 8 }}>{error}</p>
            )}

            {/* POSITION & SCALE CONTROLS */}
            {photoUrl && (
              <div className="controls-card">
                <div className="controls-label">
                  <span>Position & Scale</span>
                  <span style={{ color: 'var(--sunset-gold)', fontSize: 11 }}>
                    {Math.round(scale * 100)}%
                  </span>
                </div>

                <div className="slider-row">
                  <button
                    className="slider-btn"
                    onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                  />
                  <button
                    className="slider-btn"
                    onClick={() => setScale((s) => Math.min(2.5, s + 0.1))}
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>

                <div className="nudge-grid">
                  <button className="nudge-btn" onClick={() => handleNudge(-10, 0)} title="Nudge Left">←</button>
                  <button className="nudge-btn" onClick={() => handleNudge(0, -10)} title="Nudge Up">↑</button>
                  <button className="nudge-btn" onClick={() => handleNudge(0, 10)} title="Nudge Down">↓</button>
                  <button className="nudge-btn" onClick={() => handleNudge(10, 0)} title="Nudge Right">→</button>
                  <button className="nudge-btn" onClick={handleResetPosition} title="Reset Position">↺ Reset</button>
                </div>
              </div>
            )}
          </div>

          {/* 02 PERSONAL & TEAM DETAILS */}
          <div className="step-item">
            <div className="step-tag">
              <span>02</span> PERSONAL & TEAM DETAILS
            </div>

            <div className="input-group">
              <label>FULL NAME</label>
              <input
                type="text"
                placeholder="deva bokare"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={32}
              />
            </div>

            <div className="input-group">
              <label>CRAFT / ROLE</label>
              <input
                type="text"
                placeholder="Full stack developer & UI/UX Designer"
                value={craft}
                onChange={(e) => setCraft(e.target.value)}
                maxLength={45}
              />
            </div>

            {/* TEAM NAME & TEAM ID */}
            <div className="input-row-grid">
              <div className="input-group">
                <label>TEAM NAME</label>
                <input
                  type="text"
                  placeholder="Wave Hackers"
                  value={teamName}
                  onChange={handleTeamNameChange}
                  maxLength={30}
                />
              </div>

              <div className="input-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>TEAM ID (AUTO SERIAL)</label>
                  <button
                    onClick={handleRandomTeamId}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--sea-teal)',
                      cursor: 'pointer',
                      fontSize: 10,
                      fontFamily: 'Space Mono, monospace',
                    }}
                  >
                    🎲 Gen ID
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="HHG-709"
                  value={teamId}
                  onChange={(e) => setTeamId(e.target.value)}
                  maxLength={16}
                />
              </div>
            </div>
            {teamName.trim() && (
              <p style={{ color: 'var(--sea-teal)', fontSize: 11, fontFamily: 'Space Mono, monospace', marginTop: 4 }}>
                ⚡ Team "{teamName}" auto-assigned serial ID: {teamId}
              </p>
            )}

            {/* PASS TYPE CHIPS */}
            <div className="input-group" style={{ marginTop: 16 }}>
              <label>PASS TYPE</label>
              <div className="chip-selector">
                {PASS_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`chip-btn ${passType === type ? 'active' : ''}`}
                    onClick={() => setPassType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label>ASSIGNED TITLE</label>
                <button
                  onClick={() => setAssignedTitle(getRandomTitle())}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--sea-teal)',
                    cursor: 'pointer',
                    fontSize: 11,
                    fontFamily: 'Space Mono, monospace',
                  }}
                >
                  ↻ Shuffle
                </button>
              </div>
              <input
                type="text"
                placeholder="Vector Architect"
                value={assignedTitle}
                onChange={(e) => setAssignedTitle(e.target.value)}
                maxLength={40}
              />
            </div>
          </div>

          {/* 03 ISSUE & SHARE */}
          <div className="step-item">
            <div className="step-tag">
              <span>03</span> ISSUE & SHARE
            </div>

            <div className="action-group">
              <div className="action-section-label">DOWNLOAD ID PASS</div>
              <div className="action-row">
                <button
                  className="btn-pdf"
                  onClick={() => handleDownload('pdf')}
                  disabled={isDownloading}
                  title="Download vector PDF Pass"
                >
                  {isDownloading ? 'EXPORTING…' : '📄 PDF ID'}
                </button>
                <button
                  className="btn-export"
                  onClick={() => handleDownload('png')}
                  disabled={isDownloading}
                  title="Download High-Res PNG"
                >
                  {isDownloading ? 'EXPORTING…' : '🖼️ PNG'}
                </button>
                <button
                  className="btn-export"
                  onClick={() => handleDownload('jpg')}
                  disabled={isDownloading}
                  title="Download Crisp JPG"
                >
                  {isDownloading ? 'EXPORTING…' : '📷 JPG'}
                </button>
              </div>

              <div className="action-section-label" style={{ marginTop: 12 }}>SHARE PASS & CREATE SOCIAL POST</div>
              <div className="action-row">
                <button
                  className="btn-share"
                  onClick={openShareModal}
                  title="Generate short post with hashtags & attached pass"
                  style={{ background: 'linear-gradient(135deg, var(--sunset-coral) 0%, var(--sunset-gold) 100%)', color: '#060d1e' }}
                >
                  🚀 GENERATE & PREVIEW POST
                </button>
                <button className="btn-x" onClick={handleShareX} title="Share to X / Twitter">
                  𝕏 SHARE TO X
                </button>
                <button className="btn-linkedin" onClick={handleShareLinkedIn} title="Share to LinkedIn">
                  💼 LINKEDIN
                </button>
                <button className="btn-export" onClick={handleCopyLink} title="Copy Page Link">
                  {copied ? 'COPIED! ✓' : '🔗 COPY LINK'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Badge Card */}
        <div className="badge-wrapper">
          <BuilderPassCard
            ref={passRef}
            name={name}
            craft={craft}
            teamName={teamName}
            teamId={teamId}
            passType={passType}
            assignedTitle={assignedTitle}
            photoUrl={photoUrl}
            scale={scale}
            offsetX={offsetX}
            offsetY={offsetY}
            passCode={passCode}
          />
        </div>
      </div>

      <footer className="page-footer">
        Hacker House Goa 2026 · Built By team Liftuplabs With love ❤️
      </footer>

      {/* ── SOCIAL SHARE PREVIEW MODAL ───────────────────────────────────── */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                🚀 Social Post Preview & Pass Attachment
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setShowShareModal(false)}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Notification Toast */}
            {modalToast && (
              <div className="modal-toast-notice">
                <span>✨</span>
                <span>{modalToast}</span>
              </div>
            )}

            {/* Post Message Textarea */}
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea-teal)', fontFamily: 'Space Mono, monospace', marginBottom: 6, display: 'block' }}>
              CUSTOMIZABLE SHORT POST (WITH EVENT HASHTAGS)
            </label>
            <textarea
              className="post-preview-textarea"
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
              placeholder="Write your share post..."
            />

            {/* Pass Image Preview Slot */}
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--sunset-gold)', fontFamily: 'Space Mono, monospace', marginBottom: 6, display: 'block' }}>
              ATTACHED BUILDER PASS (PNG)
            </label>
            <div className="pass-preview-slot">
              {shareImageDataUrl ? (
                <img
                  src={shareImageDataUrl}
                  alt="Builder Pass Preview"
                  className="pass-preview-img"
                />
              ) : (
                <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  Rendering pass preview...
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="action-row" style={{ justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn-x" onClick={handleShareX} title="Share post & attach image to X">
                𝕏 Share to X
              </button>
              <button className="btn-linkedin" onClick={handleShareLinkedIn} title="Share post & attach image to LinkedIn">
                💼 Share to LinkedIn
              </button>
              <button className="btn-export" onClick={handleCopyPostText} title="Copy post text with hashtags">
                📋 Copy Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

