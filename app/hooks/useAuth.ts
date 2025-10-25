import { useCallback } from "react";
import { useAuthStore, type AuthState } from "../store/auth";
import {
  login as apiLogin,
  register as apiRegister,
  verifyEmail as apiVerifyEmail,
  updateProfile as apiUpdateProfile,
  changePassword as apiChangePassword,
  type LoginResponse,
  type UpdateProfileData,
  type ChangePasswordData,
} from "../services/authService";

export const useAuth = () => {
  const authStore = useAuthStore();
  const {
    login: storeLogin,
    logout: storeLogout,
    hydrateFromCookies,
  } = authStore;

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = (await apiLogin(email, password)) as LoginResponse | null;

        if (!res || !res.access_token) {
          throw new Error("Identifiants invalides");
        }

        const composedUser = res.user
          ? {
              id: String(res.user.id),
              name:
                `${res.user.firstName ?? ""} ${
                  res.user.lastName ?? ""
                }`.trim() ||
                (res.user.email ?? "Utilisateur"),
              profilePictureUrl: res.user.profilePictureUrl,
            }
          : {
              id: "me",
              name: email.split("@")[0] || "Utilisateur",
            };

        // Store token in localStorage
        try {
          window.localStorage.setItem("auth_token", res.access_token);
        } catch (e) {
          console.warn("Could not store token in localStorage:", e);
        }

        storeLogin(res.access_token, composedUser, res.refresh_token);

        return { success: true, user: composedUser };
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    [storeLogin]
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName?: string,
      lastName?: string,
      phoneNumber?: string
    ) => {
      try {
        const res = await apiRegister(
          email,
          password,
          firstName,
          lastName,
          phoneNumber
        );

        if (!res) {
          throw new Error("Échec de l'inscription. Réessayez.");
        }

        return {
          success: true,
          message: res.message || "Inscription réussie. Vérifiez votre email.",
        };
      } catch (error) {
        console.error("Register error:", error);
        throw error;
      }
    },
    []
  );

  const verifyEmail = useCallback(
    async (email: string, verificationCode: string) => {
      try {
        const res = await apiVerifyEmail(email, verificationCode);

        if (!res) {
          throw new Error("Code de vérification invalide. Réessayez.");
        }

        return {
          success: true,
          message: res.message || "Email vérifié avec succès!",
        };
      } catch (error) {
        console.error("Verify email error:", error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem("auth_token");
    } catch (e) {
      console.warn("Could not remove token from localStorage:", e);
    }
    storeLogout();
  }, [storeLogout]);

  const authenticate = useCallback(() => {
    hydrateFromCookies();
  }, [hydrateFromCookies]);

  const updateProfile = useCallback(
    async (data: UpdateProfileData) => {
      try {
        const res = await apiUpdateProfile(data);

        // Update user in store if successful
        if (res && authStore.user) {
          const updatedUser = {
            ...authStore.user,
            name:
              data.firstName && data.lastName
                ? `${data.firstName} ${data.lastName}`.trim()
                : authStore.user.name,
            profilePictureUrl:
              res.profilePictureUrl || authStore.user.profilePictureUrl,
          };
          storeLogin(authStore.token!, updatedUser);
        }

        return {
          success: true,
          message: res.message || "Profil mis à jour avec succès!",
        };
      } catch (error) {
        console.error("Update profile error:", error);
        throw error;
      }
    },
    [authStore.user, authStore.token, storeLogin]
  );

  const changePassword = useCallback(async (data: ChangePasswordData) => {
    try {
      const res = await apiChangePassword(data);
      return {
        success: true,
        message: res.message || "Mot de passe modifié avec succès!",
      };
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  }, []);

  return {
    // State
    user: authStore.user,
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,

    // Methods
    login,
    register,
    verifyEmail,
    updateProfile,
    changePassword,
    logout,
    authenticate,
  };
};
