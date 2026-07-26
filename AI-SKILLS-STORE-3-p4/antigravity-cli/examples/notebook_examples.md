# Notebook Execution Examples

---

## Execute Notebook Cells

```
User: "Run the data analysis notebook"
```

```
→ execute_notebook_cells
  notebookPath: "/workspace/notebooks/analysis.ipynb"
  cellIDs: ["cell-001", "cell-002", "cell-003"]

  ← Cell cell-001 executed (0.5s, output: "Loaded 1000 rows")
  ← Cell cell-002 executed (2.3s, output: "Mean: 42.5, Std: 7.2")
  ← Cell cell-003 executed (1.1s, output: "Chart generated")
```

---

## Execute Specific Cells

```
User: "Re-run just the chart generation cell"
```

```
→ execute_notebook_cells
  notebookPath: "/workspace/notebooks/analysis.ipynb"
  cellIDs: ["cell-003"]

  ← Cell cell-003 executed (1.1s, output: "Chart generated")
```
