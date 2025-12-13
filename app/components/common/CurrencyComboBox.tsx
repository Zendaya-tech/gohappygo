import { useEffect, useMemo, useRef, useState } from "react";
import type { Currency } from "~/services/currencyService";
import { searchCurrencies } from "~/services/currencyService";

type CurrencyComboBoxProps = {
  label?: string;
  value?: string; // currency code
  selectedCurrency?: Currency | null; // full currency object for better display
  onChange: (currency: Currency | null) => void;
  placeholder?: string;
  compact?: boolean; // For inline display beside price inputs
};

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export default function CurrencyComboBox({
  label,
  value,
  selectedCurrency,
  onChange,
  placeholder = "Select currency",
  compact = false,
}: CurrencyComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Currency[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const requestIdRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isInitialized, setIsInitialized] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 300);

  // Initialize with default value only once
  useEffect(() => {
    if (!isInitialized && selectedCurrency) {
      const displayText = compact ? selectedCurrency.code : `${selectedCurrency.name} (${selectedCurrency.code})`;
      setQuery(displayText);
      setIsInitialized(true);
    } else if (!isInitialized && value) {
      setQuery(value);
      setIsInitialized(true);
    }
  }, [selectedCurrency, value, compact, isInitialized]);

  // Reset initialization when selectedCurrency changes from null to a value (dialog reopening)
  useEffect(() => {
    if (selectedCurrency && query === "") {
      setIsInitialized(false);
    }
  }, [selectedCurrency, query]);

  const load = async (reset: boolean) => {
    if (loading) return;
    if (!hasMore && !reset) return;
    setLoading(true);
    try {
      const currentId = ++requestIdRef.current;
      const res = await searchCurrencies({
        name: debouncedQuery,
        cursor: reset ? undefined : cursor ?? undefined,
      });
      if (requestIdRef.current !== currentId) return; // ignore stale results
      setItems((prev) => (reset ? res.items : [...prev, ...res.items]));
      setCursor(res.nextCursor ?? null);
      setHasMore(Boolean(res.nextCursor));
      setActiveIndex(res.items.length > 0 ? 0 : -1);
    } finally {
      setLoading(false);
    }
  };

  // Initial/open load and when query changes (debounced)
  useEffect(() => {
    if (!open) return;
    setHasMore(true);
    setCursor(null);
    load(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, open]);

  // Close on click outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!listRef.current && !inputRef.current) return;
      const inside =
        listRef.current?.contains(target) || inputRef.current?.contains(target);
      if (!inside) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Infinite scroll observer
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        load(false);
      }
    });
    io.observe(sentinel);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sentinelRef.current, cursor, hasMore]);

  const onPick = (currency: Currency) => {
    onChange(currency);
    setQuery(compact ? currency.code : `${currency.name} (${currency.code})`);
    setOpen(false);
  };

  // If parent passes a code as value, reflect as input display when closed
  const displayValue = useMemo(() => query, [query]);

  if (compact) {
    return (
      <div className="relative">
        <input
          ref={inputRef}
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
              setOpen(true);
              return;
            }
            if (!open) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((idx) =>
                Math.min(idx < 0 ? 0 : idx + 1, items.length - 1)
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((idx) => Math.max(idx < 0 ? 0 : idx - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (activeIndex >= 0 && activeIndex < items.length)
                onPick(items[activeIndex]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          className="w-full text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pl-3 pr-2 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {open && (
          <div
            ref={listRef}
            className="absolute z-20 mt-1 w-64 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg max-h-72 overflow-auto"
          >
            {items.length === 0 && !loading && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No currencies
              </div>
            )}
            {items.map((c, idx) => (
              <button
                key={`${c.id}-${c.code}`}
                onClick={() => onPick(c)}
                className={`w-full text-left px-3 py-2 text-sm text-gray-800 dark:text-gray-100 ${
                  idx === activeIndex
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="font-medium">
                  {c.code} <span className="text-gray-500">({c.symbol})</span>
                </div>
                <div className="text-xs text-gray-500">{c.name}</div>
              </button>
            ))}
            <div ref={sentinelRef} />
            {loading && (
              <div className="px-3 py-2 text-sm text-gray-500">Loading…</div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          value={displayValue}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
              setOpen(true);
              return;
            }
            if (!open) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((idx) =>
                Math.min(idx < 0 ? 0 : idx + 1, items.length - 1)
              );
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((idx) => Math.max(idx < 0 ? 0 : idx - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (activeIndex >= 0 && activeIndex < items.length)
                onPick(items[activeIndex]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={placeholder}
          className="w-full text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl pl-3 pr-9 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          aria-label="Toggle dropdown"
          onClick={() => setOpen((o) => !o)}
          className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {open && (
          <div
            ref={listRef}
            className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg max-h-72 overflow-auto"
          >
            {items.length === 0 && !loading && (
              <div className="px-3 py-2 text-sm text-gray-500">
                No currencies
              </div>
            )}
            {items.map((c, idx) => (
              <button
                key={`${c.id}-${c.code}`}
                onClick={() => onPick(c)}
                className={`w-full text-left px-3 py-2 text-sm text-gray-800 dark:text-gray-100 ${
                  idx === activeIndex
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <div className="font-medium">
                  {c.name} <span className="text-gray-500">({c.code})</span>
                </div>
                <div className="text-xs text-gray-500">
                  {c.symbol} - {c.country}
                </div>
              </button>
            ))}
            <div ref={sentinelRef} />
            {loading && (
              <div className="px-3 py-2 text-sm text-gray-500">Loading…</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
