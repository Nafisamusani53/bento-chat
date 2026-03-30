import { NextResponse } from "next/server";
import { supabaseServer } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    try {
      const supabase = await supabaseServer();
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("OAuth exchange failed:", error);
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  return NextResponse.redirect(`${origin}/`);
}