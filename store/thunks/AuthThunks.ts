
import { deleteProfile } from '../slices/profileSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { clearChat } from '../slices/chatSlice';
import { resetNavigation } from '../slices/navigationSlice';
import { supabase } from '@/utils/supabase/client';

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  email: string;
  password: string;
  userName: string;
}

export const login = createAsyncThunk<
  void,                 // return type
  LoginPayload,         // argument type
  { rejectValue: string }
>(
  'auth/login',
  async (authData, { dispatch, rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authData.email,
      password: authData.password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signup = createAsyncThunk<
  void,
  SignupPayload,
  { rejectValue: string }
>(
  "auth/signup",
  async (authData, { rejectWithValue }) => {
    try {
      // 1️⃣ Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      if (!data.user) {
        return rejectWithValue("User creation failed");
      }

      // 2️⃣ Insert profile in your "User" table
      const about = `I'm available`;
      const avatar = `https://api.dicebear.com/5.x/initials/svg?seed=${authData.userName}`;

      const userData = {
        id: data.user.id,
        username: authData.userName,
        email: authData.email,
        about,
        avatar,
      };

      const { error: insertError } = await supabase
        .from("User")
        .insert([userData]);

      if (insertError) {
        return rejectWithValue(insertError.message);
      }

      // ✅ Done — no setProfile here
    } catch (err) {
      return rejectWithValue("Signup failed");
    }
  }
);


export const logout = createAsyncThunk<
  void,      // return type
  void       // argument type
>(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return rejectWithValue(error.message)
      }

      // side effects
      dispatch(deleteProfile())
      dispatch(clearChat())
      dispatch(resetNavigation())
    } catch (err) {
      return rejectWithValue("Logout failed")
    }
  }
)

export const deleteAccount = createAsyncThunk<
  void,                    // return type
  { userId: string },      // arguments
  { state: RootState }      // thunk API types
>(
  "auth/deleteAccount",
  async ({ userId }, { dispatch, rejectWithValue }) => {
    try {
      const { error } = await supabase.functions.invoke(
        "delete-user-and-update-chat",
        {
          method: "POST",
          body: { userId },
        }
      )

      if (error) {
        return rejectWithValue(error.message)
      }

      // side effects AFTER success
      dispatch(logout()).unwrap()

    } catch (err) {
      return rejectWithValue("Delete account failed")
    }
  }
)

export const resetPassword = createAsyncThunk<
  void,
  { password: string },
  { rejectValue: string }
>(
  "auth/resetPassword",
  async ({ password }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        return rejectWithValue(error.message);
      }

    } catch {
      return rejectWithValue("Please try again after sometime");
    }
  }
);

export const sendResetPasswordLink = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>(
  "auth/sendResetPasswordLink",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://bento-chat.vercel.app/reset-password",
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      return;
    } catch {
      return rejectWithValue("Please try again");
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      return rejectWithValue(error.message);
    }
  }
);