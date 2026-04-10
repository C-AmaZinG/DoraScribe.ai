import { NextResponse } from "next/server";

const PLANS_API_URL = "https://api.dorascribe.ai/api/v1/plans";

export async function GET() {
  try {
    const response = await fetch(PLANS_API_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch plans." },
        { status: response.status }
      );
    }

    const payload = await response.json();
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { error: "Unable to fetch plans." },
      { status: 502 }
    );
  }
}
