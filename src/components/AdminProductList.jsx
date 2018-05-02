import { h } from "hyperapp";

const LINE_HEIGHT = "5em";

export const AdminProductList = () => (state, actions) => (
  <table class="uk-table uk-table-striped admin-product-table">
    <thead>
      <tr>
        {state.products[0] &&
          Object.keys(state.products[0]).map(k => <th>{k}</th>)}
      </tr>
    </thead>
    <tbody>
      {state.products.map(p => (
        <tr>{Object.keys(p).map(k => processField(state, p, k))}</tr>
      ))}
    </tbody>
  </table>
);

const processField = (state, p, k) => {
  switch (k) {
    case "id":
      return <td style={{ lineHeight: LINE_HEIGHT }}>{p[k]}</td>;
    case "images":
      return (
        <td style={{ lineHeight: LINE_HEIGHT }}>
          {p[k].map(i => (
            <img
              style={{ maxHeight: LINE_HEIGHT, marginLeft: "5px" }}
              src={state.images[i]}
            />
          ))}
        </td>
      );
    case "description":
      return <ModifyTextarea id={p.id} field={k} data={p[k]} />;
    case "createdAt":
      return (
        <td style={{ lineHeight: LINE_HEIGHT }}>
          {new Date(p[k]).toLocaleString()}
        </td>
      );
    case "updatedAt":
      return (
        <td style={{ lineHeight: LINE_HEIGHT }}>
          {new Date(p[k]).toLocaleString()}
        </td>
      );
    default:
      return <ModifyField id={p.id} field={k} data={p[k]} />;
  }
};

const ModifyField = ({ id, field, data, size }) => (state, actions) => (
  <td style={{ lineHeight: LINE_HEIGHT, width: size || "" }}>
    <input
      onchange={e =>
        actions.modifyProduct({
          id,
          data: {
            [field]:
              field == "createdAt" || field == "updatedAt"
                ? new Date(e.target.value).toISOString()
                : e.target.value
          }
        })
      }
      type="text"
      class="uk-input"
      value={data}
    />
  </td>
);

const ModifyTextarea = ({ id, field, data }) => (state, actions) => (
  <td>
    <textarea
      cols="30"
      rows="10"
      style={{ height: LINE_HEIGHT, lineHeight: "1em" }}
      class="uk-input"
      onchange={e =>
        actions.modifyProduct({
          id,
          data: {
            [field]: e.target.value
          }
        })
      }
    >
      {data}
    </textarea>
  </td>
);
