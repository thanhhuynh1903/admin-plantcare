import { Button, Dialog, DialogActions } from "@mui/material";
import "./DialogBasic.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "./DialogBasic.prop";

export default function DialogBasic({
  className,
  title = "Dialog",
  maxWidth = 'md',
  open,
  onClose = () => {},
  children,
  footer,
  ...props
}) {
  return (
    <Dialog
      className={`common-dialog-basic ${className}`}
      title={title}
      open={open}
      fullWidth={true}
      maxWidth={maxWidth}
      onClose={onClose}
      TransitionComponent={Transition}
      {...props}
    >
      <div className="dialog-titlebar">
        <div></div>
        <p>{title}</p>
        <div className="btn-titlebar">
          <Button className="btn-close">
            <CloseIcon onClick={onClose} />
          </Button>
        </div>
      </div>
      <div className="dialog-content">{children}</div>
      <DialogActions>{footer}</DialogActions>
    </Dialog>
  );
}
