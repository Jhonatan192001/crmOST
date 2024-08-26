import PropTypes from "prop-types";
import { X } from 'lucide-react';
import Card from './Card';
// import Button from './Button';

const Modal = ({ isOpen, onClose, title, children, footer, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className={`w-full max-w-xl ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          {children}
        </div>
        {footer && (
          <div className="flex justify-end space-x-2 mt-4">
            {footer}
          </div>
        )}
      </Card>
    </div>
  );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    className: PropTypes.string,
};

export default Modal;