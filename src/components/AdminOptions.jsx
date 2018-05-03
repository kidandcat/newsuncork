import { h } from "hyperapp";
import { Link } from "@hyperapp/router";
import { SmallProduct } from "/src/components/SmallProduct";

export const AdminOptions = () => (state, actions) => (
  <div
    class="uk-margin-auto uk-flex"
    style={{
      justifyContent: "center"
    }}
  >
    <div
      style={{
        margin: "30px",
        width: "50vw"
      }}
    >
      <h2>Available Options</h2>
      {state.optiontypes.map(o => (
        <div>
          {o.name}: {o.options.join(",")}
        </div>
      ))}
    </div>
    <div
      style={{
        margin: "30px",
        width: "30vw",
        textAlign: "center"
      }}
    >
      <h2>Create new Option</h2>
      <div class="uk-margin">
        <input
          class="uk-input uk-width-1-2"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>
      <div class="uk-margin">
        <input
          class="uk-input"
          type="text"
          placeholder="Options"
          id="options"
        />
      </div>
      <button
        class="uk-button uk-button-default"
        onclick={() => {
          actions.create({
            service: "optiontype",
            data: {
              name: document.querySelector("#name").value,
              options: document.querySelector("#options").value.split(",")
            }
          });
        }}
      >
        Create
      </button>
    </div>
  </div>
);
