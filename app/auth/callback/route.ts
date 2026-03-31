import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  try {
    const supabase = await supabaseServer();

    // ✅ Step 1: Exchange code → session (auth.users entry ensured)
    const { error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Exchange error:", exchangeError.message);
      return NextResponse.redirect(`${origin}/login`);
    }

    // ✅ Step 2: Get logged-in user
    const { data, error: userError } = await supabase.auth.getUser();
    if (userError || !data?.user) {
      console.error("User fetch error:", userError?.message);
      return NextResponse.redirect(`${origin}/login`);
    }

    const user = data.user;

    // ✅ Step 3: Insert into User table (FK safe)
    const { error: insertError } = await supabase
      .from("User")
      .upsert(
        {
          id: user.id, // 🔥 FK to auth.users.id
          email: user.email,
          username: user.user_metadata?.full_name || "",
          avatar: user.user_metadata?.avatar_url || "",
          about: "I'm available",
        },
        {
          onConflict: "id",
        }
      );

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }

    // ✅ Step 4: Redirect
    return NextResponse.redirect(`${origin}/`);

  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(`${origin}/login`);
  }
}