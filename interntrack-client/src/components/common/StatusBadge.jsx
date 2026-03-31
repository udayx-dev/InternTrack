import { STATUS_STYLES } from "../../utils/statusConfig";

const StatusBadge = ({ status }) => {
  const style = STATUS_STYLES[status] || STATUS_STYLES["Applied"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
};
export default StatusBadge;