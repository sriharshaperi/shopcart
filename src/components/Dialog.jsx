import React from "react";
import "./Dialog.css";

function Dialog({ show, onClose, content }) {
  if (!show) return <></>;
  return (
    <div className="dialog">
      <div className="dialog__content">
        <div className="dialog__header">
          <h4 className="dialog__title">Message</h4>
        </div>
        <div className="dialog__body">{content}</div>
        <div className="dialog__footer">
          <button className="dialog__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
