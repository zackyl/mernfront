import React, { useRef } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const ModalOverlay = React.forwardRef((props, ref) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style} ref={ref}>
      <header className={`modal__header ${props.headerClass}`}>
        {props.header}
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

function Modal(props) {
  // console.table(props)
  const nodeRef = useRef(null);
  // const itemRef = React.createRef(null);
  const propsref = { ...props, ref: nodeRef };

  return (
    <>
      {props.show ? <Backdrop onClick={props.onCancel} /> : null}
      <CSSTransition
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
        nodeRef={nodeRef}
      >
        <ModalOverlay {...propsref} />
      </CSSTransition>
    </>
  );
}

export default Modal;
