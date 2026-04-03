import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Stack,
  InputBase,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ColorPallete } from "../../config/colors";
import type { DataTableProps } from "./types";

export function DataTable<T extends { id: string | number }>({
  title,
  subtitle,
  columns,
  rows,
  actions,
  filters = [],
  searchable = true,
  pageSize = 10,
  onRowClick,
  headerAction,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {},
  );

  // Apply search + filters
  const processed = useMemo(() => {
    let result = [...rows];

    // Search across all string fields
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row as Record<string, unknown>).some(
          (v) => typeof v === "string" && v.toLowerCase().includes(q),
        ),
      );
    }

    // Column filters
    filters.forEach(({ rowKey }) => {
      const val = activeFilters[rowKey];
      if (val && val !== "__all__") {
        result = result.filter(
          (row) =>
            String((row as Record<string, unknown>)[rowKey] ?? "") === val,
        );
      }
    });

    return result;
  }, [rows, search, activeFilters, filters]);

  const totalPages = Math.ceil(processed.length / pageSize);
  const paginated = processed.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  const handleFilterChange = (rowKey: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [rowKey]: value }));
    setPage(0);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #f0f0f5",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      {(title || searchable || filters.length > 0 || headerAction) && (
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            borderBottom: "1px solid #f7f7fc",
          }}
        >
          <Box>
            {title && (
              <Typography
                sx={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f0f1a" }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography sx={{ fontSize: "0.72rem", color: "#aaa", mt: 0.2 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
            {/* Filter selects */}
            {filters.map((f) => (
              <Select
                key={f.rowKey}
                size="small"
                value={activeFilters[f.rowKey] ?? "__all__"}
                onChange={(e) => handleFilterChange(f.rowKey, e.target.value)}
                displayEmpty
                sx={{
                  fontSize: "0.78rem",
                  borderRadius: "8px",
                  height: 32,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#f0f0f5",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: `${ColorPallete.primary.main}50`,
                  },
                }}
              >
                <MenuItem value="__all__" sx={{ fontSize: "0.78rem" }}>
                  {f.allLabel}
                </MenuItem>
                {f.options.map((opt) => (
                  <MenuItem key={opt} value={opt} sx={{ fontSize: "0.78rem" }}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            ))}

            {/* Search */}
            {searchable && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  background: "#f7f7fc",
                  border: "1px solid #ebebf5",
                  borderRadius: "8px",
                  px: 1.2,
                  py: 0.5,
                  height: 32,
                  "&:focus-within": {
                    border: `1px solid ${ColorPallete.primary.main}`,
                    background: "#fff",
                  },
                }}
              >
                <SearchIcon sx={{ fontSize: 15, color: "#bbb" }} />
                <InputBase
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  sx={{
                    fontSize: "0.78rem",
                    "& input": { p: 0 },
                    "& input::placeholder": { color: "#ccc" },
                  }}
                />
              </Box>
            )}

            {headerAction}
          </Stack>
        </Box>
      )}

      {/* Table */}
      <Box sx={{ overflowX: "auto" }}>
        <Box sx={{ minWidth: 500 }}>
          {/* Column headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: [
                ...columns.map((c) => c.width ?? "1fr"),
                ...(actions?.length ? ["80px"] : []),
              ].join(" "),
              px: 3,
              py: 1.5,
              background: "#f9f9fc",
              borderBottom: "1px solid #f0f0f5",
            }}
          >
            {columns.map((col) => (
              <Typography
                key={String(col.key)}
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  textAlign: col.align ?? "left",
                }}
              >
                {col.label}
              </Typography>
            ))}
            {actions?.length ? (
              <Typography
                sx={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  textAlign: "right",
                }}
              >
                Actions
              </Typography>
            ) : null}
          </Box>

          {/* Rows */}
          {paginated.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ fontSize: "0.85rem", color: "#aaa" }}>
                {emptyMessage}
              </Typography>
            </Box>
          ) : (
            paginated.map((row, i) => (
              <Box
                key={row.id}
                onClick={() => onRowClick?.(row)}
                sx={{
                  display: "grid",
                  gridTemplateColumns: [
                    ...columns.map((c) => c.width ?? "1fr"),
                    ...(actions?.length ? ["80px"] : []),
                  ].join(" "),
                  px: 3,
                  py: 1.8,
                  alignItems: "center",
                  borderBottom:
                    i < paginated.length - 1 ? "1px solid #f7f7fc" : "none",
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "background 0.15s",
                  "&:hover": {
                    background: onRowClick ? "#fafafa" : "transparent",
                  },
                }}
              >
                {columns.map((col) => (
                  <Box
                    key={String(col.key)}
                    sx={{ textAlign: col.align ?? "left", minWidth: 0 }}
                  >
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          color: "#555",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {String(
                          (row as Record<string, unknown>)[String(col.key)] ??
                            "—",
                        )}
                      </Typography>
                    )}
                  </Box>
                ))}

                {/* Actions */}
                {actions?.length ? (
                  <Stack direction="row" justifyContent="flex-end" gap={0.5}>
                    {actions
                      .filter((a) => !a.hidden?.(row))
                      .map((action) => (
                        <Tooltip
                          key={action.label}
                          title={action.label}
                          placement="top"
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            sx={{
                              color: action.color ?? "#bbb",
                              borderRadius: "6px",
                              "&:hover": {
                                color: action.hoverColor ?? "#333",
                                background: "#f0f0f5",
                              },
                            }}
                          >
                            {action.icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                  </Stack>
                ) : null}
              </Box>
            ))
          )}
        </Box>
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box
          sx={{
            px: 3,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #f7f7fc",
          }}
        >
          <Typography sx={{ fontSize: "0.72rem", color: "#aaa" }}>
            {page * pageSize + 1}–
            {Math.min((page + 1) * pageSize, processed.length)} of{" "}
            {processed.length}
          </Typography>
          <Stack direction="row" gap={0.5}>
            <IconButton
              size="small"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              sx={{ borderRadius: "6px", "&:hover": { background: "#f0f0f5" } }}
            >
              <KeyboardArrowLeftIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              sx={{ borderRadius: "6px", "&:hover": { background: "#f0f0f5" } }}
            >
              <KeyboardArrowRightIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default DataTable;
