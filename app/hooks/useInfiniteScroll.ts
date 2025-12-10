import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void | Promise<void>;
  hasMore: boolean;
  loading: boolean;
  threshold?: number; // Distance from bottom in pixels to trigger load
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  loading,
  threshold = 300,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sentinelRef.current || loading || !hasMore) return;

      const rect = sentinelRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight + threshold;

      if (isVisible) {
        console.log("Infinite scroll triggered - loading more");
        onLoadMore();
      }
    };

    // Check on mount and scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [onLoadMore, hasMore, loading, threshold]);

  return sentinelRef;
}
