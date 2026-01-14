interface ActionButtonProps {
  icon: string;
  label?: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="text-xs font-semibold text-content-primary hover:text-content-secondary flex flex-row items-center">
      <span className="material-symbols-rounded">{icon}</span>
      <span className="ml-1">{label}</span>
    </button>
  );
};

export default ActionButton;
