import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

// export async function GET(request: Request) {
//   const { searchParams, origin } = new URL(request.url);
//   const code = searchParams.get("code");

//   if (code) {
//     try {
//       const supabase = await supabaseServer();
//       await supabase.auth.exchangeCodeForSession(code);
//     } catch (error) {
//       console.error("OAuth exchange failed:", error);
//       return NextResponse.redirect(`${origin}/login`);
//     }
//   }

//   return NextResponse.redirect(`${origin}/`);
// }


// // app/auth/callback/route.ts

// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/utils/supabase/server";

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
    console.log("Data", data)

    if (userError || !data?.user) {
      console.error("User fetch error:", userError?.message);
      return NextResponse.redirect(`${origin}/login`);
    }

    const user = data.user;
    console.log(user)

    // ✅ Step 3: Insert into User table (FK safe)
    const { error: insertError } = await supabase
      .from("User")
      .upsert(
        {
          id: user.id, // 🔥 FK to auth.users.id
          email: user.email,
          name: user.user_metadata?.full_name || "",
          avatar: user.user_metadata?.avatar_url || "",
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