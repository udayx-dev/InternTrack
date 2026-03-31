import { Droppable } from "@hello-pangea/dnd";
import KanbanCard from "./KanbanCard";
import { COLUMN_HEADERS } from "../../utils/statusConfig";

const KanbanColumn = ({ status, applications, onEdit, onDelete }) => {
  const { label, emoji } = COLUMN_HEADERS[status];

  const columnBg = {
    Applied:   "bg-blue-50 border-blue-200",
    OA:        "bg-purple-50 border-purple-200",
    Interview: "bg-amber-50 border-amber-200",
    Offer:     "bg-green-50 border-green-200",
    Rejected:  "bg-red-50 border-red-200",
  }[status];

  return (
    <div className={`rounded-2xl border ${columnBg} flex flex-col min-w-[250px] w-[250px] flex-shrink-0`}>
      {/* Column Header */}
      <div className="px-3 py-3 border-b border-inherit">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">{emoji}</span>
            <span className="text-sm font-semibold text-slate-700">{label}</span>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-white/70 rounded-full px-2 py-0.5 border border-slate-200">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-2 min-h-[200px] transition-colors rounded-b-2xl
              ${snapshot.isDraggingOver ? "bg-white/50" : ""}`}
          >
            {applications.map((app, index) => (
              <KanbanCard
                key={app._id}
                application={app}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
            {applications.length === 0 && !snapshot.isDraggingOver && (
              <p className="text-center text-xs text-slate-400 py-6">Drop here</p>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
export default KanbanColumn;