import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import StatusBadge from "../common/StatusBadge";
import { formatDate, daysUntil } from "../../utils/formatters";

const KanbanCard = ({ application, index, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const days = daysUntil(application.deadline);

  const deadlineColor =
    days === null ? "" :
    days < 0  ? "text-red-500" :
    days <= 3 ? "text-orange-500" :
    "text-slate-400";

  return (
    <Draggable draggableId={application._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-xl border p-3 cursor-grab active:cursor-grabbing transition-shadow
            ${snapshot.isDragging
              ? "shadow-lg border-indigo-300 rotate-1"
              : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"
            }`}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate">{application.company}</p>
              <p className="text-xs text-slate-500 truncate">{application.role}</p>
            </div>

            {/* Context Menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 text-xs"
              >⋯</button>
              {menuOpen && (
                <div className="absolute right-0 top-6 bg-white border border-slate-200 rounded-lg shadow-lg z-10 min-w-[110px] py-1">
                  <button onClick={() => { onEdit(application); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 text-slate-700">
                    Edit
                  </button>
                  <button onClick={() => { onDelete(application._id); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 text-red-600">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Deadline */}
          {application.deadline && (
            <p className={`text-xs mt-2 ${deadlineColor}`}>
              {days !== null && days < 0 ? "Expired" :
               days === 0 ? "Due today" :
               days === 1 ? "Due tomorrow" :
               `Due ${formatDate(application.deadline)}`}
            </p>
          )}

          {/* Tags */}
          {application.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {application.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* HR Info */}
          {application.hrName && (
            <p className="text-xs text-slate-400 mt-2 truncate">👤 {application.hrName}</p>
          )}
        </div>
      )}
    </Draggable>
  );
};
export default KanbanCard;