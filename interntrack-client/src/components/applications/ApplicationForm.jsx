import { useState, useEffect } from "react";
import { STATUS_COLUMNS } from "../../utils/statusConfig";
import Spinner from "../common/Spinner";

const EMPTY_FORM = {
  company: "", role: "", status: "Applied", deadline: "",
  notes: "", hrName: "", hrEmail: "", jobLink: "", salary: "",
  location: "", tags: "",
};

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
    {children}
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${className}`}
    {...props}
  />
);

const ApplicationForm = ({ application, onSubmit, onClose, loading }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (application) {
      setForm({
        company:  application.company || "",
        role:     application.role || "",
        status:   application.status || "Applied",
        deadline: application.deadline ? application.deadline.slice(0, 10) : "",
        notes:    application.notes || "",
        hrName:   application.hrName || "",
        hrEmail:  application.hrEmail || "",
        jobLink:  application.jobLink || "",
        salary:   application.salary || "",
        location: application.location || "",
        tags:     (application.tags || []).join(", "),
      });
    }
  }, [application]);

  const validate = () => {
    const e = {};
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.role.trim()) e.role = "Role is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      deadline: form.deadline || null,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            {application ? "Edit Application" : "Add Application"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">&times;</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company *" error={errors.company}>
              <Input name="company" value={form.company} onChange={handleChange} placeholder="Google" />
            </Field>
            <Field label="Role *" error={errors.role}>
              <Input name="role" value={form.role} onChange={handleChange} placeholder="SDE Intern" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Status">
              <select
                name="status" value={form.status} onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUS_COLUMNS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Deadline">
              <Input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Location">
              <Input name="location" value={form.location} onChange={handleChange} placeholder="Bangalore / Remote" />
            </Field>
            <Field label="Salary / Stipend">
              <Input name="salary" value={form.salary} onChange={handleChange} placeholder="₹50,000/month" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="HR Name">
              <Input name="hrName" value={form.hrName} onChange={handleChange} placeholder="John Doe" />
            </Field>
            <Field label="HR Email" error={errors.hrEmail}>
              <Input type="email" name="hrEmail" value={form.hrEmail} onChange={handleChange} placeholder="hr@company.com" />
            </Field>
          </div>

          <Field label="Job Link">
            <Input type="url" name="jobLink" value={form.jobLink} onChange={handleChange} placeholder="https://linkedin.com/jobs/..." />
          </Field>

          <Field label="Tags (comma-separated)">
            <Input name="tags" value={form.tags} onChange={handleChange} placeholder="product, tech, fintech" />
          </Field>

          <Field label="Notes">
            <textarea
              name="notes" value={form.notes} onChange={handleChange}
              rows={3} placeholder="Applied via campus portal..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </Field>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60 flex items-center gap-2 transition-colors">
              {loading && <Spinner size="sm" />}
              {application ? "Save Changes" : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationForm;