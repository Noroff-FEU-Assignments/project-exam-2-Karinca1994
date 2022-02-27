import { Cross } from "../../constants/stylement";

const Modal = ({ children, link, id, classes }) => (
  <div className={`modal ${classes}`} id={id}>
    <div className="modal__content">
      <a href={link} className="modal__close">
        <Cross />
      </a>
      {children}
    </div>
  </div>
);

export default Modal;
