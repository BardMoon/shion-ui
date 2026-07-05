<script lang="ts" generics="T">
  import type { TableColumn, SortDirection } from "./types.js";

  type Props = {
    columns: TableColumn<T>[];
    rows: T[];
    getKey: (row: T) => string | number;
    selectable?: boolean;
    pageSize?: number;
    showPagination?: boolean;
    emptyText?: string;
    onRowClick?: (row: T) => void;
    onSelectionChange?: (selected: T[]) => void;
  };

  let {
    columns,
    rows,
    getKey,
    selectable = false,
    pageSize = 10,
    showPagination = true,
    emptyText = "データがありません",
    onRowClick,
    onSelectionChange,
  }: Props = $props();

  let sortKey = $state<string | null>(null);
  let sortDir = $state<SortDirection>("asc");

  let selectedKeys = $state<Set<string | number>>(new Set());

  let currentPage = $state(1);

  const sortedRows = $derived.by(() => {
    if (!sortKey) return rows;
    const key = sortKey as keyof T;
    const dir = sortDir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return -1 * dir;
      if (bv == null) return 1 * dir;
      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv), "ja") * dir;
    });
  });

  const totalPages = $derived(
    showPagination ? Math.max(1, Math.ceil(sortedRows.length / pageSize)) : 1,
  );

  $effect(() => {
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
  });

  const pagedRows = $derived.by(() => {
    if (!showPagination) return sortedRows;
    const start = (currentPage - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  });

  const allOnPageSelected = $derived(
    pagedRows.length > 0 && pagedRows.every((r) => selectedKeys.has(getKey(r))),
  );

  function toggleSort(col: TableColumn<T>) {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      sortKey = col.key;
      sortDir = "asc";
    } else if (sortDir === "asc") {
      sortDir = "desc";
    } else {
      sortKey = null;
      sortDir = "asc";
    }
  }

  function toggleRowSelection(row: T) {
    const key = getKey(row);
    const next = new Set(selectedKeys);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    selectedKeys = next;
    emitSelectionChange();
  }

  function toggleSelectAllOnPage() {
    const next = new Set(selectedKeys);
    if (allOnPageSelected) {
      for (const r of pagedRows) next.delete(getKey(r));
    } else {
      for (const r of pagedRows) next.add(getKey(r));
    }
    selectedKeys = next;
    emitSelectionChange();
  }

  function emitSelectionChange() {
    if (!onSelectionChange) return;
    const selected = rows.filter((r) => selectedKeys.has(getKey(r)));
    onSelectionChange(selected);
  }

  function cellText(row: T, col: TableColumn<T>): string {
    if (col.format) return col.format(row);
    const v = row[col.key];
    return v == null ? "" : String(v);
  }

  function goToPage(p: number) {
    currentPage = Math.min(Math.max(1, p), totalPages);
  }
</script>

<div class="table-view">
  <div class="table-scroll">
    <table>
      <thead>
        <tr>
          {#if selectable}
            <th class="checkbox-col">
              <input
                type="checkbox"
                checked={allOnPageSelected}
                onchange={toggleSelectAllOnPage}
                aria-label="全選択"
              />
            </th>
          {/if}
          {#each columns as col (col.key)}
            <th
              style={col.width ? `width:${col.width}` : ""}
              class:sortable={col.sortable}
              class="align-{col.align ?? 'left'}"
              onclick={() => toggleSort(col)}
            >
              <span class="th-inner">
                {col.label}
                {#if col.sortable}
                  <span class="sort-icon" class:active={sortKey === col.key}>
                    {#if sortKey === col.key}
                      {sortDir === "asc" ? "▲" : "▼"}
                    {:else}
                      ⇅
                    {/if}
                  </span>
                {/if}
              </span>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#if pagedRows.length === 0}
          <tr>
            <td class="empty" colspan={columns.length + (selectable ? 1 : 0)}>
              {emptyText}
            </td>
          </tr>
        {:else}
          {#each pagedRows as row (getKey(row))}
            <tr
              class:selected={selectedKeys.has(getKey(row))}
              onclick={() => onRowClick?.(row)}
            >
              {#if selectable}
                <td class="checkbox-col" onclick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedKeys.has(getKey(row))}
                    onchange={() => toggleRowSelection(row)}
                  />
                </td>
              {/if}
              {#each columns as col (col.key)}
                <td class="align-{col.align ?? 'left'}">
                  {#if col.cell}
                    {@render col.cell(row)}
                  {:else}
                    {cellText(row, col)}
                  {/if}
                </td>
              {/each}
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>

  {#if showPagination && totalPages > 1}
    <div class="pagination">
      <button disabled={currentPage === 1} onclick={() => goToPage(1)}>
        «
      </button>
      <button
        disabled={currentPage === 1}
        onclick={() => goToPage(currentPage - 1)}
      >
        ‹
      </button>
      <span class="page-info">{currentPage} / {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onclick={() => goToPage(currentPage + 1)}
      >
        ›
      </button>
      <button
        disabled={currentPage === totalPages}
        onclick={() => goToPage(totalPages)}
      >
        »
      </button>
    </div>
  {/if}
</div>

<style>
  .table-view {
    font-family: system-ui, sans-serif;
    font-size: 13px;
    color: var(--color-text);
    width: 100%;
  }

  .table-scroll {
    overflow-x: auto;
    border: 1px solid var(--color-surface-border);
    border-radius: var(--border-radius);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-view);
  }

  thead th {
    background: var(--color-surface);
    text-align: left;
    padding: 8px 12px;
    font-weight: 600;
    border-bottom: 1px solid var(--color-surface-border);
    white-space: nowrap;
    user-select: none;
    color: var(--color-text);
  }

  th.sortable {
    cursor: pointer;
  }
  th.sortable:hover {
    background: var(--color-primary-level1);
  }

  .th-inner {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .sort-icon {
    font-size: 11px;
    color: var(--color-text-muted);
  }
  .sort-icon.active {
    color: var(--color-highlight);
  }

  tbody td {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-surface-border-subtle);
  }

  tbody tr:hover {
    background: var(--color-primary-level1);
  }

  tbody tr.selected {
    background: var(--color-primary-level2);
  }

  tbody tr {
    cursor: pointer;
  }

  .checkbox-col {
    width: 36px;
    text-align: center;
  }

  .align-left {
    text-align: left;
  }
  .align-center {
    text-align: center;
  }
  .align-right {
    text-align: right;
  }

  .empty {
    text-align: center;
    padding: 32px;
    color: var(--color-text-muted);
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;
  }

  .pagination button {
    border: 1px solid var(--color-surface-border);
    background: var(--color-view);
    border-radius: var(--border-radius);
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;
    color: var(--color-text);
  }

  .pagination button:hover:not(:disabled) {
    background: var(--color-primary-level1);
  }

  .pagination button:disabled {
    opacity: var(--opacity-button-disabled);
    cursor: default;
  }

  .page-info {
    font-variant-numeric: tabular-nums;
    color: var(--color-text-muted);
    margin: 0 4px;
  }
</style>
