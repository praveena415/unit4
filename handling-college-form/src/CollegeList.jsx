import React from "react";
import { useReducer } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  courses_offered: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "UPDATE_ADDRESS_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value,
        },
      };
    case "UPDATE_CITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.field]: action.value,
          },
        },
      };
    case "UPDATE_LOCALITY_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value,
            },
          },
        },
      };
    case "UPDATE_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.field]: action.value,
          },
        },
      };
    case "UPDATE_COURSES":
      return {
        ...state,
        courses_offered: action.value,
      };
    case "RESET":
      return initialState;
    default:
      throw new Error("invalid action type");
  }
}

export default function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College Data Submitted:", state);
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "name",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              field: "establishment_year",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              field: "building",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              field: "street",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="City Name"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CITY_FIELD",
              field: "name",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY_FIELD",
              field: "pinCode",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_LOCALITY_FIELD",
              field: "landmark",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_ADDRESS_FIELD",
              field: "state",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              field: "latitude",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COORDINATES",
              field: "longitude",
              value: e.target.value,
            })
          }
        />
        <br />

        <input
          placeholder="Courses Offered (comma separated)"
          onChange={(e) =>
            dispatch({
              type: "UPDATE_COURSES",
              value: e.target.value.split(",").map((course) => course.trim()),
            })
          }
        />
        <br />

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h3>Submitted College Details:</h3>
        {state.name === "" ? (
          <div>No details found</div>
        ) : (
          <div>
            <div>
              <strong>Name:</strong> {state.name}
            </div>
            <div>
              <strong>Established:</strong> {state.establishment_year}
            </div>
            <div>
              <strong>Building:</strong> {state.address.building}
            </div>
            <div>
              <strong>Street:</strong> {state.address.street}
            </div>
            <div>
              <strong>City:</strong> {state.address.city.name}
            </div>
            <div>
              <strong>Pincode:</strong> {state.address.city.locality.pinCode}
            </div>
            <div>
              <strong>Landmark:</strong> {state.address.city.locality.landmark}
            </div>
            <div>
              <strong>State:</strong> {state.address.state}
            </div>
            <div>
              <strong>Latitude:</strong> {state.address.coordinates.latitude}
            </div>
            <div>
              <strong>Longitude:</strong> {state.address.coordinates.longitude}
            </div>
            <div>
              <strong>Courses:</strong> {state.courses_offered.join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
