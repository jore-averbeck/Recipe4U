import React, { useState } from "react";

export default function Filterbar({
  difficultyFilter,
  durationFilter,
  onDifficultyChange,
  onDurationChange,
  setDurationFilter,
  setDifficultyFilter,
}) {
  return (
    <div>
      <label htmlFor="difficultyFilter">Difficulty</label>
      <select
        id="difficultyFilter"
        value={difficultyFilter}
        onChange={onDifficultyChange}
      >
        <option value="">select...</option>
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>

      <button onChange={onDifficultyChange} value={difficultyFilter}>
        Select
      </button>
    </div>
  );
}
