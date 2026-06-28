import { useEffect, useState } from "react";
import Button from "./Button";
import { FaEdit } from "react-icons/fa";
// ─── helpers ────────────────────────────────────────────────────────────────

function initials(name) {
  return name
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("");
}

const STATUS_STYLES = {
  new: { label: "New", bg: "#E6F1FB", color: "#185FA5" },
  contacted: { label: "Contacted", bg: "#EAF3DE", color: "#3B6D11" },
  "site-visit": { label: "Site Visit", bg: "#FAEEDA", color: "#854F0B" },
  qualified: { label: "Qualified", bg: "#E1F5EE", color: "#0F6E56" },
  negotiation: { label: "Negotiation", bg: "#FBEAF0", color: "#993556" },
};

const PRIORITY_COLORS = {
  high: "#E24B4A",
  medium: "#BA7517",
  low: "#1D9E75",
};

// ─── sub-components ──────────────────────────────────────────────────────────

function Avatar({ name }) {
  const colors = [
    ["#E6F1FB", "#185FA5"],
    ["#E1F5EE", "#0F6E56"],
    ["#FAEEDA", "#854F0B"],
    ["#FBEAF0", "#993556"],
    ["#EEEDFE", "#3C3489"],
  ];
  const [bg, fg] = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: bg,
        color: fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {initials(name)}
    </div>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? {
    label: status,
    bg: "#f1f1f1",
    color: "#555",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
        background: s.bg,
        color: s.color,
      }}
    >
      {s.label}
    </span>
  );
}

function PriorityDot({ priority }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 13,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: PRIORITY_COLORS[priority] ?? "#888",
          display: "inline-block",
        }}
      />
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

function MetaRow({ label, children }) {
  return (
    <div style={{ padding: "6px 0" }}>
      <div
        style={{
          fontSize: 11,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: 2,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{children}</div>
    </div>
  );
}

function NoteCard({ note, onToggle, onDelete }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderLeft: `3px solid ${note.done ? "#C0DD97" : "#B5D4F4"}`,
        background: "#f9f9f9",
        borderRadius: "0 6px 6px 0",
        opacity: note.done ? 0.7 : 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.5,
            flex: 1,
            textDecoration: note.done ? "line-through" : "none",
            color: note.done ? "#aaa" : "inherit",
          }}
        >
          {note.text}
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button
            onClick={() => onToggle(note.id)}
            title={note.done ? "Mark pending" : "Mark done"}
            style={iconBtnStyle}
          >
            {note.done ? "↺" : "✓"}
          </button>
          <button
            onClick={() => onDelete(note.id)}
            title="Delete"
            style={{ ...iconBtnStyle, color: "#c0392b" }}
          >
            ✕
          </button>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
        {note.author} · {note.time}
      </div>
    </div>
  );
}

const iconBtnStyle = {
  width: 24,
  height: 24,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  borderRadius: 4,
  fontSize: 13,
  color: "#888",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

// ─── main component ──────────────────────────────────────────────────────────

/**
 * LeadDetails
 *
 * Props:
 *   lead     — lead object (see shape below)
 *   onClose  — () => void   called when × is clicked
 *
 * Lead shape:
 * {
 *   id, name, phone,
 *   project, source, status, priority, owner, budget, lastActivity,
 *   notes: [{ id, text, author, time, done }],
 *   activities: [{ icon, text, time }],
 * }
 */
export default function LeadDetails({ lead: initialLead, onClose }) {
  const [lead, setLead] = useState(initialLead);
  const [activeTab, setActiveTab] = useState("notes");
  const [noteText, setNoteText] = useState("");
  const [leadEdit, setLeadEdit] = useState(false);

  // keep in sync if parent passes a new lead (e.g. row click)
  // use a key on the parent instead if you prefer full remount
  useEffect(() => {
    setLead(initialLead);
  }, [initialLead]);

  function addNote() {
    if (!noteText.trim()) return;
    const newNote = {
      id: Date.now(),
      text: noteText.trim(),
      author: "You",
      time: "Just now",
      done: false,
    };
    setLead((l) => ({ ...l, notes: [newNote, ...l.notes] }));
    setNoteText("");
  }

  function toggleNote(id) {
    setLead((l) => ({
      ...l,
      notes: l.notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)),
    }));
  }

  function deleteNote(id) {
    setLead((l) => ({ ...l, notes: l.notes.filter((n) => n.id !== id) }));
  }

  const TABS = ["notes", "activities", "history"];

  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        border: "0.5px solid #e0e0e0",
        borderRadius: 12,
        fontFamily: "sans-serif",
        fontSize: 14,
        color: "#1a1a1a",
        overflow: "hidden",
      }}
    >
      {/* ── header ── */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "0.5px solid #e8e8e8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          <Avatar name={lead.name} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>{lead.name}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>
              {lead.phone}
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {[
                { icon: "📞", label: "Call" },
                { icon: "✉️", label: "Email" },
                { icon: "💬", label: "WhatsApp" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  title={label}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: "0.5px solid #e0e0e0",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ ...iconBtnStyle, fontSize: 16 }}
        >
          ✕
        </button>
      </div>

      {/* ── meta grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          padding: "4px 20px 8px",
          borderBottom: "0.5px solid #e8e8e8",
          gap: "0 12px",
        }}
      >
        <MetaRow label="Project">
          <span style={{ color: "#185FA5" }}>{lead.project}</span>
        </MetaRow>
        <MetaRow label="Source">{lead.source}</MetaRow>
        <MetaRow label="Status">
          <StatusBadge status={lead.status} />
        </MetaRow>
        <MetaRow label="Priority">
          <PriorityDot priority={lead.priority} />
        </MetaRow>
        <MetaRow label="Owner">{lead.owner}</MetaRow>
        <MetaRow label="Budget">{lead.budget}</MetaRow>
        <div style={{ gridColumn: "1 / -1" }}>
          <MetaRow label="Last activity">{lead.lastActivity}</MetaRow>
        </div>
      </div>

      {/* ── tabs ── */}
      <div
        style={{
          display: "flex",
          borderBottom: "0.5px solid #e8e8e8",
          padding: "0 20px",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 14px",
              fontSize: 13,
              fontWeight: 500,
              color: activeTab === tab ? "#1a1a1a" : "#888",
              background: "transparent",
              border: "none",
              borderBottom:
                activeTab === tab
                  ? "2px solid #1a1a1a"
                  : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -0.5,
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── tab: notes ── */}
      {activeTab === "notes" && (
        <div style={{ padding: "16px 20px" }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) addNote();
            }}
            placeholder="Write a note…"
            style={{
              width: "100%",
              minHeight: 72,
              padding: "10px 12px",
              fontSize: 13,
              border: "0.5px solid #e0e0e0",
              borderRadius: 6,
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              background: "#f9f9f9",
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 8,
              marginBottom: 14,
            }}
          >
            <button
              onClick={() => setNoteText("")}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                border: "0.5px solid #ccc",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={addNote}
              disabled={!noteText.trim()}
              style={{
                padding: "6px 16px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                border: "none",
                background: noteText.trim() ? "#185FA5" : "#e0e0e0",
                color: noteText.trim() ? "#fff" : "#aaa",
                cursor: noteText.trim() ? "pointer" : "not-allowed",
              }}
            >
              Add note
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lead?.notes.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "28px 0",
                  color: "#aaa",
                  fontSize: 13,
                }}
              >
                No notes yet
              </div>
            ) : (
              lead.notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onToggle={toggleNote}
                  onDelete={deleteNote}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ── tab: activities ── */}
      {activeTab === "activities" && (
        <div style={{ padding: "8px 20px" }}>
          {lead.activities?.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < lead.activities.length - 1
                    ? "0.5px solid #e8e8e8"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#f3f3f3",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                {a.icon ?? "●"}
              </div>
              <div>
                <div style={{ fontSize: 13 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>
                  {a.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── tab: history ── */}
      {activeTab === "history" && (
        <div style={{ padding: "8px 20px" }}>
          {[
            { icon: "➕", text: "Lead created", time: "Jun 20, 2024" },
            {
              icon: "↔",
              text: `Status changed → ${STATUS_STYLES[lead.status]?.label ?? lead.status}`,
              time: lead.lastActivity,
            },
            {
              icon: "👤",
              text: `Assigned to ${lead.owner}`,
              time: "Jun 20, 2024",
            },
          ].map((h, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < arr.length - 1 ? "0.5px solid #e8e8e8" : "none",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#f3f3f3",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                {h.icon}
              </div>
              <div>
                <div style={{ fontSize: 13 }}>{h.text}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>
                  {h.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
