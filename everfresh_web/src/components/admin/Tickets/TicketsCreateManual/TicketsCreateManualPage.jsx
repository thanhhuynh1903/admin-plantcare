import "./TicketsCreateManualPage.scss";
import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { setPageHeadTitle } from "../../../utils/util_web";
import TextEditor from "../../commons/TextEditor/TextEditor";
import TextFieldBasic from "../../commons/TextFieldBasic/TextFieldBasic";
import SelectField from "../../commons/SelectField/SelectField";
import Divider from "@mui/material/Divider";
import { types, status} from '../TicketsPage.prop'

const initialState = {
  email: "",
  ticketType: "",
  priorityStatus: "",
  ticketBody: "",
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_EMAIL":
      return { ...state, email: action.payload, errors: {} };
    case "CHANGE_TICKET_TYPE":
      return { ...state, ticketType: action.payload, errors: {} };
    case "CHANGE_PRIORITY_STATUS":
      return { ...state, priorityStatus: action.payload, errors: {} };
    case "CHANGE_TICKET_BODY":
      return { ...state, ticketBody: action.payload, errors: {} };
    case "SUBMIT_FORM":
      const errors = {};
      if (!state.email) {
        errors.email = "Email is required";
      }
      if (!state.ticketType) {
        errors.ticketType = "Ticket type is required";
      }
      if (!state.priorityStatus) {
        errors.priorityStatus = "Priority status is required";
      }
      if (!state.ticketBody) {
        errors.ticketBody = "Ticket body is required";
      }
      return { ...state, errors };
    default:
      throw new Error();
  }
};

export default function TicketsCreateManualPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setPageHeadTitle("Create manual ticket");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });
    if (Object.keys(state.errors).length === 0) {
      const data = {
        email: state.email,
        ticketType: state.ticketType,
        priorityStatus: state.priorityStatus,
        ticketBody: state.ticketBody,
      };
      console.log("Form Submitted:", data);
    }
  };

  return (
    <div className="tickets-create-manual-page">
      <div className="main-label">
        <Button component={Link} to="/tickets">
          <ArrowCircleLeftOutlinedIcon className="btn-back" />
        </Button>
        <p>Tickets - Creating manual ticket</p>
      </div>

      <div className="content">
        <div>
          <p className="title">Quick manual ticket</p>
          <p className="description">
            Please fill the following for a user or email
          </p>
          <Divider sx={{ marginTop: "15px", marginBottom: "20px" }} />
        </div>
        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="input-label">Customer Email</div>
          <TextFieldBasic
            name="email"
            sx={{ marginBottom: "20px" }}
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "CHANGE_EMAIL", payload: e.target.value })
            }
            error={state.errors.email ? true : false}
            helperText={state.errors.email}
          />

          <div className="input-label">Request Ticket Type</div>
          <SelectField
            name="ticketType"
            items={types.map((type) => ({ prop: type.id, value: type.name }))} // Map types
            sx={{ marginBottom: "20px" }}
            value={state.ticketType}
            onChange={(e) =>
              dispatch({ type: "CHANGE_TICKET_TYPE", payload: e.target.value })
            }
            error={state.errors.ticketType ? true : false}
            helperText={state.errors.ticketType}
          />

          <div className="input-label">Priority Status</div>
          <SelectField
            name="priorityStatus"
            items={status.map((stat) => ({
              prop: stat.id,
              value: stat.label,
            }))} // Map status
            sx={{ marginBottom: "20px" }}
            value={state.priorityStatus}
            onChange={(e) =>
              dispatch({
                type: "CHANGE_PRIORITY_STATUS",
                payload: e.target.value,
              })
            }
            error={state.errors.priorityStatus ? true : false}
            helperText={state.errors.priorityStatus}
          />

          <div className="rich-text-editor">
            <div className="input-label-container">
              <div className="input-label">Ticket Body</div>
              <Button className="btn-template">Use template</Button>
            </div>
            <TextEditor
              defaultValue={state.ticketBody}
              onChange={(value) =>
                dispatch({ type: "CHANGE_TICKET_BODY", payload: value })
              }
              error={state.errors.ticketBody ? true : false}
              helperText={state.errors.ticketBody}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
          >
            + Send manual ticket
          </Button>
        </form>
      </div>
    </div>
  );
}
