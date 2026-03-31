import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "../components/kanban/KanbanColumn";
import ApplicationForm from "../components/applications/ApplicationForm";
import { useApplications } from "../hooks/useApplications";
import { STATUS_COLUMNS } from "../utils/statusConfig";
import Spinner from "../components/common/Spinner";
import toast from "react-hot-toast";

const KanbanPage = () => {
  const { applications, loading, createApplication, updateApplication, updateStatus, deleteApplication } = useApplications();
  const [showForm, setShowForm] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Group applications by status
  const columns = STATUS_COLUMNS.reduce((acc, status) => {
    acc[status] = applications.filter((a) => {
      if (a.status !== status) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
    });
    return acc;
  }, {});

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return; // same column

    await updateStatus(draggableId, destination.droppableId);
  };

  const handleFormSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingApp) {
        await updateApplication(editingApp._id, data);
        toast.success("Application updated!");
      } else {
        await createApplication(data);
        toast.success("Application added!");
      }
      setShowForm(false);
      setEditingApp(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      toast.success("Deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApp(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Application Pipeline</h1>
          <p className="text-sm text-slate-500 mt-0.5">{applications.length} total applications</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text" placeholder="Search company or role..."
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52"
          />
          <button onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap">
            + Add Application
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-6">
          {STATUS_COLUMNS.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              applications={columns[status]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Application Form Modal */}
      {showForm && (
        <ApplicationForm
          application={editingApp}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
          loading={formLoading}
        />
      )}
    </div>
  );
};
export default KanbanPage;