import React from "react";

/**
 * A visually appealing, accessible position guide for logo/text placement on a shirt.
 * Clickable zones auto-position the logo (if onClickZone is provided).
 */
export function PositionGuide({ onClickZone }: { onClickZone?: (zone: 'front' | 'back' | 'leftSleeve' | 'rightSleeve') => void }) {
  return (
    <div className="position-guide-container">
      <h3 className="position-guide-title">Position Guide</h3>
      <svg
        viewBox="0 0 400 220"
        className="position-guide-svg"
        aria-label="Shirt position guide"
        role="img"
      >
        {/* Front Shirt */}
        <g className="guide-front">
          <rect x="30" y="40" width="120" height="140" rx="16" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="2" />
          <text x="90" y="120" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#888">FRONT</text>
          {/* Clickable zone */}
          {onClickZone && (
            <rect
              x="70" y="90" width="40" height="40" rx="8"
              fill="#2563eb22" stroke="#2563eb" strokeWidth="1.5"
              className="guide-zone"
              tabIndex={0}
              aria-label="Place logo on front"
              onClick={() => onClickZone('front')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClickZone('front')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </g>
        {/* Back Shirt */}
        <g className="guide-back">
          <rect x="250" y="40" width="120" height="140" rx="16" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="2" />
          <text x="310" y="120" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#888">BACK</text>
          {onClickZone && (
            <rect
              x="290" y="90" width="40" height="40" rx="8"
              fill="#2563eb22" stroke="#2563eb" strokeWidth="1.5"
              className="guide-zone"
              tabIndex={0}
              aria-label="Place logo on back"
              onClick={() => onClickZone('back')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClickZone('back')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </g>
        {/* Left Sleeve */}
        <g className="guide-leftsleeve">
          <rect x="10" y="190" width="60" height="20" rx="6" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="40" y="205" textAnchor="middle" fontSize="12" fill="#aaa">Left Sleeve</text>
          {onClickZone && (
            <rect
              x="25" y="192" width="30" height="16" rx="4"
              fill="#2563eb22" stroke="#2563eb" strokeWidth="1"
              className="guide-zone"
              tabIndex={0}
              aria-label="Place logo on left sleeve"
              onClick={() => onClickZone('leftSleeve')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClickZone('leftSleeve')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </g>
        {/* Right Sleeve */}
        <g className="guide-rightsleeve">
          <rect x="330" y="190" width="60" height="20" rx="6" fill="#f3f4f6" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="360" y="205" textAnchor="middle" fontSize="12" fill="#aaa">Right Sleeve</text>
          {onClickZone && (
            <rect
              x="345" y="192" width="30" height="16" rx="4"
              fill="#2563eb22" stroke="#2563eb" strokeWidth="1"
              className="guide-zone"
              tabIndex={0}
              aria-label="Place logo on right sleeve"
              onClick={() => onClickZone('rightSleeve')}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClickZone('rightSleeve')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </g>
      </svg>
      <div className="position-guide-hint">Click a zone to auto-place your logo or text.</div>
    </div>
  );
}
