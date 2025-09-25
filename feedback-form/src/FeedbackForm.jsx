import React, { useState, useEffect } from "react";
function validate() {
  const e = {};
  if (!local.name || local.name.trim().length < 2)
    e.name = "Enter your name (min 2 chars)";
  if (!local.rating || local.rating < 1 || local.rating > 5)
    e.rating = "Rating 1-5 required";
  if (!local.comments || local.comments.trim().length < 5)
    e.comments = "Please add comments (min 5 chars)";
  setErrors(e);
  return Object.keys(e).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setLocal((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  }

  function saveToContext() {
    update(local);
  }

  function goToSummary() {
    saveToContext();
    if (validate()) {
      navigate("/summary");
    }
  }

  return (
    <>
      <div>
        <label>Name</label>
        <br />
        <input name="name" value={local.name} onChange={handleChange} />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>

      <div>
        <label>Rating (1-5)</label>
        <br />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={local.rating}
          onChange={handleChange}
        />
        {errors.rating && <div style={{ color: "red" }}>{errors.rating}</div>}
      </div>

      <div>
        <label>Comments</label>
        <br />
        <textarea
          name="comments"
          value={local.comments}
          onChange={handleChange}
          rows={4}
          cols={40}
        />
        {errors.comments && (
          <div style={{ color: "red" }}>{errors.comments}</div>
        )}
      </div>

      <button onClick={saveToContext} style={{ marginRight: 8 }}>
        Save
      </button>
      <button onClick={goToSummary}>Go to Summary</button>
    </>
  );
}
