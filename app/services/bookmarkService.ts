import api from "./Api";

export interface BookmarkRequest {
  bookmarkType: "TRAVEL" | "DEMAND";
  demandId?: number;
  travelId?: number;
}

export interface BookmarkResponse {
  id: string;
  bookmarkType: string;
  demandId?: number;
  travelId?: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const addBookmark = async (data: BookmarkRequest) => {
  try {
    const response = await api.post("/bookmark", data);
    return response.data;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

export const removeBookmark = async (bookmarkType: string, itemId: number) => {
  try {
    const response = await api.delete(
      `/bookmark/item/${bookmarkType}/${itemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    throw error;
  }
};

export const getUserBookmarks = async () => {
  try {
    const response = await api.get("/bookmark");
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error;
  }
};

export const checkIfBookmarked = async (
  bookmarkType: string,
  itemId: number
): Promise<boolean> => {
  try {
    const bookmarks = await getUserBookmarks();
    return bookmarks.some((bookmark: BookmarkResponse) => {
      if (bookmarkType === "TRAVEL") {
        return (
          bookmark.bookmarkType === bookmarkType && bookmark.travelId === itemId
        );
      } else {
        return (
          bookmark.bookmarkType === bookmarkType && bookmark.demandId === itemId
        );
      }
    });
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
};
